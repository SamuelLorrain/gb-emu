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

export const ld_n_r8 = function(cpu: Cpu, reg: keyof Object) {
    const v = cpu.fetchNext();
    cpu.setRegister(reg, v);
}

export const ld_r8_r8 = function(cpu: Cpu, r1: keyof Object, r2: keyof Object) {
    cpu.setRegister(r1, cpu.getRegister(r2));
}

// TODO could use typescript to ensure
// that we can only pass a 8bits register to the command
export const inc_r8 = function(cpu: Cpu, reg: keyof Object) {
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
    cpu.setRegister(reg,newV);
}

// TODO could use typescript to ensure
// that we can only pass a 8bits register to the command
export const dec_r8 = function(cpu: Cpu, reg: keyof Object) {
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
    // TODO "set if no borrow from bit 4"
    if ((((v & 0xf) + (newV & 0xf)) & 0x10) === 0x10) {
        cpu.setHFlag(1);
    }
    cpu.setRegister(reg,newV);
}

export const add_A_r8 = function(cpu: Cpu, r1: keyof Object) {
    cpu.resetFlag();
    let v1 = cpu.getRegister('a' as keyof Object);
    let v2 = cpu.getRegister(r1);
    let result = v1 + v2;
    if (result === 0) {
        cpu.setZFlag(1);
    } else if (result > 0xff) {
        cpu.setCFlag(1);
    }
    if ((((v1 & 0xf) + (result & 0xf)) & 0x10) === 0x10) {
        cpu.setHFlag(1);
    }
    cpu.setRegister('a' as keyof Object, result & 0xff);
}

export const adc_A_r8 = function(cpu: Cpu, r1: keyof Object) {
    let v1 = cpu.getRegister('a' as keyof Object);
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
    cpu.setRegister('a' as keyof Object, result & 0xff);
}

export const and_A_r8 = function(cpu: Cpu, r1: keyof Object) {
    cpu.resetFlag();
    cpu.setHFlag(1);
    const a = cpu.getRegister('a' as keyof Object);
    const v = cpu.getRegister(r1);
    const result = a & v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister('a' as keyof Object, result);
}

export const or_A_r8 = function(cpu: Cpu, r1: keyof Object) {
    cpu.resetFlag();
    const a = cpu.getRegister('a' as keyof Object);
    const v = cpu.getRegister(r1);
    const result = a | v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister('a' as keyof Object, result);
}

export const xor_A_r8 = function(cpu: Cpu, r1: keyof Object) {
    cpu.resetFlag();
    const a = cpu.getRegister('a' as keyof Object);
    const v = cpu.getRegister(r1);
    const result = a ^ v;
    if (result == 0) {
        cpu.setZFlag(0);
    }
    cpu.setRegister('a' as keyof Object, result);
}

export const ld_ref_hl_r8 = function(cpu: Cpu, reg: keyof Object) {
    const addr = cpu.getRegister('h' as keyof Object) << 8 + cpu.getRegister('l' as keyof Object);
    const value = cpu.getRegister(reg);
    cpu.memory.setUint8(addr, value);
}

export const ld_r8_ref_hl = function(cpu: Cpu, reg: keyof Object) {
    const addr = cpu.getRegister('h' as keyof Object) << 8 + cpu.getRegister('l' as keyof Object);
    const value = cpu.memory.getUint8(addr);
    cpu.setRegister(reg, value);
}

export const rlca = function(cpu: Cpu) {
    const a = cpu.getRegister('a' as keyof Object);
    cpu.resetFlag();
    const result = a << 1;
    if (result === 0) {
        cpu.setZFlag(1);
    }
    cpu.setCFlag(((a >> 7) & 0b1) as 0|1);
    cpu.setRegister('a' as keyof Object, result);
}

export const rla = function(cpu: Cpu) {
    const a = cpu.getRegister('a' as keyof Object);
    let result = a << 1;
    result += cpu.getCFlag();
    cpu.resetFlag();
    if (result === 0) {
        cpu.setZFlag(1);
    }
    cpu.setCFlag(((a >> 7) & 0b1) as 0|1);
    cpu.setRegister('a' as keyof Object, result);
}

export const rrca = function(cpu: Cpu) {
    const a = cpu.getRegister('a' as keyof Object);
    cpu.resetFlag();
    const result = a >> 1;
    if (result === 0) {
        cpu.setZFlag(1);
    }
    cpu.setCFlag((a & 0b00000001) as 0|1);
    cpu.setRegister('a' as keyof Object, result);
}

export const rra = function(cpu: Cpu) {
    const a = cpu.getRegister('a' as keyof Object);
    cpu.resetFlag();
    const result = (a >> 1) & (cpu.getCFlag() << 7) ;
    if (result === 0) {
        cpu.setZFlag(1);
    }
    cpu.setCFlag((a & 0b00000001) as 0|1);
    cpu.setRegister('a' as keyof Object, result);
}

export const cpl_A = function(cpu: Cpu) {
    const a = cpu.getRegister('a' as keyof Object);
    cpu.setRegister('a' as keyof Object, ~a);
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
