import { MemoryMapper } from '../src/memorymapper';
import { Cpu } from '../src/cpu';
import { GBRegisters } from '../src/registers';
import { createMemory } from '../src/ram';
import { LcdStatus } from '../src/graphics/lcdStatus';
import { Lcdc } from '../src/graphics/lcdc';
import { PixelFetcher } from '../src/graphics/pixelFetcher';

export const putGraphicsInRam = (mmu) => {
    // tile data (number 0x01)
    mmu.setUint16(0x8010, 0x3c);
    mmu.setUint16(0x8011, 0x7e);
    mmu.setUint16(0x8012, 0x42);
    mmu.setUint16(0x8013, 0x42);
    mmu.setUint16(0x8014, 0x42);
    mmu.setUint16(0x8015, 0x42);
    mmu.setUint16(0x8016, 0x42);
    mmu.setUint16(0x8017, 0x42);
    mmu.setUint16(0x8018, 0x7e);
    mmu.setUint16(0x8019, 0x5e);
    mmu.setUint16(0x801a, 0x7e);
    mmu.setUint16(0x801b, 0x0a);
    mmu.setUint16(0x801c, 0x7c);
    mmu.setUint16(0x801c, 0x56);
    mmu.setUint16(0x801e, 0x38);
    mmu.setUint16(0x801f, 0x7c);

    // tile map
    mmu.setUint8(0x9800,0x1);
    mmu.setUint8(0x9801,0x1);
    mmu.setUint8(0x9802,0x1);
    mmu.setUint8(0x9803,0x1);
    mmu.setUint8(0x9804,0x1);
    mmu.setUint8(0x9805,0x1);
    mmu.setUint8(0x9806,0x1);
    mmu.setUint8(0x9807,0x1);
};

export const makePixelFetcher = () => {
    let ram = createMemory(0xFFFF);
    let vram = createMemory(0x2000);
    let mm = new MemoryMapper();
    mm.map(0, 0xffff, ram);
    mm.map(0x8000, 0xa000, vram);
    let pixelFetcher = new PixelFetcher(mm);
    return {
        ram,
        vram,
        mm,
        pixelFetcher
    }

}

export const makeLcdc = () => {
    let ram = createMemory(0xFFFF);
    let vram = createMemory(0x2000);
    let mm = new MemoryMapper();
    mm.map(0, 0xffff, ram);
    mm.map(0x8000, 0xa000, vram);
    let lcdc = new Lcdc(mm);
    return {
        ram,
        vram,
        mm,
        lcdc
    }

}

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
