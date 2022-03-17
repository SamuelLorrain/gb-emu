import { Cpu } from '../src/cpu';
import { GBRegisters } from '../src/registers';
import { createMemory, RAM_SIZE_IN_BYTES } from '../src/ram';
import { alias } from '../src/instructionAlias';

const makeRam = () => {
    return createMemory(RAM_SIZE_IN_BYTES);
}
const makeGB = (memory) => {
    const cpu = new Cpu(memory, new GBRegisters());
    return cpu;
}

test('GB is successfully initiated', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    expect(gb.getRegister('a')).toBe(0);
    expect(gb.getRegister('f')).toBe(0);
    expect(gb.getRegister('b')).toBe(0);
    expect(gb.getRegister('c')).toBe(0);
    expect(gb.getRegister('d')).toBe(0);
    expect(gb.getRegister('e')).toBe(0);
    expect(gb.getRegister('h')).toBe(0);
    expect(gb.getRegister('l')).toBe(0);
    expect(gb.getRegister('sp')).toBe(0);
    expect(gb.getRegister('pc')).toBe(0);
});

test('can set registers', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    gb.setRegister('a', 1);
    gb.setRegister('f', 1);
    gb.setRegister('b', 1);
    gb.setRegister('c', 1);
    gb.setRegister('d', 1);
    gb.setRegister('e', 1);
    gb.setRegister('h', 1);
    gb.setRegister('l', 1);
    gb.setRegister('sp', 1);
    gb.setRegister('pc', 1);
    expect(gb.getRegister('a')).toBe(1);
    expect(gb.getRegister('f')).toBe(1);
    expect(gb.getRegister('b')).toBe(1);
    expect(gb.getRegister('c')).toBe(1);
    expect(gb.getRegister('d')).toBe(1);
    expect(gb.getRegister('e')).toBe(1);
    expect(gb.getRegister('h')).toBe(1);
    expect(gb.getRegister('l')).toBe(1);
    expect(gb.getRegister('sp')).toBe(1);
    expect(gb.getRegister('pc')).toBe(1);
});

test('can fetchNext() instruction', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    ram.setUint8(0x0, 0xFF);
    ram.setUint8(0x1, 0xAA);
    expect(gb.fetchNext()).toBe(0xFF);
    expect(gb.getRegister('pc')).toBe(0x1);
    expect(gb.fetchNext()).toBe(0xAA);
    expect(gb.getRegister('pc')).toBe(0x2);
});

test('can execute instruction', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    ram.setUint8(0x0, alias.NOP);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x1);
});


test('can set zero flag without touching others', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    expect(gb.getRegister('f')).toBe(0b00000000);
    gb.setZFlag(1);
    expect(gb.getRegister('f')).toBe(0b10000000);
    gb.setZFlag(0);
    expect(gb.getRegister('f')).toBe(0b00000000);

    gb.setRegister('f', 0b10101010);
    gb.setZFlag(1);
    expect(gb.getRegister('f')).toBe(0b10101010);
    gb.setZFlag(0);
    expect(gb.getRegister('f')).toBe(0b00101010);
});

test('can set substract/N flag without touching others', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    expect(gb.getRegister('f')).toBe(0b00000000);
    gb.setNFlag(1);
    expect(gb.getRegister('f')).toBe(0b01000000);
    gb.setNFlag(0);
    expect(gb.getRegister('f')).toBe(0b00000000);

    gb.setRegister('f', 0b10101010);
    gb.setNFlag(1);
    expect(gb.getRegister('f')).toBe(0b11101010);
    gb.setNFlag(0);
    expect(gb.getRegister('f')).toBe(0b10101010);
});


test('can set half-carry flag without touching others', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    expect(gb.getRegister('f')).toBe(0b00000000);
    gb.setHFlag(1);
    expect(gb.getRegister('f')).toBe(0b00100000);
    gb.setHFlag(0);
    expect(gb.getRegister('f')).toBe(0b00000000);

    gb.setRegister('f', 0b10101010);
    gb.setHFlag(1);
    expect(gb.getRegister('f')).toBe(0b10101010);
    gb.setHFlag(0);
    expect(gb.getRegister('f')).toBe(0b10001010);
});


test('can set carry flag without touching others', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    expect(gb.getRegister('f')).toBe(0b00000000);
    gb.setCFlag(1);
    expect(gb.getRegister('f')).toBe(0b00010000);
    gb.setCFlag(0);
    expect(gb.getRegister('f')).toBe(0b00000000);

    gb.setRegister('f', 0b10101010);
    gb.setCFlag(1);
    expect(gb.getRegister('f')).toBe(0b10111010);
    gb.setCFlag(0);
    expect(gb.getRegister('f')).toBe(0b10101010);
});
