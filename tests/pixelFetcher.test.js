import { makePixelFetcher,putGraphicsInRam } from './init';

test('can read tile id', function() {
    const pixelFetcher = makePixelFetcher();
    putGraphicsInRam(pixelFetcher.mm);

    pixelFetcher.pixelFetcher.initForLine(0x9800, 0);
    expect(pixelFetcher.pixelFetcher.state).toBe("ReadTileId");
    expect(pixelFetcher.pixelFetcher.currentTileId).toBe(0);
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    expect(pixelFetcher.pixelFetcher.state).toBe("ReadTile0");
    expect(pixelFetcher.pixelFetcher.currentTileId).toBe(1); // maybe not
});

test('can read tile line', function() {
    const pixelFetcher = makePixelFetcher();
    putGraphicsInRam(pixelFetcher.mm);

    pixelFetcher.pixelFetcher.initForLine(0x9800, 0);
    expect(pixelFetcher.pixelFetcher.state).toBe("ReadTileId");
    expect(pixelFetcher.pixelFetcher.currentTileId).toBe(0);
    // finish an entire loop of pixelFetching
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    expect(pixelFetcher.pixelFetcher.tileData).toEqual(Uint8Array.from([0,2,3,3,3,3,2,0]));
});

test('can read second tile line', function() {
    const pixelFetcher = makePixelFetcher();
    putGraphicsInRam(pixelFetcher.mm);

    pixelFetcher.pixelFetcher.initForLine(0x9800, 1);
    expect(pixelFetcher.pixelFetcher.state).toBe("ReadTileId");
    expect(pixelFetcher.pixelFetcher.currentTileId).toBe(0);
    // finish an entire loop of pixelFetching
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    expect(pixelFetcher.pixelFetcher.state).toBe("PushToFifo");
    expect(pixelFetcher.pixelFetcher.tileData).toEqual(Uint8Array.from([0,3,0,0,0,0,3,0]));
});


test('can push to fifo', function() {
    const pixelFetcher = makePixelFetcher();
    putGraphicsInRam(pixelFetcher.mm);

    pixelFetcher.pixelFetcher.initForLine(0x9800, 0);
    expect(pixelFetcher.pixelFetcher.state).toBe("ReadTileId");
    expect(pixelFetcher.pixelFetcher.currentTileId).toBe(0);
    // finish an entire loop of pixelFetching
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    pixelFetcher.pixelFetcher.tick();
    expect(pixelFetcher.pixelFetcher.state).toBe("ReadTileId");
    expect(pixelFetcher.pixelFetcher.fifo.deque()).toBe(0);
    expect(pixelFetcher.pixelFetcher.fifo.deque()).toBe(2);
    expect(pixelFetcher.pixelFetcher.fifo.deque()).toBe(3);
    expect(pixelFetcher.pixelFetcher.fifo.deque()).toBe(3);
    expect(pixelFetcher.pixelFetcher.fifo.deque()).toBe(3);
    expect(pixelFetcher.pixelFetcher.fifo.deque()).toBe(3);
    expect(pixelFetcher.pixelFetcher.fifo.deque()).toBe(2);
    expect(pixelFetcher.pixelFetcher.fifo.deque()).toBe(0);
});

