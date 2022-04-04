# gb-emu

A typescript game boy emulator,
it's a really early stage wip

# TODO

- timing
- inputs
- interrupts
- memory banking (mbc1, mbc2, mbc3, ...)
- sounds
- gbc
- use macro (sweet.js or bable_macros)
- web ui (video in x2 x4 x8)
- speed up emulator
- save
- savestate
- serial IO (link cable)
- debugging UI

# Using

## Install

```bash
npm install
```

## Launch

terminal ui
```bash
npx webpack && node ./dist/bundle.js
```

web ui
```bash
npx webpack && {web browser} ./dist/index.html
```

## Testing

```bash
npm test
```
