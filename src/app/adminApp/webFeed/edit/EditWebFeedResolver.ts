import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WebFeed} from '../../../common/api/dataModels/WebFeed';
import {WebFeedService} from '../../../common/api/services/WebFeedService';

@Injectable()
export class EditWebFeedResolver implements Resolve<Observable<WebFeed>> {

    constructor(private webFeedService: WebFeedService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WebFeed> {
        const id: string = route.params['id'];
        return this.webFeedService.findById(id);
    }
}