import {Tag} from './Tag';

export interface Post {
    id?: string;
    title?: string;
    url?: string;
    content?: string;
    source?: string;
    published_at?: Date;
    created_at?: Date;
    imageUrl?: string;
    tags?: Tag[];
}

export interface PostUpdate {
    title?: string;
    url?: string;
    content?: string;
    source?: string;
    published_at?: Date;
    imageUrl?: string;
    tags?: string[];
}