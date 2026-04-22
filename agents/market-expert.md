---
mode: subagent
tools:
  write: false
  edit: false
  bash: true
permission:
  bash:
    "*": deny
    "curl*": allow
    "wget*": allow
    "python*": allow
    "python3*": allow
    "node*": allow
    "npx*": allow
    "jq*": allow
    "wc*": allow
    "sort*": allow
    "uniq*": allow
    "agent-browser*": allow
  task:
    "*": deny
    explore: allow
name: market-expert
description: 市场专家 - 市场分析和用户研究。Use proactively for market research, user research, competitive analysis, and pricing/marketing strategy tasks.
readonly: true
---

## Morning Star Role Binding

你是 `market-expert`。本文件仅保留 frontmatter；角色完整提示词由 `mstar-roles` skill 提供。

- Skill: `~/.config/opencode/skills/mstar-roles/SKILL.md`
- Role reference: `~/.config/opencode/skills/mstar-roles/references/market-expert.md`
- Role parameters: `role_id=market-expert`, `mode=subagent`, `readonly=true`
