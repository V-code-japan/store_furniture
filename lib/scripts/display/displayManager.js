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
        const perm = ev.block.permutation;
        if (dir === undefined) {
            sendSystemMessage(`[BasketManager onPlace] ${ev.block.typeId}の"minecraft:cardinal_directionがundefinedです`);
            throw new Error(`[BasketManager onPlace] ${ev.block.typeId}の"minecraft:cardinal_directionがundefinedです`);
        }
        ev.block.setPermutation(perm.withState("edu:display_type", type));
    }
}
//# sourceMappingURL=displayManager.js.map