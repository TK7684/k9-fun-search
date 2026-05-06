---
name: Fixed lookup table over percentage derivation
description: When an official scoring guide provides exact point values per category, use a fixed lookup table instead of deriving percentages from base values. Percentage derivation creates rounding errors and doesn't match the spec.
type: reference
---

When a specification provides exact point values (e.g., "V grade on VP1 = 20 points, V- = 19.5, SG+ = 19"), use a fixed lookup table (`Record<string, [number, number, number]>`) rather than deriving values from base percentages. The official guide values don't follow clean percentage patterns (V- is 97.5% for VP1 but 96.67% for VP2), so percentage derivation introduces rounding errors.

**Why**: Percentage derivation seems DRY but the values aren't actually derived from a single percentage — they're independently specified. A lookup table is the single source of truth.

**How to apply**: When implementing scoring/grading systems, always ask for the official specification first. If exact values are provided, hardcode them as a lookup table. Only use percentage-based calculation when the spec explicitly says "X% of max points."
