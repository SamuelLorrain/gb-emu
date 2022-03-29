import { MemoryMapper } from '../memorymapper';
import { FrameBuffer } from './frameBuffer';

export class PixelFetcher {
    currentMapAddr: number = 0;
    currentLine: number = 0;
    currentTileLow: number =  0;
    currentTileHigh: number = 0;
    currentTileAddr: number = 0;
    mmu: MemoryMapper;
    fifo: PixelFIFO;
    frameBuffer: FrameBuffer;

    constructor(mmu : MemoryMapper, frameBuffer: FrameBuffer) {
        this.fifo = new PixelFIFO(); // may be injected instead
        this.mmu = mmu;
        this.frameBuffer = frameBuffer;
    }

    runForLine(mapAddr: number, line: number) {
        this.currentMapAddr = mapAddr;
        this.currentLine = line;
        this.currentTileAddr = this.currentMapAddr + this.currentLine;

        this.fifo.clear();
    }

    readHigh() {
        this.currentTileHigh = this.mmu.getUint8(this.currentTileAddr);
    }

    readLow() {
        this.currentTileLow = this.mmu.getUint8(this.currentTileAddr + 1);
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

