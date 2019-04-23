import {Tag} from './Tag';
export interface SaveTagsRes {
    id: number;
    token: string;
    tags: Tag[];
}