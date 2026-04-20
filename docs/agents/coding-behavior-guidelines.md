# Coding Behavior Guidelines

This document captures lightweight, host-agnostic coding behavior principles that reduce common agent mistakes. It complements the harness documents and does not override stage gates or role routing.

Priority remains:

1. User explicit instruction
2. Project `AGENTS.md` / `CLAUDE.md`
3. Global `~/.config/opencode/AGENTS.md`
4. `docs/agents/*.md` topic documents (including this file)
5. Role prompts under `~/.config/opencode/agents/*.md`

## Scope

- Applies to non-trivial coding, debugging, refactoring, and review tasks.
- For trivial one-liners, use judgment and keep overhead minimal.
- This file defines execution behavior, not branch policy or gate ownership.

## 1) Think Before Coding

Core idea: do not silently choose an interpretation when ambiguity exists.

- State assumptions explicitly before implementation when uncertainty is material.
- If there are multiple plausible interpretations, present options and ask for confirmation.
- Surface key tradeoffs when they affect scope, risk, or maintainability.
- If critical context is missing, pause and clarify instead of guessing.

Quick check:

- Can another reviewer see what assumptions were made?
- If assumptions are wrong, will the user detect it before large edits happen?

## 2) Simplicity First

Core idea: implement the minimum that satisfies the request and acceptance criteria.

- Do not add features, flags, or configurability that were not requested.
- Avoid introducing new abstractions for single-use logic.
- Prefer straightforward local fixes over framework-level reshaping.
- Reject speculative error handling for impossible paths unless required by project policy.

Default rule:

- If 200 lines can be 50 with the same behavior and clarity, prefer the smaller solution.

## 3) Surgical Changes

Core idea: every changed line should be traceable to the task.

- Touch only files and regions needed for the requested outcome.
- Do not opportunistically refactor adjacent code.
- Match existing style and patterns unless a change is explicitly requested.
- Remove only artifacts made unused by your own change.
- If unrelated issues are found, report them separately instead of piggyback editing.

Traceability test:

- Each hunk should map to a user requirement, acceptance criterion, or required fix-up.

## 4) Goal-Driven Execution

Core idea: convert vague requests into verifiable outcomes and iterate until verified.

- Define concrete success criteria before major edits.
- For multi-step tasks, use brief `Step -> verify` checkpoints.
- Prefer evidence-backed completion claims (tests, command output, reproducible checks).
- If verification fails, loop on diagnosis and fix before declaring completion.

Micro template:

```text
1. [Step]
   Verify: [specific check]
2. [Step]
   Verify: [specific check]
3. [Step]
   Verify: [specific check]
```

## Integration Notes

- This file is additive to `verification-before-completion` and other harness controls.
- It must not be used to bypass:
  - branch constraints,
  - QC/QA gate definitions,
  - assignment authority,
  - `Done` ownership rules.

## Anti-Bloat Rule for Prompt Maintenance

- Keep these principles centralized here.
- Role prompts should reference this document instead of duplicating long prose.
- Only role-specific triggers, boundaries, and artifacts belong in role prompt files.
