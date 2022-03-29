import { MemoryMapper } from "../memorymapper";
import { PpuRegister } from "./ppuRegister";

export enum ObjSize {
    Small,
    Big
}

export class Lcdc implements PpuRegister {
    value: number = 0;
    mmu: MemoryMapper;
    regIndex: number = 0Xff40;

    constructor(mmu: MemoryMapper) {
        this.mmu = mmu;
        this.update();
    }

    update() {
        this.value = this.mmu.getUint8(0xff40);
    }

    disable() {
        this.value = this.value & 0b11111110;
        this.update();
    }

    isLCDAndPpuEnabled(): boolean {
        this.update();
        return ((this.value >> 7) & 0b1) ? true : false;
    }

    getWindowTileMapArea(): [number,number] {
        this.update();
        return ((this.value >> 6) & 0b1) ?
        [0x9800, 0x9bff] :
        [0x9c00, 0x9fff] ;
    }

    isWindowEnabled(): boolean {
        this.update();
        return ((this.value >> 5) & 0b1) ? true : false;
    }

    getBGAndWindowTileDataArea(): [number, number] {
        this.update();
        return ((this.value >> 4) & 0b1) ?
            [0x8800, 0x97ff]:
            [0x8000, 0x8fff];
    }

    getBGTileMapArea(): [number, number] {
        this.update();
        return ((this.value >> 3) & 0b1) ?
            [0x9800, 0x9bff]:
            [0x9c00, 0x9fff];
    }

    getObjSize(): ObjSize {
        this.update();
        return ((this.value >> 2) & 0b1) ?
            ObjSize.Small:
            ObjSize.Big;
    }

    isObjEnabled(): boolean {
        this.update();
        return ((this.value >> 1) & 0b1) ?
            true :
            false;
    }

    // result differ on DMG and CGB
    BgAndWindowPriority() {
        this.update();
        return (this.value & 0b1) ?
            true :
            false;
    }
}
