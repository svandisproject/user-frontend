import {PageRequest} from './PageRequest';

export interface Pageable<T> {
    content: T[];
    total: number;
    page_request: PageRequest;
}
