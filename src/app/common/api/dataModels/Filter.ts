/**
 * eq = equals;
 * gt = greater then
 * lk = like
 * bw = between
 */

export interface Filter {
    type: 'eq' | 'gt' | 'lt' | 'lk' | 'bw';
    property: string;
    value: string;
}
