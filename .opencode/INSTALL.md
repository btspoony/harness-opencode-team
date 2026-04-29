# Installing Morning Star for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed

## Installation

Add Morning Star to the `plugin` array in your `opencode.json` (global or project-level).

If you use Superpowers together, use:

```json
{
  "plugin": [
    "superpowers@git+https://github.com/obra/superpowers.git",
    "morning-star@git+https://github.com/btspoony/mstar-harness.git"
  ]
}
```

Restart OpenCode. The plugin auto-installs and registers Morning Star runtime files.

## Usage

- Keep your role models and permissions in `opencode.json`.
- Morning Star plugin loads:
  - `skills/*`
  - `.opencode/skills/*`
  - `agents/*.md`
- Bootstrap prompt entry is injected once with `<IMPORTANT_FOR_HARNESS>`.

## Updating

Morning Star updates automatically when OpenCode restarts.

To pin a specific version/tag:

```json
{
  "plugin": [
    "morning-star@git+https://github.com/btspoony/mstar-harness.git#v0.1.0"
  ]
}
```

## Troubleshooting

### Plugin not loading

1. Check logs: `opencode run --print-logs "hello" 2>&1 | grep -i superpowers`
2. Verify the plugin line in your `opencode.json`
3. Make sure you're running a recent version of OpenCode

### Skills not found

1. Use `skill` tool to list what's discovered
2. Check that the plugin is loading (see above)
