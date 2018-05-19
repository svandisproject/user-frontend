import {Filter} from '../dataModels/Filter';

export class FilterFactory {
    private filters: Filter[];

    constructor() {
        this.filters = [];
    }

    public create(filters: Filter[]): FilterFactory {
        this.filters = filters;
        return this;
    }

    public add(filter: Filter): FilterFactory {
        if (this.filters) {
            this.filters.push(filter);
        } else {
            this.filters = [filter];
        }

        return this;
    }

    public build(): Filter[] {
        const filters = this.filters;
        this.filters = null;
        return filters;
    }
}