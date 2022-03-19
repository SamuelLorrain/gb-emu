import { Cpu } from './../cpu';

export const debugReg = (cpu: Cpu) => {
    const registers = new Map<string, number>();
    for(const reg in cpu.registerMap.heightBitsRegisterMapping) {
        const value = cpu.registerMap.getRegister(reg as keyof Object);
        registers.set(reg, value);
    }
    for(const reg in cpu.registerMap.sixteenBitsRegisterMapping) {
        const value = cpu.registerMap.getRegister(reg as keyof Object);
        registers.set(reg, value);
    }

    const r = document.getElementById("registers");
    if (r !== null) {
        let p;
        r.innerHTML = '';
        for (const [k,v] of registers.entries()) {
            p = document.createElement('p');
            p.innerHTML = `<b>${k}</b> : 0x${v.toString(16)}`;
            r.appendChild(p);
        }
    }
};

export const debugMemory = (cpu: Cpu, addr: number, distance:number = 1) => {
    const r = document.getElementById("registers");
    let p;
    if (r === null) {
        return;
    }
    let beginDistance = 0;
    if(addr - distance >= 0) {
        beginDistance = - distance;
    }
    for(let i = beginDistance; i < distance; i++) {
        const currentAddr = i + addr
        p = document.createElement('p');
        p.innerHTML = `0x${currentAddr.toString(16)} : 0x${cpu.mmapper.getUint8(currentAddr).toString(16)}`;
        r.appendChild(p);
    }
};

export const debugFlags = (cpu: Cpu) => {
    const r = document.getElementById("flags");
    if (r === null) {
        return;
    }
    let p;
    let flags = [
        `Z : ${cpu.getZFlag()}`,
        `N : ${cpu.getNFlag()}`,
        `H : ${cpu.getHFlag()}`,
        `C : ${cpu.getCFlag()}`,
    ];
    for (const i of flags) {
        p = document.createElement('p');
        p.innerHTML = i;
        r.appendChild(p);
    }
}
