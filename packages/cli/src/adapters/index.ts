import type { AgentAdapter, Target } from "../types";
import { cursorAdapter } from "./cursor";
import { opencodeAdapter } from "./opencode";

const adapters: Record<Target, AgentAdapter> = {
  opencode: opencodeAdapter,
  cursor: cursorAdapter,
};

export function getAdapter(target: Target) {
  const adapter = adapters[target];
  if (!adapter) throw new Error(`Unsupported target: ${target}`);
  return adapter;
}
