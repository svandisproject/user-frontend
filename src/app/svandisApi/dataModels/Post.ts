import {Tag} from './Tag';

export interface Post {
    id: string;
    title: string;
    url: string;
    content;
    source;
    publishedAt: Date;
    createdAt: Date;
    tags: Tag[];
}
