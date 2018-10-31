import {TagGroup} from './TagGroup';

export interface Tag {
    id?: string;
    title: string;
    added_by?: any[];
    group?: TagGroup;
}
