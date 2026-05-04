# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Fun Search by United SAR K9** — scoring app for K9 SAR dog competitions. Optimized for outdoor/forest use with large touch targets for judges wearing gloves. All UI text is Thai (ภาษาไทย).

**Stack:** Pure HTML5/CSS3/vanilla JS. No build step, dependencies, or backend. Data lives in LocalStorage.

**Deployment:** Vercel (https://k9-fun-search.vercel.app), auto-deploys on push to main.

## Running

```bash
python3 -m http.server 8000          # Dev server
vercel --yes --prod                   # Deploy production
```

No build, test, or lint commands exist.

## Critical Design Decisions

- **Dog-centric, not team-centric.** There are NO "teams". Dogs are the primary entity. Scores reference `dogId`. CSS classes and variable names still use "team" in places (legacy) — don't be confused by this.
- **Thai language only.** All user-facing text is Thai. No i18n system.
- **20 dog limit** hardcoded in `handleRegistration()`.
- **Real-time scoring.** `calculateLiveScore()` is the single source of truth for score computation. It fires on every input change (VP toggles, grade selects, attire/bonus checkboxes) and updates both the inline score card and the sticky score bar.

## Architecture

Three files, no imports between them:
- `index.html` — Single-page layout with hybrid navigation
- `script.js` — All application logic (global scope, no modules)
- `styles.css` — All styling, CSS variables for theming at `:root`

### Navigation (Hybrid)

Two systems coexist:
1. **Tab-based** (`showTab()`) — switches between Register (`#register-tab`) and Judge (`#judge-tab`) via CSS `.active` class
2. **Non-tab** — Leaderboard (`.dashboard-section`) uses `scrollToLeaderboard()` (smooth scroll, not a tab); Settings uses `toggleSettings()` (modal overlay)

Mobile bottom nav (<768px) mirrors the desktop top nav but is CSS-only (`display: flex` in media query).

### Data Model (LocalStorage)

| Key | Contents |
|---|---|
| `k9_dogs` | Array of registered dogs (`id`, `dogName`, `dogBreed`, `handlerName`, `registeredAt`) |
| `k9_scores` | Array of score records (`id`, `dogId`, `vpDetails`, `vpScore`, `attireScore`, `bonusScore`, `totalScore`, `timeInSeconds`, `notes`, `scoredAt`) |
| `k9_settings` | Scoring config (VP points, grade percentages, attire/bonus values) |

Each score record copies `dogName`/`dogBreed`/`handlerName` from the dog at save time (denormalized for display). `vpDetails` is an object keyed 1-3 with `{found, grade, score}` per victim.

### Scoring Algorithm (`calculateLiveScore`)

1. **VP Score**: For each VP where toggle is ON: `base_points × grade_percentage` (V=100%, SG=92%, G=84%, B=74%, M=0%)
2. **Attire Score**: `(required_items × attireRequired) + (bonus_items × attireBonus)`, capped at `attireMax` (default 10). Default required: shoes/shirt/pants (3 items). Default bonus: hat/gloves (2 items).
3. **Bonus Score**: Sum of checked bonus items (timing bonuses + behavior bonus).
4. **Total**: VP + attire + bonus.

### Key Function Map

- **Init**: `initializeApp()` → `setupEventListeners()` on DOMContentLoaded
- **Registration**: `handleRegistration()` → `saveDogs()` → `renderDogsList()`
- **Scoring flow**: `handleTeamSelect()` → timer controls → VP toggles → `calculateLiveScore()` → `saveScore()`
- **Leaderboard**: `renderLeaderboard()` sorts by total desc, then time asc. `editScore()` opens modal. `exportCSV()` includes UTF-8 BOM.
- **Settings**: `loadSettings()`/`saveSettings()`/`resetSettings()` — all persist to localStorage.
- **Demo**: `loadDemoData()` via 🎮 button — loads 5 dogs + 1 score with confirmation.

## Important Gotchas

- **Duplicate HTML elements**: The judge tab section in index.html contains duplicated markup (selector + judging panel appear twice — once inside `#judge-tab` and once nested within the judging panel itself). The outer one is the active one due to how the browser parses duplicate IDs. Clean this up carefully if touched.
- **Legacy "team" naming**: Many CSS classes and DOM IDs use "team" (`.team-card`, `#team-select`, `#team-count`, `#total-teams`). These refer to dogs — do not rename without updating all references.
- **`dogs` and `scores` must be declared at the top of script.js** before any functions that reference them.
- **Hard refresh required** after JS changes — browser caches aggressively. Use Ctrl+Shift+R.
- **One score per dog**: `updateDogSelect()` filters out dogs that already have scores from the dropdown.
