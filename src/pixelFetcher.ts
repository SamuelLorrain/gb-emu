import { MemoryMapper } from "./memorymapper";

interface Pixel {
    color: 0|1|2|3;
    palette: 0|1;
}

export class PixelFetcher {
    data: Uint8Array;
    tile: number;
    currentTileLow: number;
    currentTileHigh: number;
    mmu: MemoryMapper;

    constructor(mmu : MemoryMapper) {
        this.data = new Uint8Array(16);
        this.tile = 0;
        this.mmu = mmu;
    }

    getTile(tile: number) {
        this.tile = tile;
    }

    getTileDataLow(){
    }

    getTileDataHigh(){

    }

    sleep(){
        //
    }

    pushOut(){

    }
}
