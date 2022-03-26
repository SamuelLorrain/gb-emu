import { Cpu } from './cpu';
import * as helpers from './helpers';

/*
* Using at&t syntax
*
* LD a,b means:
* a := b
*
* r8 == 8bits registers
* r16 == 16bits registers
* n == immediat 8bits value
* nn == immediat 16bits value
*/

export const ld_r8_n = function(cpu: Cpu, reg: string) {
    const v = cpu.fetchNext();
    cpu.setRegister(reg, v);
}

export const ld_r8_r8 = function(cpu: Cpu, r1: string, r2: string) {
    cpu.setRegister(r1, cpu.getRegister(r2));
}

export const ld_r16_nn = function(cpu: Cpu, reg: string) {
    const v1 = cpu.fetchNext();
    const v2 = cpu.fetchNext();
    cpu.setRegister(reg, (v2 << 8) + v1);
}

export const ld_r16_r16 = function(cpu: Cpu, r1: string, r2: string) {
    const v2 = cpu.getRegister(r2);
    cpu.setRegister(r1, v2);
}

export const inc_r8 = function(cpu: Cpu, reg: string) {
    cpu.resetFlag();
    cpu.setNFlag(0);
    let v = cpu.getRegister(reg);
    let newV: number;
    if (v >= 0xFF) {
        cpu.setZFlag(0);
        newV = 0;
    } else {
        newV = v + 1;
    }
    if ((((v & 0xf) + (newV & 0xf)) & 0x10) === 0x10) {
        cpu.setHFlag(1);
    }
    cpu.setRegister(reg, newV);
}

export const inc_r16 = function(cpu: Cpu, reg: string) {
    let v = cpu.getRegister(reg);
    if (v >= 0xFFFF) {
        v = 0;
    } else {
        v += 1;
    }
    cpu.setRegister(reg, v);
}

export const dec_r16 = function(cpu: Cpu, reg: string) {
    let v = cpu.getRegister(reg);
    if (v == 0x0) {
        v = 0xFFFF;
    } else {
        v -= 1;
    }
    cpu.setRegister(reg, v);
}

// TODO could use typescript to ensure
// that we can only pass a 8bits register to the command
export const dec_r8 = function(cpu: Cpu, reg: string) {
    cpu.resetFlag();
    cpu.setNFlag(1);
    let v = cpu.getRegister(reg);
    let newV: number;
    if (v <= 0x00) {
        newV = 0xFF;
    } else {
        newV = v - 1;
    }
    if (newV == 0) {
        cpu.setZFlag(1);
    }
    if ((newV & 0xf) === 0) { // NOT SURE!
        cpu.setHFlag(1);
    }
    cpu.setRegister(reg, newV);
}

export const add_r8_r8 = function(cpu: Cpu, r1: string, r2: string) {
    cpu.resetFlag();
    let v1 = cpu.getRegister(r1);
    let v2 = cpu.getRegister(r2);
    let result = v1 + v2;
    if (result === 0) {
        cpu.setZFlag(1);
    } else if (result > 0xff) {
        cpu.setCFlag(1);
    }
    if ((((v1 & 0xf) + (result & 0xf)) & 0x10) === 0x10) {
        cpu.setHFlag(1);
    }
    cpu.setRegister(r1, result & 0xff);
}

export const adc_r8_r8 = function(cpu: Cpu, r1: string, r2: string) {
    const v1 = cpu.getRegister(r1);
    const v2 = cpu.getRegister(r2);
    const carry = cpu.getCFlag();
    let result = v1 + v2 + carry;
    cpu.resetFlag();
    if ((v1 + v2 + carry) > 0xff) {
        cpu.setCFlag(1);
    }
    if ((((v1 & 0xf) + (v2 & 0xf)) + carry) > 0xf) {
        cpu.setHFlag(1);
    }

    if(v1+v2 > 0xFF) {
        result = (v1+v2) - 0xFF;
    } else {
        result = v1 + v2;
    }
    if(result+carry > 0xFF) {
        result = 0;
    } else {
        result += carry;
    }

    if (result === 0) {
        cpu.setZFlag(1);
    }

    cpu.setRegister(r1, result);
}

export const and_r8_r8 = function(cpu: Cpu, r1: string, r2: string) {
    cpu.resetFlag();
    cpu.setHFlag(1);
    const a = cpu.getRegister(r1);
    const v = cpu.getRegister(r2);
    const result = a & v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister(r1, result);
}

export const and_r8_ref_r16 = function(cpu: Cpu, r8: string, r16: string) {
    cpu.resetFlag();
    cpu.setHFlag(1);
    const a = cpu.getRegister(r8);
    const addr = cpu.getRegister(r16);
    const v = cpu.mmapper.getUint8(addr);
    const result = a & v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister(r8, result);
}


export const or_r8_r8 = function(cpu: Cpu, r1: string, r2: string) {
    cpu.resetFlag();
    const a = cpu.getRegister(r1);
    const v = cpu.getRegister(r2);
    const result = a | v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister(r1, result);
}

export const or_r8_d8 = function(cpu: Cpu, r1: string) {
    cpu.resetFlag();
    const a = cpu.getRegister(r1);
    const v = cpu.fetchNext();
    const result = a | v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister(r1, result);
}

