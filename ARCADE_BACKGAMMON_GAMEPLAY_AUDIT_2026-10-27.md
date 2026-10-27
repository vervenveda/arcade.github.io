# Backgammon gameplay audit and focused repairs

## Verified defects repaired

- No-move generation returned an empty sequence inside an array, leaving human turns stuck. It now returns no sequences and passes the turn.
- Declining a double awarded points but left the conceded game playable. It now ends the game, disables play, saves the result and prevents repeated finish scoring.
- Resuming a mid-turn save did not rebuild legal sequences. Resume now rebuilds them and restores pending doubling decisions.
- New games and Undo were not saved immediately. Both now persist; boot preserves an existing save until the resume decision.
- AI animation scheduled overlapping sequences and allowed delayed actions to cross game/mode changes. One generation-checked action now runs at a time.
- Invalid saves and blocked storage could break startup or restore malformed game data. Validation checks board dimensions, checker totals, dice, phases, settings, scores and cube shape before restoration.
- The hard AI hit bonus had its sign reversed. Outcome updates for pip, bar and blot weights also reinforced the wrong direction. Corrected their signs and validated stored AI profile values.

## Verification

15 deterministic source/DOM regression cases pass in `tests/backgammon-regression.cjs`, using jsdom in the test environment only. Run with `node tests/backgammon-regression.cjs` after installing jsdom in that environment, or provide it via NODE_PATH.

Cases cover opening checker counts and pip counts; blocked bar; bar priority and hits; higher-die enforcement; four moves for doubles; oversized bearing-off restrictions; decline scoring; single/gammon/backgammon scoring; mid-turn and pending-double resume; Undo/new-game persistence; invalid-save rejection; AI callback cancellation and sequencing; learning update direction; blocked-storage boot.

Existing arcade source and game-shell regressions also pass. Canvas drawing is stubbed in these tests: these results do not certify visual rendering, touch behavior or real-device accessibility.

## Learning assessment

The AI ranks legal turn sequences using a small local heuristic profile. It adjusts five weights after game outcomes and saves those weights in this browser. This is limited outcome-based adaptation, not a conversational model, autonomous self-play trainer or a demonstrated increase in playing strength. Existing valid storage keys and values are preserved.

## Remaining work

- Red always opens; standard opening dice competition is absent.
- Crawford match-play restrictions are absent.
- Canvas checker movement lacks a complete keyboard alternative.
- AI double decisions are rough heuristic thresholds, not calibrated match-equity calculations.
- Full browser/mobile play, saved-state journeys across reloads and live deployment remain unverified.

Rules reference: https://usbgf.org/backgammon-basics-how-to-play/ . This pass preserves the board artwork, page framing and utility dock and adds no runtime dependency.
