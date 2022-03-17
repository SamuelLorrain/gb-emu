export const RAM_SIZE_IN_BYTES = 0xFFFF;

export const createMemory: ((n: number) => DataView) = (sizeInBytes: number) => {
    return new DataView(new ArrayBuffer(sizeInBytes));
}
