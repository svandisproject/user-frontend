import {Injectable} from '@angular/core';
import {Observable } from 'rxjs';
import {AuthService} from '../../common/auth/AuthService';
import {TagsResource} from '../resource/GeneratorResource';
import {DashboardResource} from '../resource/DashboardResource';
import {UserTagsRes} from '../dataModels/UserTagsRes';
import {SaveTagsRes} from '../dataModels/SaveTagsRes';
import {GetTagsRes} from '../dataModels/GetTagsRes';

@Injectable()
export class GeneratorService {

    constructor(
        private authService: AuthService,
        private tagsResource: TagsResource,
        private dashboardResource: DashboardResource
    ) {
    }

    getAuthToken(): string {
        return this.authService.getSessionJwtToken();
    }

    getTagContent(token) {
        return `<app-svandis-news [filters]="${token}"></app-svandis-news>`;
    }


    public getAllTags(): Observable<GetTagsRes> {
        return this.tagsResource.findAll();
    }

    public getUserTags(): Observable<UserTagsRes> {
        return this.dashboardResource.getUserTags();
    }

    public saveUserTags(selectedTags: {[key: string]: boolean}): Observable<SaveTagsRes> {
        return this.dashboardResource.saveUserTags(Object.keys(selectedTags).filter(v => selectedTags[v]));
    }
}
