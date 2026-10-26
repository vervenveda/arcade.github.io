# Arcade landing-page certification · 01 · Backgammon
Date: 2026-10-26
Branch: `main` · Scope: `Backgammon_index.html` only.

## Pre-audit source findings
1. A manually embedded Verve N Veda ecosystem strip created a second top navigation layer, unlike the newly approved single-header Arcade layout.
2. The page did not load `assets/arcade-game-shell.js`; the beta/support ecosystem scripts could add separate controls.
3. Desktop grid columns were `var(--B) minmax(260px,1fr)` inside a narrower maximum-width wrapper, creating horizontal overflow at some desktop widths.
4. The canvas used a fixed derived CSS width and height rather than preserving its original 1000:720 aspect ratio with container-aware sizing.
5. Modal decisions lacked properly attached accessible title/description, initial focus, focus trapping, and a clear mobile full-viewport presentation.

## Repairs committed
- Kept Backgammon as a standalone full-page destination. Removed only the duplicate top ecosystem strip.
- Installed the same unified Arcade lower-right utility dock, with Back to Arcade and fullscreen controls inside the dock, not a separate top header.
- Preserved all four public utility destinations: Academy Profile, Beta, Support and PLERA Search.
- Changed page framing to the Arcade's refined dark palette without changing the beige board artwork, checker rules, dice generation, scoring, AI or match settings.
- Repaired desktop grid and proportional canvas scaling while retaining 1000x720 backing resolution and existing pointer-to-canvas coordinate transformation.
- Made dialog backdrops viewport-sized and cards responsive; on narrow phones the dialog card occupies the screen. Added accessible title/description and keyboard focus control. Escape may dismiss optional Cancel/Close decisions but cannot bypass a mandatory doubling-cube choice.
- Hid the new dock while the native game's decision overlay is open; preserved the game-specific buttons.
- Left storage keys `bg_premium_free_v1` and `bg_ai_profile_v1` and scoring/game state structures unchanged.

## Checks and boundaries
- Source has a single HTML document, one game script, and one `./assets/arcade-game-shell.js` loader.
- Main inline game script parses successfully.
- No manually embedded `.vnv-global-strip` remains.
- `tests/arcade-game-shell-regression.mjs` now includes Backgammon and tests its single-header, responsive board, dialog and shared dock invariants; this expands the rollout from 14 to **15** pages.
- **Upstream automation can reinsert the legacy `/assets/vnv-beta-link.js` loader.** The Backgammon-local CSS and shared dock suppress its extra visible control, but the upstream injector remains outside this change.
- GitHub Actions completion, full real-browser gameplay, keyboard-only move selection, phone rendering, and save/reload certification remain unconfirmed. Source checks are not a substitute for student beta testing.

## Next catalog landing page
`Checkers_Variant_Lab_index.html` (catalog position 02). Keep the same one-at-a-time source audit, repairs, code verification and beta evidence boundaries.
