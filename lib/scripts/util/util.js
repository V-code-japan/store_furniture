import { world } from "@minecraft/server";
import { isTestMode } from "../config/testMode";
export function sendSystemMessage(text) {
    if (isTestMode) {
        console.warn(`[test] ${text}`);
        world.sendMessage(`§c[test] ${text}`);
    }
}
//# sourceMappingURL=util.js.map