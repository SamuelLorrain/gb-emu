import { MemoryMapper } from '../src/memorymapper';
import { Cpu } from '../src/cpu';
import { GBRegisters } from '../src/registers';
import { createMemory } from '../src/ram';
import { LcdStatus } from '../src/graphics/lcdStatus';
import { Lcdc } from '../src/graphics/lcdc';
import { PixelFetcher } from '../src/graphics/pixelFetcher';
import { LCD_SIZE_X, LCD_SIZE_Y } from '../src/graphics/frameBuffer';
import { Screen } from '../src/view/graphicScreenWeb';
import { Ppu } from '../src/graphics/ppu';

export const putGraphicsInRam = (mmu, tileId = 1) => {
    mmu.setUint16(0x8000 + (tileId*16), 0x3c);
    mmu.setUint16(0x8001 + (tileId*16), 0x7e);
    mmu.setUint16(0x8002 + (tileId*16), 0x42);
    mmu.setUint16(0x8003 + (tileId*16), 0x42);
    mmu.setUint16(0x8004 + (tileId*16), 0x42);
    mmu.setUint16(0x8005 + (tileId*16), 0x42);
    mmu.setUint16(0x8006 + (tileId*16), 0x42);
    mmu.setUint16(0x8007 + (tileId*16), 0x42);
    mmu.setUint16(0x8008 + (tileId*16), 0x7e);
    mmu.setUint16(0x8009 + (tileId*16), 0x5e);
    mmu.setUint16(0x800a + (tileId*16), 0x7e);
    mmu.setUint16(0x800b + (tileId*16), 0x0a);
    mmu.setUint16(0x800c + (tileId*16), 0x7c);
    mmu.setUint16(0x800d + (tileId*16), 0x56);
    mmu.setUint16(0x800e + (tileId*16), 0x38);
    mmu.setUint16(0x800f + (tileId*16), 0x7c);

    // tile map
    for(let i = 0x9800; i <= 0x9bff; i++) {
        mmu.setUint8(i, tileId);
    }
};

// like putGraphicsInRam but with two
// different tiles
export const putTwoGraphicsInRam = (mmu) => {
    const tileId1 = 1;
    mmu.setUint16(0x8000 + (tileId1*16), 0x3c);
    mmu.setUint16(0x8001 + (tileId1*16), 0x7e);
    mmu.setUint16(0x8002 + (tileId1*16), 0x42);
    mmu.setUint16(0x8003 + (tileId1*16), 0x42);
    mmu.setUint16(0x8004 + (tileId1*16), 0x42);
    mmu.setUint16(0x8005 + (tileId1*16), 0x42);
    mmu.setUint16(0x8006 + (tileId1*16), 0x42);
    mmu.setUint16(0x8007 + (tileId1*16), 0x42);
    mmu.setUint16(0x8008 + (tileId1*16), 0x7e);
    mmu.setUint16(0x8009 + (tileId1*16), 0x5e);
    mmu.setUint16(0x800a + (tileId1*16), 0x7e);
    mmu.setUint16(0x800b + (tileId1*16), 0x0a);
    mmu.setUint16(0x800c + (tileId1*16), 0x7c);
    mmu.setUint16(0x800d + (tileId1*16), 0x56);
    mmu.setUint16(0x800e + (tileId1*16), 0x38);
    mmu.setUint16(0x800f + (tileId1*16), 0x7c);

    const tileId2 = 2;
    mmu.setUint16(0x8000 + (tileId2*16), 0xff);
    mmu.setUint16(0x8001 + (tileId2*16), 0x00);
    mmu.setUint16(0x8002 + (tileId2*16), 0x7e);
    mmu.setUint16(0x8003 + (tileId2*16), 0xff);
    mmu.setUint16(0x8004 + (tileId2*16), 0x85);
    mmu.setUint16(0x8005 + (tileId2*16), 0x81);
    mmu.setUint16(0x8006 + (tileId2*16), 0x89);
    mmu.setUint16(0x8007 + (tileId2*16), 0x83);
    mmu.setUint16(0x8008 + (tileId2*16), 0x93);
    mmu.setUint16(0x8009 + (tileId2*16), 0x85);
    mmu.setUint16(0x800a + (tileId2*16), 0xa5);
    mmu.setUint16(0x800b + (tileId2*16), 0x8b);
    mmu.setUint16(0x800c + (tileId2*16), 0xc9);
    mmu.setUint16(0x800d + (tileId2*16), 0x97);
    mmu.setUint16(0x800e + (tileId2*16), 0x7e);
    mmu.setUint16(0x800f + (tileId2*16), 0xff);

    // tile map
    for(let i = 0x9800; i <= 0x9bff; i+=2) {
        mmu.setUint8(i, tileId1);
        mmu.setUint8(i+1, tileId2);
    }
}

export const makePpu = () => {
    let ram = createMemory(0xFFFF);
    let vram = createMemory(0x2000);
    let mm = new MemoryMapper();
    let frameBuffer = makeFrameBuffer();
    let screen = new Screen();
    mm.map(0, 0xffff, ram);
    mm.map(0x8000, 0xa000, vram);
    let ppu = new Ppu(mm, frameBuffer, screen);
    return {
        ppu,
        ram,
        vram,
        mm,
        frameBuffer,
        screen,
    }
}

export const makeFrameBuffer = () => {
    return new Uint16Array(LCD_SIZE_X*LCD_SIZE_Y)
}

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
