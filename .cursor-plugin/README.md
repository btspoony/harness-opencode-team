# Morning Star Harness Cursor Plugin

This repository is packaged as a Cursor plugin via `.cursor-plugin/plugin.json`.

## Purpose

Provide Morning Star harness capabilities in Cursor with:

- Role agents from `agents/`
- Core and host skills from `skills/` and `.cursor-plugin/skills/`
- Cursor rules from `.cursor/rules/`

## Install / Use

### Local install via symlink (recommended)

1. Clone repository to a stable source path:
  - `git clone https://github.com/btspoony/mstar-harness.git ~/.mstar-harness`
2. Create local plugin directory:
  - `mkdir -p ~/.cursor/plugins/local`
3. Link source repository as a local Cursor plugin:
  - `ln -s ~/.mstar-harness ~/.cursor/plugins/local/mstar-harness`
  - If the link already exists, recreate it safely:
  - `rm -f ~/.cursor/plugins/local/mstar-harness && ln -s ~/.mstar-harness ~/.cursor/plugins/local/mstar-harness`
  - Or use force update:
  - `ln -sfn ~/.mstar-harness ~/.cursor/plugins/local/mstar-harness`
4. Restart Cursor or run `Developer: Reload Window`.
5. Start a new chat and invoke a Morning Star workflow (for example, PM routing or a role-specific task).

## Component Coverage

- `agents`: `./agents/`
- `skills`: `./skills/`, `./.cursor-plugin/skills/`
- `rules`: `./.cursor/rules/`

## Validation

Use `.cursor-plugin/LOCAL-VALIDATION.md` as the pre-release checklist.