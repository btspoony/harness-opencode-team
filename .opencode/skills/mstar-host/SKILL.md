---
name: mstar-host-opencode
description: OpenCode host adapter for Morning Star harness. Use this skill whenever running Morning Star in OpenCode, especially for host entry behavior, `opencode.json`-driven role loading, `question`-based structured clarify, `@explore`/`@general` usage boundaries, and PM-triggered named-role invocation. Always load this after `mstar-harness-core` to keep host behavior aligned with shared gates and routing.
---

# Morning Star × OpenCode Host Adapter

This skill defines host adaptation for **Morning Star running in OpenCode** (capabilities, entry behavior, and noise control).  
Neutral process rules and invariants remain authoritative in `mstar-harness-core`.

## First Action: Load `mstar-harness-core`

Regardless of whether OpenCode injected root `AGENTS.md` via Global Rules, the agent’s **first action** is to read `mstar-harness-core`.

## Default path (recommended)

Use this default sequence unless a project rule explicitly overrides it:

1. Read `mstar-harness-core`
2. Read current host adapter (`mstar-host-opencode`)
3. Load role via `mstar-roles`
4. Execute with evidence-first completion checks

## Role loading

- **Role shell**: `agents/<id>.md` is referenced by `opencode.json` `agent.<id>`; the file keeps only frontmatter and role binding.
- **Role body**: stored in `mstar-roles` `references/<id>.md` (or shared references + role parameters).
- **Plugin orchestration conflict handling**: see `mstar-superpowers-align`.

## OpenCode-specific capabilities (other hosts may differ)

- **Structured clarify**: prefer built-in `question` tool (title, prompt, options, optional custom text). Requires `permission.question` in config (user-maintained; agent must not edit global config without explicit consent).
- **Built-in subagents**: e.g., `@explore` (read-only navigation), `@general`; still subject to `mstar-harness-core` boundaries for explore usage.
- **Named roles (`@<agent-id>`)**: roles configured in `opencode.json` `agent.<id>` must be **actually invoked** by PM through host entry points. Printing Assignment Markdown alone does not create subagent sessions.
- **Per-role models**: different models can be configured per subagent in `opencode.json`.

## Gotchas

- `question` availability is host-config dependent; if unavailable, fall back to structured Markdown clarify flow.
- Printing an Assignment in the main thread is not dispatch; PM must actually invoke the target role.
- Built-in `@explore` remains read-only orientation, not a substitute for role-owned implementation or review deliverables.
- More MCPs does not fix process gaps; follow phase-gate and evidence rules first.

## Shared protocol: library documentation retrieval (Context7)

Context7 retrieval is a shared process rule maintained by `mstar-harness-core`.  
Follow: `mstar-harness-core` skill `references/library-docs-protocol.md`.

---

## Session context and plugin injection (noise control)

- **Large platform injections** (for example, long Vercel ecosystem prompts, SessionStart hooks): if unrelated to current stack, they consume context and can conflict with project choices. For non-Vercel projects, disable or make them on-demand (`alwaysApply: false` + explicit trigger description).
- **Multiple search/docs MCPs**: keep one default channel per capability class.

---

## Optional MCPs / skills by capability

This section lists optional enhancements by capability domain, aligned with principles in `mstar-harness-core` `references/open-harness-principles.md` (documentation retrieval, observable verification, structured exploration). User decides whether to enable them; editing global `opencode.json` requires explicit user consent.

| Capability | Purpose | Notes |
|------|------|------|
| **Current docs** | Reduce hallucination for versioned APIs/libs | Context7-like MCP or equivalent host-configured docs tool |
| **Web search** | Time-sensitive issues and migration notes | Avoid overlapping multiple search MCPs for the same purpose |
| **Code pattern search** | Cross-repo implementation references | Example: `https://mcp.grep.app`; skip if equivalent already configured |
| **Repo graph / impact analysis** | Dependency/call graph and PR risk | Example: GitNexus |
| **Browser / E2E verification** | User-visible flow validation and evidence capture | agent-browser, Playwright, aligned with QA observable-evidence requirements |
| **Git workflow** | Atomic commits and branch closure | e.g., `git-commit`, `finishing-a-development-branch` |
| **Systematic debugging** | RCA before fix | Superpowers `systematic-debugging` (see `mstar-superpowers-align`) |

### Not recommended

- Keeping multiple overlapping search MCPs always enabled.
- Using more tools to mask phase-gate/process gaps when harness baseline is not yet followed.

## Maintenance boundary (separate from runtime skill)

This skill should contain only **runtime host adaptation** (capabilities and entry behavior).

- Runtime guardrail remains unchanged: agent must not modify `opencode.json`, `secrets.env`, or `.secrets/*` without explicit user consent.
