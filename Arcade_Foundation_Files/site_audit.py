#!/usr/bin/env python3
"""Lightweight static-site audit for Arcade™."""

from __future__ import annotations

import argparse
import html.parser
import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

HTML_EXTENSIONS = {".html", ".htm"}
IGNORED_SCHEMES = {"mailto", "tel", "javascript", "data"}
DIRECT_REPOSITORY_PATTERN = re.compile(r"https?://(?:www\.)?github\.com/", re.I)
SECRET_PATTERNS = {
    "GitHub personal access token": re.compile(r"\bghp_[A-Za-z0-9]{30,}\b"),
    "GitHub fine-grained token": re.compile(r"\bgithub_pat_[A-Za-z0-9_]{40,}\b"),
    "AWS access key": re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    "Private key": re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
}


class DocumentParser(html.parser.HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.links: list[tuple[str, str]] = []
        self.title_parts: list[str] = []
        self.in_title = False
        self.images_without_alt: list[str] = []
        self.buttons_without_name = 0
        self._button_depth = 0
        self._button_text: list[str] = []
        self._button_aria = ""

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key.lower(): (value or "") for key, value in attrs}
        lower = tag.lower()

        element_id = values.get("id")
        if element_id:
            self.ids.append(element_id)

        if lower == "a" and values.get("href"):
            self.links.append(("href", values["href"]))
        if lower in {"script", "img", "source", "video", "audio"} and values.get("src"):
            self.links.append(("src", values["src"]))
        if lower == "link" and values.get("href"):
            self.links.append(("href", values["href"]))

        if lower == "img" and "alt" not in values:
            self.images_without_alt.append(values.get("src", "<inline image>"))

        if lower == "title":
            self.in_title = True

        if lower == "button":
            self._button_depth += 1
            self._button_text = []
            self._button_aria = values.get("aria-label", "") or values.get("title", "")

    def handle_endtag(self, tag: str) -> None:
        lower = tag.lower()
        if lower == "title":
            self.in_title = False
        if lower == "button" and self._button_depth:
            name = self._button_aria.strip() or " ".join(self._button_text).strip()
            if not name:
                self.buttons_without_name += 1
            self._button_depth -= 1

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_parts.append(data)
        if self._button_depth:
            self._button_text.append(data)

    @property
    def title(self) -> str:
        return " ".join(" ".join(self.title_parts).split())


def is_external_or_special(raw: str) -> bool:
    value = raw.strip()
    if not value or value.startswith("#") or value.startswith("//"):
        return True
    parts = urlsplit(value)
    if parts.scheme.lower() in IGNORED_SCHEMES:
        return True
    return bool(parts.scheme or parts.netloc)


def resolve_local_link(root: Path, document: Path, raw: str) -> Path | None:
    if is_external_or_special(raw):
        return None

    clean = unquote(urlsplit(raw).path)
    if not clean:
        return None

    if clean.startswith("/"):
        relative = clean.lstrip("/")
        prefix = "arcade.github.io/"
        if relative.startswith(prefix):
            relative = relative[len(prefix):]
        target = root / relative
    else:
        # Parent-relative paths from the project site commonly point to sibling
        # Verve N Veda GitHub Pages repositories. They cannot be verified from
        # this repository alone, so the local audit leaves them for deployment
        # or network-level link checking.
        if clean == ".." or clean.startswith("../"):
            return None
        target = document.parent / clean

    if clean.endswith("/"):
        target = target / "index.html"

    return target.resolve()


def audit(root: Path) -> list[str]:
    errors: list[str] = []
    warnings: list[str] = []

    html_files = sorted(
        path for path in root.rglob("*")
        if path.is_file() and path.suffix.lower() in HTML_EXTENSIONS
    )

    if not html_files:
        errors.append("No HTML files were found.")
        return errors

    required = ["index.html", "404.html", "README.md", "SECURITY.md", "PRIVACY.md"]
    for name in required:
        if not (root / name).exists():
            errors.append(f"Missing required foundation file: {name}")

    for document in html_files:
        rel = document.relative_to(root)
        text = document.read_text(encoding="utf-8", errors="replace")

        parser = DocumentParser()
        try:
            parser.feed(text)
        except Exception as exc:
            errors.append(f"{rel}: HTML parser error: {exc}")
            continue

        if not parser.title:
            errors.append(f"{rel}: missing a non-empty <title>.")

        duplicates = sorted({value for value in parser.ids if parser.ids.count(value) > 1})
        if duplicates:
            errors.append(f"{rel}: duplicate IDs: {', '.join(duplicates)}")

        for src in parser.images_without_alt:
            errors.append(f"{rel}: image is missing alt text: {src}")

        if parser.buttons_without_name:
            errors.append(f"{rel}: {parser.buttons_without_name} button(s) have no accessible name.")

        if DIRECT_REPOSITORY_PATTERN.search(text):
            errors.append(f"{rel}: contains a direct github.com repository link.")

        for label, raw in parser.links:
            target = resolve_local_link(root, document, raw)
            if target is None:
                continue

            if target.exists():
                continue

            # Template, generated, or registry paths can be reported as warnings
            # rather than blocking the workflow when their literal source is dynamic.
            if any(token in raw for token in ("${", "{{", "}}")):
                warnings.append(f"{rel}: dynamic {label} not resolved during static audit: {raw}")
                continue

            errors.append(f"{rel}: broken local {label}: {raw}")

        for name, pattern in SECRET_PATTERNS.items():
            if pattern.search(text):
                errors.append(f"{rel}: possible exposed secret ({name}).")

    manifest = root / "manifest.webmanifest"
    if manifest.exists():
        try:
            data = json.loads(manifest.read_text(encoding="utf-8"))
            for key in ("name", "short_name", "start_url", "display", "theme_color"):
                if not data.get(key):
                    errors.append(f"manifest.webmanifest: missing {key}.")
        except json.JSONDecodeError as exc:
            errors.append(f"manifest.webmanifest: invalid JSON: {exc}")

    for warning in warnings:
        print(f"WARNING: {warning}")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "root",
        nargs="?",
        default=".",
        help="Repository root to audit (default: current directory).",
    )
    args = parser.parse_args()

    root = Path(args.root).resolve()
    errors = audit(root)

    if errors:
        print("\nSITE AUDIT FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print("SITE AUDIT PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
