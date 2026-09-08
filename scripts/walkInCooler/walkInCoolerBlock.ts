import { Block, BlockPermutation, Direction } from "@minecraft/server";
import { sendSystemMessage } from "../util/util";
import { BlockStateSuperset, MinecraftBlockTypes } from "@minecraft/vanilla-data";

// walk-in coolerのブロックに関する処理
export class WalkInCoolerBlock {

  static getDirection(block: Block): Direction | undefined {
    const dir = block.permutation.getState("minecraft:cardinal_direction");

    if (dir === undefined) {
      sendSystemMessage(`[getDirection] ${block.typeId}のcardinal_directionが見つかりません`);
      return undefined;
    }

    return this.convertStrToDir(dir);
  }

  static setDirection(block: Block, dir: Direction): void {
    const isOpen = this.isOpen(block);
    const strDir = this.convertDirToStr(dir);

    if (isOpen === undefined) return;
    if (strDir === undefined) return;

    block.setPermutation(
      BlockPermutation.resolve(
        block.typeId,
        {
          "minecraft:cardinal_direction": strDir,
          "edu:is_open": isOpen,
        }
      )
    );
  }

  static isOpen(block: Block): boolean | undefined {
    const isOpen = block.permutation.getState("edu:is_open" as keyof BlockStateSuperset);

    if (typeof isOpen !== "boolean") {
      sendSystemMessage(`[isOpen] edu:is_openの型が${typeof isOpen}です`);
      return undefined
    }

    return isOpen;
  }

  static setIsOpen(block: Block, isOpen: boolean): void {
    const dir = this.getDirection(block);
    
    if (dir === undefined) return;

    const strDir = this.convertDirToStr(dir);

    if (strDir === undefined) return;

    block.setPermutation(
      BlockPermutation.resolve(
        block.typeId,
        {
          "minecraft:cardinal_direction": strDir,
          "edu:is_open": isOpen,
        }
      )
    );
  }

  static getTop(block: Block): Block | undefined {
    const topBlock = block.above();

    if (topBlock === undefined) {
      sendSystemMessage("[getTop] 上部のブロックが見つかりません");
      return undefined;
    }

    return topBlock;
  }

  static getBottom(block: Block): Block | undefined {
    const bottomBlock = block.below();

    if (bottomBlock === undefined) {
      sendSystemMessage("[getBottom] 下部のブロックが見つかりません");
      return undefined;
    }

    return bottomBlock;
  }

  // 設置は上部のみ（下部基準で設置するため）
  static setTop(block: Block): void {
    const topBlock = this.getTop(block);
    const dir = this.getDirection(block);
    const isOpen = this.isOpen(block);
    if (topBlock === undefined || !topBlock.isAir) return;
    if (dir === undefined) return;
    if (isOpen === undefined) return;

    sendSystemMessage("[setTop] 上部ブロックを設置します");
    topBlock.setType("edu:walk_in_cooler_top");
    this.setDirection(topBlock, dir);
    this.setIsOpen(topBlock, isOpen);
  }

  static removeTop(block: Block): void {
    const topBlock = this.getTop(block);
    if (topBlock === undefined) return;

    if (topBlock.typeId === "edu:walk_in_cooler_top") {
      topBlock.setType(MinecraftBlockTypes.Air);
    }
  }

  static removeBottom(block: Block): void {
    const bottomBlock = this.getBottom(block);
    if (bottomBlock === undefined) return;

    if (bottomBlock.typeId === "edu:walk_in_cooler") {
      bottomBlock.setType(MinecraftBlockTypes.Air);
    }
  }

  private static convertDirToStr(
    dir: Direction
  ): string | undefined {
    let strDir: string | undefined = undefined;

    switch (dir) {
      case Direction.North:
        strDir = "north";
        break;
      
      case Direction.South:
        strDir = "south";
        break;
      
      case Direction.East:
        strDir = "east";
        break;

      case Direction.West:
        strDir = "west";
        break;

      default:
        sendSystemMessage('Directionをstringに変換できません');
        break;
    }

    return strDir;
  }

  private static convertStrToDir(
    strDir: string
  ): Direction | undefined {
    let dir: Direction | undefined = undefined;

    switch (strDir) {
      case "north":
        dir = Direction.North;
        break;
      
      case "south":
        dir = Direction.South;
        break;
      
      case "east":
        dir = Direction.East;
        break;
      
      case "west":
        dir = Direction.West;

      default:
        sendSystemMessage('stringをDirectionに変換できません');
        break;
    }

    return dir;
  }
}