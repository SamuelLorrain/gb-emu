import { LCD_SIZE_X, LCD_SIZE_Y } from '../graphics/frameBuffer'

export class Screen {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error("ctx can't be null");
        }
        this.ctx = ctx;
    }

    update(frameBuffer :Uint16Array) {
        let imgData = this.ctx.createImageData(LCD_SIZE_X,LCD_SIZE_Y);
        for(let i = 0; i < LCD_SIZE_Y; i++) {
            for(let j = 0; j < LCD_SIZE_X; j++) {
                const currentPixelToDraw = frameBuffer[(i*LCD_SIZE_X) + j];
                const color = this.getColor(currentPixelToDraw);
                for(let k = 0; k < 4; k++) {
                    imgData.data[(i * LCD_SIZE_X * 4) + (j * 4 + k)] = color[k];
                }
            }
        }
        this.ctx.putImageData(imgData, 0, 0);
    }

    getColor(n: number) {
        switch(n) {
            case 0:
                return [0xff,0xff,0xff,0xff];
            case 1:
                return [155,188,15,0xff];
            case 2:
                return [139,172,15,0xff];
            case 3:
                return [15,56,15,0xff];
            default:
                throw Error("impossible color");
        }
    }
};
