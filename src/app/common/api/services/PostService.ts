import {Injectable} from '@angular/core';
import {PostResource} from '../resource/PostResource';
import {Observable} from 'rxjs/Observable';
import {Post, PostUpdate} from '../dataModels/Post';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import * as _ from 'lodash';
import {MatSnackBar} from '@angular/material';
import {tap} from 'rxjs/operators';
import {Sorting} from '../util/Sorting';

@Injectable()
export class PostService {
    constructor(private postResource: PostResource,
                private matSnackBar: MatSnackBar) {
    }

    public findAll(params?: any): Observable<Pageable<Post>> {
        return this.postResource.findAll(false, params);
    }

    public findBy(filters: Filter[], page: number = 1, sort?: Sorting): Observable<Pageable<Post>> {
        return this.postResource.findBy(filters, String(page), sort);
    }

    public findById(postId: string): Observable<Post> {
        return this.postResource.findById(postId);
    }

    public saveOrCreate(post: Post, id?: string): Observable<Post> {
        if (id) {
            return this.postResource.update(id, {post: this.postToPostUpdate(post) as any})
                .pipe(tap(() => this.matSnackBar.open('Post Updated')));
        } else {
            return this.postResource.create({post: post})
                .pipe(tap(() => this.matSnackBar.open('Post Created')));
        }
    }

    private postToPostUpdate(post: Post): PostUpdate {
        const postUpdate: any = _.omit(post, ['id', 'created_at']);
        postUpdate.tags = _.map(postUpdate.tags, tag => tag.id);
        return postUpdate;
    }
}
