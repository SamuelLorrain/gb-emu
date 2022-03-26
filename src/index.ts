import { GBRegisters } from './registers';
import { Cpu } from './cpu';
import { createMemory } from './ram';
import { MemoryMapper } from './memorymapper';
import content from '!!raw-loader!../tests_roms/DMG_ROM.b64';
import { decode as b64decode } from 'base64-arraybuffer';
import * as h from './helpers';

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
cpu.executeNext(); // LD HL,$9FFF
cpu.executeNext(); // LD (HL-), A
cpu.executeNext(); // BIT 7,H
cpu.executeNext(); // JR, NZ, Addr__0007
cpu.executeNext();
// pass the loop
cpu.setRegister('pc', 0xc);
cpu.prefetchedInstruction = cpu.mmapper.getUint8(cpu.getRegister('pc'));
cpu.executeNext(); // LD HL,$ff26
cpu.executeNext(); // LD C,$11
cpu.executeNext(); // LD A,$80
cpu.executeNext(); // LD (HL-),A
cpu.executeNext(); // LD ($ff00+C),A
cpu.executeNext(); // INC C
cpu.executeNext(); // LD A,$f3
cpu.executeNext(); // LD ($ff00+C),A
cpu.executeNext(); // LD (HL-),A
cpu.executeNext(); // LD A,$77
cpu.executeNext(); // LD (HL),A
cpu.executeNext(); // LD A,$fc
cpu.executeNext(); // LD ($ff00+$47),A
cpu.executeNext(); // LD DE,$0104
cpu.executeNext(); // LD HL,$8010
cpu.executeNext(); // LD A,(DE) (no card inserted so value is 0)
cpu.debugReg();
console.log("====");
cpu.executeNext(); // CALL $0095
cpu.debugReg();
cpu.debugMemory(0xfffc, 1);
cpu.debugMemory(0xfffe, 1);
// cpu.debugMemory(0xff11, 5);
// cpu.debugMemory(0xff26, 5);
// cpu.debugMemory(0xff47, 5);
// cpu.debugMemory(0x0104, 5);

