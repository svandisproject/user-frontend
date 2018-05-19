export class Filter {
    /**
     * eq = equals;
     * gt = greater then
     * lk = like
     * bw = between
     */
    public type: 'eq' | 'gt' | 'lt' | 'lk' | 'bw';
    public property: string;
    public value: string;


    constructor(type: 'eq' | 'gt' | 'lt' | 'lk' | 'bw', property: string, value: string) {
        this.type = type;
        this.property = property;
        this.value = value;
    }
}
