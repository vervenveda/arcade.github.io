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

// The Academy toolbar owns Beta/Support. Upstream automation may add a hidden
// fallback anchor and a legacy loader; neither is required for page navigation.
const fallbackCount=(html.match(/id="vnvBetaProgramFallback"/g)||[]).length;
assert(fallbackCount<=1,"Duplicate legacy Beta fallback IDs");
assert(html.includes('src="./assets/arcade-game-shell.js" data-arcade-home defer'),"Unified lower-right home toolbar missing");
assert(existsSync(resolve(root,"assets/arcade-game-shell.js")),"Shared toolbar asset missing");
assert(html.includes('id="arcadeNetwork"')&&html.includes('id="arcadeLanguageMount"'),"Native network/language dropdown missing");
assert((html.match(/<header>/g)||[]).length===1,"Exactly one native Arcade header required");
assert(!html.includes('class="vnv-global-strip"'),"Duplicate Verve top strip returned");
assert(html.includes('data-vnv-support-off'),"Legacy injected support top button not disabled");
assert(html.includes('#vnvEcosystemMenuButton,#vnv-global-support-top'),"Auto-injected ecosystem/support duplicates not hidden");
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

// Small DOM-free behavioral checks for the former random/learning-path defects.
function sourceFunction(name, next) {
  const start = "function " + name + "(){";
  return "(" + start + block(start, "function " + next + "(){") + ")";
}
const routeState = { href: "unchanged" };
const matchCards = [
  { dataset: { id: games[7].id } },
  { dataset: { id: games[13].id } }
];
let visibleCards = matchCards;
let lastToast = "";
const randomContext = {
  GAMES: games,
  Math: { random: () => 0.99, floor: Math.floor },
  location: routeState,
  toast: message => { lastToast = message; },
  $: id => { if (id !== "gameGrid") throw new Error("Unexpected element"); return { querySelectorAll: () => visibleCards }; }
};
const randomGame = vm.runInNewContext(sourceFunction("chooseRandom", "renderFeatured"), randomContext);
randomGame();
assert(routeState.href === games[13].url, "Surprise Me did not honor the visible filtered set");
routeState.href = "unchanged";
visibleCards = [];
randomGame();
assert(routeState.href === "unchanged" && lastToast.includes("No games match"), "Empty search unexpectedly redirects to an unrelated game");

const pathGrid = { innerHTML: "" };
const pathRender = vm.runInNewContext(sourceFunction("renderPaths", "renderCompanions"), {
  GAMES: games, PATHS: paths,
  $: id => { if (id !== "pathGrid") throw new Error("Unexpected path element"); return pathGrid; },
  esc: value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")
});
pathRender();
assert((pathGrid.innerHTML.match(/<li><a href=/g) || []).length === paths.reduce((total, item) => total + item[1].length, 0), "Guided learning paths contain non-clickable stops");

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
