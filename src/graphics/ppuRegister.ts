import {MemoryMapper} from '../memorymapper';

export type ppuState = "oamsearch"|"pixeltransfer"|"hblank"|"vblank";

export interface PpuRegister {
    mmu: MemoryMapper;
    value: number;
    update: () => void;
    regIndex: number;
}
