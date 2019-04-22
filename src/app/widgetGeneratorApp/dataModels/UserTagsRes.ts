import {Tag} from './Tag';
export interface UserTagsRes {
    data: {
        id: number;
        token: string;
        tags: Tag[];
    };
}