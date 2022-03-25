import { makeTestGB } from './init';


test('Can set 16 bits registers', function () {
    const gb = makeTestGB();
    expect(gb.cpu.getRegister('af')).toBe(0);
    expect(gb.cpu.getRegister('bc')).toBe(0);
    expect(gb.cpu.getRegister('de')).toBe(0);
    expect(gb.cpu.getRegister('hl')).toBe(0);
    expect(gb.cpu.getRegister('sp')).toBe(0);
    expect(gb.cpu.getRegister('pc')).toBe(0);

    gb.cpu.setRegister('af', 0xABCD);
    gb.cpu.setRegister('bc', 0xABCD);
    gb.cpu.setRegister('de', 0xABCD);
    gb.cpu.setRegister('hl', 0xABCD);
    gb.cpu.setRegister('sp', 0xABCD);
    gb.cpu.setRegister('pc', 0xABCD);

    expect(gb.cpu.getRegister('af')).toBe(0xABCD);
    expect(gb.cpu.getRegister('bc')).toBe(0xABCD);
    expect(gb.cpu.getRegister('de')).toBe(0xABCD);
    expect(gb.cpu.getRegister('hl')).toBe(0xABCD);
    expect(gb.cpu.getRegister('sp')).toBe(0xABCD);
    expect(gb.cpu.getRegister('pc')).toBe(0xABCD);
    expect(gb.cpu.getRegister('a')).toBe(0xAB);
    expect(gb.cpu.getRegister('f')).toBe(0xCD);
    expect(gb.cpu.getRegister('b')).toBe(0xAB);
    expect(gb.cpu.getRegister('c')).toBe(0xCD);
    expect(gb.cpu.getRegister('d')).toBe(0xAB);
    expect(gb.cpu.getRegister('e')).toBe(0xCD);
    expect(gb.cpu.getRegister('h')).toBe(0xAB);
    expect(gb.cpu.getRegister('l')).toBe(0xCD);
});

test('GB is successfully initiated', function() {
    const gb = makeTestGB();
    expect(gb.cpu.getRegister('a')).toBe(0);
    expect(gb.cpu.getRegister('f')).toBe(0);
    expect(gb.cpu.getRegister('b')).toBe(0);
    expect(gb.cpu.getRegister('c')).toBe(0);
    expect(gb.cpu.getRegister('d')).toBe(0);
    expect(gb.cpu.getRegister('e')).toBe(0);
    expect(gb.cpu.getRegister('h')).toBe(0);
    expect(gb.cpu.getRegister('l')).toBe(0);
    expect(gb.cpu.getRegister('af')).toBe(0);
    expect(gb.cpu.getRegister('bc')).toBe(0);
    expect(gb.cpu.getRegister('de')).toBe(0);
    expect(gb.cpu.getRegister('hl')).toBe(0);
    expect(gb.cpu.getRegister('sp')).toBe(0);
    expect(gb.cpu.getRegister('pc')).toBe(0);
});

test('can set registers', function() {
    const gb = makeTestGB();
    gb.cpu.setRegister('a', 1);
    gb.cpu.setRegister('f', 1);
    gb.cpu.setRegister('b', 1);
    gb.cpu.setRegister('c', 1);
    gb.cpu.setRegister('d', 1);
    gb.cpu.setRegister('e', 1);
    gb.cpu.setRegister('h', 1);
    gb.cpu.setRegister('l', 1);
    gb.cpu.setRegister('sp', 1);
    gb.cpu.setRegister('pc', 1);
    expect(gb.cpu.getRegister('a')).toBe(1);
    expect(gb.cpu.getRegister('f')).toBe(1);
    expect(gb.cpu.getRegister('b')).toBe(1);
    expect(gb.cpu.getRegister('c')).toBe(1);
    expect(gb.cpu.getRegister('d')).toBe(1);
    expect(gb.cpu.getRegister('e')).toBe(1);
    expect(gb.cpu.getRegister('h')).toBe(1);
    expect(gb.cpu.getRegister('l')).toBe(1);
    expect(gb.cpu.getRegister('sp')).toBe(1);
    expect(gb.cpu.getRegister('pc')).toBe(1);
});

