---
name: mstar-plan-artifacts
description: Morning Star plan harness artifacts — `{PLAN_DIR}` main plans and `reports/`, `{KNOWLEDGE_DIR}` / `{ITERATION_DIR}` indexes, Done compaction, plus `{HARNESS_DIR}/status.json` and root `residual_findings` (severity SSOT, open/archived lifecycle, `notes.json`). Read when writing plans or QC reports, maintaining knowledge/iteration indexes, reading or writing `status.json` / R#, Done compaction, or mapping QC severity to JSON. Required for `@project-manager` on status, residuals, and InReview/QC waves; `@qc-specialist*` before `reports/**/*.md`; `@qa-engineer` before closing R#. Verdict rules in `mstar-review-qc`; paths in `mstar-plan-conventions`.
---

## Load order（必读顺序）

**首次 Read 本 skill 前：必须先 Read `mstar-harness-core`（SKILL.md），并按需 Read `mstar-plan-conventions`（路径符号）。** 涉及 Git 分支 / worktree / QC 检出 → **`mstar-branch-worktree`**。冲突时 **以 `mstar-harness-core` 为准**。

## Scope（plan 目录工件）

| Topic | 详见 |
|-------|------|
| 主 plan、reports 命名、QC 波次、residual 与 plan 索引顺序 | `references/plan-files-and-reports.md` |
| knowledge / iterations / specs 边界与索引 | `references/knowledge-and-designs.md` |
| Done 行瘦身 Profile A/B | `references/done-compaction.md` |
| `status.json`、residual severity、生命周期、`jq` | `references/status-and-residuals.md` |
| 空仓库 `status.json` / `notes.json` 模板 | `templates/status.empty.json`、`templates/notes.empty.json`（见 `templates/README.md`） |

**Out of scope:** 分支与 QC/QA 检出对齐 → **`mstar-branch-worktree`**；QC 清单与 verdict → **`mstar-review-qc`**；`{HARNESS_DIR}` 路径发现与目录初始化步骤 → **`mstar-plan-conventions`**。

## `status.json` 与 open residual（摘要）

- **`{HARNESS_DIR}/status.json`**：`plans[]` 行状态 + 根级 **`residual_findings[<plan-id>]`**（open 列表 **SSOT**）。
- **Canonical**：新登记只写根级 `residual_findings`；**`metadata.residual_findings`** 仅 legacy 读，**禁止**双写。
- **生命周期**：open → 验证关闭 → **`archived/residuals/<plan-id>.json`**；**`severity`** 机器枚举见 reference。
- **`notes.json`**、**`tech_debt_summary`**（可选聚合视图）。

字段、severity 映射表、归档与 `jq` 示例 → **`references/status-and-residuals.md`**。

**Templates（本 skill）：** `templates/status.empty.json`、`templates/notes.empty.json` — 复制到 `{HARNESS_DIR}/`（说明见 `templates/README.md`）。
