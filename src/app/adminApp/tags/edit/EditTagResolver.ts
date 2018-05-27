import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {Post} from '../../../common/api/dataModels/Post';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {TagService} from '../../../common/api/services/TagService';

@Injectable()
export class EditTagResolver implements Resolve<Observable<Post>> {

    constructor(private tagService: TagService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
        const id: string = route.params['id'];
        return this.tagService.findById(id);
    }
}