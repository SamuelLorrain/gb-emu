import { MemoryMapper } from "./memorymapper";

export class Ppu {
    mmapper: MemoryMapper;

    constructor(mmapper: MemoryMapper) {
        // using all cpu mmapper instead of just
        // vram to simplify calcs and docs
        this.mmapper = mmapper;
    }
}
