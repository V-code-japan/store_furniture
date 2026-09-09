import { system } from "@minecraft/server";
import { WalkInCoolerManager } from "./walkInCooler/walkInCoolerManager";
import { sendSystemMessage } from "./util/util";
import { DisplayManager } from "./display/displayManager";
// カスタムコンポーネント登録
system.beforeEvents.startup.subscribe((ev) => {
    WalkInCoolerManager.registerComponent(ev);
    DisplayManager.registerComponent(ev);
});
system.afterEvents.scriptEventReceive.subscribe((ev) => {
    sendSystemMessage(`id: ${ev.id}, entity: ${ev.sourceEntity}`);
});
//# sourceMappingURL=main.js.map