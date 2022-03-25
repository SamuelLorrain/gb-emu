import { makeTestGB } from './init';
import { alias } from './../src/instructionAlias';

test('NOP', () => {
    const gb = makeTestGB();
    gb.cpu.mmapper.setUint8(0x0, alias.NOP);
    gb.cpu.executeNext();
    expect(gb.cpu.getRegister('pc')).toBe(1);
});

test('LD_BC_D16', () => {
    const gb = makeTestGB();
    gb.cpu.mmapper.setUint8(0x0, alias.LD_BC_D16);
    gb.cpu.mmapper.setUint16(0x1, 0xdead);
    gb.cpu.executeNext();
    expect(gb.cpu.getRegister('pc')).toBe(3);
    expect(gb.cpu.getRegister('bc')).toBe(0xdead);
    expect(gb.cpu.getRegister('pc')).toBe(3);
});

test('LD_REF_BC_A', () => {
    const gb = makeTestGB();
    gb.cpu.mmapper.setUint8(0x0, alias.LD_REF_BC_A);
    gb.cpu.setRegister('bc', 0xdead);
    gb.cpu.setRegister('a', 0x88);
    gb.cpu.executeNext();
    expect(gb.cpu.getRegister('pc')).toBe(1);
    expect(gb.cpu.mmapper.getUint8(0xdead)).toBe(0x88);
});

test('INC_BC', () => {
    const gb = makeTestGB();
    gb.cpu.mmapper.setUint8(0x0, alias.LD_REF_BC_A);
    gb.cpu.setRegister('bc', 0xdead);
    gb.cpu.setRegister('a', 0x88);
    gb.cpu.executeNext();
    expect(gb.cpu.getRegister('pc')).toBe(1);
    expect(gb.cpu.mmapper.getUint8(0xdead)).toBe(0x88);
});