export const or_r8_ref_r16 = function(cpu: Cpu, r8: string, r16: string) {
    cpu.resetFlag();
    const a = cpu.getRegister(r8);
    const addr = cpu.getRegister(r16);
    const v = cpu.mmapper.getUint8(addr);
    const result = a | v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister(r8, result);
}

export const xor_r8_r8 = function(cpu: Cpu, r1: string, r2: string) {
    cpu.resetFlag();
    const a = cpu.getRegister(r1);
    const v = cpu.getRegister(r2);
    const result = a ^ v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister(r1, result);
}

export const xor_d8 = function(cpu: Cpu) {
    cpu.resetFlag();
    const a = cpu.getRegister('a');
    const v = cpu.fetchNext();
    const result = a ^ v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister('a', result);
}

export const xor_r8_ref_r16 = function(cpu: Cpu, r8: string, r16: string) {
    cpu.resetFlag();
    const a = cpu.getRegister(r8);
    const addr = cpu.getRegister(r16)
    const v = cpu.mmapper.getUint8(addr);
    const result = a ^ v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister(r8, result);
}

export const ld_ref_r16_r8 = function(cpu: Cpu, r16: string, r8: string) {
    const addr = cpu.getRegister(r16);
    const value = cpu.getRegister(r8);
    cpu.mmapper.setUint8(addr, value);
}

export const ld_ref_r16_d8 = function(cpu: Cpu, r16: string) {
    const addr = cpu.getRegister(r16);
    const value = cpu.fetchNext();
    cpu.mmapper.setUint8(addr, value);
}

export const ld_r8_ref_r16 = function(cpu: Cpu, r8: string, r16: string) {
    const addr = cpu.getRegister(r16);
    const value = cpu.mmapper.getUint8(addr);
    cpu.setRegister(r8, value);
}

export const ld_r8_ref_d16 = function(cpu: Cpu, r8: string) {
    const addr = (cpu.fetchNext() << 8) + cpu.fetchNext();
    const value = cpu.mmapper.getUint8(addr);
    cpu.setRegister(r8, value);
}

export const ld_r8_ref_c = function(cpu: Cpu, r8: string) {
    const addr = 0xff + cpu.getRegister('c');
    const value = cpu.mmapper.getUint8(addr);
    cpu.setRegister(r8, value);
}

export const ld_ref_d16_r8 = function(cpu: Cpu, r8: string) {
    const addr = (cpu.fetchNext() << 8) + cpu.fetchNext();
    const value = cpu.getRegister(r8);
    cpu.mmapper.setUint8(addr, value);
}

export const rlca = function(cpu: Cpu) {
    const a = cpu.getRegister('a');
    cpu.resetFlag();
    const result = a << 1;
    if (result === 0) {
        cpu.setZFlag(1);
    }
    cpu.setCFlag(((a >> 7) & 0b1) as 0 | 1);
    cpu.setRegister('a', result);
}

export const rla = function(cpu: Cpu) {
    const a = cpu.getRegister('a');
    let result = a << 1;
    result += cpu.getCFlag();
    cpu.resetFlag();
    if (result === 0) {
        cpu.setZFlag(1);
    }
    cpu.setCFlag(((a >> 7) & 0b1) as 0 | 1);
    cpu.setRegister('a', result);
}

export const rrca = function(cpu: Cpu) {
    const a = cpu.getRegister('a');
    cpu.resetFlag();
    const result = a >> 1;
    if (result === 0) {
        cpu.setZFlag(1);
    }
    cpu.setCFlag((a & 0b00000001) as 0 | 1);
    cpu.setRegister('a', result);
}

export const rra = function(cpu: Cpu) {
    const a = cpu.getRegister('a');
    cpu.resetFlag();
    const result = (a >> 1) & (cpu.getCFlag() << 7);
    if (result === 0) {
        cpu.setZFlag(1);
    }
    cpu.setCFlag((a & 0b00000001) as 0 | 1);
    cpu.setRegister('a', result);
}

export const cpl_A = function(cpu: Cpu) {
    const a = cpu.getRegister('a');
    cpu.setRegister('a', ~a);
    cpu.setNFlag(1);
    cpu.setHFlag(1);
}

export const scf = function(cpu: Cpu) {
    cpu.setCFlag(1);
    cpu.setNFlag(0);
    cpu.setHFlag(0);
}

export const ccf = function(cpu: Cpu) {
    cpu.setCFlag((cpu.getCFlag() & 0b1) ? 0 : 1);
    cpu.setNFlag(0);
    cpu.setHFlag(0);
}

export const ld_ref_nn_r16 = function(cpu: Cpu, reg: string) {
    const v = cpu.getRegister(reg);
    const addr = (cpu.fetchNext() << 8) + cpu.fetchNext();
    cpu.mmapper.setUint16(addr, v);
}

export const add_r16_r16 = function(cpu: Cpu, r1: string, r2: string) {
    const v1 = cpu.getRegister(r1);
    const v2 = cpu.getRegister(r2);
    cpu.setNFlag(0);
    let v: number;
    if ((v1 + v2) > 0xFFFF) {
        v = (v1 + v2) - 0xFFFF
        cpu.setCFlag(1);
    } else {
        v = v1 + v2
    }
    if ((((v1 & 0xff) + (v2 & 0xff)) & 0x100) === 0x100) {
        cpu.setHFlag(1);
    } else {
        cpu.setHFlag(0);

    }
    cpu.setRegister(r1, v);
}

