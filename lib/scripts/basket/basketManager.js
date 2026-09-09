import { BlockPermutation } from "@minecraft/server";
import { sendSystemMessage } from "../util/util";
export class BasketManager {
    static registerComponent(startupEv) {
        startupEv.blockComponentRegistry.registerCustomComponent("edu:set_basket_state", {
            onPlace: (ev) => this.onPlace(ev),
        });
    }
    static onPlace(ev) {
        // ランダムにedu:vegitable_typeを変更
        const type = Math.floor(Math.random() * 3);
        // 現在のdirectionを取得
        const dir = ev.block.permutation.getState("minecraft:cardinal_direction");
        if (dir === undefined) {
            sendSystemMessage(`[BasketManager onPlace] ${ev.block.typeId}の"minecraft:cardinal_directionがundefinedです`);
            throw new Error(`[BasketManager onPlace] ${ev.block.typeId}の"minecraft:cardinal_directionがundefinedです`);
        }
        const perm = ev.block.setPermutation(BlockPermutation.resolve("edu:basket", { "edu:vegetable_type": type, "minecraft:cardinal_direction": dir }));
    }
}
//# sourceMappingURL=basketManager.js.map