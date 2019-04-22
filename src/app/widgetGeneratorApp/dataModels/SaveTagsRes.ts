import {Tag} from './Tag';
export interface SaveTagsRes {
    data: {
        id: number;
        token: string;
        tags: Tag[];
    };
}