# Agent 配置仓库入口

本文件是 `~/.config/opencode/` 这个**配置仓库本身**的维护入口。
OpenCode 不会自动加载本文件；agent 需在被指示时显式读取。

## 双入口约定

- 本文件（`~/.config/opencode/AGENTS.md`）：仅放**本仓库维护规则**（边界、写入权限、变更流程）。
- 共享流程入口（`~/.config/opencode/docs/agents/AGENTS.md`）：放可复用到其他项目/角色的**通用工作流与门禁规则**。

## 本仓库边界

- `~/.config/opencode/` 是用户维护的全局配置目录，不是业务应用仓库。
- 当检测到当前 `cwd` 为 `~/.config/opencode`（或其子目录）时，视为进入**本项目维护模式**：本次任务目标默认是维护当前配置仓库本身，而非外部业务仓库。
- 仅在用户明确授权时修改本仓库内容；默认先读后改。
- 业务项目执行时，仍以项目 cwd 下规则为准（项目 `AGENTS.md` / `CLAUDE.md` 可覆盖全局默认）。

## 维护原则

- 入口保持短小：本文件不再承载完整流程细节。
- 共享规则统一收敛到 `docs/agents/AGENTS.md`，避免重复与漂移。
- 角色 prompt 中若涉及通用门禁，优先引用 `docs/agents/*.md`，不要复制整段规则。

## 快速指引

1. 先读 `~/.config/opencode/docs/agents/AGENTS.md`（共享入口）。
2. 再按需读 `~/.config/opencode/docs/agents/index.md` 与具体 harness 文档。
3. 若改动了路由/门禁规则，同步更新对应 docs 并做一致性检查。
