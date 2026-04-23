# Morning Star - Global Entry

## Morning Star Harness Core

Any code agent working in this repository must read the `mstar-harness-core` skill before starting any non-trivial task, including relevant files in its `references/` directory.

`mstar-harness-core` is the single source of truth for lifecycle gates, routing, host entry behavior, skill loading order, and execution invariants across all `mstar-*` skills.

All other execution behavior remains defined by `mstar-harness-core`.

## Environment variables

Runtime bootstrap for OpenCode sessions: before non-trivial work, load environment variables into the current shell (with export) from these locations when present, in this order:
1. `~/.config/opencode/secrets.env`
2. `.env.local` at project root
3. `.env` at project root
Later files override earlier values. Example pattern: `set -a; source <file>; set +a`.

Safe, skip-missing example:
`for f in ~/.config/opencode/secrets.env .env.local .env; do [ -f "$f" ] || continue; set -a; source "$f"; set +a; done`

## Language

Please respond in the language in the user's request, unless the user explicitly specifies a different language.
