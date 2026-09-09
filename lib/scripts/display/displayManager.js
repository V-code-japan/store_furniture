import { BlockPermutation } from "@minecraft/server";
import { sendSystemMessage } from "../util/util";
export class DisplayManager {
    static registerComponent(startupEv) {
        startupEv.blockComponentRegistry.registerCustomComponent("edu:set_display_state", {
            onPlace: (ev) => this.onPlace(ev),
        });
    }
    static onPlace(ev) {
        // ランダムにedu:display_typeを変更
        const type = Math.floor(Math.random() * 3);
        // 現在のdirectionを取得
        const dir = ev.block.permutation.getState("minecraft:cardinal_direction");
        if (dir === undefined) {
            sendSystemMessage(`[BasketManager onPlace] ${ev.block.typeId}の"minecraft:cardinal_directionがundefinedです`);
            throw new Error(`[BasketManager onPlace] ${ev.block.typeId}の"minecraft:cardinal_directionがundefinedです`);
        }
        if (ev.block.typeId === "edu:basket") {
            ev.block.setPermutation(BlockPermutation.resolve("edu:basket", { "edu:display_type": type, "minecraft:cardinal_direction": dir }));
        }
        else if (ev.block.typeId === "edu:fish_display") {
            // const connection = ev.block.permutation.getState("minecraft:cardinal_connection" as keyof BlockStateSuperset);
            // if (connection === undefined) {
            //   sendSystemMessage(`[BasketManager onPlace] ${ev.block.typeId}の"minecraft:cardinal_connectionがundefinedです`);
            //   throw new Error(`[BasketManager onPlace] ${ev.block.typeId}の"minecraft:cardinal_connectionがundefinedです`);
            // }
            ev.block.setPermutation(BlockPermutation.resolve("edu:fish_display", {
                "edu:display_type": type,
                "minecraft:cardinal_direction": dir,
                // "minecraft:cardinal_connection": connection,
            }));
        }
    }
}
//# sourceMappingURL=displayManager.js.map