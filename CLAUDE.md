# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Fun Search by United SAR K9** is a standalone web application for scoring K9 search and rescue dog competitions. The app is optimized for outdoor/forest use with large buttons for judges wearing gloves. All UI text is in Thai (ภาษาไทย).

**Technology Stack:**
- Pure HTML5, CSS3, and vanilla JavaScript
- LocalStorage for data persistence
- No build process, dependencies, or backend
- Single-page scrolling layout (no tabs)
- Real-time auto-calculation as inputs change
- Mobile-first responsive design

**Critical Design Decision:**
The app is **dog-centric, not team-centric**. Each dog has its own scores and handler. There are NO "teams" - dogs are the primary entity.

## Running the Application

```bash
# Start local development server
python3 -m http.server 8000
# Then open http://localhost:8000

# Alternative port
python3 -m http.server 3000
```

**No build, test, or lint commands exist** - this is a static web app with no compilation step.

## Architecture

### Data Model (Dog-Centric)

The application manages **two** main data structures stored in LocalStorage:

1. **Dogs** (`k9_dogs`): Array of registered dogs
   - `id`: Timestamp-based unique identifier
   - `dogName`, `dogBreed`, `handlerName`: Dog and handler information
   - `registeredAt`: ISO timestamp
   - **Maximum 20 dogs** (hardcoded limit)

2. **Scores** (`k9_scores`): Array of completed score records
   - `id`: Timestamp-based unique identifier
   - `dogId`: Reference to dog (NOT teamId - there are no teams)
   - `dogName`, `dogBreed`, `handlerName`: Copied from dog for display
   - `vpDetails`: Object with keys 1, 2, 3 for each victim
     - Each VP has: `found` (boolean), `grade` ('V','SG','G','B','M'), `score` (number)
   - `vpScore`, `attireScore`, `bonusScore`: Calculated totals
   - `totalScore`: Sum of all scores
   - `timeInSeconds`: Completion time
   - `notes`: Optional text
   - `scoredAt`: ISO timestamp

3. **Settings** (`k9_settings`): Competition configuration
   - VP points: `vp1Points` (default 20), `vp2Points` (30), `vp3Points` (40)
   - Grade percentages: `gradeV` (100), `gradeSG` (92), `gradeG` (84), `gradeB` (74), `gradeM` (0)
   - Attire: `attireRequired` (2), `attireBonus` (2), `attireMax` (10)
   - Bonus: `bonusVp1` (10), `bonusVp2` (10), `bonusAll` (10), `bonusDown` (5)

### Layout Structure

**Single-page scrolling app** - NOT tab-based:

1. **Scoring Section** (`#scoring-section`): Always visible at top
   - Dog selector dropdown (populated from registered dogs)
   - Timer controls
   - VP scoring cards with toggle switches
   - Attire and bonus checklists
   - Live score display (updates in real-time)
   - Save/Cancel buttons

2. **Dashboard Section** (`.dashboard-section`): Leaderboard
   - Shows all dogs with their scores
   - Sorted by total score (descending), then time (ascending)
   - Edit/delete buttons
   - Export CSV button

3. **Registration Section** (`.registration-section`): Collapsible
   - Click header to expand/collapse
   - Form to register new dogs
   - List of registered dogs
   - Hidden by default (collapsed state)

4. **Settings Modal** (`#settings-modal`): Opens in modal window
   - Click ⚙️ button in header to open
   - All scoring configuration options

### Key Functions

**Initialization:**
- `initializeApp()`: Main setup, called on DOMContentLoaded
- `setupEventListeners()`: Attaches all event handlers

**Dog Management:**
- `handleRegistration(e)`: Form submission, creates dog object, enforces 20-dog limit
- `renderDogsList()`: Displays registered dogs as cards
- `deleteDog(id)`: Removes dog with confirmation
- `updateDogSelect()`: Populates dropdown, filters out dogs that already have scores
- `saveDogs()`: Persists to localStorage

