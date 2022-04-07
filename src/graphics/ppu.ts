import { MemoryMapper } from '../memorymapper';
import { LcdStatus } from './lcdStatus';
import { PixelFetcher } from './pixelFetcher';
import { ppuState } from './ppuRegister';
import { FrameBuffer, LCD_SIZE_X } from './frameBuffer';
import { Lcdc } from './lcdc';
import { ScrollX } from './scrollX';
import { ScrollY } from './scrollY';

/**
* Heavily inspired by : https://blog.tigris.fr/2019/09/15/writing-an-emulator-the-first-pixel/
* and : https://www.youtube.com/watch?v=HyzD8pNlpwI (ultimate gameboy talk)
*/
export class Ppu {
    ly: number; // line y should be a register
    ticks: number;
    pixelDrawnsOnCurrentLine: number;
    mmu: MemoryMapper;
    fetcher: PixelFetcher;
    onOff: boolean;
    frameBuffer: FrameBuffer;
    screen: any

    // registers
    lcdc: Lcdc;
    state: LcdStatus;
    scroll: {x: ScrollX, y: ScrollY};

    // vram (8kb)
    // oam ram (160b)
    constructor(mmu: MemoryMapper, frameBuffer: FrameBuffer, screen: any) {
        this.state = new LcdStatus(mmu);
        this.ly = 0;
        this.ticks = 0;
        this.mmu = mmu;
        this.scroll = {
            x: new ScrollX(this.mmu),
            y: new ScrollY(this.mmu),
        };
        this.pixelDrawnsOnCurrentLine = 0;
        this.fetcher = new PixelFetcher(this.mmu);
        this.lcdc = new Lcdc(mmu);
        this.onOff = false;
        this.frameBuffer = frameBuffer;
        this.screen = screen;
    }


    getState(): ppuState {
        return this.state.getPpuStatus();
    }

    updateLy() {
        this.mmu.setUint8(0xff44, this.ly); // TODO may be better
    }

    tick() {
        if (!this.lcdc.isLCDAndPpuEnabled()) {
            if (this.onOff) {
                this.onOff = false;
            }
            return;
        }
        else {
            if (!this.onOff) {
                this.onOff = true;
                this.ticks = 0;
                this.ly = 0;
            }
        }

        this.ticks += 1;
        this.updateLy();

        switch (this.state.getPpuStatus()) {
            case "oamsearch":
                // collect sprite data
                // SCAN oam (object attribute memory)
                // from 0xfe00 to 0xfe9f to mix sprit pixels in the current line later
                if (this.ticks == 20) {
                    this.pixelDrawnsOnCurrentLine = 0;
                    this.scroll.y.update();
                    const yDraw = this.scroll.y.value + this.ly;
                    const tileLine = this.ly % 8;
                    const tileMapRowAddr = (0x9800 + (Math.floor(yDraw/8)) * 32);
                    this.fetcher.initForLine(tileMapRowAddr, tileLine);
                    this.state.setPpuStatus("pixeltransfer");
                }
                break;
            case "pixeltransfer":
                this.fetcher.tick();
                if (this.fetcher.fifo.length() < 8) {
                    return
                }
                const pixel = this.fetcher.fifo.deque();
                this.frameBuffer[(this.ly * LCD_SIZE_X) + this.pixelDrawnsOnCurrentLine] = pixel;

                this.pixelDrawnsOnCurrentLine += 1;
                if (this.pixelDrawnsOnCurrentLine == 160) {
                    this.state.setPpuStatus("hblank");
                }
                break;
            case "hblank":
                // do nothing
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
                // do nothing
                if (this.ticks == 456) {
                    this.ticks = 0;
                    this.ly += 1;
                    if (this.ly == 153) {
                        this.ly = 0;
                        this.state.setPpuStatus("oamsearch");
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

    updateScreen() {
        if (this.getState() === 'vblank'
            && this.ticks === 456
            && this.ly === 153) {

            this.screen.update(this.frameBuffer);
        }
    }
}
