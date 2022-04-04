import { GBRegisters } from './registers';
import { Cpu } from './cpu';
import { createMemory } from './ram';
import { MemoryMapper } from './memorymapper';
import testRom from '../tests_roms/dmg_rom';
import { Ppu } from './graphics/ppu';
import { LCD_SIZE_X, LCD_SIZE_Y } from './graphics/frameBuffer';
import { Screen } from './replaced_modules/lcd.module_replaced';
import { loadRom } from './replaced_modules/load_rom.module_replaced';

let bootRom = createMemory(0x100);
let memory = createMemory(0xFFFF);
let vram = createMemory(0x2000);
let rom = createMemory(0x8000 - 0x100);
let mm = new MemoryMapper();
let frame = new Uint16Array(LCD_SIZE_X*LCD_SIZE_Y);
let screen = new Screen();
mm.map(0, 0xffff, memory);
mm.map(0x100, 0x7fff, rom);
mm.map(0x8000, 0xa000, vram);
mm.map(0x0, 0x00ff, bootRom);
mm.enableDevice(rom, false); // deactivate rom access,
                             // as we don't have any
loadRom(mm);

// load testrom
for(const [index, byte] of testRom().entries()) {
    mm.setUint8(index, byte);
}
let cpu = new Cpu(mm, new GBRegisters());
let ppu = new Ppu(mm, frame, screen);

// "waiting for screen frame"
while(cpu.getRegister('pc') != 0x64) {
    cpu.executeNext();
    ppu.tick();
}
console.log("waiting for screen frame");
for(;;) {
    cpu.executeNext();
    ppu.tick();
    if(cpu.getRegister('pc') > 0xe0) { // lock up
        break;
    }
}