export const jr_r8 = function(cpu: Cpu) {
    const offset = helpers.to_signed_i8(cpu.fetchNext());
    const addr = cpu.getRegister('pc') + offset;
    cpu.setRegister('pc', addr);
}

export const jr_nz_r8 = function(cpu: Cpu) {
    if (cpu.getZFlag() == 1) {
        cpu.fetchNext();
        return;
    }
    const offset = helpers.to_signed_i8(cpu.fetchNext());
    const addr = cpu.getRegister('pc') + offset;
    cpu.setRegister('pc', addr);
}

export const jr_z_r8 = function(cpu: Cpu) {
    if (cpu.getZFlag() == 0) {
        cpu.fetchNext();
        return;
    }
    const offset = helpers.to_signed_i8(cpu.fetchNext());
    const addr = cpu.getRegister('pc') + offset;
    cpu.setRegister('pc', addr);
}

export const jr_nc_r8 = function(cpu: Cpu) {
    if (cpu.getCFlag() == 1) {
        cpu.fetchNext();
        return;
    }
    const offset = helpers.to_signed_i8(cpu.fetchNext());
    const addr = cpu.getRegister('pc') + offset;
    cpu.setRegister('pc', addr);
}

export const jr_c_r8 = function(cpu: Cpu) {
    if (cpu.getCFlag() == 0) {
        cpu.fetchNext();
        return;
    }
    const offset = helpers.to_signed_i8(cpu.fetchNext());
    const addr = cpu.getRegister('pc') + offset;
    cpu.setRegister('pc', addr);
}


export const daa = function(cpu: Cpu) {
    // found on the internet
    let carry: number = 0;
    if (cpu.getNFlag() == 0) {
        if (cpu.getCFlag() == 1 || cpu.getRegister('a') > 0x99) {
            if ((0x60 + cpu.getRegister('a')) > 0xFF) {
                cpu.setRegister('a', (0x60 + cpu.getRegister('a')) - 0xFF);
            } else {
                cpu.setRegister('a', 0x60 + cpu.getRegister('a'));
            }
            carry = 1;
        }
        if (cpu.getNFlag() == 1 || ((cpu.getRegister('a') & 0x0f) > 0x09)) {
            if ((0x06 + cpu.getRegister('a')) > 0xFF) {
                cpu.setRegister('a', (0x06 + cpu.getRegister('a')) - 0xFF);
            } else {
                cpu.setRegister('a', 0x06 + cpu.getRegister('a'));
            }
        }
    } else if (cpu.getCFlag() === 1) {
        carry = 1;
        let plus: number;
        if (cpu.getHFlag() === 1) {
            plus = 0x9a;
        } else {
            plus = 0xa0;
        }
        if ((plus + cpu.getRegister('a')) > 0xFF) {
            cpu.setRegister('a', (plus + cpu.getRegister('a')) - 0xFF);
        } else {
            cpu.setRegister('a', plus + cpu.getRegister('a'));
        }
    } else if (cpu.getHFlag() === 1) {
        if ((0xfa + cpu.getRegister('a')) > 0xFF) {
            cpu.setRegister('a', (0xfa + cpu.getRegister('a')) - 0xFF);
        } else {
            cpu.setRegister('a', 0xfa + cpu.getRegister('a'));
        }
    }
    if (cpu.getRegister('a') == 0) {
        cpu.setZFlag(1);
    }
    cpu.setHFlag(0);
    cpu.setCFlag(carry as 0 | 1);
}

export const ld_ref_r16_plus_r8 = function(cpu: Cpu, r16:string, r8:string) {
    let addr = cpu.getRegister(r16);
    const value = cpu.getRegister(r8);
    cpu.mmapper.setUint8(addr, value);

    if (addr+1 > 0x10000) {
        addr = 0;
    } else {
        addr +=1
    }
    cpu.setRegister(r16, addr);
}

export const ld_ref_r16_minus_r8 = function(cpu: Cpu, r16:string, r8:string) {
    let addr = cpu.getRegister(r16);
    const value = cpu.getRegister(r8);
    cpu.mmapper.setUint8(addr, value);

    if (addr-1 < 0) {
        addr = 0xFFFF;
    } else {
        addr -=1
    }
    cpu.setRegister(r16, addr);
}

export const cpl = function(cpu: Cpu, r8: string) {
    cpu.setRegister(r8, ~cpu.getRegister(r8));
    cpu.setNFlag(1);
    cpu.setHFlag(1);
}

export const inc_ref_r16 = function(cpu: Cpu, r16: string) {
    const addr = cpu.getRegister(r16);
    let v = cpu.mmapper.getUint8(addr);
    if (v+1 == 0x100) {
        v = 0x0;
    } else {
        v += 1;
    }
    cpu.mmapper.setUint8(addr, v);
}

export const dec_ref_r16 = function(cpu: Cpu, r16: string) {
    const addr = cpu.getRegister(r16);
    let v = cpu.mmapper.getUint8(addr);
    if (v === 0) {
        v = 0xFF;
    } else {
        v -= 1;
    }
    cpu.mmapper.setUint8(addr, v);
}

