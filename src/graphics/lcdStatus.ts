import { MemoryMapper } from "../memorymapper";
import { PpuRegister, ppuState } from "./ppuRegister";


export class LcdStatus implements PpuRegister {
    value: number = 0;
    mmu: MemoryMapper;
    regIndex: number = 0xff41;

    constructor(mmu: MemoryMapper) {
        this.mmu = mmu;
        this.update();
    }

    update() {
        this.value = this.mmu.getUint8(this.regIndex);
    }

    getPpuStatus(): ppuState {
        const x = (this.value & 0b11);
        switch (x) {
            case 0: return "hblank";
            case 1: return "vblank";
            case 2: return "oamsearch";
            case 3: return "pixeltransfer";
            default: throw new Error("Impossible state");
        }
    }

    setPpuStatus(state: ppuState) {
        let newValue = (this.value & 0b11111100);
        switch (state) {
            case "hblank":
                newValue |= 0x0;
                break;
            case "vblank":
                newValue |= 0x1;
                break;
            case "oamsearch":
                newValue |= 0x2;
                break;
            case "pixeltransfer":
                newValue |= 0x3;
                break;
            default: throw new Error("Impossible state");
        }
        this.mmu.setUint8(this.regIndex, newValue);
        this.value = newValue;
    }
}
