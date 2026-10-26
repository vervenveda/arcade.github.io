#!/usr/bin/env node
/**
 * Arcade catalog regression — Node.js built-ins only.
 * Checks structural integrity and local file destinations, NOT gameplay certification.
 * Cross-repository routes must be checked separately in a deployed environment.
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const problems = [];
const assert = (condition, detail) => { if (!condition) problems.push(detail); };

function block(before, after) {
  const start = html.indexOf(before);
  const end = start < 0 ? -1 : html.indexOf(after, start + before.length);
  if (start < 0 || end < 0) throw new Error("Missing catalog marker: " + before);
  return html.slice(start + before.length, end);
}

const games = JSON.parse(block("const GAMES=", ";const CATS="));
const cats = JSON.parse(block("const CATS=", ";const PATHS="));
const paths = JSON.parse(block("const PATHS=", ";const COMPANIONS="));
const companions = JSON.parse(block("const COMPANIONS=", ";const NETWORK="));
const unique = (a) => new Set(a).size === a.length;
assert(games.length === 71, "Catalog size changed unexpectedly; review and update baseline intentionally.");
assert(unique(games.map(g => g.id)), "Duplicate game IDs");
assert(unique(games.map(g => g.url)), "Duplicate game URLs");
assert(Object.keys(cats).length === 8, "Category count changed without review");
assert(unique(games.map(g => g.title)), "Duplicate game titles make guided paths ambiguous");
assert(companions.length === 2, "Companion inventory changed without review");

const localFiles = [], siblingFiles = [];
for (const g of games) {
  assert(Boolean(g.id && g.title && g.url && g.category && g.source), "Incomplete catalog record: " + JSON.stringify(g));
  assert(Boolean(cats[g.category]), "Unknown category: " + g.title);
  assert(/^\.{1,2}\//.test(g.url), "Unexpected absolute game link: " + g.url);
  if (g.url.startsWith("./")) {
    const relative = g.url.slice(2);
    const target = resolve(root, relative);
    assert(target.startsWith(root + "/") && existsSync(target) && statSync(target).isFile(), "Missing local game: " + g.title + " → " + relative);
    localFiles.push(g);
  } else siblingFiles.push(g);
}
for (const [name, stops] of paths) {
  assert(stops.length > 0, "Empty learning path: " + name);
  for (const stop of stops) assert(games.some(g => g.title === stop), "Unlinked learning path stop: " + name + " → " + stop);
}

const fallbackCount = (html.match(/id="vnvBetaProgramFallback"/g) || []).length;
assert(fallbackCount === 1, "Exactly one Beta fallback link required");
assert(html.includes('src="./assets/vnv-beta-link.js"'), "Beta widget must load from this repository");
assert(existsSync(resolve(root, "assets/vnv-beta-link.js")), "Local Beta widget missing");
assert(html.includes("script-src 'self' 'unsafe-inline' https://vervenveda.com"), "Expected narrowed CSP script allowlist missing");
assert(html.includes("connect-src 'self'"), "Same-origin route checker blocked by CSP");
assert(html.includes("window.auditArcadeRoutes=auditArcadeRoutes"), "HTTP route audit entry missing");
assert(html.includes("function togglePlayed"), "Optional play journal missing");
assert(html.includes("No games match the current filters"), "Filtered random empty-state guard missing");

let parsedScripts = 0;
for (const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
  const js = match[1];
  if (!js.trim()) continue;
  try { new vm.Script(js, { filename: "index.html inline script " + (++parsedScripts) }); }
  catch (e) { problems.push("JavaScript parse failed: " + e.message); }
}
assert(parsedScripts >= 2, "Expected catalog and language scripts");

console.log("Arcade catalog regression:");
console.log("  Registered games: " + games.length);
console.log("  Same-repository routes inspected: " + localFiles.length);
console.log("  Sibling-repository routes NOT inspected: " + siblingFiles.length);
console.log("  Learning paths: " + paths.length);
console.log("  Inline scripts syntax checked: " + parsedScripts);
console.log("  Browser/gameplay certification: NOT PERFORMED");
if (problems.length) {
  problems.forEach(item => console.error("FAIL: " + item));
  process.exitCode = 1;
} else console.log("PASS: catalog integrity and local file routing");