export const ld_r8_ref_r16_minus = function(cpu:Cpu, r8:string, r16:string) {
    const addr = cpu.getRegister(r16);
    let v = cpu.mmapper.getUint8(addr);
    cpu.setRegister(r8, v);
    if (v === 0) {
        v = 0xFF;
    } else {
        v -= 1;
    }
    cpu.mmapper.setUint8(addr, v);
}

export const ld_r8_ref_r16_plus = function(cpu:Cpu, r8:string, r16:string) {
    const addr = cpu.getRegister(r16);
    let v = cpu.mmapper.getUint8(addr);
    cpu.setRegister(r8, v);
    if (v+1 == 0x100) {
        v = 0x0;
    } else {
        v += 1;
    }
    cpu.mmapper.setUint8(addr, v);
}

export const add_r8_ref_r16 = function(cpu: Cpu, r8: string, r16: string) {
    cpu.resetFlag();
    const addr = cpu.getRegister(r16)
    let v1 = cpu.getRegister(r8);
    let v2 = cpu.mmapper.getUint8(addr);
    let result = v1 + v2;
    if (result === 0) {
        cpu.setZFlag(1);
    } else if (result > 0xff) {
        cpu.setCFlag(1);
    }
    if ((((v1 & 0xf) + (result & 0xf)) & 0x10) === 0x10) {
        cpu.setHFlag(1);
    }
    cpu.setRegister(r8, result & 0xff);
}

export const adc_r8_ref_r16 = function(cpu: Cpu, r8: string, r16: string) {
    const v1 = cpu.getRegister(r8);
    const addr = cpu.getRegister(r16);
    const v2 = cpu.mmapper.getUint8(addr);
    const carry = cpu.getCFlag();
    let result = v1 + v2 + carry;
    cpu.resetFlag();
    if ((v1 + v2 + carry) > 0xff) {
        cpu.setCFlag(1);
    }
    if ((((v1 & 0xf) + (v2 & 0xf)) + carry) > 0xf) {
        cpu.setHFlag(1);
    }

    if(v1+v2 > 0xFF) {
        result = (v1+v2) - 0xFF;
    } else {
        result = v1 + v2;
    }
    if(result+carry > 0xFF) {
        result = 0;
    } else {
        result += carry;
    }

    if (result === 0) {
        cpu.setZFlag(1);
    }

    cpu.setRegister(r8, result);
}

export const sub_r8_r8 = function(cpu: Cpu, r1: string, r2: string) {
    const v1 = cpu.getRegister(r1);
    const v2 = cpu.getRegister(r2);
    let result: number = helpers.unsigned_sub(v1,v2, 0xff);
    cpu.setRegister(r1, result);
    cpu.resetFlag();
    cpu.setNFlag(1);
    if(result == 0) {
        cpu.setZFlag(1);
    }
    if ((helpers.unsigned_sub(v1 & 0xf, v2 & 0xf, 0xff) & (0xf +1)) != 0) {
        cpu.setHFlag(1);
    }
    if(v1 - v2 < 0) {
        cpu.setCFlag(1);
    }
}

export const sub_r8_d8 = function(cpu: Cpu, r1: string) {
    const v1 = cpu.getRegister(r1);
    const v2 = cpu.fetchNext();
    let result: number = helpers.unsigned_sub(v1,v2, 0xff);
    cpu.setRegister(r1, result);
    cpu.resetFlag();
    cpu.setNFlag(1);
    if(result == 0) {
        cpu.setZFlag(1);
    }
    if ((helpers.unsigned_sub(v1 & 0xf, v2 & 0xf, 0xff) & (0xf +1)) != 0) {
        cpu.setHFlag(1);
    }
    if(v1 - v2 < 0) {
        cpu.setCFlag(1);
    }
}

export const cp_r8_r8 = function(cpu: Cpu, r1: string, r2: string) {
    const v1 = cpu.getRegister(r1);
    const v2 = cpu.getRegister(r2);
    let result: number = helpers.unsigned_sub(v1,v2, 0xff);
    cpu.resetFlag();
    cpu.setNFlag(1);
    if(result == 0) {
        cpu.setZFlag(1);
    }
    if ((helpers.unsigned_sub(v1 & 0xf, v2 & 0xf, 0xff) & (0xf +1)) != 0) {
        cpu.setHFlag(1);
    }
    if(v1 - v2 < 0) {
        cpu.setCFlag(1);
    }
}

export const cp_r8_ref_r16 = function(cpu: Cpu, r8: string, r16: string) {
    const v1 = cpu.getRegister(r8);
    const addr = cpu.getRegister(r16);
    const v2 = cpu.mmapper.getUint8(addr);
    let result: number = helpers.unsigned_sub(v1,v2, 0xff);
    cpu.resetFlag();
    cpu.setNFlag(1);
    if(result == 0) {
        cpu.setZFlag(1);
    }
    if ((helpers.unsigned_sub(v1 & 0xf, v2 & 0xf, 0xff) & (0xf +1)) != 0) {
        cpu.setHFlag(1);
    }
    if(v1 - v2 < 0) {
        cpu.setCFlag(1);
    }
}

