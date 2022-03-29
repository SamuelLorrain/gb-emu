import { makeLcdStatus } from './init';

test('LcdStatus can fetch good status', function() {
    const lcdStatus = makeLcdStatus();
    //hblank
    lcdStatus.mm.setUint8(lcdStatus.lcdStatus.regIndex, 0x0);
    lcdStatus.lcdStatus.update();
    expect(lcdStatus.lcdStatus.getPpuStatus()).toBe("hblank");

    //vblank
    lcdStatus.mm.setUint8(lcdStatus.lcdStatus.regIndex, 0x1);
    lcdStatus.lcdStatus.update();
    expect(lcdStatus.lcdStatus.getPpuStatus()).toBe("vblank");

    // oamsearch
    lcdStatus.mm.setUint8(lcdStatus.lcdStatus.regIndex, 0x2);
    lcdStatus.lcdStatus.update();
    expect(lcdStatus.lcdStatus.getPpuStatus()).toBe("oamsearch");

    // pixeltransfer
    lcdStatus.mm.setUint8(lcdStatus.lcdStatus.regIndex, 0x3);
    lcdStatus.lcdStatus.update();
    expect(lcdStatus.lcdStatus.getPpuStatus()).toBe("pixeltransfer");
});

test('LcdStatus can update status', function() {
    const lcdStatus = makeLcdStatus();
    lcdStatus.lcdStatus.setPpuStatus("vblank");
    expect(lcdStatus.lcdStatus.getPpuStatus()).toBe("vblank");

    lcdStatus.lcdStatus.setPpuStatus("oamsearch");
    expect(lcdStatus.lcdStatus.getPpuStatus()).toBe("oamsearch");

    lcdStatus.lcdStatus.setPpuStatus("pixeltransfer");
    expect(lcdStatus.lcdStatus.getPpuStatus()).toBe("pixeltransfer");

    lcdStatus.lcdStatus.setPpuStatus("hblank");
    expect(lcdStatus.lcdStatus.getPpuStatus()).toBe("hblank");
});
