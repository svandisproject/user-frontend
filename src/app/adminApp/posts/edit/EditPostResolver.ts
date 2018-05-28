import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {Post} from '../../../common/api/dataModels/Post';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PostService} from '../../../common/api/services/PostService';

@Injectable()
export class EditPostResolver implements Resolve<Observable<Post>> {

    constructor(private postService: PostService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
        const postId: string = route.params['id'];
        return this.postService.findById(postId);
    }
}