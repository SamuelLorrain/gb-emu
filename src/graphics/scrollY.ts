import { MemoryMapper } from '../memorymapper';
import { PpuRegister } from './ppuRegister';

export class ScrollY implements PpuRegister {
    mmu: MemoryMapper;
    value: number = 0;
    regIndex: number = 0xff42;

    constructor(mmu: MemoryMapper) {
        this.mmu = mmu;
        this.update();
    }

    update() {
        this.value = this.mmu.getUint8(this.regIndex);
    }
}
