import { Cpu } from '../cpu';
/**
*
* Module that is replaced by
* webpack NormalModuleRemplacement plugin
*
*/

export const debugReg = (cpu: Cpu) => {
    throw Error("FORBIDDEN MODULE")
};
export const debugMemory = (cpu: Cpu, addr: number, distance:number = 1) => {
    throw Error("FORBIDDEN MODULE")
}
export const debugFlags = (cpu: Cpu) => {
    throw Error("FORBIDDEN MODULE")
}
