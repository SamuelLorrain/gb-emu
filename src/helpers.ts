export const unsigned_add = function(x: number, y: number, maxValue: number): number {
    let result = x + y;
    if (result > maxValue) {
        result = maxValue - result;
    }
    return result;
};

export const unsigned_sub = function(x: number, y: number, maxValue: number): number {
    let result = x - y;
    if (result < 0) {
        result = maxValue + result;
    }
    return result;
};

export const is_add_overflow = function(x: number, y: number, maxValue: number) {
    return x + y > maxValue;
};

export const to_signed_i8 = function(x:number) {
    return x & 0x80 ? x-256 : x;
};
