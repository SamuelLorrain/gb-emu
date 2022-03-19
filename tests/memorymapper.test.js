import { createMemory } from '../src/ram';
import { MemoryMapper } from '../src/memorymapper'

test('full memory mapper map as wanted', function() {
    const ram = createMemory(0xFFFF + 1);
    const mmapper = new MemoryMapper();

    // create a mapper mapping with only one device
    mmapper.map(0, 0x10000, ram);

    ram.setUint8(0x0, 0);
    mmapper.setUint8(0x0, 0xFF)
    expect(mmapper.getUint8(0x0)).toBe(0xFF);

    ram.setUint8(0xFFFF, 0);
    mmapper.setUint8(0xFFFF, 0xFF)
    expect(mmapper.getUint8(0xFFFF)).toBe(0xFF);

    ram.setUint8(0xABCD, 0x0);
    mmapper.setUint8(0xABCD, 0xFF)
    expect(mmapper.getUint8(0xABCD)).toBe(0xFF);

    ram.setUint16(0xDEAD, 0x0);
    mmapper.setUint16(0xDEAD, 0xFFFF)
    expect(mmapper.getUint16(0xDEAD)).toBe(0xFFFF);
});

test('multi mapper map as wanted', function() {
    const ram = createMemory(0xFFFF + 1);
    const rom1 = createMemory(0xAA);
    const rom2 = createMemory(0xAA);
    const mmapper = new MemoryMapper();
    mmapper.map(0x0, 0xFFFF+1, ram);
    mmapper.map(0x0, 0xAA, rom1);
    mmapper.map(0xAA, 0xAA + 0xAA, rom2);

    mmapper.setUint8(0x0, 0xab);
    expect(mmapper.getUint8(0x0)).toBe(0xab);
    expect(rom1.getUint8(0x0)).toBe(0xab);
    expect(rom2.getUint8(0x0)).toBe(0x00);
    expect(ram.getUint8(0x0)).toBe(0x00);

    mmapper.setUint8(0xBB, 0xab);
    expect(mmapper.getUint8(0xBB)).toBe(0xab);
    expect(rom1.getUint8(0xBB - 0xAA)).toBe(0x0);
    expect(rom2.getUint8(0xBB - 0xAA)).toBe(0xab);
    expect(ram.getUint8(0xBB - 0xAA)).toBe(0x00);
});
