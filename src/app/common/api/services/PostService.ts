import {Injectable} from '@angular/core';
import {PostResource} from '../resource/PostResource';
import {Observable} from 'rxjs/Observable';
import {Post} from '../dataModels/Post';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';

@Injectable()
export class PostService {
    constructor(private postResource: PostResource) {
    }

    public findAll(): Observable<Pageable<Post>> {
        return this.postResource.findAll();
    }

    public findBy(filters: Filter[], page: number = 1): Observable<Pageable<Post>> {
        return this.postResource.findBy(filters, String(page));
    }

    public findById(postId: string): Observable<Post> {
        return this.postResource.findById(postId);
    }

    public saveOrCreate(post: Post, id?: string): Observable<Post> {
        if (id) {
            return this.postResource.update(id, {post: post});
        } else {
            return this.postResource.create({post: post});
        }
    }
}
