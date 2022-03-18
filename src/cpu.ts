import { RegisterMap } from './registers';
import { alias } from './instructionAlias';
import * as instructions from './instructions';

export class Cpu {
    memory: DataView;
    registerMap: RegisterMap;
    instructionPointer: keyof Object; // should be a key of registerMap ?

    constructor(memory: DataView, registerMap: RegisterMap) {
        this.memory = memory;
        this.registerMap = registerMap;
        this.instructionPointer = 'pc' as keyof Object;
    }

    debugReg() {
        for(const reg in this.registerMap.heightBitsRegisterMapping) {
            const value = this.registerMap.getRegister(reg as keyof Object);
            console.log(
                `${reg} : 0x${value}`
            );
        }
        for(const reg in this.registerMap.sixteenBitsRegisterMapping) {
            const value = this.registerMap.getRegister(reg as keyof Object);
            console.log(
                `${reg} : 0x${value}`
            );
        }
    }

    debugMemory(addr: number, distance:number = 1) {
        for(let i = 0; i < distance; i++) {
            const currentAddr = i + addr
            console.log(`0x${currentAddr.toString(16)} : 0x${this.memory.getUint8(currentAddr).toString(16)}`);
        }
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

    setNFlag(v: 0|1) {
        let flagRegister = this.getRegister('f' as keyof Object);
        if (v == 1) {
            flagRegister |= 0b01000000;
        } else {
            flagRegister &= 0b10111111;
        }
        this.setRegister('f' as keyof Object, flagRegister);
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
        const instruction = this.memory.getUint8(pcValue);
        this.registerMap.setRegister('pc' as keyof Object, pcValue + 1);
        return instruction;
    }

    executeNext() {
        const instruction = this.fetchNext();
        let v: number;
        let x: number;
        let y: number;
        let x2: number;
        let y2: number;
        let addr: number;
        let carry: 0|1;
        switch (instruction) {
            case alias.NOP:
                break;
            case alias.LD_BC_D16:
                y = this.fetchNext();
                x = this.fetchNext();
                this.setRegister('b' as keyof Object, x);
                this.setRegister('c' as keyof Object, y);
                break;
            case alias.LD_REF_BC_A:
                addr = (this.getRegister('b' as keyof Object) << 8)
                    + this.getRegister('c' as keyof Object);
                v = this.getRegister('a' as keyof Object);
                this.memory.setUint8(addr, v);
                break;
            case alias.INC_BC:
                v = (this.getRegister('b' as keyof Object) << 8)
                    + this.getRegister('c' as keyof Object);
                if(v >= 0xFFFF) {
                    v = 0x0;
                } else {
                    v += 1;
                }
                this.setRegister('b' as keyof Object, (v >> 8) & 0xFF);
                this.setRegister('c' as keyof Object, v & 0xFF);
                break;
            case alias.INC_B:
                v = this.getRegister('b' as keyof Object);
                if (v >= 0xFF) {
                    v = 0x0;
                } else {
                    v += 1;
                }
                this.setRegister('b' as keyof Object, v);
                break;
            case alias.DEC_B:
                v = this.getRegister('b' as keyof Object);
                if (v <= 0x0) {
                    v = 0xFF;
                } else {
                    v -= 1;
                }
                this.setRegister('b' as keyof Object, v);
                break;
            case alias.LD_B_D8:
                instructions.ld_nn_n(this, 'b' as keyof Object);
                break;
            case alias.RLCA:
                v = this.getRegister('a' as keyof Object);
                carry = ((v >> 7) & 0b1) as 0|1;
                this.resetFlag();
                this.setCFlag(carry);
                v = v << 1;
                v+=carry;
                if (v == 0) {
                    this.setZFlag(1);
                }
                this.setRegister('a' as keyof Object, v);
                break;
            case alias.LD_REF_A16_SP:
                y = this.fetchNext();
                x = this.fetchNext();
                addr = (x << 8) + y;
                this.memory.setUint16(
                    addr,
                    this.getRegister('sp' as keyof Object)
                );
                break;
        }
    }
}
