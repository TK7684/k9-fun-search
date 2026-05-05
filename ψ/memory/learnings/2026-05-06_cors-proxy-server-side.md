---
name: CORS proxy for Google endpoints
description: Google Sheets CSV and Apps Script web apps return 302 redirects that browsers can't follow cross-origin. Always use server-side proxy functions for browser apps calling Google endpoints.
type: reference
---

Google endpoints (docs.google.com CSV export, script.google.com Macros) return HTTP 302 redirects. Browsers follow the redirect but the redirect target may not have CORS headers, causing "Failed to fetch" errors. Python urllib works fine (no CORS) but browser fetch() fails.

**Solution**: Cloudflare Pages Functions (`functions/api/`) act as server-side proxy. The browser calls `/api/fetch-sheet` and `/api/sync-scores`, the proxy follows redirects and returns data with `Access-Control-Allow-Origin: *`.

**Files**: `functions/api/fetch-sheet.ts`, `functions/api/sync-scores.ts`
