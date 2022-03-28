import { MemoryMapper } from '../memorymapper';
import { LcdStatus } from './lcdStatus';
import { ppuState } from './ppuRegister';
/**
* Heavily inspired by : https://blog.tigris.fr/2019/09/15/writing-an-emulator-the-first-pixel/
* and : https://www.youtube.com/watch?v=HyzD8pNlpwI (ultimate gameboy talk)
*/

export class Ppu {
    state: LcdStatus; // use lcdStatus register instead
    ly: number; // line y
    ticks: number;
    pixelDrawnsOnCurrentLine: number;
    mmu: MemoryMapper;


    // vram (8kb)
    // oam ram (160b)
    constructor(mmu: MemoryMapper) {
        this.state = new LcdStatus(mmu);
        this.ly = 0;
        this.ticks = 0;
        this.pixelDrawnsOnCurrentLine = 0;
        this.mmu = mmu;
    }

    getState(): ppuState {
        return this.state.getPpuStatus();
    }

    tick() {
        switch (this.state.getPpuStatus()) {
            case "oamsearch":
                // collect sprite data
                // SCAN oam (object attribute memory)
                // from 0xfe00 to 0xfe9f to mix sprit pixels in the current line later
                // it's take 40 clocks ticks
                if (this.ticks == 40) {
                    this.state.setPpuStatus("pixeltransfer");
                }
                break;
            case "pixeltransfer":
                // collect push pixels data to display
                // fetch pixel dat ainto pixel FIFO
                // put a pixel for the fifo on the screen
                this.pixelDrawnsOnCurrentLine += 1;
                if (this.pixelDrawnsOnCurrentLine == 160) {
                    this.state.setPpuStatus("hblank");
                }
                break;
            case "hblank":
                if (this.ticks == 456) {
                    this.ticks = 0;
                    this.ly += 1;
                    if (this.ly == 144) {
                        this.state.setPpuStatus("vblank");
                    } else {
                        this.state.setPpuStatus("oamsearch");
                    }
                }
                break;
            case "vblank":
                if (this.ticks == 456) {
                    this.ticks = 0;
                    this.ly += 1;
                    if (this.ly == 153) {
                        this.ly += 0;
                        this.state.setPpuStatus("oamsearch");
                    }
                }
                break;
        }
    }
}