**Scoring System (Real-Time):**
- `handleTeamSelect()`: Shows/hides judging panel when dog selected
- `startTimer()`, `pauseTimer()`, `resetTimer()`: Timer controls
- `handleVPChange(e)`: When VP toggle changes - adds/removes green highlight
- `calculateLiveScore()`: **CRITICAL** - Called on EVERY input change, updates score displays instantly
- `saveScore()`: Creates score record, saves to localStorage
- `cancelScoring()`: Closes judging panel, resets form

**Leaderboard:**
- `renderLeaderboard()`: Sorts and displays all scores with medals for top 3
- `deleteScore(id)`: Removes score with confirmation
- `editScore(id)`: Opens modal with score for editing
- `saveEditedScore()`: Updates score in array and localStorage
- `exportCSV()`: Downloads CSV with UTF-8 BOM for Excel

**Settings:**
- `loadSettings()`: Populates settings modal from localStorage
- `saveSettings()`: Saves all settings values
- `resetSettings()`: Restores defaults

**Demo Data:**
- `loadDemoData()`: Loads 5 sample dogs and 3 sample scores
- `demoDogs`, `demoScores`: Constants containing sample data
- Triggered by clicking 🎮 button in header

**UI Utilities:**
- `toggleRegistration()`: Expands/collapses registration section
- `toggleSettings()`: Opens/closes settings modal
- `showToast(message, type)`: Displays notification (slides in, auto-dismisses after 3s)
- `startConfetti()`: Creates 50 colorful falling confetti pieces
- `updateHeaderStats()`: Updates dog count and completed count in header

### Scoring Algorithm

`calculateLiveScore()` implements real-time scoring:

1. **VP Score**: Σ(VP_base_points × grade_percentage) for each VP where toggle is ON
   - Grade percentages from settings: V=100%, SG=92%, G=84%, B=74%, M=0%
   
2. **Attire Score**: (required_items × 2) + (bonus_items × 2), capped at max (default 10)
   - Required: shoes, shirt, pants (3 items × 2 = 6 points)
   - Bonus: hat, gloves (2 items × 2 = 4 points)
   
3. **Bonus Score**: Σ checked bonus items
   - Timing bonuses and behavior bonus from settings
   
4. **Total**: VP_score + attire_score + bonus_score

**Real-Time Updates:**
`calculateLiveScore()` is bound to:
- All VP toggle switches
- All grade dropdowns
- All attire checkboxes
- All bonus checkboxes
This ensures score updates **instantly** on any user interaction.

### Important UI Patterns

**Toggle Switches for Binary States:**
- VP found/not found uses custom CSS toggles (65×34px)
- Large for outdoor/glove use
- Green highlight appears on VP card when toggled ON

**Sticky Score Bar:**
- Lives at top of judging panel when active
- Shows live breakdown: Total, VP (🎯), Attire (👕), Bonus (🎁)
- Updates via `calculateLiveScore()`

**Visual Feedback:**
- VP cards turn green when found
- Confetti animation on: page load, registration, score save, demo load
- Toast notifications for all actions
- Pulse animation on demo button

**Grades Displayed as Stars:**
- V = ⭐⭐⭐⭐⭐ (96-100%)
- SG = ⭐⭐⭐⭐ (90-95%)
- G = ⭐⭐⭐ (80-89%)
- B = ⭐⭐ (70-79%)
- M = ⭐ (<70%)

### Critical Constraints

- **Dog Limit**: Hardcoded to 20 dogs maximum (can be changed in code)
- **No Backend**: All data in LocalStorage (browser-specific, ephemeral)
- **No Validation**: Minimal input validation beyond required fields
- **Manual Backup Required**: Users MUST export CSV regularly for data persistence
- **Thai Language Only**: All UI text is Thai, no i18n system
- **Variable Declaration Order**: `dogs` and `scores` must be declared BEFORE functions that reference them
- **No Real-Time Sync**: Each browser/device has its own local data

### Key File Sections

