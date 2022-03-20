import { Cpu } from './cpu';

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
    if (v == 0) {
        cpu.setZFlag(1);
    }
    if ((newV & 0xf) === 0) {
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

export const adc_A_r8 = function(cpu: Cpu, r1: string) {
    let v1 = cpu.getRegister('a');
    let v2 = cpu.getRegister(r1);
    let result = v1 + v2 + cpu.getCFlag();
    cpu.resetFlag();
    if (result === 0) {
        cpu.setZFlag(1);
    } else if (result > 0xff) {
        cpu.setCFlag(1);
    }
    if ((((v1 & 0xf) + (result & 0xf)) & 0x10) === 0x10) {
        cpu.setHFlag(1);
    }
    cpu.setRegister('a', result & 0xff);
}

export const and_A_r8 = function(cpu: Cpu, r1: string) {
    cpu.resetFlag();
    cpu.setHFlag(1);
    const a = cpu.getRegister('a');
    const v = cpu.getRegister(r1);
    const result = a & v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister('a', result);
}

export const or_A_r8 = function(cpu: Cpu, r1: string) {
    cpu.resetFlag();
    const a = cpu.getRegister('a');
    const v = cpu.getRegister(r1);
    const result = a | v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister('a', result);
}

export const xor_A_r8 = function(cpu: Cpu, r1: string) {
    cpu.resetFlag();
    const a = cpu.getRegister('a');
    const v = cpu.getRegister(r1);
    const result = a ^ v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister('a', result);
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
    let addr = cpu.getRegister('pc');
    addr += cpu.fetchNext();
    cpu.setRegister('pc', addr);
}

export const jr_nz_r8 = function(cpu: Cpu) {
    if (cpu.getZFlag() == 1) {
        cpu.fetchNext();
        return;
    }
    let addr = cpu.getRegister('pc');
    addr += cpu.fetchNext();
    cpu.setRegister('pc', addr);
}

export const jr_z_r8 = function(cpu: Cpu) {
    if (cpu.getZFlag() == 0) {
        cpu.fetchNext();
        return;
    }
    let addr = cpu.getRegister('pc');
    addr += cpu.fetchNext();
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

export const jr_nc_r8 = function(cpu: Cpu) {
    if (cpu.getCFlag() == 1) {
        cpu.fetchNext();
        return;
    }
    let addr = cpu.getRegister('pc');
    addr += cpu.fetchNext();
    cpu.setRegister('pc', addr);
}

export const jr_c_r8 = function(cpu: Cpu) {
    if (cpu.getCFlag() == 0) {
        cpu.fetchNext();
        return;
    }
    let addr = cpu.getRegister('pc');
    addr += cpu.fetchNext();
    cpu.setRegister('pc', addr);
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

// export const scf = function(cpu: Cpu) { }
// export const jr_c_r8 = function(cpu: Cpu) { }
// export const sub_r8_r8 = function(cpu: Cpu) { }
// export const sbc_r8_r8 = function(cpu: Cpu) { }

