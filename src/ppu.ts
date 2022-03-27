/**
* Heavily inspired by : https://blog.tigris.fr/2019/09/15/writing-an-emulator-the-first-pixel/
* and : https://www.youtube.com/watch?v=HyzD8pNlpwI (ultimate gameboy talk)
*/

type ppuState = "oamsearch"|"pixeltransfer"|"hblank"|"vblank";
export class Ppu {
    state: ppuState;
    ly: number; // line y
    ticks: number;
    pixelDrawnsOnCurrentLine: number;


    // vram (8kb)
    // oam ram (160b)
    constructor() {
        this.state = "oamsearch";
        this.ly = 0;
        this.ticks = 0;
        this.pixelDrawnsOnCurrentLine = 0;
    }

    getState(): ppuState {
        return this.state;
    }

    tick() {
        switch (this.state) {
            case "oamsearch":
                // collect sprite data
                // SCAN oam (object attribute memory)
                // from 0xfe00 to 0xfe9f to mix sprit pixels in the current line later
                // it's take 40 clocks ticks
                if (this.ticks == 40) {
                    this.state = "pixeltransfer";
                }
                break;
            case "pixeltransfer":
                // collect push pixels data to display
                // fetch pixel dat ainto pixel FIFO
                // put a pixel for the fifo on the screen
                this.pixelDrawnsOnCurrentLine += 1;
                if (this.pixelDrawnsOnCurrentLine == 160) {
                    this.state = "hblank";
                }
                break;
            case "hblank":
                if (this.ticks == 456) {
                    this.ticks = 0;
                    this.ly += 1;
                    if (this.ly == 144) {
                        this.state = "vblank";
                    } else {
                        this.state = "oamsearch";
                    }
                }
                break;
            case "vblank":
                if (this.ticks == 456) {
                    this.ticks = 0;
                    this.ly += 1;
                    if (this.ly == 153) {
                        this.ly += 0;
                        this.state = "oamsearch";
                    }
                }
                break;
        }
    }
}
