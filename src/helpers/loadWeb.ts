import { MemoryMapper } from "../memorymapper";

const innerLoadRom = (mm: MemoryMapper, file: FileList|null) => {
    console.log(mm);
    console.log(file);
}

/**
* Create an interface
* to add rom to mmu
*/
export const loadRom = (mm: MemoryMapper, romname: string = "unused") => {
    const loadRomNode = document.getElementById("loadRom");
    if (!loadRomNode) {
        throw new Error("unable to find load rom html node");
    }
    const input = document.createElement("input");
    const validate = document.createElement("button");
    validate.onclick = () => innerLoadRom(mm, input.files);;
    validate.textContent = "Load";
    input.type = "file";
    loadRomNode.appendChild(input);
    loadRomNode.appendChild(validate);
}
