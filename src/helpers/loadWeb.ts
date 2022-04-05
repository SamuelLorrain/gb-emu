import { MemoryMapper } from "../memorymapper";

const innerLoadRom = async (mm: MemoryMapper, files: FileList|null) => {
    if (!files || files.length == 0) {
        console.error("unable to load file");
        return null;
    }
    return await files[0].arrayBuffer();
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