test('can fetchNext() instruction', function() {
    const gb = makeTestGB();
    gb.ram.setUint8(0x0, 0xFF);
    gb.ram.setUint8(0x1, 0xAA);
    expect(gb.cpu.fetchNext()).toBe(0xFF);
    expect(gb.cpu.getRegister('pc')).toBe(0x1);
    expect(gb.cpu.fetchNext()).toBe(0xAA);
    expect(gb.cpu.getRegister('pc')).toBe(0x2);
});

test('can execute instruction', function() {
    const gb = makeTestGB();
    gb.ram.setUint8(0x0, 0x0);
    gb.cpu.executeNext();
    expect(gb.cpu.getRegister('pc')).toBe(0x1);
});


test('can set zero flag without touching others', function() {
    const gb = makeTestGB();
    expect(gb.cpu.getRegister('f')).toBe(0b00000000);
    gb.cpu.setZFlag(1);
    expect(gb.cpu.getRegister('f')).toBe(0b10000000);
    gb.cpu.setZFlag(0);
    expect(gb.cpu.getRegister('f')).toBe(0b00000000);

    gb.cpu.setRegister('f', 0b10101010);
    gb.cpu.setZFlag(1);
    expect(gb.cpu.getRegister('f')).toBe(0b10101010);
    gb.cpu.setZFlag(0);
    expect(gb.cpu.getRegister('f')).toBe(0b00101010);
});

test('can set substract/N flag without touching others', function() {
    const gb = makeTestGB();
    expect(gb.cpu.getRegister('f')).toBe(0b00000000);
    gb.cpu.setNFlag(1);
    expect(gb.cpu.getRegister('f')).toBe(0b01000000);
    gb.cpu.setNFlag(0);
    expect(gb.cpu.getRegister('f')).toBe(0b00000000);

    gb.cpu.setRegister('f', 0b10101010);
    gb.cpu.setNFlag(1);
    expect(gb.cpu.getRegister('f')).toBe(0b11101010);
    gb.cpu.setNFlag(0);
    expect(gb.cpu.getRegister('f')).toBe(0b10101010);
});


test('can set half-carry flag without touching others', function() {
    const gb = makeTestGB();
    expect(gb.cpu.getRegister('f')).toBe(0b00000000);
    gb.cpu.setHFlag(1);
    expect(gb.cpu.getRegister('f')).toBe(0b00100000);
    gb.cpu.setHFlag(0);
    expect(gb.cpu.getRegister('f')).toBe(0b00000000);

    gb.cpu.setRegister('f', 0b10101010);
    gb.cpu.setHFlag(1);
    expect(gb.cpu.getRegister('f')).toBe(0b10101010);
    gb.cpu.setHFlag(0);
    expect(gb.cpu.getRegister('f')).toBe(0b10001010);
});


test('can set carry flag without touching others', function() {
    const gb = makeTestGB();
    expect(gb.cpu.getRegister('f')).toBe(0b00000000);
    gb.cpu.setCFlag(1);
    expect(gb.cpu.getRegister('f')).toBe(0b00010000);
    gb.cpu.setCFlag(0);
    expect(gb.cpu.getRegister('f')).toBe(0b00000000);

    gb.cpu.setRegister('f', 0b10101010);
    gb.cpu.setCFlag(1);
    expect(gb.cpu.getRegister('f')).toBe(0b10111010);
    gb.cpu.setCFlag(0);
    expect(gb.cpu.getRegister('f')).toBe(0b10101010);
});

test('can push', function() {
    const gb = makeTestGB();
    gb.cpu.setRegister('pc', 0xff);
    gb.cpu.push(0xabcd);
    expect(gb.cpu.getRegister('pc')).toBe(0xfd);
    expect(gb.mm.getUint8(0xfe)).toBe(0xab);
    expect(gb.mm.getUint8(0xfd)).toBe(0xcd);
});

test('can pop', function() {
    const gb = makeTestGB();
    gb.cpu.setRegister('pc', 0xfd);
    gb.mm.setUint8(0xfe, 0xab);
    gb.mm.setUint8(0xfd, 0xcd);
    const v = gb.cpu.pop();
    expect(v).toBe(0xabcd);
    expect(gb.cpu.getRegister('pc')).toBe(0xff);
});
