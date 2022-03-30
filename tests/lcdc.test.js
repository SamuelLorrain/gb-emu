import { ObjSize } from '../src/graphics/lcdc';
import { makeLcdc } from './init';

test('lcdc can update himself according to ram', function() {
    const lcdc = makeLcdc();
    lcdc.mm.setUint8(0xff40, 0xff);
    lcdc.lcdc.update();
    expect(lcdc.lcdc.value).toBe(0xff);

    lcdc.mm.setUint8(0xff40, 0xab);
    // don't update when we don't have updated
    expect(lcdc.lcdc.value).toBe(0xff);
    lcdc.lcdc.update();
    expect(lcdc.lcdc.value).toBe(0xab);
});


test('can show lcd/ppu state', function() {
    const lcdc = makeLcdc();
    lcdc.mm.setUint8(0xff40,0b10110101);
    expect(lcdc.lcdc.isLCDAndPpuEnabled()).toBe(true);
    lcdc.mm.setUint8(0xff40,0b00110101);
    expect(lcdc.lcdc.isLCDAndPpuEnabled()).toBe(false);
});

test('can show window/tile map area', function() {
    const lcdc = makeLcdc();
    lcdc.mm.setUint8(0xff40,0b11010101);
    expect(lcdc.lcdc.getWindowTileMapArea()).toStrictEqual([0x9800, 0x9bff]);
    lcdc.mm.setUint8(0xff40,0b00010101);
    expect(lcdc.lcdc.getWindowTileMapArea()).toStrictEqual([0x9c00, 0x9fff]);
});

test('can show window state', function() {
    const lcdc = makeLcdc();
    lcdc.mm.setUint8(0xff40,0b10110101);
    expect(lcdc.lcdc.isWindowEnabled()).toBe(true);
    lcdc.mm.setUint8(0xff40,0b10010101);
    expect(lcdc.lcdc.isWindowEnabled()).toBe(false);
});

test('can show bg/window tilemap area', function() {
    const lcdc = makeLcdc();
    lcdc.mm.setUint8(0xff40,0b11010101);
    expect(lcdc.lcdc.getBGAndWindowTileDataArea()).toStrictEqual([0x8800, 0x97ff]);
    lcdc.mm.setUint8(0xff40,0b11100101);
    expect(lcdc.lcdc.getBGAndWindowTileDataArea()).toStrictEqual([0x8000, 0x8fff]);
});

test('can show bg/tile map area', function() {
    const lcdc = makeLcdc();
    lcdc.mm.setUint8(0xff40,0b11010101);
    expect(lcdc.lcdc.getWindowTileMapArea()).toStrictEqual([0x9800, 0x9bff]);
    lcdc.mm.setUint8(0xff40,0b00010001);
    expect(lcdc.lcdc.getWindowTileMapArea()).toStrictEqual([0x9c00, 0x9fff]);
});

test('can show obj size', function() {
    const lcdc = makeLcdc();
    lcdc.mm.setUint8(0xff40,0b11010111);
    expect(lcdc.lcdc.getObjSize()).toBe(ObjSize.Small);
    lcdc.mm.setUint8(0xff40,0b00010001);
    expect(lcdc.lcdc.getObjSize()).toBe(ObjSize.Big);
});

test('can show is obj enabled', function() {
    const lcdc = makeLcdc();
    lcdc.mm.setUint8(0xff40,0b11010111);
    expect(lcdc.lcdc.isObjEnabled()).toBe(true);
    lcdc.mm.setUint8(0xff40,0b00010000);
    expect(lcdc.lcdc.isObjEnabled()).toBe(false);
});
