---
name: mstar-roles
description: Morning Star (启明星) 的角色提示词总线。把 `agents/*.md` 的正文完全 skill 化：所有角色的完整行为定义都在 `references/`，agent 文件仅保留 frontmatter 与 role 参数绑定。凡是执行 `project-manager` / `product-manager` / `architect` / `fullstack-dev` / `fullstack-dev-2` / `frontend-dev` / `qa-engineer` / `qc-specialist*` / `ops-engineer` / `market-expert` / `prompt-engineer` 任一角色任务时，都应优先加载本 skill，再按角色参数加载对应 reference。重复角色（`fullstack-dev` 与 `fullstack-dev-2`、`qc-specialist*`）必须共享同一 reference，通过参数区分。
---

# Morning Star Roles Hub

本 skill 是 Morning Star 的**角色提示词单一入口**。  
`agents/*.md` 现在只承担 frontmatter 与参数绑定；角色正文权威在本目录 `references/`。

## 使用顺序（强制）

1. 读取当前 agent 文件中的 `Role reference` 与 `Role parameters`。
2. 先读取本文件，再读取对应 `references/<role>.md`。
3. 用参数覆盖共享 reference 中的可变槽位（例如 reviewer 编号、并行轨道标识）。
4. 若 agent 文件正文与 reference 冲突，以 reference 为准。

## Role Reference Mapping

| Agent id | Reference file | Parameterized |
|---|---|---|
| `project-manager` | `references/project-manager.md` | No |
| `product-manager` | `references/product-manager.md` | No |
| `architect` | `references/architect.md` | No |
| `fullstack-dev` | `references/fullstack-dev-shared.md` | Yes (`track`, `role_id`) |
| `fullstack-dev-2` | `references/fullstack-dev-shared.md` | Yes (`track`, `role_id`) |
| `frontend-dev` | `references/frontend-dev.md` | No |
| `qa-engineer` | `references/qa-engineer.md` | No |
| `qc-specialist` | `references/qc-specialist-shared.md` | Yes (`reviewer_index`, `focus`, `report_suffix`, `role_id`) |
| `qc-specialist-2` | `references/qc-specialist-shared.md` | Yes (`reviewer_index`, `focus`, `report_suffix`, `role_id`) |
| `qc-specialist-3` | `references/qc-specialist-shared.md` | Yes (`reviewer_index`, `focus`, `report_suffix`, `role_id`) |
| `ops-engineer` | `references/ops-engineer.md` | No |
| `market-expert` | `references/market-expert.md` | No |
| `prompt-engineer` | `references/prompt-engineer.md` | No |

## 参数化约定

- `role_id`: 当前 agent 身份。
- `track`: 开发并行轨道（如 `primary` / `parallel_secondary`）。
- `reviewer_index`: QC reviewer 编号（1/2/3）。
- `focus`: QC 本 reviewer 主审关注面。
- `report_suffix`: QC 报告文件后缀（`qc1` / `qc2` / `qc3`）。

## 维护规则

- 角色行为改动先改 `mstar-roles/references/*`，再按需改 agent 参数绑定。
- 重复角色只改共享 reference，不复制三份正文。
- 新增角色时，先在本文件 mapping 表登记，再新增对应 `references/*.md` 与 agent 绑定。
