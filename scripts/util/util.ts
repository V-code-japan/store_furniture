import { world } from "@minecraft/server";
import { isTestMode } from "../config/testMode";

export function sendSystemMessage(text: string): void {
  if (isTestMode) {
    console.warn(`[test] ${text}`);
    world.sendMessage(`§c[test] ${text}`);
  }
}