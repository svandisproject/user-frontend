import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Tag} from '../../common/api/dataModels/Tag';
import {TagService} from '../../common/api/services/TagService';

@Injectable()
export class NewsFeedResolver implements Resolve<Observable<Tag[]>> {

    constructor(private tagService: TagService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]> {
        return this.tagService.loadMainTags();
    }
}