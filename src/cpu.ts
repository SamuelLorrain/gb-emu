import { RegisterMap } from './registers';
import * as DebugScreen from './replaced_modules/debugScreen.module_replaced';
import { MemoryMapper } from './memorymapper';
import { instructionsSet } from './instructionsSet';

export class Cpu {
    mmapper: MemoryMapper;
    registerMap: RegisterMap;

    constructor(mmapper: MemoryMapper, registerMap: RegisterMap) {
        this.mmapper = mmapper;
        this.registerMap = registerMap;
    }

    debugReg() {
        DebugScreen.debugReg(this);
    }

    debugFlags() {
        DebugScreen.debugFlags(this);
    }

    debugMemory(addr: number, distance:number = 1) {
        DebugScreen.debugMemory(this, addr, distance);
    }

    setRegister(reg: string, n: number) {
        this.registerMap.setRegister(reg as keyof Object, n);
    }
    getRegister(reg: string): number {
        return this.registerMap.getRegister(reg as keyof Object);
    }
    resetFlag() {
        this.registerMap.setRegister('f' as keyof Object, 0);
    }

    setZFlag(v: 0|1) {
        let flagRegister = this.getRegister('f' as keyof Object);
        if (v == 1) {
            flagRegister |= 0b10000000;
        } else {
            flagRegister &= 0b01111111;
        }
        this.setRegister('f' as keyof Object, flagRegister);
    }

    getZFlag() {
        const flagRegister = this.getRegister('f' as keyof Object);
        return (flagRegister & 0b10000000) >> 7;
    }

    setNFlag(v: 0|1) {
        let flagRegister = this.getRegister('f' as keyof Object);
        if (v == 1) {
            flagRegister |= 0b01000000;
        } else {
            flagRegister &= 0b10111111;
        }
        this.setRegister('f' as keyof Object, flagRegister);
    }

    getNFlag() {
        const flagRegister = this.getRegister('f' as keyof Object);
        return (flagRegister & 0b01000000) >> 6;
    }

    setHFlag(v: 0|1) {
        let flagRegister = this.getRegister('f' as keyof Object);
        if (v == 1) {
            flagRegister |= 0b00100000;
        } else {
            flagRegister &= 0b11011111;
        }
        this.setRegister('f' as keyof Object, flagRegister);
    }

    getHFlag() {
        const flagRegister = this.getRegister('f' as keyof Object);
        return (flagRegister & 0b00100000) >> 5;
    }

    setCFlag(v: 0|1) {
        let flagRegister = this.getRegister('f' as keyof Object);
        if (v == 1) {
            flagRegister |= 0b00010000;
        } else {
            flagRegister &= 0b11101111;
        }
        this.setRegister('f' as keyof Object, flagRegister);
    }

    getCFlag() {
        const flagRegister = this.getRegister('f' as keyof Object);
        return (flagRegister & 0b00010000) >> 4;
    }

    fetchNext(): number {
        const pcValue = this.registerMap.getRegister('pc' as keyof Object);
        const instruction = this.mmapper.getUint8(pcValue);
        this.registerMap.setRegister('pc' as keyof Object, pcValue + 1);
        return instruction;
    }

    executeNext() {
        instructionsSet(this, this.fetchNext());
    }
}
