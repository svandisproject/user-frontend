import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
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

    selectTag(e: MatChipSelectionChange) {
        /*if (e.selected) {
            this.selectedTags.push(e.source.value);
        } else {
            this.selectedTags = this.selectedTags.filter(v => v !== e.source.value);
        }*/
    }

    getTagContent() {
        const token = this.getToken();
        return `<app-svandis-news [filters]="${token}"></app-svandis-news>`;
    }


    // TODO: Remove mocks and add types
    public getTags(): Observable<any> {
        // return this.tagsResource.findAll();
        return of([
            {
                id: 1,
                title: 'Group 1',
                items: [
                    {id: 1, title: 'test-1'},
                    {id: 2, title: 'test-2'},
                    {id: 3, title: 'test-3'}
                    ]
            },
            {
                id: 1,
                title: 'Group 2',
                items: [
                    {id: 3, title: 'test-3'},
                    {id: 4, title: 'test-4'},
                    {id: 5, title: 'test-5'},
                    {id: 6, title: 'test-6'},
                    {id: 7, title: 'test-7'},
                    {id: 8, title: 'test-8'},
                    {id: 9, title: 'test-9'},
                    {id: 10, title: 'test-10'},
                    {id: 11, title: 'test-11'},
                    {id: 12, title: 'test-12'},
                    {id: 13, title: 'test-13'},
                    {id: 14, title: 'test-14'},
                    {id: 15, title: 'test-15'},
                    {id: 16, title: 'test-16'},
                    {id: 17, title: 'test-17'},
                    {id: 18, title: 'test-18'},
                    {id: 19, title: 'test-19'},
                    {id: 20, title: 'test-20'},
                    {id: 21, title: 'test-21'},
                    {id: 22, title: 'test-22'},
                    {id: 23, title: 'test-23'}
                ]
            }
        ]);
    }

    getToken(): string {
        return this.authService.getSessionJwtToken();
    }
}
