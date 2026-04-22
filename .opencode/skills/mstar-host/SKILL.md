---
name: mstar-host-opencode
description: Morning Star (启明星) harness 在 OpenCode 宿主上的加载方式与专属能力 —— 全局 Rules 自动注入 AGENTS.md、`~/.config/opencode/agents/*.md` 角色加载、内置 `question` 工具（结构化澄清）、内置 `@explore` 只读导航与 `@general` subagent、具名角色需 PM 经宿主入口实际拉起（仅打印 Assignment Markdown 不会自动创建子代理）、按角色模型（`opencode.json` 中 `agent.<id>.model`）、按能力选配 MCP（现行文档 / Web 检索 / 代码模式 / 仓库图谱 / 浏览器 E2E / Git 工作流 / 系统化排障）。OpenCode 使用者在会话开始前必读；`@project-manager` 编排前必读，以决定是否用 `question` 工具做结构化澄清。维护向规则（包含密钥）请读 `.cursor/rules/opencode-config-repo-maintenance.mdc`。
---

# Morning Star × OpenCode Host Adapter

本 skill 描述 **Morning Star harness 在 OpenCode 上运行时**的加载方式与专属能力。**中性流程与不变量**仍以 `mstar-harness-core` 为准。

## 规则与角色如何加载

- **全局规则**：OpenCode 会将 `~/.config/opencode/AGENTS.md` 作为 [Global Rules](https://opencode.ai/docs/rules/#global) 在每会话注入。
- **角色提示词**：`~/.config/opencode/agents/*.md` 由 `opencode.json` 的 `agent` 配置引用；`agent.<id>` 与文件名 `agents/<id>.md` 对齐。
- **插件能力与编排消解**：Superpowers 等插件的消解见 `mstar-superpowers-align`。

## OpenCode 专属能力（其他宿主可能没有）

- **结构化澄清**：优先使用内置 **`question`** 工具（标题、题干、选项；可自定义文本回答）。须在配置中允许 `permission.question`（由用户维护；agent 不得擅自改全局配置）。
- **内置子代理**：如 **`@explore`**（只读导航）、**`@general`** 等，由 OpenCode 调度；语义上仍须遵守 `mstar-harness-core` SKILL.md 中对 `@explore` 边界等的约定。
- **具名角色（`@<agent-id>`）**：配置在 `opencode.json` 的 `agent.<id>`（与 `agents/<id>.md` 同名）的角色，须由 **PM 通过宿主提供的入口实际拉起**（例如对 `@fullstack-dev` 发起一轮子代理 / Task，以 Assignment 为消息体）。**仅**在主会话里打印 `## Assignment` Markdown **不会**自动创建子代理会话；若未见子代理启动，属于**未分派**，见 `agents/project-manager.md` **§2** 与 **Q13**。
- **按角色模型**：可在 `opencode.json` 为不同 subagent 配置不同 `model`。

## 共享协议：库文档检索（Context7）

Context7 文档检索属于**共享流程规则**，统一由 `mstar-harness-core` 维护。  
执行时请按：`~/.config/opencode/skills/mstar-harness-core/references/library-docs-protocol.md`。

---

## 会话上下文与插件注入（降噪）

- **大型平台注入**（例如 Vercel 生态长文、SessionStart hook）：与当前任务栈无关时，占用上下文且易与项目技术选型冲突。建议在**非 Vercel 项目**关闭对应规则/插件，或改为按需规则（`alwaysApply: false` + 描述触发条件）。
- **多个搜索/文档 MCP**：同类能力只保留一个默认主通道。

---

## 按能力选配的 MCP / Skills

本节按**能力维度**列出可选增强项，与 `mstar-harness-core` `references/open-harness-principles.md` 中的「文档检索、可观察验证、结构化探索」等理念对应。是否接入由用户决定；**修改全局 `opencode.json` 须用户明确同意**。

| 能力 | 用途 | 说明 |
|------|------|------|
| **现行文档** | 库/API 随版本变化，减少幻觉 | Context7 类 MCP，或宿主已配置的等价文档工具（见上节） |
| **Web 检索** | 时效信息、issue、迁移说明 | 本仓库若已配置搜索类 MCP，避免重复堆多个同类 |
| **代码模式检索** | 跨仓库参考实现 | 例如 `https://mcp.grep.app`；本配置若已有 `grep` MCP 则已覆盖 |
| **仓库图谱 / 影响分析** | 依赖与调用关系、PR 风险 | 例如 GitNexus（本仓库 `opencode.json` 已示例时即用） |
| **浏览器 / E2E 验证** | 用户可见流程、取证 | agent-browser、Playwright 等 skill；与 QA「可观察证据」一致 |
| **Git 工作流** | 原子提交、分支收口 | `git-commit`、`finishing-a-development-branch` 等 |
| **系统化排障** | RCA 再修复 | Superpowers `systematic-debugging`（见 `mstar-superpowers-align`） |

### 不建议

- 多个功能重叠的「搜索 MCP」同时常开，浪费上下文与配额。
- 在未跑通本 harness Phase Gate 的情况下，用更多工具掩盖流程缺口。

## 维护边界（与 runtime skill 分离）

本 skill 只承载 **运行时宿主适配**（能力、入口）。  
密钥与 `opencode.json` 的维护细则已迁移到维护规则：`.cursor/rules/opencode-config-repo-maintenance.mdc`。

- 执行期护栏保持不变：**agent 不得擅自改** `opencode.json` / `secrets.env` / `.secrets/*`。
- 需要修改密钥占位、变量名或 secrets 示例时，按维护规则中的「密钥约定」条目执行。
