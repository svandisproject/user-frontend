import {Injectable} from '@angular/core';
import {PostResource} from '../resource/PostResource';
import {LikeResource} from '../resource/LikeResource';
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
    private readonly perPage = 50;
    constructor(private postResource: PostResource,
                private matSnackBar: MatSnackBar) {
    }

    public findAll(params?: any): Observable<Pageable<Post>> {
        return this.postResource.findAll(false, params);
    }

    public findBy(filters: Filter[], page: number = 1, sort?: Sorting, perPage = this.perPage): Observable<Pageable<Post>> {
        return this.postResource.findBy(filters, String(page), sort, perPage);
    }

    public findById(postId: string): Observable<Post> {
        return this.postResource.findById(postId);
    }

    public saveOrCreate(post: Post, id?: string): Observable<Post> {
        if (id) {
            return this.postResource.update(id, {post: this.postToPostUpdate(post) as any})
                .pipe(tap(() => this.matSnackBar.open('Post Updated', null, {verticalPosition: 'top'})));
        } else {
            return this.postResource.create({post: post})
                .pipe(tap(() => this.matSnackBar.open('Post Created', null, {verticalPosition: 'top'})));
        }
    }

    public deletePost(post: Post): Observable<void> {
        return this.postResource.delete(post.id);
    }

    private postToPostUpdate(post: Post): PostUpdate {
        const postUpdate: any = _.omit(post, ['id', 'created_at']);
        postUpdate.tags = _.map(postUpdate.tags, tag => tag.id);
        return postUpdate;
    }

    public getMostLikedToday(): Observable<Pageable<Post>> {
        return this.postResource.findMostLiked('day');
    }

    public getMostLikedThisWeek(): Observable<Pageable<Post>> {
        return this.postResource.findMostLiked('week');
    }

    public getMostLikedThisMonth(): Observable<Pageable<Post>> {
        return this.postResource.findMostLiked('month');
    }
}
