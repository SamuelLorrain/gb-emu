import { GBRegisters } from './registers';
import { Cpu } from './cpu';
import { createMemory } from './ram';
import { MemoryMapper } from './memorymapper';
import testRom from '../tests_roms/dmg_rom';
import { Ppu } from './graphics/ppu';
import { SIZE_X, SIZE_Y } from './graphics/frameBuffer';

let bootRom = createMemory(0x100);
let memory = createMemory(0xFFFF);
let vram = createMemory(0x2000);
let mm = new MemoryMapper();
let frame = new Uint16Array(SIZE_X*SIZE_Y);
mm.map(0, 0xffff, memory);
mm.map(0x8000, 0xa000, vram);
mm.map(0x0, 0x00ff, bootRom);

// load testrom
for(const [index, byte] of testRom().entries()) {
    mm.setUint8(index, byte);
}

let cpu = new Cpu(mm, new GBRegisters());
let ppu = new Ppu(mm, frame);

// "wait for screen frame"
while(cpu.getRegister('pc') != 0x64) {
    cpu.executeNext();
    ppu.tick();
}
console.log("waiting for screen frame");
for (let i = 0; i < 1000; i++) {
    cpu.executeNext();
    ppu.tick();
    // cpu.debugMemory(0xff44);
    // console.log("pc : 0x" + cpu.getRegister('pc').toString(16));
}
console.log(frame);

// cpu.debugReg();
// cpu.debugFlags();
// console.log(ppu.lcdc.isLCDAndPpuEnabled());
// cpu.debugMemory(0xff40); // lcdc register
// console.log((mm.getUint8(0xff40) >> 7) & 0b1 ? true : false);

