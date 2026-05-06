# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Fun Search by United SAR K9** — scoring app for K9 SAR dog competitions. Optimized for outdoor/forest use with large touch targets for judges wearing gloves. All UI text is Thai (ภาษาไทย).

**Stack:** React 19 + Vite 8 + TypeScript 6 + PWA (vite-plugin-pwa). Data lives in LocalStorage. Google Sheets for registration (read-only) and score sync (write via Apps Script proxy).

**Deployment:** Cloudflare Pages (`k9-fun-search.pages.dev`), auto-deploys on push to main. Vercel project exists but serves stale v1 — do not use for production.

**Event:** Fun Search by UNITED SAR K9 at TWD 2026 (Thailand Working Dog Championship), May 29-31, 2026, กองพันสุนัขทหารปากช่อง. 20 dogs max, 200 baht fee, 07:00-11:00.

## Running

```bash
npm run dev          # Vite dev server with HMR
npm run build        # tsc + vite build → dist/
npm run preview      # Preview production build locally
```

## Deployment

```bash
wrangler pages deploy dist --project-name k9-fun-search    # Deploy to Cloudflare Pages
```

Auto-deploys via Cloudflare GitHub integration on push to main.

## Critical Design Decisions

- **Dog-centric, not team-centric.** There are NO "teams". Dogs are the primary entity. Scores reference `dogId`. CSS classes and variable names still use "team" in places (legacy) — don't be confused by this.
- **Thai language only.** All user-facing text is Thai. No i18n system.
- **20 dog limit** hardcoded in registration (manual dogs only, sheet dogs are unlimited).
- **Real-time scoring.** Scoring context recalculates on every input change (VP toggles, grade selects, attire/bonus checkboxes) and updates both the inline score card and the sticky score bar.
- **Google Sheet read-only.** Registrations collected via Google Form → Google Sheet. The app reads via `/api/fetch-sheet` (Cloudflare Function). Never edit the sheet or form programmatically.
- **Offline-first PWA.** Service worker caches app shell. Sheet fetch and score sync use `NetworkOnly` strategy.

## Architecture

### Source Structure

```
src/
├── App.tsx                    # Root component with ErrorBoundary
├── main.tsx                   # React entry point
├── components/
│   ├── infographic/           # Event details panel
│   ├── judge/                 # Scoring interface
│   ├── layout/                # Header, DesktopNav, MobileNav
│   ├── leaderboard/           # Live rankings, export
│   ├── registration/          # Dog registration
│   ├── settings/              # Scoring config
│   └── shared/                # Toast, Confetti
├── context/
│   └── AppContext.tsx          # Global state (React Context)
├── hooks/                     # Custom hooks
├── styles/                    # CSS modules
├── types/                     # TypeScript type definitions
└── utils/                     # Helper functions
```

### Cloudflare Functions (`functions/api/`)

- `fetch-sheet.ts` — GET proxy to Google Sheets CSV export. CORS-enabled, 60s cache.
- `sync-scores.ts` — POST proxy to Google Apps Script. CORS-enabled.

### Data Model (LocalStorage)

| Key | Contents |
|---|---|
| `k9_dogs` | Array of manually registered dogs |
| `k9_scores` | Array of score records (denormalized with dog info) |
| `k9_settings` | Scoring config (VP points, grade percentages, attire/bonus values) |
| `k9_sheet_dogs` | Array of dogs from Google Sheet |
| `k9_sheet_last_fetch` | ISO timestamp of last CSV fetch |

### Scoring Algorithm

1. **VP Score**: For each VP where toggle is ON: `base_points × grade_percentage` (V=100%, SG=92%, G=84%, B=74%, M=0%)
2. **Attire Score**: Required items + bonus items, capped at max.
3. **Bonus Score**: Sum of checked bonus items (timing + behavior).
4. **Total**: VP + attire + bonus.

## Important Gotchas

- **Legacy "team" naming**: Many CSS classes and DOM IDs use "team" (`.team-card`, `#team-select`). These refer to dogs — do not rename without updating all references.
- **Hard refresh required** after JS changes — browser caches aggressively via PWA service worker.
- **One score per dog**: Scored dogs are filtered from the scoring dropdown.
- **Sheet sharing required**: Google Sheet must be "Anyone with the link can view" for CSV export to work.
- **Vercel deployment is stale**: Vercel serves the old v1 vanilla JS app. Use Cloudflare Pages for production.
