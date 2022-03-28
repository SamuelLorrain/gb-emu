import { MemoryMapper } from "../memorymapper";
import { PpuRegister, ppuState } from "./ppuRegister";


export class LcdStatus implements PpuRegister {
    value: number = 0;
    mmu: MemoryMapper;
    regIndex: number = 0xff41;

    constructor(mmu: MemoryMapper) {
        this.mmu = mmu;
    }

    update() {
        this.value = this.mmu.getUint8(this.regIndex);
    }

    getPpuStatus(): ppuState {
        const x = (this.value >> 6 & 0b11);
        switch (x) {
            case 0: return "hblank";
            case 1: return "vblank";
            case 2: return "oamsearch";
            case 3: return "pixeltransfer";
            default: throw new Error("Impossible state");
        }
    }

    setPpuStatus(state: ppuState) {
        let newValue = this.value
        switch (state) {
            case "hblank":
                newValue &= 0b11111100;
                break;
            case "vblank":
                newValue &= 0b11111101;
                break;
            case "oamsearch":
                newValue &= 0b11111110;
                break;
            case "pixeltransfer":
                newValue &= 0b11111111;
                break;
            default: throw new Error("Impossible state");
        }
        this.mmu.setUint8(this.regIndex,newValue);
        this.value = newValue;
    }

}
