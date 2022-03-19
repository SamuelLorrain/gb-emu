import {Cpu} from '../cpu';

export const debugReg = (cpu: Cpu) => {
    for(const reg in cpu.registerMap.heightBitsRegisterMapping) {
        const value = cpu.registerMap.getRegister(reg as keyof Object);
        console.log(
            `${reg} : 0x${value}`
        );
    }
    for(const reg in cpu.registerMap.sixteenBitsRegisterMapping) {
        const value = cpu.registerMap.getRegister(reg as keyof Object);
        console.log(
            `${reg} : 0x${value}`
        );
    }
};

export const debugMemory = (cpu: Cpu, addr: number, distance:number = 1) => {
    let beginDistance = 0;
    if(addr - distance >= 0) {
        beginDistance = - distance;
    }
    for(let i = beginDistance; i < distance; i++) {
        const currentAddr = i + addr
        console.log(`0x${currentAddr.toString(16)} : 0x${cpu.memory.getUint8(currentAddr).toString(16)}`);
    }
}

export const debugFlags = (cpu: Cpu) => {
    console.log(`Z : ${cpu.getZFlag()}`);
    console.log(`N : ${cpu.getNFlag()}`);
    console.log(`H : ${cpu.getHFlag()}`);
    console.log(`C : ${cpu.getCFlag()}`);
}
