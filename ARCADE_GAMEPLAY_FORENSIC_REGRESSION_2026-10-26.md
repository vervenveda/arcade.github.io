# Arcade gameplay forensic regression — 2026-10-26

## Scope and invariants
Branch: `main`. This pass examined eight representative in-repository Arcade games: Chess Studio, Orion's Connect Four, Jenny's Sudoku, Pattern Pirates, Bubble Pop, ABC Bubble Adventure, SixbySix, and AffixSix. No official Khaemenes Academy mastery code or grade records were modified. Changes were surgical; the core game mechanics and individual themes remain their own.

## Source-confirmed defects repaired

1. **Pattern Pirates invalid HTML and copied conversation content.** Original file contained two complete `<!doctype html>` documents separated by pasted conversation text, with two game initializers. Retained the newer standalone tutorial version, preserved local game saves, and rendered user-entered save names with `textContent` instead of unsafe `innerHTML`. Added an Arcade catalog return link.
2. **Bubble Pop timed challenge.** `startTimer()` set the active flag and then invoked `resetGame()`, which called `stopTimer()`. Timed mode now resets first, enables the 60-second timer second, and starts one countdown. Ordinary Start remains untimed.
3. **Chess Studio stale AI callbacks.** Delayed AI moves could act on a reset, undone, or loaded position. Versioned AI callback cancellation now protects these boundaries, and choosing AI White at the start activates the AI as appropriate. Save loads validate the board representation before overwriting the current board. Chess squares are keyboard-accessible buttons, with a smaller screen-width board calculation.
4. **Orion's Connect Four stale AI callbacks.** Three raw delayed calls could outlive a reset or mode change. A guarded scheduler cancels these calls on reset and requires a valid AI turn and active Hybrid mode.
5. **Sudoku corrupt resume state.** Browser-saved grid data was parsed and placed into gameplay without schema or clue checks. Save restoration now checks 9×9 integer grids, completed-solution structure, fixed clue correspondence, and diagonal constraints for Advanced mode. Keyboard shortcuts no longer intercept unrelated focused inputs.
6. **ABC Bubble Adventure mouse-only input and animation lifetime.** Bubbles are now keyboard-activatable buttons with accessible letter labels. The target/status message announces changes. Detached bubbles' animation frames stop without incorrectly respawning targets.
7. **Pattern Pirates impossible puzzle and double round increment.** Earlier random goal pairs could be absent from the board altogether. Objectives now follow a generated walk along actual adjacent board tiles, and a reshuffle constructs a fresh reachable route. Completed rounds advance exactly once, and pending round transitions are cancellable.

## Verification performed
- All eight current source files have **one document root** and parseable inline JavaScript.
- `Pattern Pirates`: **125/125** generated hard-mode map sequences had at least one valid adjacent sequence through the test board under an independent route simulation.
- `Bubble Pop`: timed-mode isolated-function simulation showed active=true, 60 seconds initially, two expected intervals (spawn + countdown), and 59 seconds after one countdown callback.
- `Sudoku`: the isolated save validator accepted a well-formed ordinary sample, rejected a malformed grid, and rejects altered fixed clues in the added regression suite.
- The previous pass found all **71/71** registry target files in their referenced GitHub source repositories (source presence, **not** browser gameplay).
- New file `tests/arcade-game-regression.mjs` adds eight-file document/JavaScript checks, Sudoku save cases, 100 generated Pattern Pirates route trials, and source guard assertions. The `main` workflow now runs it after the existing catalog test.

## Important certification boundary
The connected repository supports code inspection and commits but does not itself provide an interactive browser session. A completed GitHub Actions run has not been confirmed. Therefore **do not claim** full gameplay, device, screen-reader, multi-learner, offline, or privacy certification.

Next in-browser regression: Chess Studio (AI White/Black, undo during AI wait, save → reload), Orion (correct/wrong/time-out math answer → drop → reset), Sudoku (new/complete/undo/corrupt saved data), Bubble Pop (start, timed countdown, pause/resume, completion), ABC Bubble Adventure (mouse/touch/keyboard), Pattern Pirates (tutorial, 5+ routes, local save/load/shuffle, powerups). Use fictional/local recreational records only and verify no cross-effect on Academy official mastery.
