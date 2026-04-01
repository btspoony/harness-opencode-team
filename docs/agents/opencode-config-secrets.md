# OpenCode 配置中的密钥（`opencode.json`）

`opencode.json` 支持占位替换（见 [OpenCode Config — Variables](https://opencode.ai/docs/en/config)）：

- `{env:VARIABLE_NAME}` — 从环境变量读取  
- `{file:path}` — 从文件读取（路径可为 `~/.config/opencode/.secrets/...`）

## 本仓库示例所用的环境变量

当使用仓库内的 `opencode.json` 模板时，请在启动 OpenCode **之前**导出下列变量（名称与 `opencode.json` 中 `{env:...}` 一致）：

| 变量 | 用途 |
|------|------|
| `MINIMAX_API_KEY` | MiniMax MCP |
| `BIGMODEL_MCP_BEARER` | 智谱 BigModel 远程 MCP 的 Bearer token（**不含** `Bearer` 前缀；JSON 里已写 `Bearer {env:...}`） |
| `Z_AI_API_KEY` | `@z_ai/mcp-server` |
| `ZHIPUAI_API_KEY` | `provider.zhipuai-coding-plan.options.apiKey` |
| `DASHSCOPE_API_KEY` | 阿里云百炼 / DashScope（`bailian-coding-plan` 的 `apiKey`） |

可复制 `secrets.env.example` 为本地 `secrets.env`（勿提交），执行 `set -a && source secrets.env && set +a` 后再启动 CLI/TUI。

若 `{env:...}` 在某字段未生效（已知部分版本对个别嵌套字段有问题），可改用 `{file:~/.config/opencode/.secrets/<name>}`，文件内容为**单行**密钥，`chmod 600`。

## 安全建议

- 不要将含真实密钥的 `opencode.json` 提交到 Git。  
- 本仓库 `.gitignore` 已忽略 `secrets.env` 与 `.secrets/`；若你自行取消对 `opencode.json` 的忽略，务必改用 env 或 file 占位。
