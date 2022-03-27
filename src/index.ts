import { GBRegisters } from './registers';
import { Cpu } from './cpu';
import { createMemory } from './ram';
import { MemoryMapper } from './memorymapper';
import testRom from '../tests_roms/dmg_rom';

let bootRom = createMemory(0x100);
let memory = createMemory(0xFFFF);
let vram = createMemory(0x2000);
let mm = new MemoryMapper();
mm.map(0, 0xffff, memory);
mm.map(0x8000, 0xa000, vram);
mm.map(0x0, 0x00ff, bootRom);

// load testrom
for(const [index, byte] of testRom().entries()) {
    mm.setUint8(index, byte);
}

let cpu = new Cpu(mm, new GBRegisters());

// "wait for screen frame"
while(cpu.getRegister('pc') != 0x64) {
    cpu.executeNext();
}
cpu.debugReg();
cpu.debugFlags();
cpu.debugMemory(0xff42);
cpu.debugMemory(0xff40); // lcdc register
cpu.debugMemory(0xff44); // lcdc y-coordinate

