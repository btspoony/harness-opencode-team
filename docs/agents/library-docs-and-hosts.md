# 库文档检索与宿主差异（单一事实来源）

本文件统一说明：**第三方库 / API / CLI 文档如何查**，以及 **OpenCode 与 Cursor 等宿主**在技能与上下文上的差异，避免 `AGENTS.md`、Cursor 规则与 harness 文档各写一套。

## 库文档检索（Context7）

**目标**：回答涉及具体框架、SDK、CLI、云服务的 API 与配置问题时，用现行文档而非训练数据；优先 Context7，再考虑 Web 检索。

**不适用**：纯重构、从零写脚本、业务逻辑排错、代码评审、泛化编程概念（与 `find-docs` / Context7 技能边界一致）。

### 优先级（选一种路径，不要双跑）

1. **主路径 — Context7 MCP（可用时）**  
   若当前宿主已启用 Context7 MCP（例如 Cursor 的 `user-context7`）：
   - 先读 MCP 工具 schema，再调用（工具名以实际 MCP 为准，常见为 `resolve-library-id` / `query-docs` 或等价）。
   - 用用户**完整问题**作为查询句；版本相关时选用带版本后缀的 library ID。

2. **备用路径 — ctx7 CLI（无 MCP 或 MCP 不可用时）**  
   在可执行 shell 的环境中：
   - `npx ctx7@latest library <name> "<user's question>"`
   - `npx ctx7@latest docs <libraryId> "<user's question>"`  
   每问最多 3 次命令；查询中不得含密钥。配额失败时提示 `npx ctx7@latest login` 或 `CONTEXT7_API_KEY`。

**禁止**：同一问题内对同一库交替 MCP 与 CLI 重复全量拉取（浪费 token 与配额）。选一径到底；仅在第一条路径失败时再切换备用路径。

---

## 宿主差异：OpenCode vs Cursor（及同类 IDE）

| 维度 | OpenCode | Cursor / 其他 IDE |
|------|----------|-------------------|
| 角色加载 | `opencode.json` + `~/.config/opencode/agents/*.md` | 依赖项目规则与 Composer 配置；未必加载 OpenCode 的 PM |
| Superpowers | `plugin` 启用后注册技能；按名称/短语触发 | 无 Claude Code `Skill` 工具时：**用 Read 读取技能文件**或宿主自带的 skill 机制；`using-superpowers` 中的「先 invoke Skill」**映射为「先读取对应 SKILL.md 再执行」** |
| 流程权威 | 根目录 `AGENTS.md`（全局）与 `harness-loop.md` 等专题不变 | 与项目 `AGENTS.md` / `CLAUDE.md` 冲突时：**用户与项目规则优先**（见根目录 `AGENTS.md`「信息源优先级」） |

---

## 会话上下文与插件注入（降噪）

- **大型平台注入**（例如 Vercel 生态长文、SessionStart hook）：与当前任务栈无关时，占用上下文且易与项目技术选型冲突。建议在**非 Vercel 项目**关闭对应规则/插件，或改为按需规则（`alwaysApply: false` + 描述触发条件）。
- **多个搜索/文档 MCP**：与 `optional-tooling-by-capability.md` 一致；同类能力只保留一个默认主通道。

---

## 与仓库其他文档的关系

- 共享流程与专题文档索引：根目录 `~/.config/opencode/AGENTS.md`
- 按能力选配 MCP：`docs/agents/optional-tooling-by-capability.md`
- Superpowers 与 harness 消解：`docs/agents/superpowers-skills.md`
