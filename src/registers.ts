import { createMemory } from './ram';

export interface RegisterMap {
    regMemory: DataView;
    heightBitsRegisters?: Array<String>;
    sixteenBitsRegisters?: Array<String>;
    heightBitsRegisterMapping?: Object;
    sixteenBitsRegisterMapping?: Object;
    getRegister: (reg: keyof Object) => number;
    setRegister: (reg: keyof Object, n: number) => void;
};

export class GBRegisters implements RegisterMap {
    regMemory: DataView;
    heightBitsRegisters: Array<String>;
    sixteenBitsRegisters: Array<String>;
    heightBitsRegisterMapping: Object;
    sixteenBitsRegisterMapping: Object;
    cycles: number;

    constructor() {
        this.heightBitsRegisters = [
            'a', 'f', 'b', 'c', 'd', 'e',
            'h', 'l'
        ];
        this.sixteenBitsRegisters = [
            'af', 'bc',
            'de', 'hl',
            'sp', 'pc'
        ];
        this.regMemory = createMemory(this.heightBitsRegisters.length + (this.sixteenBitsRegisters.length *2));
        this.heightBitsRegisterMapping = {
            a:  0,
            f:  1,
            b:  2,
            c:  3,
            d:  4,
            e:  5,
            h:  6,
            l:  7,
        };
        this.sixteenBitsRegisterMapping = {
            af: 0,
            bc: 2,
            de: 4,
            hl: 6,
            sp: 8,
            pc: 10,
        };
        this.cycles = 0;
    }

    getRegister(reg: keyof Object): number {
        let r = this.heightBitsRegisterMapping[reg];
        if (r !== undefined) {
            return this.regMemory.getUint8(r as any);
        }
        r = this.sixteenBitsRegisterMapping[reg];
        if (r !== undefined) {
            return this.regMemory.getUint16(r as any);
        }
        throw Error(`getRegister: unkwnown register ${reg}`);
    }

    setRegister(reg: keyof Object, n: number) {
        let r = this.heightBitsRegisterMapping[reg];
        if (r !== undefined) {
            this.regMemory.setUint8(r as any, n);
            return;
        }
        r = this.sixteenBitsRegisterMapping[reg];
        if (r !== undefined) {
            this.regMemory.setUint16(r as any, n);
            return;
        }
        throw Error(`setRegister: unkwnown register ${reg}`);
    }
}

