import {PageRequest} from './PageRequest';

export interface Pageable<T> {
    content: T[];
    total: number;
    pageRequest: PageRequest;
}
