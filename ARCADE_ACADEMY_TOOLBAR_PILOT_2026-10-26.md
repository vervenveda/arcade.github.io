> **October 26 corrective update:** The original top-left floating game breadcrumb and independent top ecosystem strip were rejected in visual beta review. The current implementation puts **all controls in one lower-right dock** on both the Arcade landing page and 14 pilot game pages. On games, the Arcade return link and optional fullscreen control are inside the open tray. The landing page retains only its native Arcade header with a Network dropdown containing ecosystem links and the language selector. The separate Beta/Support buttons injected by ecosystem automation are visually suppressed. The earlier implementation details below document the superseded pilot, not the current page layout.

# Arcade Academy Utility Dock — Pilot Integration (2026-10-26)

## Provenance
Source retrieved from the actual Academy landing-page module on `main`:
`vervenveda/Khaemenes_Academy.github.io/assets/khaemenes-home-personalization.js`

The Academy's `khaemenesHomeUtilityDock` provided the lower-right dock structure, its Profile/Beta/Contribute/Search destinations, and the 7px parchment/forest/gold design direction. Its original launcher depends on the Academy learner registry and router, so Arcade uses an independent **public-navigation-only** adapter, never copies Academy learner state and never claims authenticated cloud/learner access.

## Shared Arcade shell
`assets/arcade-game-shell.js`

- Profile: `https://vervenveda.com/Khaemenes_Academy.github.io/student/` (students use the authoritative Academy portal to select or authenticate a learner).
- Beta: `https://vervenveda.com/beta/?source=<public hostname+pathname>#feedback` (never passes learner ID, answers, localStorage, query strings, or browser tokens).
- Support: `https://buy.stripe.com/aFa8wQ5xf9Scf65caT4AU0s` (existing Academy contribution checkout).
- PLERA Search: `https://vervenveda.com/PLERASearch.github.io/` (existing Academy engine destination).

Link behavior: links open **full browser tabs**, not small popup windows or embedded third-party frames. The game remains open in its original tab. Breadcrumb `Arcade / Game Title` returns to the correct **same-host Arcade landing page** using the location of the loaded shared script. An optional Full Screen control uses the browser's user-initiated Fullscreen API when available; Escape exits native fullscreen. The tool tray is expanded by default on desktops 800px+ and collapses behind Tools + on narrower screens to reduce obstruction. Press Escape to collapse an open tray. Existing Beta and support floaters are visually deduplicated, including when the ecosystem Beta automation injects them later. On browsers supporting CSS `:has()`, the added chrome temporarily disappears behind native open dialogs and the Pattern Pirates tutorial overlay, so the game-specific popup stays visually unobstructed. Original game dialogs are not redesigned or resized.

**No game engine, rules, timers, saved data, assessments, question banks, or art were changed by the toolbar integration.** It is a one-line script include per game, plus the standalone shared asset.

## Installed (14 of the 53 Arcade-local game pages)

Root games:
- Chess_Studio_index.html
- Orions_connect_four_index.html
- Jenny's_Sudoku_index.html
- SixbySix_index.html
- AffixSix™_index.html

Kids' games:
- games/kids/ABC_Bubbles_index.html
- games/kids/Acts_of_Kindness_index.html
- games/kids/Bubble_Pop_index.html
- games/kids/Palette_Quest_index.html
- games/kids/Pattern_Pirates_index.html
- games/kids/Shapes_index.html
- games/kids/prek_waether_match_index.html
- games/kids/PizzaAmorè_index.html
- games/kids/PizzaAmorè_deluxe_index.html

Nested game pages use `../../assets/arcade-game-shell.js`; root games use `./assets/arcade-game-shell.js`. The other 39 local game pages and 18 source-repository games have not received this adapter yet. Those will be handled incrementally, respecting each repository's design and write boundaries.

## Verification
- All 14 touched game pages confirmed to include exactly one correct relative adapter script, one HTML document and valid inline JavaScript syntax at the time of the follow-up audit.
- Shared adapter JavaScript parses successfully and a simulated desktop/mobile DOM mount showed all four correct destinations, a correct repository-aware Arcade breadcrumb, and desktop-expanded/mobile-collapsed state.
- `tests/arcade-game-shell-regression.mjs` verifies 14 game pages, exact loader locations, 4 public link destinations, breadcrumb resolution, and mock desktop/mobile dock toggling.
- `.github/workflows/arcade-catalog.yml` runs the new test alongside the earlier catalog and game regression checks on `main` pushes.

## Outstanding user beta/browser checks
- Open Chess Studio, Sudoku, Orion and a nested kids' game on desktop and mobile; inspect breadcrumb position and toolbar coverage.
- On mobile, Tools + must open and close without blocking the central game board or on-screen controls.
- Follow Profile, Beta, Support and PLERA Search to real **full-page browser tabs**; confirm no third-party frame restrictions, phishing redirects or broken destinations.
- Open and exit Full Screen on platforms that support it; browsers without Fullscreen support should simply retain the normal full-page game.
- Check source beta attribution; it must show the public game path without any learner's identity.
- Check save → reload → resume with two fictional/local test learners, without assuming browser-local data is server-authenticated.
- GitHub Actions green results and real-device/real-browser certification remain **unconfirmed**. No student identity synchronization is claimed.
