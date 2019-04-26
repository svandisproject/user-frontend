import {Injectable} from '@angular/core';
import {Observable } from 'rxjs';
import {AuthService} from '../../common/auth/AuthService';
import {TagsResource} from '../resource/GeneratorResource';
import {DashboardResource} from '../resource/DashboardResource';
import {UserTagsRes} from '../dataModels/UserTagsRes';
import {SaveTagsRes} from '../dataModels/SaveTagsRes';
import {TagGroup} from '../dataModels/TagGroup';
import * as _ from 'lodash';
@Injectable()
export class GeneratorService {

    constructor (private authService: AuthService,
        private tagsResource: TagsResource,
        private dashboardResource: DashboardResource) {
    }

    getTagContent(token): string {
        return `<svandis-news token="${token}"></svandis-news>`;
    }


    public getAllTags(): Observable<TagGroup[]> {
        return this.tagsResource.findAll();
    }

    public getUserTags(): Observable<UserTagsRes> {
        return this.dashboardResource.getUserTags();
    }

    public saveUserTags(selectedTags: {[key: string]: boolean}): Observable<SaveTagsRes> {
        const keys = _(selectedTags).keys().filter(v => _(selectedTags).get(v + '') === true ).value();
        return this.dashboardResource.saveUserTags(keys);
    }
}
