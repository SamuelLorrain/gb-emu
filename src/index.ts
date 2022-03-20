import { GBRegisters } from './registers';
import { Cpu } from './cpu';
import { createMemory } from './ram';
import { MemoryMapper } from './memorymapper';
import { alias } from './instructionAlias';

let memory = createMemory(0xFFFF);
let vram = createMemory(0x2000);
let mm = new MemoryMapper();
mm.map(0, 0xffff, memory);
mm.map(0x8000, 0xa000, vram);


let cpu = new Cpu(mm, new GBRegisters());

memory.setUint8(0x0, alias.LD_HL_D16);
memory.setUint16(0x1, 0xDEAD, true);
memory.setUint8(0x3, alias.LD_A_D8);
memory.setUint8(0x4, 0xFF)
memory.setUint8(0x5, alias.LD_REF_HL_A);

cpu.executeNext();
cpu.executeNext();
cpu.executeNext();
cpu.debugReg();
console.log("=====");
cpu.debugMemory(0xdead, 2);
