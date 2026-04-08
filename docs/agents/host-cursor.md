# 宿主适配：Cursor（含 `/pm`）

本文件描述在 **Cursor** 中使用本仓库时的**入口、加载顺序与能力差异**。流程规则仍以根目录 `AGENTS.md` 与各专题文档为准；此处只补「Cursor 上怎么接」。

## 推荐入口

1. **全局规则与索引**：`~/.config/opencode/AGENTS.md`（与 OpenCode 共用同一份**中性** harness；Cursor 不会自动注入，需通过规则或手动 Read）。
2. **项目经理行为**：`~/.config/opencode/agents/project-manager.md`（用户可通过 `**/pm`** 等指令让主代理按 PM 角色执行时读取）。
3. **本文件**：对齐 Cursor 上 **Task 子代理**、**单会话多帽**等可行编排，避免把宿主差异误读成「不能走 harness」。

## Task 工具与并行子代理（QC 三审）

在 **Cursor 当前环境**中，主代理可以使用 `**Task` 工具**并行拉起子代理，**能够**落实与 OpenCode harness 同构的 **QC 三审**分派。

- `**subagent_type`** 可选用 `qc-specialist`、`qc-specialist-2`、`qc-specialist-3`，语义上对应 PM 下发的 **三条独立 Assignment**（三名 reviewer）。
- **与 harness 对齐的硬性字段**：三份子任务中的 `**plan_id`**、`**Review cwd` / Worktree path**、`**Review range` / Diff basis`** 必须与 OpenCode 流程 **逐字相同**（见` harness-loop.md`、`plan-convention.md`、`review-harness.md`）。
- **和 OpenCode 的差别**：主要在 **宿主能力**——会话工具集、`question` 等交互、日志与 **artifact / 报告落盘路径** 的约定，**不是**「不能派三审」或「必须降级为单人扮演三票」。

PM 在 Status Update 中可简要注明本次三审是 **Task 并行子代理** 执行，便于审计与复盘。

## 何时仍用单会话或多窗口（补充模式）

下列情况可作为 **Task 并行** 的补充或备选（在 Status Update 中说明所用模式）：

### 模式 A — 单会话多帽

同一对话中由**主代理**顺序执行：先以 PM 规划并写出 Assignment，再在同一会话用**显式声明**切换执行身份，例如：

- `Acting as role: fullstack-dev — executing Assignment …`
- 执行前 **Read** 对应 `~/.config/opencode/agents/<role>.md`，严格按该文件的产出与门禁执行。

若在未使用 Task 子代理时做 QC/QA，可在同一会话内分轮次 Read `agents/qc-specialist*.md` / `agents/qa-engineer.md`，字段对齐要求不变。

### 模式 B — 多窗口 / 多会话扮演

将某条 Assignment 放到**新聊天**，在首轮消息中粘贴 Assignment 并要求代理 Read 对应 `agents/<role>.md`。适合长实现、避免单会话上下文挤压；PM 在主线会话汇总证据与状态。

### 模式 C — 与 worktree / 写入并发的关系

即使用 Task 并行子代理，仍须遵守 `harness-loop.md`：**同仓 ≥2 可写者并发修改** 时 `**git worktree`**（或等价隔离）与 Assignment 中的分支/路径约定；不要将「能并行跑 QC」与「能多代理共用一个可写 cwd」混为一谈。

## 澄清交互

- **无 `question` 工具时**：用结构化 Markdown（标题、选项列表）在正文中提问，或用 Cursor 支持的等价交互；原则与 `harness-loop.md` 的 `clarify` 一致。
- **不要把「能问」当成「已澄清」**：高影响歧义未收敛仍须 `Blocked` 或升级人工。

## Superpowers 与技能

无内置 Skill 工具时：按 `library-docs-and-hosts.md` 与 `superpowers-skills.md` 的 **「未安装插件时」**，用 **Read** 打开上游 `SKILL.md` 再执行步骤。

## 与项目规则的关系

自 cwd 向上的项目 `AGENTS.md` / `CLAUDE.md` 优先于全局 harness；与 `project-manager-mode` 等 Cursor 规则冲突时以项目规则与用户当轮指令为准。

## OpenCode 对照

OpenCode 下的加载与子代理语义见 `**host-opencode.md`**。