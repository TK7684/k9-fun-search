# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Fun Search by United SAR K9** — scoring app for K9 SAR dog competitions. Optimized for outdoor/forest use with large touch targets for judges wearing gloves. All UI text is Thai (ภาษาไทย).

**Stack:** Pure HTML5/CSS3/vanilla JS. No build step, dependencies, or backend. Data lives in LocalStorage.

**Deployment:** Vercel (https://k9-fun-search.vercel.app), auto-deploys on push to main.

**Event:** Fun Search by UNITED SAR K9 at TWD 2026 (Thailand Working Dog Championship), May 29-31, 2026, กองพันสุนัขทหารปากช่อง. 20 dogs max, 200 baht fee, 07:00-11:00.

## Running

```bash
python3 -m http.server 8000          # Dev server
vercel --yes --prod                   # Deploy production
```

No build, test, or lint commands exist.

## Critical Design Decisions

- **Dog-centric, not team-centric.** There are NO "teams". Dogs are the primary entity. Scores reference `dogId`. CSS classes and variable names still use "team" in places (legacy) — don't be confused by this.
- **Thai language only.** All user-facing text is Thai. No i18n system.
- **20 dog limit** hardcoded in `handleRegistration()` (manual dogs only, sheet dogs are unlimited).
- **Real-time scoring.** `calculateLiveScore()` is the single source of truth for score computation. It fires on every input change (VP toggles, grade selects, attire/bonus checkboxes) and updates both the inline score card and the sticky score bar.
- **Google Sheet read-only.** Registrations are collected via Google Form → Google Sheet. The app reads the sheet via public CSV export URL. Sheet must be shared as "Anyone with the link can view". Never edit the sheet or form programmatically.

## Architecture

Four files, no imports between them:
- `index.html` — Single-page layout with hybrid navigation + collapsible infographic
- `script.js` — All application logic (global scope, no modules)
- `styles.css` — All styling, CSS variables for theming at `:root`
- `sw.js` — Service worker with cache bypass for docs.google.com

### Navigation (Hybrid)

Two systems coexist:
1. **Tab-based** (`showTab()`) — switches between Register (`#register-tab`) and Judge (`#judge-tab`) via CSS `.active` class
2. **Non-tab** — Leaderboard (`.dashboard-section`) uses `scrollToLeaderboard()` (smooth scroll, not a tab); Settings uses `toggleSettings()` (modal overlay); Infographic uses `toggleInfographic()` (collapsible section)

Mobile bottom nav (<768px) mirrors the desktop top nav but is CSS-only (`display: flex` in media query).

### Data Model (LocalStorage)

| Key | Contents |
|---|---|
| `k9_dogs` | Array of manually registered dogs (`id`, `dogName`, `dogBreed`, `handlerName`, `registeredAt`) |
| `k9_scores` | Array of score records (`id`, `dogId`, `vpDetails`, `vpScore`, `attireScore`, `bonusScore`, `totalScore`, `timeInSeconds`, `notes`, `scoredAt`) |
| `k9_settings` | Scoring config (VP points, grade percentages, attire/bonus values) |
| `k9_sheet_dogs` | Array of dogs from Google Sheet (same shape as dogs but with `source: 'sheet'`, `id: 'sheet-N'`, and `extra` object) |
| `k9_sheet_last_fetch` | ISO timestamp of last successful CSV fetch |

Each score record copies `dogName`/`dogBreed`/`handlerName` from the dog at save time (denormalized for display). `vpDetails` is an object keyed 1-3 with `{found, grade, score}` per victim.

### Google Sheet Integration

- **CSV URL**: `https://docs.google.com/spreadsheets/d/10_3_PGs8rFhM-ZFhuWLwJimes9qK_5_GtDp6ipVMp80/export?format=csv&gid=1978864481`
- **Sheet columns**: Timestamp, Email, Handler Name, Phone, LINE ID, Dog Name, Breed, Dog Age, Dog Sex, Health Confirmation, Consent, Liability, File Upload, Signature
- **Column mapping**: `parseCSV()` → `mapSheetRowToDog()` maps row[2]=handler, row[5]=dogName, row[6]=breed, etc.
- **Merge strategy**: `getMergedDogs()` returns sheet dogs + manual dogs, deduplicated by (dogName, handlerName). Sheet dogs take precedence.
- **Dog IDs**: Sheet dogs use `'sheet-' + rowIndex` (string), manual dogs use `Date.now()` (number). No collision possible.
- **Auto-refresh**: 5-minute interval via `startSheetAutoRefresh()`
- **Service worker**: `docs.google.com` and `scontent.fbkk8-2.fna.fbcdn.net` bypass cache (network-only)

### Scoring Algorithm (`calculateLiveScore`)

1. **VP Score**: For each VP where toggle is ON: `base_points × grade_percentage` (V=100%, SG=92%, G=84%, B=74%, M=0%)
2. **Attire Score**: `(required_items × attireRequired) + (bonus_items × attireBonus)`, capped at `attireMax` (default 10). Default required: shoes/shirt/pants (3 items). Default bonus: hat/gloves (2 items).
3. **Bonus Score**: Sum of checked bonus items (timing bonuses + behavior bonus).
4. **Total**: VP + attire + bonus.

### Key Function Map

- **Init**: `initializeApp()` → `loadCachedSheetData()` → `setupEventListeners()` → `fetchSheetData()` on DOMContentLoaded
- **Sheet data**: `fetchSheetData()` → `parseCSV()` → `mapSheetRowToDog()` → `sheetDogs` → `renderSheetDogs()` → `saveCachedSheetData()`
- **Registration**: `handleRegistration()` → `saveDogs()` → `renderDogsList()` (now renders merged list)
- **Scoring flow**: `handleTeamSelect()` → timer controls → VP toggles → `calculateLiveScore()` → `saveScore()` (looks up dog from `getMergedDogs()`)
- **Leaderboard**: `renderLeaderboard()` sorts by total desc, then time asc. `editScore()` opens modal. `exportCSV()` includes UTF-8 BOM.
- **Settings**: `loadSettings()`/`saveSettings()`/`resetSettings()` — all persist to localStorage.
- **Infographic**: `renderInfographic()` renders event details, `toggleInfographic()` opens/closes the collapsible section.
- **Demo**: `loadDemoData()` via 🎮 button — loads 5 dogs + 1 score with confirmation.

## Important Gotchas

- **Duplicate HTML elements**: The judge tab section in index.html contains duplicated markup (selector + judging panel appear twice — once inside `#judge-tab` and once nested within the judging panel itself). The outer one is the active one due to how the browser parses duplicate IDs. Clean this up carefully if touched.
- **Legacy "team" naming**: Many CSS classes and DOM IDs use "team" (`.team-card`, `#team-select`, `#team-count`, `#total-teams`). These refer to dogs — do not rename without updating all references.
- **`dogs`, `scores`, and `sheetDogs` must be declared at the top of script.js** before any functions that reference them.
- **Hard refresh required** after JS changes — browser caches aggressively. Use Ctrl+Shift+R.
- **One score per dog**: `updateDogSelect()` filters out dogs that already have scores from the dropdown. Works with both numeric IDs and `'sheet-N'` string IDs.
- **Sheet sharing required**: The Google Sheet must be set to "Anyone with the link can view" for CSV export to work. If the fetch returns HTML instead of CSV, the app shows an error message.
