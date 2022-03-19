import { GBRegisters } from './registers';
import { Cpu } from './cpu';
import { createMemory, RAM_SIZE_IN_BYTES } from './ram';

let memory = createMemory(RAM_SIZE_IN_BYTES);
let cpu = new Cpu(memory, new GBRegisters());
memory.setInt8(0, 0x10);
cpu.debugReg();
cpu.debugMemory(10, 5);
cpu.executeNext();
cpu.debugReg();
cpu.debugMemory(10, 5);
cpu.debugFlags();
