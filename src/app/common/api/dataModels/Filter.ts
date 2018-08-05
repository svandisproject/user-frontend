export class Filter {
    /**
     * eq = equals;
     * gt = greater then
     * lk = like
     * bw = between
     * in = in use 1 filter with this type , the value gets an array of string
     */
    public type: 'eq' | 'gt' | 'lt' | 'lk' | 'bw' | 'in';
    public property: string;
    public value: string | string[];


    constructor(type: 'eq' | 'gt' | 'lt' | 'lk' | 'bw' | 'in', property: string, value: string | string[]) {
        this.type = type;
        this.property = property;
        this.value = value;
    }
}
