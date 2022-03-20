import { GBRegisters } from './registers';
import { Cpu } from './cpu';
import { createMemory } from './ram';
import { MemoryMapper } from './memorymapper';

let memory = createMemory(0xFFFF);
let vram = createMemory(0x2000);
let mm = new MemoryMapper();
mm.map(0, 0xffff, memory);
mm.map(0x8000, 0xa000, vram);

let cpu = new Cpu(mm, new GBRegisters());

for(let i = 0; i <= 0xFF; i++) {
    cpu.executeNext();
}
cpu.debugReg();
cpu.debugMemory(0xdead, 2);
