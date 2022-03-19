interface Device {
    getUint8: (addr: number) => number;
    getUint16: (addr: number, endianness: boolean) => number;
    setUint8: (addr: number, value: number) => void;
    setUint16: (addr: number, value: number, endianness: boolean) => void;
}

interface DeviceMap {
    start: number,
    end: number,
    refToDevice: Device,
    endianness: boolean
}

export class MemoryMapper {
    mapping: Array<DeviceMap>;

    constructor() {
        this.mapping = [];
    }

    map(start: number, end: number, device: Device, endianness = true) {
        this.mapping.unshift(
            {start, end, refToDevice: device, endianness}
        );
    }

    getUint8(addr: number): number {
        for (const i of this.mapping) {
            if (addr >= i.start && addr < i.end) {
                return i.refToDevice.getUint8(addr - i.start) as number;
            }
        }
        throw new Error("Memory mapper fail to get the device");
    }

    getUint16(addr: number): number {
        for (const i of this.mapping) {
            if (addr >= i.start && (addr+1) < i.end) { // 16 bits
                return i.refToDevice.getUint16(addr - i.start, i.endianness) as number;
            }
        }
        throw new Error("Memory mapper fail to get the device");
    }

    setUint8(addr: number, value: number) {
        for (const i of this.mapping) {
            if (addr >= i.start && addr < i.end) {
                i.refToDevice.setUint8(addr - i.start, value);
                return;
            }
        }
        throw new Error("Memory mapper fail to get the device");
    }

    setUint16(addr: number, value: number) {
        for (const i of this.mapping) {
            if (addr >= i.start && addr <= i.end) {
                i.refToDevice.setUint16(addr - i.start, value, i.endianness);
                return;
            }
        }
        throw new Error("Memory mapper fail to get the device");
    }
}
