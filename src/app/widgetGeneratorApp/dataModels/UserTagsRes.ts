import {Tag} from './Tag';
export interface UserTagsRes {
    id: number;
    token: string;
    tags: Tag[];
}