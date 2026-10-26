# Checkers Variant Lab audit and focused repairs

Audited main at 8bfc32aaaa5243b88d2290c073350913e132edd8.

## Repaired

- Evaluate the next player when checking blocked positions; correctly award Giveaway wins to the side with no pieces or moves.
- Use terminal win/loss scores in AI search, including at the search horizon.
- Invalidate delayed AI work on new games, resets, mode/side changes and Undo. Reset starts the AI when the human plays Black.
- Russian capture choice no longer requires the maximum number of captures; promotion during a capture remains a king after the move.
- International men do not acquire flying-king movement midway through a capture. Previously captured squares obstruct capture paths until the sequence ends.
- Separate learned board values by board size, variant and rule flags. Use v2 storage; old v1 data is left untouched but is not reused because its ruleset cannot be recovered reliably.
- Undo restores pending learning and reverses outcome updates when undoing a completed game. Validate stored learning entries before using them.
- Rule changes start a fresh game, preventing mixed-rule training and history.
- Add keyboard activation and square/piece names. Label the controls honestly: difficulty profiles and AI move preview, not literal depth or a guaranteed best line.

## Learning assessment

The engine uses minimax/alpha-beta plus a local table of board-position outcomes. Each completed game moves visited positions' values toward its result. This is limited, genuine outcome-based adaptation, not conversational intelligence or autonomous self-training. Level 2 intentionally ignores the learned value; levels 3–5 use increasing weight. Learning remains browser-local. No external AI service or new runtime dependency was added.

## Verification

`tests/checkers-regression.cjs` exercises the real inline source in jsdom with controlled board states and queued AI callbacks. Install jsdom in a test environment and run `node tests/checkers-regression.cjs` (or provide it through NODE_PATH).

Passing cases cover opening setup, mandatory multi-capture, American crowning, blocked-player endings, Giveaway, Russian and International promotion, captured-square obstruction, pending and completed-game Undo, ruleset separation, AI reset/cancellation, terminal search scoring, keyboard moves and rule-change reset.

Existing `tests/arcade-game-regression.mjs` and `tests/arcade-game-shell-regression.mjs` also pass. These are source/DOM simulations, not real-device or visual certification.

## Remaining limitations

- Automatic repetition and variant-specific move-count draw adjudication is not implemented.
- Different capture routes sharing the same final square still use the first generated route; an explicit route chooser needs a dedicated UI change.
- Mobile layout and real-browser assistive technology behavior remain unverified.
- Local storage failure still falls back silently to memory; cross-tab learning updates are not synchronized.

Official rule references used: https://fmjd64.org/rules-of-the-game/ and https://www.fmjd.org/downloads/news/948/Annex%201%20official%20FMJD%20rules%20of%20international%20draughts.pdf . Custom toggles remain a variant laboratory, not tournament certification.
