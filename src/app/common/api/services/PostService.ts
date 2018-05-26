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

    public findBy(filters: Filter[]): Observable<Pageable<Post>> {
        return this.postResource.findBy(filters);
    }

    public findById(postId: string): Observable<Post> {
        return this.postResource.findById(postId);
    }

    public saveOrCreate(post: Post): Observable<Post> {
        if (post.id) {
            return this.postResource.update(post);
        } else {
            return this.postResource.create(post);
        }
    }
}
