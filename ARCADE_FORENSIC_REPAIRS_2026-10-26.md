# Arcade forensic repairs — 2026-10-26

Scope: `main`, read of live repository files and exact game-entry paths. No game mechanics, Academy assessment scores, or unrelated repository designs changed.

## Five repairs shipped

1. **Duplicate Beta widget:** Removed the original triple-overlap and retained one no-script fallback with ID `vnvBetaProgramFallback`. During subsequent commits, existing GitHub Actions Beta enforcement reinserted additional static anchors and normalized the widget reference back to `/assets/vnv-beta-link.js`. A durable CSS rule now hides these injected duplicate anchors while retaining the fallback and any working dynamic widget. **The automation itself still adds duplicate markup**; this should be corrected in its upstream workflow rather than repeatedly deleting links here.
2. **Script integrity / CSP:** Adjusted the page's meta CSP from only inline script to a narrowly permitted `'self'` and `https://vervenveda.com` script list, with `connect-src 'self'` for optional same-origin route probes. **Residual:** `'unsafe-inline'` remains to support the legacy single-page inline scripts. `frame-ancestors` inside a meta CSP is not an effective framing control; review deployment headers separately if clickjacking protection is required.
3. **Navigation language integrity:** Because the catalog descriptions and games remain in English or their own source languages, HTML document language stays `en`. Translated navigation labels receive their own `lang` attributes and Arabic direction. All 13 options remain discoverable, but unsupported navigation locales are now clearly labeled English fallback. Only EN/ES/FR/DE/PT/AR have the existing partial navigation coverage.
4. **Registry / route audit:** `window.auditArcade()` now reports structural inconsistencies such as unknown categories and missing learning-path titles. `window.auditArcadeRoutes()` and the optional Check Routes button perform same-origin HTTP HEAD checks in batches; cross-origin, unsupported HEAD, and blocked fetches are **unverified**, never reported as failures or certified gameplay. HTTP success is not browser gameplay success.
5. **Discovery and voluntary progression:** Surprise Me uses the actual visible filtered game set, including text search, category, source, and pinned-only. Empty results no longer route elsewhere. All 26 stops in five learning paths now link to their registered games. A voluntary `played` marker can be exported or cleared; it saves only game IDs in this browser, never Academy grades, learner names, or completion claims.

## Evidence and regression

- The `GAMES` registry remains **71 entries, 71 unique URLs, eight categories, five source groups**.
- All **71 registered destination files** were independently found on the `main` branches of their referenced source GitHub repositories, including **53 Arcade-relative** and **18 sibling-repository** paths. This confirms source-file presence, not correct deploy routing or runtime.
- All inline scripts in the updated Arcade entry page passed JavaScript syntax parsing during the repair.
- All 26 curated path titles resolve to a registered game.
- `tests/arcade-catalog.mjs` uses built-in Node modules only, checks the 53 local destinations, registry structure, duplicate links, JavaScript parsing, path titles, filtered random behavior, and clickable paths. Cross-repository targets remain explicitly outside its checkout scope.
- `.github/workflows/arcade-catalog.yml` runs the test on relevant `main` pushes and can be launched with `workflow_dispatch`.
- **CI job completion not yet established** using the connected status endpoints. Do not mark CI green without a completed check.
- **Real-browser playthrough certification remains outstanding** for keyboard/touch interactions, individual games' save/reload, devices, screen readers, offline behavior, and any learner/guardian boundary.

## Manual browser acceptance checklist

1. On desktop and narrow mobile, confirm one **visible** Beta entry despite automation-inserted hidden duplicate markup, and unobstructed navigation. Confirm root `/assets/` widget handling for both the custom domain and the GitHub Pages project path.
2. Open one representative local game, one Bazaar Art game, one Aurora game, and one Preschool game. Confirm the content truly runs, not just an HTTP response.
3. Search for a single game and use Surprise Me: it must open only that game. Search nonsense and confirm no navigation.
4. Enable pinned-only with no pins; Surprise Me must announce an empty match rather than redirect.
5. Mark a game played, reload, check the marker persists, export it, and clear markers without affecting Academy grades.
6. Follow all five learning-path trails through at least their first and last games.
7. Change language to Arabic, Spanish, then Japanese fallback and inspect visible labels and screen-reader pronunciation.
8. Run Check Routes online and distinguish OK, failed, and unverified. Test disconnected operation separately; route checks need network access.
