---
name: Parallel Agent Migration Pattern
description: When migrating a large codebase, spawn parallel agents with non-overlapping file ownership. Write the orchestrator BEFORE agents, not after.
type: feedback
---

When spawning 4+ parallel agents for a codebase migration:
1. **Strict file ownership** — each agent gets exclusive directories (no overlap on utils/constants)
2. **Write orchestrator first** — App.tsx or root component should exist before agents start, defining the exact interface boundary (props vs context)
3. **Specify interface contracts explicitly** — don't say "read from context", say "your component takes NO props, reads X/Y/Z from useApp()"
4. **Verify runtime after build** — `tsc --noEmit` passing doesn't mean the app renders. Open the browser before pushing.

**Why:** 4 agents wrote 46 files with zero file conflicts, but the App.tsx wiring had 6 type errors from inconsistent prop/context assumptions. The fix took 5 min but the root cause was specification inconsistency.

**How to apply:** Before spawning agents, write the root component as a skeleton with typed interfaces. Give each agent the exact same interface spec.
