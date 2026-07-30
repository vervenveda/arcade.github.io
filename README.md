# Arcade™ — After Dark

A calm, local-first browser arcade within the **Verve N Veda** network.

Arcade™ brings together classic board games, word play, visual logic, creative experiments, trivia, action games, and simulations in a single searchable game hall. The current registry contains **58 verified cabinets**, organized into seven clear categories and designed to run as static HTML on GitHub Pages.

---

## Arcade Overview

- **58 playable game cabinets**
- **7 organized game categories**
- Search, sorting, category filters, and random selection
- Locally saved pinned favorites
- Daily featured cabinet
- Guided learning paths
- Responsive desktop, tablet, and mobile layout
- Reduced-motion support
- No accounts, analytics, advertisements, or external runtime services
- Static GitHub Pages deployment
- Vanilla HTML, CSS, and JavaScript

The landing page is:

```text
index.html
```

All game links are relative to the Arcade repository root.

---

## Game Categories

### Strategy Table

Board games, number grids, tactical planning, and deliberate two-player thinking.

| Game | File |
|---|---|
| Backgammon | `Backgammon_index.html` |
| Checkers Variant Lab | `Checkers_Variant_Lab_index.html` |
| Chess Studio | `Chess_Studio_index.html` |
| Jenny's Sudoku | `Jenny's_Sudoku_index.html` |
| Orion's Connect Four | `Orions_connect_four_index.html` |
| SixbySix | `SixbySix_index.html` |
| Tic-Tac-Toe | `Tictactoe_index.html` |

### Word & Language

Vocabulary, spelling, English-language practice, and approachable word play.

| Game | File |
|---|---|
| Hangman | `Hangman_index.html` |
| Learn a New Word | `Learn_a_New_Word_index.html` |
| ESL Trivia | `Trivia_ESL_index.html` |

### Visual Logic & Puzzles

Color, signal, rune, maze, attention, and pattern-recognition challenges.

| Game | File |
|---|---|
| AffixSix™ | `AffixSix™_index.html` |
| Chromatic Focus | `a_chromatic_focus_game_index.html` |
| Color Clash | `a_color_clash_game_index.html` |
| Colorshift Cascade | `a_colorshift_cascade_game_index.html` |
| Haystack Escape | `a_haystack_escape_game_index.html` |
| Lumin Gate | `a_lumin_gate_game_index.html` |
| Signal Garden | `a_signal_garden_game_index.html` |

### Creative & Contemplative

Creature design, story prompts, gardens, mandalas, and geometric studios.

| Game | File |
|---|---|
| Critter Crafter | `a_critter_crafter_game_index.html` |
| Geometry Sanctuary | `a_geometry_sanctuary_game_index.html` |
| Mandala Rings | `a_mandala_rings_game_index.html` |
| Mind Garden | `a_mind_garden_game_index.html` |
| Quantum Storyseed Orb | `a_quantum_storyseed_orb_game_index.html` |
| Sacred Geometry Sanctuary | `a_sacred_geometry_game_index.html` |

### Trivia & Knowledge

Arts, history, civics, health, faith, music, news, languages, and unusual facts.

| Game | File |
|---|---|
| Sovereign Arts Trivia | `Trivia_Soveriegn_arts_index.html` |
| Ancients Trivia | `Trivia_ancients_index.html` |
| Arts Trivia | `Trivia_arts_index.html` |
| Bible Trivia | `Trivia_bible_index.html` |
| Canon Trivia | `Trivia_canon_index.html` |
| Civic Compass Trivia | `Trivia_civic_Compass_inndex.html` |
| The Verifier Daily News Quiz | `Trivia_daily_news_index.html` |
| Health Trivia | `Trivia_health_index.html` |
| Lawn Care Trivia | `Trivia_lawn_care_index.html` |
| Mini IQ Trivia | `Trivia_mini_IQ_index.html` |
| Music Trivia | `Trivia_music_index.html` |
| Oddball Trivia | `Trivia_oddball_index.html` |
| Remnant Nations Trivia | `Trivia_remnenat_nations_index.html` |
| The Testament Trivia | `Trivia_testament_index.html` |
| The Testament Trivia — Kids | `Trivia_testament_kids_index.html` |

### Action & Simulation

Sports, balloons, lawn care, quick cabinets, and hands-on simulation play.

| Game | File |
|---|---|
| Pocket Arcade | `Pocket_Arcade_index.htm` |
| Balloon Brigade | `a_balloon_brigade_game_index.html` |
| Stadium Showdown | `a_statium_showdown_game_index.html` |
| Thyme to Mow | `a_thyme_to_mow_game_index.html` |


### Sanctuary Play

Gentle creative, reflective, and restorative experiences connected from Aurora Sanctuary.

The Arcade landing page presents these experiences as connected public cabinets while preserving their original Aurora locations and identities.


---

## Landing Page Features

### Grouped Game Shelves

The full library is separated into visible category shelves. Each shelf includes:

- Category title
- Short description
- Cabinet count
- Matching game cards
- Direct game launch buttons

### Search and Filtering

Players can search by:

- Game title
- Category
- Skill
- Theme
- Description
- Subject

The library can also be sorted by:

- Registry order
- Title A–Z
- Title Z–A
- Category

### Pinned Cabinets

Each game card includes a local favorite control.

Pinned game IDs are stored under:

```text
arcade_pinned_cabinets_v2
```

Pinned games appear in the **Pinned Cabinets** shelf at the top of the page.

### Cabinet of the Day

A featured game is selected automatically from the registry according to the current date. No manual daily homepage update is required.

### Learning Paths

The landing page currently includes guided trails for:

- Strategy Initiation
- Word Builder
- Visual Logic Circuit
- Creative Conservatory
- Knowledge Expedition
- Action Run

### Mobile Navigation

The header collapses into a mobile menu with direct access to:

- Pinned Cabinets
- Game Categories
- Game Library
- Cabinet of the Day
- Learning Paths
- Future Rooms
- Kids & Families

---

## Design System

Arcade™ uses a restrained **After Dark** visual identity.

### Core Style

- Dark charcoal and blue-black background
- Restrained cyan, violet, rose, amber, and mint accents
- Low-intensity neon glow
- Clean cabinet-style cards
- Square controls with a `7px` radius
- Minimal animation
- Strong focus visibility
- Comfortable contrast
- Equal-height game cards

### Typography

The current font stack favors lightweight system fonts:

```css
--display:
  "Avenir Next Condensed",
  "Brandon Grotesque",
  "Helvetica Neue",
  "Arial Narrow",
  "Trebuchet MS",
  sans-serif;