**script.js structure:**
- Lines 1-4: Data storage variables (CRITICAL - must be first)
- Lines 10-47: Demo data constants (`demoDogs`, `demoScores`)
- Lines 49-62: `loadDemoData()` function
- Lines 134-141: `initializeApp()` function
- Line 149: `calculateLiveScore()` - real-time score calculator
- Line 210: `handleRegistration()` - dog registration
- Line 268: `saveScore()` - creates score records

**index.html structure:**
- Lines 15-43: Header with stats and demo/settings buttons
- Lines 47-163: Scoring section (always visible)
- Lines 165-177: Dashboard/leaderboard section
- Lines 179-218: Registration section (collapsible)
- Lines 220-251: Settings modal
- Lines 253-268: Edit score modal
- Line 269: Script tag loads script.js

**styles.css structure:**
- Lines 1-31: CSS variables for theming
- Lines 44-64: Confetti animation
- Lines 66-131: Container, header, stats
- Lines 167-235: Main content and sections
- Lines 300-450: Form inputs, buttons, cards
- Lines 495-540: Timer card
- Lines 548-620: VP cards with toggles
- Lines 622-720: Checklists
- Lines 722-743: Live score card
- Lines 970-1020: Leaderboard display

## Common Development Tasks

### Adding a New Scoring Rule

1. Add input fields in settings modal (index.html lines 410-452)
2. Add default to settings object (script.js lines 5-22)
3. Update `calculateLiveScore()` to use new setting (script.js line 149)
4. If needed, update `saveSettings()` to persist new field

### Loading Demo Data

Click the 🎮 button (orange pulsing button) in the header stats area. This:
- Loads 5 sample dogs
- Loads 3 sample scores
- Triggers confetti celebration
- Requires user confirmation if data already exists

### Modifying the Score Calculation

The ONLY function that calculates scores is `calculateLiveScore()` (script.js line 149). This function:
- Reads current form state (VP toggles, grades, checkboxes)
- Applies settings multipliers
- Updates both regular and sticky score displays
- Called automatically on ANY input change

### Changing Data Persistence

To switch from LocalStorage:
- Replace all `localStorage` calls in `saveDogs()` and `saveScores()`
- Update initialization in `initializeApp()`
- Ensure data format compatibility if changing schema

### Working with the Dog Model

**Remember: NO TEAMS exist** - everything is dog-centric.
- Dogs are registered with: dogName, dogBreed, handlerName
- Scores reference `dogId` (NOT teamId)
- Leaderboard shows individual dogs ranked
- When editing/deleting, always think in terms of dogs

### Mobile Development

**Key Responsive Breakpoints:**
- Extra small: <380px
- Mobile: <768px (stacked layouts, larger touch targets)
- Tablet: <1024px (single column grids)

**Touch Target Sizes (for outdoor/glove use):**
- Primary action buttons: 70px height
- Mobile buttons: minimum 48px height
- Toggle switches: 65×34px
- Checkboxes: 26×26px
- All interactive elements designed for use with gloves

## File Structure

```
/
├── index.html       # Single-page HTML (~487 lines)
├── script.js        # All application logic (~881 lines)
├── styles.css       # All styling (~1561 lines)
├── README.md        # Thai-language user documentation
└── CLAUDE.md        # This file
```

**No additional config files, package managers, or build tools.**

## Important Gotchas

1. **Duplicate Functions**: When adding new functions, ensure they're not declared twice (JavaScript will use the last one)
2. **Demo Data Conflicts**: Old demo data with "teams" may still exist - always use the one with "dogs"
3. **Hard Refresh Required**: Browser cache may serve old JavaScript - always use Ctrl+Shift+R after changes
4. **localStorage Keys**: Use `k9_dogs` NOT `k9_teams` - old key name may still exist in code comments
5. **Function Name Updates**: Many functions renamed from "team" to "dog" - ensure all references updated
6. **No Tab Navigation**: App is now single-page scrolling - `showTab()` function was removed
7. **Settings in Modal**: Settings is now a modal, not a tab - accessed via toggleSettings()
