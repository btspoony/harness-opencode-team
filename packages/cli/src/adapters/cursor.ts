import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import type { AgentAdapter, Scope } from "../types";
import { resolveProjectRoot } from "../utils";

const REPO_URL = "https://github.com/btspoony/mstar-harness.git";
const CURSOR_PLUGIN_NAME = "mstar-harness";
const CURSOR_PLUGIN_MARKER = ".cursor-plugin/plugin.json";

function globalInstallPath() {
  return path.join(os.homedir(), ".cursor", "plugins", "local", CURSOR_PLUGIN_NAME);
}

function projectInstallPath() {
  return path.join(resolveProjectRoot(), ".cursor", "plugins", CURSOR_PLUGIN_NAME);
}

function ensureDir(dirPath: string, dryRun: boolean) {
  if (dryRun) return;
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function runCommand(command: string[], cwd: string, dryRun: boolean) {
  if (dryRun) return;
  execFileSync(command[0], command.slice(1), { cwd, stdio: "pipe", encoding: "utf8" });
}

function globalInit(dryRun: boolean) {
  const location = globalInstallPath();
  const notes: string[] = [];
  if (fs.existsSync(location)) {
    notes.push(`Plugin already exists at ${location}`);
    return { location, notes };
  }

  ensureDir(path.dirname(location), dryRun);
  runCommand(["git", "clone", REPO_URL, location], path.dirname(location), dryRun);
  notes.push(`Cloned ${REPO_URL} to ${location}`);
  return { location, notes };
}

function projectInit(dryRun: boolean) {
  const projectRoot = resolveProjectRoot();
  const location = projectInstallPath();
  const notes: string[] = [];
  if (fs.existsSync(location)) {
    notes.push(`Submodule path already exists at ${location}`);
    return { location, notes };
  }

  runCommand(["git", "rev-parse", "--is-inside-work-tree"], projectRoot, dryRun);
  ensureDir(path.join(projectRoot, ".cursor", "plugins"), dryRun);
  runCommand(
    ["git", "submodule", "add", REPO_URL, ".cursor/plugins/mstar-harness"],
    projectRoot,
    dryRun,
  );
  notes.push("Added mstar-harness as git submodule at .cursor/plugins/mstar-harness");
  return { location, notes };
}

function globalDoctor() {
  const location = globalInstallPath();
  const errors: string[] = [];
  if (!fs.existsSync(location)) {
    errors.push(`Missing plugin directory: ${location}`);
    return { location, errors };
  }
  const marker = path.join(location, CURSOR_PLUGIN_MARKER);
  if (!fs.existsSync(marker)) {
    errors.push(`Missing Cursor plugin marker file: ${marker}`);
  }
  return { location, errors };
}

function projectDoctor() {
  const projectRoot = resolveProjectRoot();
  const location = projectInstallPath();
  const errors: string[] = [];
  if (!fs.existsSync(location)) {
    errors.push(`Missing submodule directory: ${location}`);
  }

  const gitmodulesPath = path.join(projectRoot, ".gitmodules");
  if (!fs.existsSync(gitmodulesPath)) {
    errors.push("Missing .gitmodules (expected cursor plugin submodule entry).");
    return { location, errors };
  }

  const gitmodules = fs.readFileSync(gitmodulesPath, "utf8");
  if (!gitmodules.includes("path = .cursor/plugins/mstar-harness")) {
    errors.push("Missing .cursor/plugins/mstar-harness entry in .gitmodules.");
  }

  return { location, errors };
}

export const cursorAdapter: AgentAdapter = {
  target: "cursor",
  mode: "install",
  runInstallInit: (scope, dryRun) => {
    if (scope === "global") return globalInit(dryRun);
    return projectInit(dryRun);
  },
  runInstallDoctor: (scope) => {
    if (scope === "global") return globalDoctor();
    return projectDoctor();
  },
};
