import {Tag} from './Tag';

export interface Post {
    id: string;
    title: string;
    url: string;
    content: string;
    source: string;
    publishedAt: Date;
    createdAt: Date;
    tags: Tag[];
}
