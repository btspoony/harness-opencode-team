# Plans workflow (rules)

This directory is for plan documents and the plan status index.

## Source of truth

- `plans/status.json` is the single source of truth for plan status and progress.
- Each plan file in `plans/*.md` must be consistent with `plans/status.json`.
- See `plans/status.example.json` for a filled example.

## Mark plan as Done

When a plan is completed, mark it as **Done** in one of these ways:

1. **Frontmatter** (preferred):
   - Add YAML frontmatter with `status: Done`
   - Optionally add `done_at: YYYY-MM-DD`
2. **Filename** (fallback when no frontmatter is used):
   - Rename file to include a Done marker, e.g. `DONE__my-plan.md` or `my-plan.done.md`

Always update `plans/status.json` at the same time.

## Status values

- `Todo`
- `InProgress`
- `Blocked`
- `Done`

