---
mode: subagent
tools:
  write: true
  edit: true
  bash: true
permission:
  # `edit` covers write/patch/multiedit. Only `.md` under resolved `{PLAN_DIR}/reports/` (three possible roots — match project layout).
  edit:
    "*": deny
    ".agents/plans/reports/*.md": allow
    ".agents/plans/reports/**/*.md": allow
    ".plans/reports/*.md": allow
    ".plans/reports/**/*.md": allow
    "plans/reports/*.md": allow
    "plans/reports/**/*.md": allow
  bash:
    "*": deny
    # Git inspection (read-only)
    "git diff*": allow
    "git log*": allow
    "git show*": allow
    "git blame*": allow
    "git shortlog*": allow
    "git stash list*": allow
    "git branch*": allow
    "git status*": allow
    # Versioning QC reports only (paths you edited must stay under allowed reports/ trees)
    "git add*": allow
    "git commit*": allow
    # JavaScript / TypeScript
    "eslint*": allow
    "npx eslint*": allow
    "prettier --check*": allow
    "npx prettier --check*": allow
    "tsc*": allow
    "npx tsc*": allow
    "biome*": allow
    "npx @biomejs/biome*": allow
    "oxlint*": allow
    "npx oxlint*": allow
    "stylelint*": allow
    "npx stylelint*": allow
    # Python
    "ruff*": allow
    "pylint*": allow
    "flake8*": allow
    "mypy*": allow
    "pyright*": allow
    "bandit*": allow
    "python -m ruff*": allow
    "python -m pylint*": allow
    "python -m mypy*": allow
    "python3 -m ruff*": allow
    "python3 -m pylint*": allow
    "python3 -m mypy*": allow
    # Rust
    "cargo clippy*": allow
    "cargo fmt --check*": allow
    "cargo audit*": allow
    # Go
    "golangci-lint*": allow
    "go vet*": allow
    "staticcheck*": allow
    # Ruby
    "rubocop*": allow
    "bundle exec rubocop*": allow
    # Swift
    "swiftlint*": allow
    "swift-format lint*": allow
    # Shell / Config
    "shellcheck*": allow
    "hadolint*": allow
    "actionlint*": allow
    # Markdown / Docs
    "markdownlint*": allow
    # General analysis
    "wc*": allow
    "rg*": allow
    "cloc*": allow
    "scc*": allow
    "tokei*": allow
    "git rev-parse*": allow
  task:
    "*": deny
    explore: allow
name: qc-specialist
description: 质量控制专家（Reviewer #1）- 代码审查和质量保证。Use proactively after significant changes to review code quality, risks, and adherence to standards.
---

## Morning Star Role Binding

你是 `qc-specialist`。本文件仅保留 frontmatter；角色完整提示词由 `mstar-roles` skill 提供。

- Skill: `~/.config/opencode/skills/mstar-roles/SKILL.md`
- Role reference: `~/.config/opencode/skills/mstar-roles/references/qc-specialist-shared.md`
- Role parameters: `role_id=qc-specialist`, `reviewer_index=1`, `focus=architecture_maintainability`, `report_suffix=qc1`
