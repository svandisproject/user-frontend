import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MatChipSelectionChange} from '@angular/material';
import {AuthService} from '../../common/auth/AuthService';
import {TagsResource} from '../resource/GeneratorResource';

@Injectable()
export class GeneratorService {

    public selectedTags: number[] = [];
    constructor(
        private authService: AuthService,
        private tagsResource: TagsResource
    ) {
    }

    // TODO: HANDLE TAG SELECTION.
    selectTag(e: MatChipSelectionChange) {
    }

    getTagContent() {
        const token = this.getToken();
        return `<app-svandis-news [filters]="${token}"></app-svandis-news>`;
    }


    public getTags(): Observable<any> {
        return this.tagsResource.findAll();
    }

    getToken(): string {
        return this.authService.getSessionJwtToken();
    }
}
