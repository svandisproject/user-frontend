import {Tag} from './Tag';

export interface Post {
    id?: string;
    title?: string;
    url?: string;
    content?: string;
    source?: string;
    tags_added_by?: any;
    published_at?: Date;
    created_at?: Date;
    imageUrl?: string;
    tags?: Tag[];
    isLiked?: Boolean;
}

export interface PostUpdate {
    title?: string;
    content?: string;
    imageUrl?: string;
    tags?: string[];
}