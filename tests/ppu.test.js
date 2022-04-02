import { makePpu, putGraphicsInRam, putTwoGraphicsInRam } from './init';

test('putGraphicsInRam test function works as expected', function() {
    const ppu = makePpu();
    putGraphicsInRam(ppu.mm, 1);
    for(let i = 0x9800; i <= 0x9bff; i++) {
        expect(ppu.mm.getUint8(i)).toBe(1);
    }

    putGraphicsInRam(ppu.mm, 0xa);
    for(let i = 0x9800; i <= 0x9bff; i++) {
        expect(ppu.mm.getUint8(i)).toBe(0xa);
    }
});

test('ppu can change state on tick', function() {
    const ppu = makePpu();
    putGraphicsInRam(ppu.mm, 1);

    // enable lcd
    ppu.mm.setUint8(0xff40, 0b10000000);
    ppu.ppu.onOff = true;

    // state before 19
    ppu.ppu.ticks = 19;
    ppu.ppu.state.setPpuStatus("oamsearch");
    ppu.ppu.tick(); // ticks = 20, from oamsearch to pixeltransfer
    expect(ppu.ppu.pixelDrawnsOnCurrentLine).toBe(0);
    expect(ppu.ppu.getState()).toBe("pixeltransfer");
});

test('ppu can make pixel fifo to enqueue tile line', function() {
    const ppu = makePpu();
    putGraphicsInRam(ppu.mm, 1);
    ppu.mm.setUint8(0xff40, 0b10000000);
    ppu.ppu.onOff = true;
    ppu.ppu.ticks = 19;
    ppu.ppu.state.setPpuStatus("oamsearch");
    ppu.ppu.tick();

    for(let i = 0; i <= 7; i++) {
        ppu.ppu.tick();
    }
    expect(ppu.ppu.fetcher.fifo.length()).toBe(7);
    expect(ppu.ppu.fetcher.fifo.deque()).toBe(2);
    expect(ppu.ppu.fetcher.fifo.deque()).toBe(3);
    expect(ppu.ppu.fetcher.fifo.deque()).toBe(3);
    expect(ppu.ppu.fetcher.fifo.deque()).toBe(3);
    expect(ppu.ppu.fetcher.fifo.deque()).toBe(3);
    expect(ppu.ppu.fetcher.fifo.deque()).toBe(2);
    expect(ppu.ppu.fetcher.fifo.deque()).toBe(0);
});

test('ppu can add tile line to lcd', function() {
    const ppu = makePpu();
    putGraphicsInRam(ppu.mm, 1);
    ppu.mm.setUint8(0xff40, 0b10000000);
    ppu.ppu.onOff = true;
    ppu.ppu.ticks = 19;
    ppu.ppu.state.setPpuStatus("oamsearch");
    ppu.ppu.tick();

    for(let i = 0; i <= 21; i++) {
        ppu.ppu.tick();
    } // should have push a tile line to lcd (timing to confirm)
    expect(ppu.ppu.frameBuffer.slice(0,8)).toStrictEqual(Uint16Array.from([0,2,3,3,3,3,2,0]));
});

test('ppu can add second tile line (on the first lcd line pixel 8 through 16)', function() {
    const ppu = makePpu();
    putTwoGraphicsInRam(ppu.mm);
    ppu.mm.setUint8(0xff40, 0b10000000);
    ppu.ppu.onOff = true;
    ppu.ppu.ticks = 19;
    ppu.ppu.state.setPpuStatus("oamsearch");
    ppu.ppu.tick();

    for(let i = 0; i <= 70; i++) {
        ppu.ppu.tick();
    }
    expect(ppu.ppu.frameBuffer.slice(0,16)).toStrictEqual(
        Uint16Array.from([
            0,2,3,3,3,3,2,0,
            1,1,1,1,1,1,1,1
        ])
    );
});
