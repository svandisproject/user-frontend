import {Post} from './Post';

export interface Tag {
    id: string;
    title: string;
    post: Post;
}
