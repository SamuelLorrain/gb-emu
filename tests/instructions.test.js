import { makeTestGB } from './init';
import { alias, prefixCBAlias } from './../src/instructionAlias';

test('BIT_7_H', () => {
    const gb = makeTestGB();
    gb.cpu.mmapper.setUint8(0x0, alias.PREFIX_CB);
    gb.cpu.mmapper.setUint8(0x1, prefixCBAlias.BIT_7_H);
    gb.cpu.setRegister('h', 0x0);
    gb.cpu.setZFlag(0);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(1);

    gb.cpu.setRegister('pc', 0x0);
    gb.cpu.setRegister('h', 0b10000000);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(0);
})

test('BIT_6_H', () => {
    const gb = makeTestGB();
    gb.cpu.mmapper.setUint8(0x0, alias.PREFIX_CB);
    gb.cpu.mmapper.setUint8(0x1, prefixCBAlias.BIT_6_H);
    gb.cpu.setRegister('h', 0x0);
    gb.cpu.setZFlag(0);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(1);

    gb.cpu.setRegister('pc', 0x0);
    gb.cpu.setRegister('h', 0b01000000);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(0);
})

test('BIT_5_H', () => {
    const gb = makeTestGB();
    gb.cpu.mmapper.setUint8(0x0, alias.PREFIX_CB);
    gb.cpu.mmapper.setUint8(0x1, prefixCBAlias.BIT_5_H);
    gb.cpu.setRegister('h', 0x0);
    gb.cpu.setZFlag(0);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(1);

    gb.cpu.setRegister('pc', 0x0);
    gb.cpu.setRegister('h', 0b00100000);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(0);
})

test('BIT_4_H', () => {
    const gb = makeTestGB();
    gb.cpu.mmapper.setUint8(0x0, alias.PREFIX_CB);
    gb.cpu.mmapper.setUint8(0x1, prefixCBAlias.BIT_4_H);
    gb.cpu.setRegister('h', 0x0);
    gb.cpu.setZFlag(0);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(1);

    gb.cpu.setRegister('pc', 0x0);
    gb.cpu.setRegister('h', 0b00010000);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(0);
})

test('BIT_3_H', () => {
    const gb = makeTestGB();
    gb.cpu.mmapper.setUint8(0x0, alias.PREFIX_CB);
    gb.cpu.mmapper.setUint8(0x1, prefixCBAlias.BIT_3_H);
    gb.cpu.setRegister('h', 0x0);
    gb.cpu.setZFlag(0);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(1);

    gb.cpu.setRegister('pc', 0x0);
    gb.cpu.setRegister('h', 0b00001000);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(0);
})

test('BIT_2_H', () => {
    const gb = makeTestGB();
    gb.cpu.mmapper.setUint8(0x0, alias.PREFIX_CB);
    gb.cpu.mmapper.setUint8(0x1, prefixCBAlias.BIT_2_H);
    gb.cpu.setRegister('h', 0x0);
    gb.cpu.setZFlag(0);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(1);

    gb.cpu.setRegister('pc', 0x0);
    gb.cpu.setRegister('h', 0b00000100);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(0);
})

test('BIT_1_H', () => {
    const gb = makeTestGB();
    gb.cpu.mmapper.setUint8(0x0, alias.PREFIX_CB);
    gb.cpu.mmapper.setUint8(0x1, prefixCBAlias.BIT_1_H);
    gb.cpu.setRegister('h', 0x0);
    gb.cpu.setZFlag(0);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(1);

    gb.cpu.setRegister('pc', 0x0);
    gb.cpu.setRegister('h', 0b00000010);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(0);
})

test('BIT_0_H', () => {
    const gb = makeTestGB();
    gb.cpu.mmapper.setUint8(0x0, alias.PREFIX_CB);
    gb.cpu.mmapper.setUint8(0x1, prefixCBAlias.BIT_0_H);
    gb.cpu.setRegister('h', 0x0);
    gb.cpu.setZFlag(0);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(1);

    gb.cpu.setRegister('pc', 0x0);
    gb.cpu.setRegister('h', 0b00000001);
    gb.cpu.executeNext();
    expect(gb.cpu.getZFlag()).toBe(0);
})
