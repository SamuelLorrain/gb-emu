export const createMemory: ((n: number) => DataView) = (sizeInBytes: number) => {
    return new DataView(new ArrayBuffer(sizeInBytes));
}
