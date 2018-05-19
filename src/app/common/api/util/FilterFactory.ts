import {Filter} from '../dataModels/Filter';

export class FilterFactory {
    private filters: Filter[];

    public create(filter?: Filter): FilterFactory {
        this.filters = filter ? [filter] : [];
        return this;
    }

    public add(filter): FilterFactory {
        if (this.filters) {
            this.filters.push(filter);
        }

        return this;
    }

    public build(): Filter[] {
        const filters = this.filters;
        this.filters = null;
        return filters;
    }
}