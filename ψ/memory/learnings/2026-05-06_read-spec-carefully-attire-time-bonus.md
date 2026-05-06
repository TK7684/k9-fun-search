---
name: Read scoring specs literally — every point value is scored
description: When a scoring specification says "Category: 10 points", it means 10 points are scored for that category. Don't assume it's "just a requirement check" or replace manual checkboxes with automatic calculations without explicit confirmation.
type: feedback
---

When implementing scoring/grading systems, read the specification literally. If it says "การแต่งกาย (10 คะแนน)" — that's 10 scored points, not a visual-only requirement check. If it says "หา VP1 ภายใน 1 นาที → +10" — that's a manual checkbox the judge ticks, not an automatic timer-based calculation. Don't substitute your own "cleaner" design for what the spec actually says.

**Why**: In this project, I replaced attire scoring with a visual-only checklist and per-VP time bonus checkboxes with an automatic timer calculation. Both were wrong — the user had to come back and correct me. The "automatic time bonus" also caused a bug where `getTimeBonus(0)` returned 10, making the score always show 10.

**How to apply**: When implementing any scoring system, map each line of the spec to a specific implementation. If the spec says "X points" → it's scored points. If the spec describes conditions a judge checks → it's a manual checkbox, not automatic. Ask before deviating.
