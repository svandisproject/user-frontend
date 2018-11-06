import {Injectable} from '@angular/core';
import {LikeResource} from '../resource/LikeResource';
import {Post} from '../dataModels/Post';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {UserAuthService} from '../../../common/user/UserAuthService';

@Injectable()
export class LikeService {
    constructor (private likeResource: LikeResource, 
                 private userAuthService: UserAuthService) {
    }

    public add(post: Post): Observable<any> {
        return this.userAuthService.getCurrentUser()
                    .pipe(
                        switchMap(user => this.likeResource.create({ like: { user: user.id, post: post.id }}))
                    );
    
    }

    public remove(post: Post): Observable<any> {
        return this.likeResource.delete(post.id);
    }
}