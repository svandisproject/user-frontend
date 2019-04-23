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

    getAuthToken(): string {
        return this.authService.getSessionJwtToken();
    }

    getTagContent(token): string {
        return `<app-svandis-news [filters]="${token}"></app-svandis-news>`;
    }


    public getAllTags(): Observable<TagGroup[]> {
        return this.tagsResource.findAll();
    }

    public getUserTags(): Observable<UserTagsRes> {
        return this.dashboardResource.getUserTags();
    }

    public saveUserTags(selectedTags: {[key: string]: boolean}): Observable<SaveTagsRes> {
        return this.dashboardResource.saveUserTags(_(selectedTags).keys().filter(v => _(selectedTags).get(v)));
    }
}
