# Contributing to Arcade™

Thank you for helping improve Arcade™.

## Project Principles

Contributions should preserve the Arcade's:

- local-first architecture;
- static GitHub Pages compatibility;
- privacy-respecting design;
- keyboard accessibility;
- reduced-motion support;
- clean 7px control radius;
- centered, spacious Arcade After Dark identity;
- public landing-page navigation;
- readable, non-minified source.

## Before Making a Change

1. Confirm the correct filename and public path.
2. Test the existing page before editing.
3. Make the smallest practical change.
4. Preserve ownership and third-party notices.
5. Do not add secrets, access tokens, private records, analytics, ads, trackers, or unnecessary network calls.

## Adding a Game

A new cabinet entry should include:

- a unique stable `id`;
- a public-facing `title`;
- a correct `file` or approved public `url`;
- one recognized category;
- a concise icon;
- searchable tags;
- a plain-language description;
- a source label when the game lives in another Verve N Veda hall.

The destination must exist before the cabinet is published.

## Categories

The current primary categories are:

- Strategy Table;
- Word & Language;
- Visual Logic & Puzzles;
- Creative & Contemplative;
- Trivia & Knowledge;
- Action & Simulation;
- Sanctuary Play.

Avoid creating a new category for a single game unless there is a clear long-term need.

## Accessibility Checklist

Before submitting a change, confirm:

- keyboard access works;
- focus remains visible;
- labels are understandable without icons;
- text does not overlap;
- controls remain usable at 320px width;
- reduced-motion behavior is respected;
- color is not the only way information is communicated;
- success and error messages are readable.

## Link Checklist

Confirm that:

- relative Arcade files exist;
- connected games use approved public landing-page URLs;
- no visitor is sent to a GitHub repository page;
- filenames preserve exact capitalization and punctuation;
- renamed files are reflected in the registry, sitemap, README, and changelog.

## Source Style

- Use readable indentation.
- Do not minify source files.
- Prefer semantic HTML.
- Use `const` and `let`, not `var`.
- Avoid inline event handlers.
- Avoid unnecessary dependencies.
- Keep CSS selectors scoped and understandable.
- Comment architectural decisions, not obvious syntax.

## Testing

Run:

```bash
python scripts/site_audit.py
```

The GitHub Actions workflow runs the same audit for pushes and pull requests.

## Contributions and Rights

Only submit work you have the right to contribute.

By submitting a contribution for acceptance, you confirm that the project owner may use, edit, publish, and maintain that contribution as part of Arcade™. This does not grant a license to the rest of the project.
