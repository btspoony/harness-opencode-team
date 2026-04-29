# Local Validation Checklist

Use this checklist before publishing or sharing the plugin.

## 1) Manifest sanity

- `name`, `version`, `description`, `license` are present.
- `agents`, `skills`, `rules` use relative paths.
- `homepage` and `repository` point to valid URLs.

## 2) Component discovery

- Agent files are discoverable from `./agents/`.
- Morning Star skills are discoverable from `./skills/mstar-*/SKILL.md`.
- Cursor host skills are discoverable from `./.cursor/skills/*/SKILL.md`.
- Cursor rules are discoverable from `./.cursor/rules/*.mdc`.

## 3) Smoke-test flow in Cursor

- Open a new chat and reference this plugin.
- Trigger a role-routed task (for example, PM-style routing).
- Confirm one `mstar-*` skill and one `.cursor/skills/*` skill can both be loaded.
- Confirm one `.cursor/rules/*.mdc` rule is applied during execution.

## 4) Packaging guardrails

- Do not use absolute paths in `plugin.json`.
- Do not reference files outside this repository root.
- Ensure all referenced directories exist in the current branch.
