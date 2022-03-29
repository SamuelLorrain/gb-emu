import { MemoryMapper } from '../memorymapper';
import { LcdStatus } from './lcdStatus';
import { PixelFetcher } from './pixelFetcher';
import { ppuState } from './ppuRegister';

/**
* Heavily inspired by : https://blog.tigris.fr/2019/09/15/writing-an-emulator-the-first-pixel/
* and : https://www.youtube.com/watch?v=HyzD8pNlpwI (ultimate gameboy talk)
*/
export class Ppu {
    state: LcdStatus;
    ly: number; // line y
    ticks: number;
    pixelDrawnsOnCurrentLine: number;
    mmu: MemoryMapper;
    fetcher: PixelFetcher;


    // vram (8kb)
    // oam ram (160b)
    constructor(mmu: MemoryMapper) {
        this.state = new LcdStatus(mmu);
        this.ly = 0;
        this.ticks = 0;
        this.mmu = mmu;
        this.pixelDrawnsOnCurrentLine = 0;
        this.fetcher = new PixelFetcher(this.mmu);
    }

    getState(): ppuState {
        return this.state.getPpuStatus();
    }

    tick() {
        this.ticks += 1;
        switch (this.state.getPpuStatus()) {
            case "oamsearch":
                // collect sprite data
                // SCAN oam (object attribute memory)
                // from 0xfe00 to 0xfe9f to mix sprit pixels in the current line later
                if (this.ticks == 20) {
                    this.state.setPpuStatus("pixeltransfer");
                    this.debug();
                }
                break;
            case "pixeltransfer":
                // collect pixels data to be displayed
                // fetch pixel data into pixel FIFO
                // put a pixel for the fifo on the screen
                this.pixelDrawnsOnCurrentLine += 1;
                if (this.pixelDrawnsOnCurrentLine == 160) {
                    this.state.setPpuStatus("hblank");
                    this.debug();
                }
                break;
            case "hblank":
                // do nothing
                if (this.ticks == 456) {
                    this.ticks = 0;
                    this.ly += 1;
                    if (this.ly == 144) {
                        this.state.setPpuStatus("vblank");
                        this.debug();
                    } else {
                        this.state.setPpuStatus("oamsearch");
                        this.debug();
                    }
                }
                break;
            case "vblank":
                // do nothing
                if (this.ticks == 456) {
                    this.ticks = 0;
                    this.ly += 1;
                    if (this.ly == 153) {
                        this.ly += 0;
                        this.state.setPpuStatus("oamsearch");
                        this.debug();
                    }
                }
                break;
        }
    }

    debug() {
        console.log("0xff40 (lcdStatus):")
        console.log("\tstatus:" + this.state.getPpuStatus());
        console.log("ly : " + this.ly);
        console.log("ticks : " + this.ticks);
        console.log("xDrawns : " + this.pixelDrawnsOnCurrentLine);
    }
}
