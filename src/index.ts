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
while (cpu.getRegister('pc') != 0x2e) {
    cpu.executeNext();
}
cpu.executeNext(); // inc de
cpu.executeNext(); // ld a,e
cpu.executeNext(); // cp $34
cpu.executeNext(); // jr nz, addr__0027
while (cpu.getRegister('pc') != 0x34) {
    cpu.executeNext();
}
cpu.executeNext(); // ld de,$00d8
cpu.executeNext(); // ld b,$08
cpu.executeNext(); // ld a,(de)
while (cpu.getRegister('pc') != 0x40) {
    cpu.executeNext();
}
cpu.executeNext(); // ld a,$19
cpu.executeNext(); // ld ($9910),a
cpu.executeNext(); // ld hl,$992f
while (cpu.getRegister('pc') != 0x55) {
    cpu.executeNext();
}
cpu.executeNext(); // ld h,a
cpu.executeNext(); // ld a,$64
cpu.executeNext(); // ld d,a
cpu.executeNext(); // ld ($ff00 + 42), a
cpu.executeNext(); // ld a,$91
cpu.executeNext(); // ld ($ff00 + 40), a
cpu.executeNext(); // inc b
cpu.executeNext(); // ld e,$02
cpu.executeNext(); // ld c,$0c
cpu.executeNext(); // ld a,($FF00+44) // "wait for sreen frame"
cpu.executeNext(); // cp, $90
cpu.executeNext(); // jr nz, addr_0064
cpu.debugReg();
cpu.debugFlags();
cpu.debugMemory(0xff42);
cpu.debugMemory(0xff40);
cpu.debugMemory(0xff44);

