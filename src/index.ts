import { GBRegisters } from './registers';
import { Cpu } from './cpu';
import { createMemory, RAM_SIZE_IN_BYTES } from './ram';
import { MemoryMapper } from './memorymapper';
import { alias } from './instructionAlias';

let memory = createMemory(RAM_SIZE_IN_BYTES);
let mm = new MemoryMapper();
mm.map(0, 0xffff, memory as DataView);

let cpu = new Cpu(mm, new GBRegisters());

memory.setUint8(0x0, alias.LD_HL_D16);
memory.setUint16(0x1, 0xDEAD, true);
// memory.setUint8(0x3, alias.LD_A_D8);
// memory.setUint8(0x4, 0xFF)
// memory.setUint8(0x5, alias.LD_A_REF_HL);

cpu.executeNext();
// cpu.executeNext();
// cpu.executeNext();
cpu.debugMemory(0x0, 6);
console.log("======");
cpu.debugReg();
cpu.debugMemory(0xDEAD, 5);
