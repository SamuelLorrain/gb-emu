import { Cpu } from "../cpu";
import { Ppu } from "../graphics/ppu";

export class Interface {
    cpu: Cpu;
    ppu: Ppu;

    // sorry
    interface:any;
    registers:any;
    memory:any;
    flags:any;
    run:any;
    stop:any;
    step:any;

    constructor(cpu: Cpu, ppu: Ppu) {
        this.cpu = cpu;
        this.ppu = ppu;
        this.interface = document.getElementById("interface");
        this.registers = document.getElementById("registers");
        this.memory = document.getElementById("memory");
        this.flags = document.getElementById("flags");
        this.run = document.getElementById("run");
        this.stop = document.getElementById("stop");
        this.step = document.getElementById("step");
        if (!this.interface ||
            !this.registers ||
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
        this.cpu.debugFlags();
    }

    tick() {
        this.cpu.executeNext();
        this.ppu.tick();

    }

    doRun() {

    }

    doStop() {

    }

    doStep() {
        console.log("step");
        this.tick();
        this.updateInterface();
    }
}

