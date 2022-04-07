type timing = (t: Timing) => void;

export class Timing {
    frameId: number = NaN;
    last: number = -1;
    acc = 0;
    tick = 0;
    update: timing;
    render: timing;
    framerate: number;
    onFrame: (time:number) => void;

    constructor(update: timing, render: timing, framerate: number = 1/60) {
        this.update = update;
        this.render = render;
        this.framerate = framerate;
        // needed to have 'this' available with requestAnimationFrame
        this.onFrame = this.innerOnFrame.bind(this);
    }

    start() {
        if (this.frameId) {
            return;
        }
        this.last = -1;
        this.frameId = requestAnimationFrame(this.onFrame);
    }

    stop() {
        cancelAnimationFrame(this.frameId);
        this.frameId = NaN;
    }

    innerOnFrame(currentTime: number) {
        this.tick += 1;
        let deltaT = (currentTime - this.last) / 1000;
        while (deltaT < this.framerate) {
            deltaT = (performance.now() - this.last) / 1000;
        }

        this.update(this);
        this.render(this);

        this.last = currentTime;
        this.frameId = requestAnimationFrame(this.onFrame);
    }
}
