import { MemoryMapper } from '../memorymapper';
import { PpuRegister } from './ppuRegister';

export class ScrollX implements PpuRegister {
    mmu: MemoryMapper;
    value: number = 0;
    regIndex: number = 0xff43;

    constructor(mmu: MemoryMapper) {
        this.mmu = mmu;
        this.update();
    }

    update() {
        this.value = this.mmu.getUint8(this.regIndex);
    }
}
