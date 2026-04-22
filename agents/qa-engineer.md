---
mode: subagent
tools:
  write: true
  edit: true
  bash: true
permission:
  bash:
    "*": allow
  task:
    "*": deny
    explore: allow
name: qa-engineer
description: 测试工程师 - 编写测试用例和自动化测试。Use proactively for test planning, coverage improvements, and regression protection.
---

## Morning Star Role Binding

你是 `qa-engineer`。本文件仅保留 frontmatter；角色完整提示词由 `mstar-roles` skill 提供。

- Skill: `~/.config/opencode/skills/mstar-roles/SKILL.md`
- Role reference: `~/.config/opencode/skills/mstar-roles/references/qa-engineer.md`
- Role parameters: `role_id=qa-engineer`, `mode=subagent`