export const sbc_r8_r8 = function(cpu: Cpu, r1: string, r2: string) {
    const v1 = cpu.getRegister(r1);
    const v2 = cpu.getRegister(r2);
    let result: number = helpers.unsigned_sub(helpers.unsigned_sub(v1,v2, 0xff), cpu.getCFlag(), 0xff);
    cpu.setRegister(r1, result);
    cpu.resetFlag();
    cpu.setNFlag(1);
    if(result == 0) {
        cpu.setZFlag(1);
    }
    if ((helpers.unsigned_sub(
            helpers.unsigned_sub(
                v1 & 0xf,
                v2 & 0xf,
                0xff),
            cpu.getCFlag(),
            0xff) & (0xf +1)) != 0) {
        cpu.setHFlag(1);
    }
    if(v1 - (v2+cpu.getCFlag()) < 0) {
        cpu.setCFlag(1);
    }
}

export const sbc_r8_d8 = function(cpu: Cpu, r1: string) {
    const v1 = cpu.getRegister(r1);
    const v2 = cpu.fetchNext();
    let result: number = helpers.unsigned_sub(helpers.unsigned_sub(v1,v2, 0xff), cpu.getCFlag(), 0xff);
    cpu.setRegister(r1, result);
    cpu.resetFlag();
    cpu.setNFlag(1);
    if(result == 0) {
        cpu.setZFlag(1);
    }
    if ((helpers.unsigned_sub(
            helpers.unsigned_sub(
                v1 & 0xf,
                v2 & 0xf,
                0xff),
            cpu.getCFlag(),
            0xff) & (0xf +1)) != 0) {
        cpu.setHFlag(1);
    }
    if(v1 - (v2+cpu.getCFlag()) < 0) {
        cpu.setCFlag(1);
    }
}

export const sbc_r8_ref_r16 = function(cpu: Cpu, r8: string, r16: string) {
    const v1 = cpu.getRegister(r8);
    const addr = cpu.getRegister(r16);
    const v2 = cpu.mmapper.getUint8(addr);
    let result: number = helpers.unsigned_sub(helpers.unsigned_sub(v1,v2, 0xff), cpu.getCFlag(), 0xff);
    cpu.setRegister(r8, result);
    cpu.resetFlag();
    cpu.setNFlag(1);
    if(result == 0) {
        cpu.setZFlag(1);
    }
    if ((helpers.unsigned_sub(
            helpers.unsigned_sub(
                v1 & 0xf,
                v2 & 0xf,
                0xff),
            cpu.getCFlag(),
            0xff) & (0xf +1)) != 0) {
        cpu.setHFlag(1);
    }
    if(v1 - (v2+cpu.getCFlag()) < 0) {
        cpu.setCFlag(1);
    }
}

export const sub_r8_ref_r16 = function(cpu: Cpu, r8: string, r16: string) {
    const v1 = cpu.getRegister(r8);
    const addr = cpu.getRegister(r16);
    const v2 = cpu.mmapper.getUint8(addr);
    let result: number = helpers.unsigned_sub(v1,v2, 0xff);
    cpu.setRegister(r8, result);
    cpu.resetFlag();
    cpu.setNFlag(1);
    if(result == 0) {
        cpu.setZFlag(1);
    }
    if ((helpers.unsigned_sub(v1 & 0xf, v2 & 0xf, 0xff) & (0xf +1)) != 0) {
        cpu.setHFlag(1);
    }
    if(v1 - v2 < 0) {
        cpu.setCFlag(1);
    }
}

export const ret_nz = function(cpu: Cpu) {
    if (cpu.getZFlag() == 0) {
        return;
    }
    cpu.setRegister('pc', cpu.pop());
}

export const ret_nc = function(cpu: Cpu) {
    if (cpu.getCFlag() == 0) {
        return;
    }
    cpu.setRegister('pc', cpu.pop());
}

export const ret_z = function(cpu: Cpu) {
    if (cpu.getZFlag() == 1) {
        return;
    }
    cpu.setRegister('pc', cpu.pop());
}

export const ret_c = function(cpu: Cpu) {
    if (cpu.getCFlag() == 1) {
        return;
    }
    cpu.setRegister('pc', cpu.pop());
}

export const ret = function(cpu: Cpu) {
    const addr = cpu.pop();
    cpu.setRegister('pc', addr - 1);
}

export const pop_r16 = function(cpu: Cpu, r16: string) {
    cpu.setRegister(r16, cpu.pop());
}

export const jp_nz_a16 = function(cpu: Cpu) {
    if (cpu.getZFlag() == 0) {
        cpu.fetchNext();
        cpu.fetchNext();
        return;
    }
    const vl = cpu.fetchNext();;
    const vh = cpu.fetchNext();;
    const addr = (vh << 8) + vl;
    cpu.setRegister('pc', addr);
}

export const jp_nc_a16 = function(cpu: Cpu) {
    if (cpu.getCFlag() == 0) {
        cpu.fetchNext();
        cpu.fetchNext();
        return;
    }
    const vl = cpu.fetchNext();;
    const vh = cpu.fetchNext();;
    const addr = (vh << 8) + vl;
    cpu.setRegister('pc', addr);
}

