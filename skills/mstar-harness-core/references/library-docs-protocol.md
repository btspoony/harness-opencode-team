# Context7 Library Docs Protocol (Shared)

This protocol is shared by all hosts in Morning Star. Host adapter skills should consume this section, not redefine it.

## When to use

- The question is about library/framework/SDK/CLI/cloud API syntax, config options, migration behavior, or version-specific usage.
- The answer quality depends on current docs rather than model memory.

## When not to use

- Pure refactoring strategy.
- Writing scripts from scratch without external API dependence.
- Business logic debugging not tied to third-party docs.
- Generic programming concepts.
- PR/code review judgment.

## Single-path policy

Use one path per question. Do not run MCP and CLI in parallel for the same library/question pair.

1. **Primary path: Context7 MCP (if available)**
   - Read tool schema first.
   - Query with the user's full question.
   - Prefer versioned library IDs when version is known.
2. **Fallback path: ctx7 CLI (only if MCP unavailable/fails)**
   - `npx ctx7@latest library <name> "<user question>"`
   - `npx ctx7@latest docs <libraryId> "<user question>"`
   - Max 3 commands per question.

## Guardrails

- Never include secrets in commands or queries.
- Switch to fallback only after primary path fails.
- Report uncertainty when docs retrieval fails on both paths.
