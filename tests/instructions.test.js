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

test('nop instruction', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    ram.setUint8(0x0, alias.NOP);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x1);
});

test('LD_BC_D16 instruction', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    ram.setUint8(0x0, alias.LD_BC_D16);
    ram.setUint16(0x1, 0xDEAD, true);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x3);
    expect(gb.getRegister('b')).toBe(0xDE);
    expect(gb.getRegister('c')).toBe(0xAD);
});

test('LD_REF_BC_A instruction', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    ram.setUint8(0x0, alias.LD_REF_BC_A);
    gb.setRegister('b', 0xFF);
    gb.setRegister('c', 0xF0);
    gb.setRegister('a', 0xAA);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x1);
    expect(gb.getRegister('b')).toBe(0xFF);
    expect(gb.getRegister('c')).toBe(0xF0);
    expect(gb.getRegister('a')).toBe(0xAA);
    expect(ram.getUint8(0xFFF0)).toBe(0xAA);
});

test('INC_BC', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    ram.setUint8(0x0, alias.INC_BC);
    gb.setRegister('b', 0xFF);
    gb.setRegister('c', 0xF0);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x1);
    expect(gb.getRegister('b')).toBe(0xFF);
    expect(gb.getRegister('c')).toBe(0xF1);

    ram.setUint8(0x1, alias.INC_BC);
    gb.setRegister('b', 0xFF);
    gb.setRegister('c', 0xFF);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x2);
    expect(gb.getRegister('b')).toBe(0x00);
    expect(gb.getRegister('c')).toBe(0x00);

    ram.setUint8(0x2, alias.INC_BC);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x3);
    expect(gb.getRegister('b')).toBe(0x00);
    expect(gb.getRegister('c')).toBe(0x01);

    ram.setUint8(0x3, alias.INC_BC);
    gb.setRegister('b', 0x00);
    gb.setRegister('c', 0xFF);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x4);
    expect(gb.getRegister('b')).toBe(0x01);
    expect(gb.getRegister('c')).toBe(0x00);
})

test('INC_B', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    ram.setUint8(0x0, alias.INC_B);
    gb.setRegister('b', 0xFF);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x1);
    expect(gb.getRegister('b')).toBe(0x00);

    ram.setUint8(0x1, alias.INC_B);
    gb.setRegister('b', 0x00);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x2);
    expect(gb.getRegister('b')).toBe(0x01);

    ram.setUint8(0x2, alias.INC_B);
    gb.setRegister('b', 0xF0);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x3);
    expect(gb.getRegister('b')).toBe(0xF1);
});

test('DEC_B', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    ram.setUint8(0x0, alias.DEC_B);
    gb.setRegister('b', 0xFF);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x1);
    expect(gb.getRegister('b')).toBe(0xFE);

    ram.setUint8(0x1, alias.DEC_B);
    gb.setRegister('b', 0x00);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x2);
    expect(gb.getRegister('b')).toBe(0xFF);

    ram.setUint8(0x2, alias.DEC_B);
    gb.setRegister('b', 0xF0);
    gb.executeNext();
    expect(gb.getRegister('pc')).toBe(0x3);
    expect(gb.getRegister('b')).toBe(0xEF);
});

test('LD_B_D8', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    ram.setUint8(0x0, alias.LD_B_D8);
    ram.setUint8(0x1, 0xAB);
    gb.executeNext();
    expect(gb.getRegister('b')).toBe(0xAB);
});

 test('RLCA', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    ram.setUint8(0x0, alias.RLCA);
    gb.setRegister('a', 0b10101010);
    gb.executeNext();
    expect(gb.getRegister('a')).toBe(0b01010101);
    expect(gb.getRegister('f')).toBe(0b00010000);

    ram.setUint8(0x1, alias.RLCA);
    gb.setRegister('a', 0b01111111);
    gb.executeNext();
    expect(gb.getRegister('a')).toBe(0b11111110);
    expect(gb.getRegister('f')).toBe(0b00000000);

    ram.setUint8(0x2, alias.RLCA);
    gb.setRegister('a', 0b0);
    gb.executeNext();
    expect(gb.getRegister('a')).toBe(0b0);
    expect(gb.getRegister('f')).toBe(0b10000000);
});

 test('LD_REF_A16_SP', function() {
    const ram = makeRam();
    const gb = makeGB(ram);
    ram.setUint8(0x0, alias.LD_REF_A16_SP);
    ram.setUint16(0x1, 0xABCD, true);
    gb.setRegister('sp', 0xFFFF);
    gb.executeNext();
    expect(ram.getUint16(0xABCD, 0xFFFF));
});
