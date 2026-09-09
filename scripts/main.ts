import { StartupEvent, system } from "@minecraft/server";
import { WalkInCoolerManager } from "./walkInCooler/walkInCoolerManager";
import { sendSystemMessage } from "./util/util";
import { BasketManager } from "./basket/basketManager";

// カスタムコンポーネント登録
system.beforeEvents.startup.subscribe((ev: StartupEvent) => {
  WalkInCoolerManager.registerComponent(ev);
  BasketManager.registerComponent(ev);
});

system.afterEvents.scriptEventReceive.subscribe((ev) => {
  sendSystemMessage(`id: ${ev.id}, entity: ${ev.sourceEntity}`);
});