export const jp_z_a16 = function(cpu: Cpu) {
    if (cpu.getZFlag() == 1) {
        cpu.fetchNext();
        cpu.fetchNext();
        return;
    }
    const vl = cpu.fetchNext();;
    const vh = cpu.fetchNext();;
    const addr = (vh << 8) + vl;
    cpu.setRegister('pc', addr);
}

export const jp_c_a16 = function(cpu: Cpu) {
    if (cpu.getCFlag() == 1) {
        cpu.fetchNext();
        cpu.fetchNext();
        return;
    }
    const vl = cpu.fetchNext();;
    const vh = cpu.fetchNext();;
    const addr = (vh << 8) + vl;
    cpu.setRegister('pc', addr);
}

export const jp_a16 = function(cpu: Cpu) {
    const vl = cpu.fetchNext();;
    const vh = cpu.fetchNext();;
    const addr = (vh << 8) + vl;
    cpu.setRegister('pc', addr);
}

export const call_nz_a16 = function(cpu: Cpu) {
    if (cpu.getZFlag() == 0) {
        cpu.fetchNext();
        cpu.fetchNext();
        return;
    }
    const vl = cpu.fetchNext();;
    const vh = cpu.fetchNext();;
    const addr = (vh << 8) + vl;
    cpu.push(cpu.getRegister('pc') + 1);
    cpu.setRegister('pc', addr);
}

export const call_z_a16 = function(cpu: Cpu) {
    if (cpu.getZFlag() == 1) {
        cpu.fetchNext();
        cpu.fetchNext();
        return;
    }
    const vl = cpu.fetchNext();;
    const vh = cpu.fetchNext();;
    const addr = (vh << 8) + vl;
    cpu.push(cpu.getRegister('pc') + 1);
    cpu.setRegister('pc', addr);
}

export const call_c_a16 = function(cpu: Cpu) {
    if (cpu.getCFlag() == 1) {
        cpu.fetchNext();
        cpu.fetchNext();
        return;
    }
    const vl = cpu.fetchNext();;
    const vh = cpu.fetchNext();;
    const addr = (vh << 8) + vl;
    cpu.push(cpu.getRegister('pc') + 1);
    cpu.setRegister('pc', addr);
}

export const call_a16 = function(cpu: Cpu) {
    const vl = cpu.fetchNext();;
    const vh = cpu.fetchNext();;
    const addr = (vh << 8) + vl;
    cpu.push(cpu.getRegister('pc') + 1);
    cpu.setRegister('pc', addr - 1);
}

export const push_r16 = function(cpu: Cpu, r16: string) {
    cpu.push(cpu.getRegister(r16));
}

export const add_r8_d8 = function(cpu: Cpu, r8: string) {
    cpu.resetFlag();
    let v1 = cpu.getRegister(r8);
    let v2 = cpu.fetchNext();
    let result = v1 + v2;
    if (result === 0) {
        cpu.setZFlag(1);
    } else if (result > 0xff) {
        cpu.setCFlag(1);
    }
    if ((((v1 & 0xf) + (result & 0xf)) & 0x10) === 0x10) {
        cpu.setHFlag(1);
    }
    cpu.setRegister(r8, result & 0xff);
}

export const adc_r8_d8 = function(cpu: Cpu, r8: string) {
    const v1 = cpu.getRegister(r8);
    const v2 = cpu.fetchNext();
    const carry = cpu.getCFlag();
    let result = v1 + v2 + carry;
    cpu.resetFlag();
    if ((v1 + v2 + carry) > 0xff) {
        cpu.setCFlag(1);
    }
    if ((((v1 & 0xf) + (v2 & 0xf)) + carry) > 0xf) {
        cpu.setHFlag(1);
    }

    if(v1+v2 > 0xFF) {
        result = (v1+v2) - 0xFF;
    } else {
        result = v1 + v2;
    }
    if(result+carry > 0xFF) {
        result = 0;
    } else {
        result += carry;
    }

    if (result === 0) {
        cpu.setZFlag(1);
    }

    cpu.setRegister(r8, result);
}

export const rst_n = function(cpu: Cpu, n: number) {
    cpu.push(cpu.getRegister('pc'));
    cpu.setRegister('pc', n);
}

export const call_nc_a16 = function(cpu: Cpu) {
    if (cpu.getCFlag() == 0) {
        cpu.fetchNext();
        cpu.fetchNext();
        return;
    }
    const vl = cpu.fetchNext();;
    const vh = cpu.fetchNext();;
    const addr = (vh << 8) + vl;
    cpu.push(cpu.getRegister('pc') + 1);
    cpu.setRegister('pc', addr);
}

export const reti = function(cpu: Cpu) {
    cpu.setRegister('pc', cpu.pop());
    cpu.ime = true;
}

export const ldh_ref_d8_r8 = function(cpu: Cpu, r8:string) {
    const addr = 0xff00 + cpu.fetchNext();
    cpu.mmapper.setUint8(addr, cpu.getRegister(r8));
}

export const ldh_r8_ref_d8 = function(cpu: Cpu, r8:string) {
    const addr = 0xff00 + cpu.fetchNext();
    cpu.setRegister(r8, cpu.mmapper.getUint8(addr));
}

export const ld_ref_c_r8 = function(cpu: Cpu, r8:string) {
    const addr = 0xff00 + cpu.getRegister('c');
    cpu.mmapper.setUint8(addr, cpu.getRegister(r8));
}

