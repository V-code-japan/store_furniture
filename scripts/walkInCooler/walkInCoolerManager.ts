// walk-in coolerのカスタムコンポーネント制御

import { BlockComponentOnPlaceEvent, BlockComponentPlayerBreakEvent, BlockComponentPlayerInteractEvent, BlockComponentPlayerPlaceBeforeEvent, StartupEvent } from "@minecraft/server";
import { WalkInCoolerBlock } from "./walkInCoolerBlock";

export class WalkInCoolerManager {

  static registerComponent(startUpEv: StartupEvent) {
    startUpEv.blockComponentRegistry.registerCustomComponent(
      "edu:walk_in_cooler_bottom",
      {
        onPlayerBreak: (ev) => this.onBreakBottom(ev),
        onPlace: (ev) => this.onPlaceBottom(ev),
        onPlayerInteract: (ev) => this.onInteractBottom(ev),
      }
    );

    startUpEv.blockComponentRegistry.registerCustomComponent(
      "edu:walk_in_cooler_top",
      {
        onPlayerBreak: (ev) => this.onBreakTop(ev),
        onPlayerInteract: (ev) => this.onInteractTop(ev),
      }
    );
  }

  static onBreakBottom(ev: BlockComponentPlayerBreakEvent) {
    WalkInCoolerBlock.removeTop(ev.block);
  }
  static onPlaceBottom(ev: BlockComponentOnPlaceEvent) {
    WalkInCoolerBlock.setTop(ev.block);
  }
  static onInteractBottom(ev: BlockComponentPlayerInteractEvent) {
    const topBlock = WalkInCoolerBlock.getTop(ev.block);
    const currentIsOpen = WalkInCoolerBlock.isOpen(ev.block);
    if (topBlock === undefined) return;
    if (currentIsOpen === undefined) return;

    const isOpen = !currentIsOpen;
    WalkInCoolerBlock.setIsOpen(ev.block, isOpen);
    WalkInCoolerBlock.setIsOpen(topBlock, isOpen);
  }

  static onBreakTop(ev: BlockComponentPlayerBreakEvent) {
    WalkInCoolerBlock.removeBottom(ev.block);
  }
  static onInteractTop(ev: BlockComponentPlayerInteractEvent) {
    const bottomBlock = WalkInCoolerBlock.getBottom(ev.block);
    const currentIsOpen = WalkInCoolerBlock.isOpen(ev.block);
    if (bottomBlock === undefined) return;
    if (currentIsOpen === undefined) return;

    const isOpen = !currentIsOpen;
    WalkInCoolerBlock.setIsOpen(ev.block, isOpen);
    WalkInCoolerBlock.setIsOpen(bottomBlock, isOpen);
  }
}