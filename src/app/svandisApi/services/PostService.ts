import {Injectable} from '@angular/core';
import {PostResource} from '../resource/PostResource';
import {Observable} from 'rxjs/Observable';
import {Post} from '../dataModels/Post';

/**
 * TODO: Remove when all understand this
 * Service layer should always be used intead of the resource , resource is only a data transfer layer.
 * No logic should be inside Resource !!!!
 */
@Injectable()
export class PostService {
    constructor(private postResource: PostResource) {
    }

    public findAll(): Observable<Post[]> {
        return this.postResource.findAll();
    }
}