export const and_r8_d8 = function(cpu: Cpu, r1: string) {
    cpu.resetFlag();
    cpu.setHFlag(1);
    const a = cpu.getRegister(r1);
    const v = cpu.fetchNext();
    const result = a & v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister(r1, result);
}

export const add_r16_d8signed = function(cpu: Cpu, r16: string) {
    cpu.resetFlag();
    let v1 = cpu.getRegister(r16);
    let v2 = cpu.fetchNext();
    let result = v1 + v2;

    if (((v1 ^ v2 ^ (result & 0xffff)) & 0x100) == 0x100) {
        cpu.setCFlag(1);
    }
    if (((v1 ^ v2 ^ (result & 0xffff)) & 0x10) == 0x10) {
        cpu.setHFlag(1);
    }
    cpu.setRegister(r16, result);
}

export const jp_ref_r16 = function(cpu: Cpu, r16: string) {
    const addr = cpu.mmapper.getUint8(cpu.getRegister(r16));
    cpu.setRegister('pc', addr);
}


export const ld_hl_sp_plus_d8 = function(cpu: Cpu) {
    throw new Error("ldhl SP+d8 To implement (signed int)");
}


export const cp_r8_d8 = function(cpu: Cpu, r1: string) {
    const v1 = cpu.getRegister(r1);
    const v2 = cpu.fetchNext();
    let result: number = helpers.unsigned_sub(v1,v2, 0xff);
    cpu.resetFlag();
    cpu.setNFlag(1);
    if(result == 0) {
        cpu.setZFlag(1);
    }
    if ((helpers.unsigned_sub(v1 & 0xf, v2 & 0xf, 0xff) & (0xf +1)) != 0) {
        cpu.setHFlag(1);
    }
    if(v1 - v2 < 0) {
        cpu.setCFlag(1);
    }
}

export const rlc_r8 = function(cpu: Cpu, r8: string)
{
    cpu.resetFlag();
    const rv = cpu.getRegister(r8);
    const bit7 = (rv >> 8);
    cpu.setCFlag(bit7 as 0|1);
    cpu.setRegister(r8, (rv << 1) + bit7);
    if (cpu.getRegister(r8) === 0) {
        cpu.setZFlag(1);
    }
}

export const rlc_ref_r16 = function(cpu: Cpu, r16: string)
{
    cpu.resetFlag();
    const addr = cpu.getRegister(r16);
    const rv = cpu.mmapper.getUint8(addr);
    const bit7 = (rv >> 8);
    cpu.setCFlag(bit7 as 0|1);
    const newV = (rv << 1) + bit7;
    if (newV === 0) {
        cpu.setZFlag(1);
    }
    cpu.mmapper.setUint8(addr, newV);
}

export const rrc_r8 = function(cpu: Cpu, r8: string) {
    cpu.resetFlag();
    const rv = cpu.getRegister(r8);
    const bit0 = rv & 0b1;
    cpu.setCFlag(bit0 as 0|1);
    cpu.setRegister(r8, (rv >> 1) + (bit0 << 7));
    if (cpu.getRegister(r8) === 0) {
        cpu.setZFlag(1);
    }
}

export const rrc_ref_r16 = function(cpu: Cpu, r16: string) {
    cpu.resetFlag();
    const addr = cpu.getRegister(r16);
    const v = cpu.mmapper.getUint8(addr);
    const bit0 = v & 0b1;
    cpu.setCFlag(bit0 as 0|1);
    const newV =  (v >> 1) + (bit0 << 7);
    if (newV === 0) {
        cpu.setZFlag(1);
    }
    cpu.mmapper.setUint8(addr, newV);
}

export const rl_r8 = function(cpu: Cpu, r8: string)
{
    cpu.resetFlag();
    const rv = cpu.getRegister(r8);
    const bit7 = (rv >> 8);
    cpu.setRegister(r8, (rv << 1) + cpu.getCFlag());
    if (cpu.getRegister(r8) === 0) {
        cpu.setZFlag(1);
    }
    cpu.setCFlag(bit7 as 0|1);
}

export const rl_ref_r16 = function(cpu: Cpu, r16: string) {
    cpu.resetFlag();
    const addr = cpu.getRegister(r16);
    const oldV = cpu.mmapper.getUint8(addr);
    const bit7 = (oldV >> 8);
    const newV = (oldV << 1) + cpu.getCFlag()
    cpu.mmapper.getUint8(newV)
    if (newV === 0) {
        cpu.setZFlag(1);
    }
    cpu.setCFlag(bit7 as 0|1);
}

export const rr_r8 = function(cpu: Cpu, r8: string) {
    cpu.resetFlag();
    const rv = cpu.getRegister(r8);
    const bit0 = rv & 0b1;
    cpu.setRegister(r8, (rv >> 1) + (cpu.getCFlag() << 7));
    if (cpu.getRegister(r8) === 0) {
        cpu.setZFlag(1);
    }
    cpu.setCFlag(bit0 as 0|1);
}

