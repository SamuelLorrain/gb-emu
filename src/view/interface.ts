import { Cpu } from "../cpu";
import { Ppu } from "../graphics/ppu";

export class Interface {
    cpu: Cpu;
    ppu: Ppu;

    // sorry
    registers:any;
    memory:any;
    flags:any;
    run:any;
    stop:any;
    step:any;
    stopEvent: string|null = null;

    constructor(cpu: Cpu, ppu: Ppu) {
        this.cpu = cpu;
        this.ppu = ppu;
        this.registers = document.getElementById("registers");
        this.memory = document.getElementById("memory");
        this.flags = document.getElementById("flags");
        this.run = document.getElementById("run");
        this.stop = document.getElementById("stop");
        this.step = document.getElementById("step");
        if (!this.registers ||
            !this.memory ||
            !this.flags ||
            !this.run ||
            !this.stop ||
            !this.step) {

            throw new Error("unable to create interface");
        }

        this.run.onclick = this.doRun.bind(this);
        this.step.onclick = this.doStep.bind(this);
        this.stop.onclick = this.doStop.bind(this);
    }

    updateInterface() {
        this.cpu.debugReg();
    }

    tick() {
        this.cpu.executeNext();
        this.ppu.tick();

    }

    doRun() {
        // can't work...
        // while(!this.stopEvent) {
        //     this.cpu.executeNext();
        //     this.ppu.tick();
        // }
    }

    doStop() {
        this.updateInterface();
        this.stopEvent = "stop";
    }

    doStep() {
        this.tick();
        this.updateInterface();
    }
}

