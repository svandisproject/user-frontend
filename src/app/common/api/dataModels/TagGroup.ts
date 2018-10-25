import {Tag} from './Tag';

export interface TagGroup {
    id?: number;
    title: string;
    tags: Tag[] | number[];
    enabled: boolean;
}

export interface EditTagGroup extends TagGroup {
    tags: number[];
}