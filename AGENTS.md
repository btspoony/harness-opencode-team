# Morning Star - Global Entry

Any code agent working in this repository must read the `mstar-harness-core` skill before starting any non-trivial task, including relevant files in its `references/` directory.

`mstar-harness-core` is the single source of truth for lifecycle gates, routing, host entry behavior, skill loading order, and execution invariants across all `mstar-*` skills.

This file intentionally contains no runtime rules; it only points to `mstar-harness-core`.
