import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TagService} from '../../../common/api/services/TagService';
import {Tag} from '../../../common/api/dataModels/Tag';

@Injectable()
export class EditTagResolver implements Resolve<Observable<Tag>> {

    constructor(private tagService: TagService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag> {
        const id: string = route.params['id'];
        return this.tagService.findById(id);
    }
}