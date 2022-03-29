import { MemoryMapper } from '../src/memorymapper';
import { Cpu } from '../src/cpu';
import { GBRegisters } from '../src/registers';
import { createMemory } from '../src/ram';
import { LcdStatus } from '../src/graphics/lcdStatus';


export const makeLcdStatus = () => {
    let ram = createMemory(0xFFFF);
    let vram = createMemory(0x2000);
    let mm = new MemoryMapper();
    mm.map(0, 0xffff, ram);
    mm.map(0x8000, 0xa000, vram);
    let lcdStatus = new LcdStatus(mm);
    return {
        ram,
        vram,
        mm,
        lcdStatus
    }

}

export const makeTestGB = () => {
    let ram = createMemory(0xFFFF);
    let vram = createMemory(0x2000);
    let mm = new MemoryMapper();
    mm.map(0, 0xffff, ram);
    mm.map(0x8000, 0xa000, vram);
    let cpu = new Cpu(mm, new GBRegisters());
    return {
        ram,
        vram,
        mm,
        cpu,
        dumpRegisters: () => ({
            a: cpu.getRegister('a'),
            b: cpu.getRegister('b'),
            c: cpu.getRegister('c'),
            d: cpu.getRegister('d'),
            e: cpu.getRegister('e'),
            h: cpu.getRegister('h'),
            l: cpu.getRegister('l'),
            af: cpu.getRegister('af'),
            bc: cpu.getRegister('bc'),
            de: cpu.getRegister('de'),
            hl: cpu.getRegister('hl'),
            pc: cpu.getRegister('pc'),
            sp: cpu.getRegister('sp'),
        })
    };
}
