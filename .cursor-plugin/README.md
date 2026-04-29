# Morning Star Harness Cursor Plugin

This repository is packaged as a Cursor plugin via `.cursor-plugin/plugin.json`.

## Purpose

Provide Morning Star harness capabilities in Cursor with:

- Role agents from `agents/`
- Core and host skills from `skills/` and `.cursor-plugin/skills/`
- Cursor rules from `.cursor-plugin/rules/`

## Install / Use

1. Clone directly into Cursor local plugin directory:
   - `mkdir -p ~/.cursor/plugins/local`
   - `git clone https://github.com/btspoony/mstar-harness.git ~/.cursor/plugins/local/morning-star-harness`
3. Restart Cursor or run `Developer: Reload Window`.
4. Start a new chat and invoke a Morning Star workflow (for example, PM routing or a role-specific task).

## Component Coverage

- `agents`: `./agents/`
- `skills`: `./skills/`, `./.cursor-plugin/skills/`
- `rules`: `./.cursor-plugin/rules/`

## Validation

Use `.cursor-plugin/LOCAL-VALIDATION.md` as the pre-release checklist.