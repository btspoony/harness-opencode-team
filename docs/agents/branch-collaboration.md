# 分支协作约定（Branch Collaboration Contract）

本文定义业务仓库中可写角色的分支协作规则。

## 适用范围

- 当任务会在项目 Git 仓库产生可合并 diff 时适用。
- 适用于 `@project-manager`、`@product-manager`、`@architect`、`@fullstack-dev`、`@frontend-dev`、`@fullstack-dev-2`、`@qa-engineer`、`@ops-engineer`、`@prompt-engineer`（项目侧写入）。

## 唯一分支决策者

- 只有 `@project-manager` 可以决定分支策略：
  - 继续在现有分支开发，或
  - 使用 `create <new-branch> from <base>` 新开分支，或
  - 使用 `Branch policy: direct on <branch> — <reason>`。
- 其他可写角色不得自行决定开分支。

## PM 必须先与用户确认

在派发实现任务前，PM 必须先检查当前分支；若已在非默认开发分支（如 `feature/*`、`fix/*`），必须先与用户确认。

未获得用户明确确认前，PM 不得切回 `main`/`master` 并新开分支。

### PM 确认话术模板

面向用户沟通时，使用以下结构：

```markdown
当前检测到在分支：`<current-branch>`。
请确认本次任务是：
1) 继续在 `<<current-branch>>` 上开发
2) 新开分支：`<new-branch>`，基于 `<base-branch>`

未确认前，我不会切回 `main`/`master` 或新开分支。
```

## 并发 subagent 与同仓工作树（与 `harness-loop` 对齐）

当多个可写 subagent **并发**修改 **同一仓库** 时，**不得**共用同一检出目录作为写入 cwd。PM 在分派前应规划 **`git worktree`** 隔离（Superpowers **`using-git-worktrees`**），并在各承接方 Assignment 中写明 **`Working branch`** / **`Branch policy`** 及 **检出路径约定**（或要求回报实际 worktree 路径）。单分支决策权仍仅属 PM；worktree 只解决「目录与工作区隔离」，不替代分支授权。

**QC / QA 与 feature**：开发常在 **feature 分支的 worktree** 中完成；进入 **QC 三审**与随后的 **QA 验证**时，PM 须在 Assignment 中写明 **`Review cwd` / `Worktree path`**、**`Working branch`**、**`plan_id`**（无 plan 流程时 `N/A` + 不可歧义 **Feature / scope label**）与 **`Review range` / `Diff basis`**；**三份 QC Assignment 与 QA Assignment 中 `plan_id` 与 `Review range` / `Diff basis` 须逐字相同**，保证三票审 **同一 plan/feature 与同一 diff 范围**。见 `harness-loop.md`「QC 三审、QA 验证与 feature 检出上下文」。

## Assignment 要求（PM）

每个可写 Assignment 必须且只能包含以下之一：

- `Working branch: <existing-branch>`
- `Working branch: create <new-branch> from <base>`
- `Branch policy: direct on <branch> — <reason>`

若是新开分支但缺少 `<base>`，必须暂停并向用户澄清，不能猜测。

## 可写角色执行规则

在首次写仓库或 `commit` 之前：

1. 校验当前分支与 Assignment 是否一致。
2. 只能执行 PM 在 Assignment 中定义的分支策略。
3. 禁止自行切回 `main`/`master` 再重开分支流程。
4. 若 Assignment 含糊或与本地分支状态冲突，先停下并回报 PM。

## 回报要求

可写角色在 Completion Report 中必须明确当前工作分支，例如：

- `Working branch used: <branch-name>`
