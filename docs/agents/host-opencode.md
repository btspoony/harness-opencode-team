# 宿主适配：OpenCode

本文件描述**本配置仓库在 OpenCode 上运行时**的加载方式与专属能力。中性流程与不变量仍以根目录 `AGENTS.md` 与各 `docs/agents/*.md` 为准。

## 规则与角色如何加载

- **全局规则**：OpenCode 会将 `~/.config/opencode/AGENTS.md` 作为 [Global Rules](https://opencode.ai/docs/rules/#global) 在每会话注入。
- **角色提示词**：`~/.config/opencode/agents/*.md` 由 `opencode.json` 的 `agent` 配置引用；`agent.<id>` 与文件名 `agents/<id>.md` 对齐。
- **密钥与插件**：`opencode.json`、凭据约定见 `opencode-config-secrets.md`；Superpowers 等插件见 `superpowers-skills.md`。

## OpenCode 专属能力（其他宿主可能没有）

- **结构化澄清**：优先使用内置 `**question`** 工具（标题、题干、选项；可自定义文本回答）。须在配置中允许 `permission.question`（由用户维护；agent 不得擅自改全局配置）。
- **内置子代理**：如 `**@explore`**（只读导航）、`**@general`** 等，由 OpenCode 调度；语义上仍须遵守 `harness-loop.md` 中对 `@explore` 边界等的约定。
- **具名角色（`@<agent-id>`）**：配置在 `opencode.json` 的 `agent.<id>`（与 `agents/<id>.md` 同名）的角色，须由 **PM 通过宿主提供的入口实际拉起**（例如对 `@fullstack-dev` 发起一轮子代理 / Task，以 Assignment 为消息体）。**仅**在主会话里打印 `## Assignment` Markdown **不会**自动创建子代理会话；若未见子代理启动，属于**未分派**，见 `agents/project-manager.md` **§2** 与 **Q13**。
- **按角色模型**：可在 `opencode.json` 为不同 subagent 配置不同 `model`。

## 与 Cursor 的差异摘要

需要对比 Cursor 下的用法时，见同目录 `**host-cursor.md`**；库文档与上下文降噪的共用协议见 `**library-docs-and-hosts.md`**。