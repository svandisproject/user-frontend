import {Tag} from './Tag';

export interface User {
    id?: string;
    likedArticles?: string[];
    added_tag?: Tag[];
}