--sans:
  "Avenir Next",
  "Helvetica Neue",
  "Trebuchet MS",
  Verdana,
  "Segoe UI",
  sans-serif;
```

The project uses:

```css
--weight-text: 333;
--weight-emphasis: 444;
```

Preferred spacing and size values:

```text
3 · 7 · 11 · 14 · 24 · 33 · 55 · 66
```

The current landing-page type scale was increased by **2px** from the prior version.

---

## Local-First Architecture

Arcade™ is designed to remain independent and portable.

The landing page uses:

- Vanilla HTML
- Vanilla CSS
- Vanilla JavaScript
- `localStorage` for pinned games
- Relative repository links
- No build process
- No third-party framework
- No external JavaScript package
- No external font dependency
- No analytics
- No account system
- No remote database

Individual games may maintain their own local save keys.

---

## Repository Structure

A simplified repository structure may look like:

```text
arcade.github.io/
├── index.html
├── README.md
├── AffixSix™_index.html
├── Backgammon_index.html
├── Checkers_Variant_Lab_index.html
├── Chess_Studio_index.html
├── ...
├── a_signal_garden_game_index.html
├── a_statium_showdown_game_index.html
└── a_thyme_to_mow_game_index.html
```

All game files should remain in the same directory as `index.html` unless their registry paths are updated.

---

## Running Locally

Because Arcade™ is static, it can be opened directly in a browser. A local web server is recommended for the most reliable behavior.

### Python

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

### Node.js

```bash
npx serve .
```

No compilation step is required.

---

## GitHub Pages Deployment

1. Place `index.html`, `README.md`, and all game files in the repository root.
2. Open the repository settings.
3. Open **Pages**.
4. Select the `main` branch and repository root.
5. Save the Pages configuration.
6. Confirm that every relative game URL loads with the exact filename shown in the registry.

Because GitHub Pages paths are case-sensitive, capitalization, punctuation, spaces, apostrophes, symbols, and file extensions must be preserved exactly.

---

## Filename Notes

Several existing filenames contain historical spelling or extension differences. These names are intentionally preserved because changing them without renaming the actual repository files would break the buttons.

Examples include:

```text
Pocket_Arcade_index.htm
Trivia_Soveriegn_arts_index.html
Trivia_civic_Compass_inndex.html
Trivia_remnenat_nations_index.html
a_statium_showdown_game_index.html
```

Visible game titles may be corrected for readers while the underlying filename remains unchanged.

---

## Adding a New Game

Add the new HTML file to the repository, then add one object to the `games` registry in `index.html`.

```js
{
  id: "unique-game-id",
  title: "Game Title",
  file: "game_file_index.html",
  category: "puzzle",
  icon: "🧩",
  tags: "logic pattern puzzle",
  description: "A short description of the game."
}
```

Valid category IDs are:

```text
strategy
word
puzzle
creative
trivia
action
```

After adding a game:

1. Confirm the file exists with the exact same spelling.
2. Confirm the game ID is unique.
3. Add it to a learning path when appropriate.
4. Test search and category filtering.
5. Test the launch button.
6. Test pinning and unpinning.
7. Test mobile layout.
8. Update the game count in this README.

---

## Link Verification Checklist

Before publishing a landing-page update:

- [ ] Every registry filename exists in the repository
- [ ] No game file appears more than once
- [ ] Every game ID is unique
- [ ] Every game has a valid category
- [ ] Every launch button opens the intended game
- [ ] `.htm` and `.html` extensions are preserved correctly
- [ ] Apostrophes and trademark symbols are preserved
- [ ] Capitalization matches the repository
- [ ] Pinned Cabinets still load
- [ ] Search and sorting still work
- [ ] Mobile menu opens and closes
- [ ] Keyboard focus is visible
- [ ] JavaScript passes a syntax check
- [ ] No unintended external dependency was added

---

## Accessibility

The Arcade landing page includes:

- Semantic headings and sections
- Keyboard-accessible controls
- Visible `:focus-visible` outlines
- A skip link to the game library
- Search and filter labels
- Accessible pin-button labels
- Reduced-motion support
- Responsive controls
- Clear text contrast
- Status messages for search results and pin actions

Each individual game should provide comparable keyboard, touch, focus, motion, and screen-reader support.

---

## Connected Verve N Veda Network

The Arcade landing page includes internal routes to related Verve N Veda destinations, including:

- Verve N Veda
- Khaemenes Academy
- ARSHIF Archives
- Solanar
- The Verifier
- River to Road
- One Nation For All
- The Refrain
- Preschool

These are internal network destinations and should remain relative whenever the repository arrangement permits.

---

## Privacy

Arcade™ does not require a player account.

The landing page does not intentionally collect or transmit:

- Names
- Email addresses
- Location
- Usage analytics
- Advertising identifiers
- Game progress to a remote server

Pinned cabinets and game saves remain in the browser's local storage unless a player exports them from an individual game.

---

## Project Direction

Future Arcade development may include:

- Puzzle Palace
- World Arcade
- STEM Zone
- Music Hall
- Builder's Corner
- Hall of Achievement
- Additional accessible multiplayer modes
- Shared game design templates
- Expanded family and classroom pathways

---

## Credits

**Arcade™ — After Dark**  
Created within the Verve N Veda network.

Founder and creative direction: **Jennifer Kay Pearl**

Part of the wider work of:

- Inner National Corporation
- Rhaine Forest LLC
- Bazaar Art LLC

---

## License and Use

Review the repository's license file before redistributing or adapting project materials.

Game titles, project names, original interfaces, written content, and custom systems may carry separate ownership or trademark considerations.

---

## Current Registry Status

```text
Verified cabinets: 42
Categories: 6
Missing registry files: 0
Duplicate registry files: 0
External runtime dependencies: 0
Landing page: index.html
```
