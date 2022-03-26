import { GBRegisters } from './registers';
import { Cpu } from './cpu';
import { createMemory } from './ram';
import { MemoryMapper } from './memorymapper';
import testRom from './dmg_rom';

let bootRom = createMemory(0x100);
let memory = createMemory(0xFFFF);
let vram = createMemory(0x2000);
let mm = new MemoryMapper();
mm.map(0, 0xffff, memory);
mm.map(0x8000, 0xa000, vram);
mm.map(0x0, 0x00ff, bootRom);

for(const [index, byte] of testRom().entries()) {
    mm.setUint8(index, byte);
}

let cpu = new Cpu(mm, new GBRegisters());

// 0 to JR NZ,Addr_0007
while(cpu.getRegister('pc') < 0x0c) {
    cpu.executeNext();
}
cpu.executeNext(); // ld hl,$ff26
cpu.executeNext(); // ld c,$11
cpu.executeNext(); // ld a,$80
cpu.executeNext(); // ld (hl-),a
cpu.executeNext(); // ld ($ff00+c),a
cpu.executeNext(); // inc c
cpu.executeNext(); // ld a,$f3
cpu.executeNext(); // ld ($ff00+c),a
cpu.executeNext(); // ld (hl-),a
cpu.executeNext(); // ld a,$77
cpu.executeNext(); // ld (hl),a
cpu.executeNext(); // ld a,$fc
cpu.executeNext(); // ld ($ff00+47),a
cpu.executeNext(); // ld de,$0104
cpu.executeNext(); // ld hl,$8010
cpu.executeNext(); // ld a,(de) // 0 because no rom is loaded
cpu.executeNext(); // call $0095
cpu.executeNext(); // ld c,a
cpu.executeNext(); // ld b,$04
while (cpu.getRegister('pc') < 0xa3) {
    cpu.executeNext();
}
cpu.executeNext(); // ld (hl+),a
cpu.executeNext(); // inc hl
cpu.executeNext(); // ld (hl+),a
cpu.executeNext(); // inc hl
cpu.executeNext(); // ret
cpu.executeNext(); // call $0096
cpu.debugReg();
cpu.debugFlags();
cpu.debugMemory(0xfffa, 5);
// cpu.debugMemory(0xff11, 5);
// cpu.debugMemory(0xff26, 5);
// cpu.debugMemory(0xff47);

