/**
* Abstraction between the screen
* and the gameboy.
* is used by the pixelfetcher
* to draw the screen
*
* Here, framebuffer is only a uint16array;
* It's up to the screen implementation to
* handle the good color of the pixel
* and the alignement
*/
export type FrameBuffer = Uint16Array;

export const MAP_SIZE_X = 256;
export const MAP_SIZE_Y = 256;
