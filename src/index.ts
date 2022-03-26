import { GBRegisters } from './registers';
import { Cpu } from './cpu';
import { createMemory } from './ram';
import { MemoryMapper } from './memorymapper';
import content from '!!raw-loader!../tests_roms/DMG_ROM.b64';
import { decode as b64decode } from 'base64-arraybuffer';
const testRom = new Uint8Array(b64decode(content));

let bootRom = createMemory(0x100);
let memory = createMemory(0xFFFF);
let vram = createMemory(0x2000);
let mm = new MemoryMapper();
mm.map(0, 0xffff, memory);
mm.map(0x8000, 0xa000, vram);
mm.map(0x0, 0x00ff, bootRom);

for(const [index, byte] of testRom.entries()) {
    mm.setUint8(index, byte);
}

let cpu = new Cpu(mm, new GBRegisters());

cpu.executeNext(); // LD SP,$fffe
cpu.executeNext(); // XOR A
cpu.executeNext(); // LD HL,$9fff
cpu.executeNext(); // LD (HL-),A
cpu.executeNext(); // BIT 7,H
cpu.executeNext(); // JR // pb ici
cpu.debugReg();
// cpu.debugMemory(0x0, 30);