export const rr_ref_r16 = function(cpu: Cpu, r16: string) {
    cpu.resetFlag();
    const addr = cpu.getRegister(r16);
    const v = cpu.mmapper.getUint8(addr);
    const bit0 = v & 0b1;
    const newV =  (v >> 1) + (cpu.getCFlag() << 7);
    if (newV === 0) {
        cpu.setZFlag(1);
    }
    cpu.setCFlag(bit0 as 0|1);
    cpu.mmapper.setUint8(addr, newV);
}

export const sla_r8 = function(cpu: Cpu, r8: string) {
    cpu.resetFlag();
    const v = cpu.getRegister(r8);
    const bit7 = (v & 0b10000000) >> 7;
    const newV = v << 1;
    if (newV === 0) {
        cpu.setZFlag(1);
    }
    cpu.setRegister(r8, newV);
    cpu.setCFlag(bit7 as 0|1);
}

export const sla_ref_r16 = function(cpu: Cpu, r16: string) {
    cpu.resetFlag();
    const addr = cpu.getRegister('hl');
    const v = cpu.mmapper.getUint8(addr);
    const bit7 = (v & 0b10000000) >> 7;
    const newV = v << 1;
    if (newV === 0) {
        cpu.setZFlag(1);
    }
    cpu.mmapper.setUint8(addr, newV);
    cpu.setCFlag(bit7 as 0|1);
}

export const sra_r8 = function(cpu: Cpu, r8: string) {
    cpu.resetFlag();
    const v = cpu.getRegister(r8);
    const bit0 = v & 0b1;
    const newV = v >> 1;
    if (newV === 0) {
        cpu.setZFlag(1);
    }
    cpu.setRegister(r8, newV);
    cpu.setCFlag(bit0 as 0|1);
}

export const sra_ref_r16 = function(cpu: Cpu, r16: string) {
    cpu.resetFlag();
    const addr = cpu.getRegister(r16);
    const v = cpu.mmapper.getUint8(addr);
    const bit0 = v & 0b1;
    const newV = v >> 1;
    if (newV === 0) {
        cpu.setZFlag(1);
    }
    cpu.mmapper.setUint8(addr, v);
    cpu.setCFlag(bit0 as 0|1);

}

export const swap_r8 = function(cpu: Cpu, r8: string) {
    cpu.resetFlag();
    const v = cpu.getRegister(r8);
    const hNibble = v >> 4;
    const lNibble = v & 0b00001111;
    const newV = (lNibble << 4) + hNibble;
    cpu.setRegister(r8, newV);
    if (newV === 0) {
        cpu.setZFlag(1);
    }
}

export const swap_ref_r16 = function(cpu: Cpu, r16: string) {
    cpu.resetFlag();
    const addr = cpu.getRegister(r16);
    const v = cpu.mmapper.getUint8(addr);
    const hNibble = v >> 4;
    const lNibble = v & 0b00001111;
    const newV = (lNibble << 4) + hNibble;
    cpu.mmapper.setUint8(addr, v);
    if (newV === 0) {
        cpu.setZFlag(1);
    }
}

export const srl_r8 = function(cpu: Cpu, r8: string) {
    cpu.resetFlag();
    const v = cpu.getRegister(r8);
    const bit7 = v >> 7;
    const newV = v << 1;
    if (newV === 0) {
        cpu.setZFlag(1);
    }
    cpu.setRegister(r8, newV);
    cpu.setCFlag(bit7 as 0|1);
}

export const srl_ref_r16 = function(cpu: Cpu, r16: string) {
    cpu.resetFlag();
    const addr = cpu.getRegister(r16);
    const v = cpu.mmapper.getUint8(addr);
    const bit7 = v >> 7;
    const newV = v << 1;
    if (newV === 0) {
        cpu.setZFlag(1);
    }
    cpu.mmapper.setUint8(addr, v);
    cpu.setCFlag(bit7 as 0|1);

}

export const bit_x_r8 = function(cpu: Cpu, x: number, r8: string) {
    cpu.setNFlag(0);
    cpu.setHFlag(1);
    if ((cpu.getRegister(r8) & (1 << x)) == 0) {
        cpu.setZFlag(1);
    } else {
        cpu.setZFlag(0);
    }
}

export const bit_x_ref_r16 = function(cpu: Cpu, x: number, r16: string) {
    cpu.setNFlag(0);
    cpu.setHFlag(1);
    cpu.setZFlag((cpu.getRegister(r16) & (1 << x)) as 0|1);
}

export const res_x_r8 = function(cpu: Cpu, x: number, r8: string) {
    const v = cpu.getRegister(r8);
    cpu.setRegister(r8, v & (0xff & ~(1 << x)));
}

export const res_x_ref_r16 = function(cpu: Cpu, x: number, r16: string) {
    const addr = cpu.getRegister(r16)
    const v = cpu.mmapper.getUint8(addr);
    cpu.mmapper.setUint8(addr, v & (0xff & ~(1 << x)));
}

export const set_x_r8 = function(cpu: Cpu, x: number, r8: string) {
    const v = cpu.getRegister(r8);
    cpu.setRegister(r8, v | (1 << x));
}

export const set_x_ref_r16 = function(cpu: Cpu, x: number, r16: string) {
    const addr = cpu.getRegister(r16)
    const v = cpu.mmapper.getUint8(addr);
    cpu.mmapper.setUint8(addr, v | (1 << x));
}
