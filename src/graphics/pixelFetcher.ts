import { MemoryMapper } from '../memorymapper';

type PixelFetcherState = "ReadTileId"|"ReadTile0"|"ReadTile1"|"PushToFifo";
const TILE_DATA_SIZE = 8;
export class PixelFetcher {
    currentMapAddr: number = 0;
    currentLine: number = 0;
    currentTileLow: number =  0;
    currentTileHigh: number = 0;
    currentTileAddr: number = 0;
    mmu: MemoryMapper;
    fifo: PixelFIFO;
    state: PixelFetcherState = "ReadTileId";
    Ntick: number = 0;
    tileIndex: number = 0;
    tileData: Uint8Array;

    constructor(mmu : MemoryMapper) {
        this.fifo = new PixelFIFO(); // may be injected instead
        this.mmu = mmu;
        this.tileData = new Uint8Array(TILE_DATA_SIZE);
    }

    initForLine(mapAddr: number, line: number) {
        this.tileIndex = 0;
        this.currentMapAddr = mapAddr;
        this.currentLine = line;
        this.state = "ReadTileId";
        this.fifo.clear();
    }

    tick() {
        this.Ntick+=1;
        if (this.Ntick < 2) {
            return
        }
        this.Ntick = 0;
        switch (this.state) {
            case "ReadTileId":
                this.currentTileAddr = this.mmu.getUint8(this.currentMapAddr + this.tileIndex);
                this.state = 'ReadTile0';
                break;
            case "ReadTile0":
                this.readTileLine(0);
                this.state = 'ReadTile1';
                break;
            case "ReadTile1":
                this.readTileLine(1);
                this.tileIndex += 1;
                this.state = 'PushToFifo';
                break;
            case "PushToFifo":
                this.pushToFifo();
                break;
            default:
                throw new Error("Something very bad happened");
        }
    }

    readTileLine(bitPlane:  0|1) {
        const offset = 0x8000 + (this.tileIndex * 16);
        const addr = offset + (this.currentLine * 2);
        const pixelData = this.mmu.getUint8(addr + bitPlane);
        for(let i = 0; i < 8; i++) {
            if (bitPlane == 0) {
                this.tileData[i] = (pixelData >> i) & 0b1;
            } else {
                this.tileData[i] |= ((pixelData >> i) & 0b1) << 1;
            }
        }
    }

    pushToFifo() {
        if (this.fifo.length() <= 8) {
            for(let i = 7; i >= 0; i--) {
                this.fifo.enqueue(this.tileData[i]);
            }
            this.tileIndex += 1;
            this.state = "ReadTileId";
        }
    }
}

const FIFO_SIZE = 32;

/**
* FIFO class,
* don't check if the fifo is empty, may
* override if it is full!
*/
export class PixelFIFO {
    container: Uint8Array;
    start: number = FIFO_SIZE;
    finish: number = FIFO_SIZE-1;
    len: number = 0;

    constructor() {
        this.container = new Uint8Array(FIFO_SIZE);
    }

    enqueue(n: number) {
        if (this.start > 0) {
            this.start -= 1;
        } else {
            this.start = FIFO_SIZE-1;
        }
        this.container[this.start] = n & 0xff;
        this.len += 1;
    }

    deque(): number {
        const v = this.container[this.finish];
        if (this.finish > 0) {
            this.finish -= 1;
        } else {
            this.finish = FIFO_SIZE-1;
        }
        this.len -= 1;
        return v;
    }

    length(): number {
        return this.len;
    }

    clear() {
        this.start = FIFO_SIZE;
        this.finish = FIFO_SIZE-1;
        this.len = 0;
    }
}

