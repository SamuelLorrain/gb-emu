import { MemoryMapper } from "../memorymapper";

/**
*
* Module that is replaced by
* webpack NormalModuleRemplacement plugin
*
*/
export const loadRom = (mm: MemoryMapper, romname: string = "rom.rom") => {
    throw new Error("FORBIDDEN MODULE");
}
