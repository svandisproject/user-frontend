import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Filter} from '../../../common/api/dataModels/Filter';
import {BehaviorSubject, Observable} from 'rxjs';
import {TagGroup} from '../../../common/api/dataModels/TagGroup';
import {TagGroupService} from '../../../common/api/services/TagGroupService';
import {MatSelectChange} from '@angular/material';

@Component({
    selector: 'app-news-feed-filter',
    templateUrl: 'tagFilter.html'
})

export class TagFilterComponent implements OnInit {
    @Output() tagSelect: EventEmitter<Filter> = new EventEmitter<Filter>();
    private tagGroupSubject: BehaviorSubject<TagGroup[]> = new BehaviorSubject<TagGroup[]>(null);

    constructor(private tagGroupService: TagGroupService) {
    }

    ngOnInit() {
        this.loadTagGroups();
    }

    public filterSelect(event: MatSelectChange) {
        if (!event.value) {
            this.tagSelect.emit(null);
        }
        this.tagSelect.emit(new Filter('eq', 'tags.id', event.value));
    }

    public getTagGroups(): Observable<TagGroup[]> {
        return this.tagGroupSubject.asObservable();
    }

    private loadTagGroups() {
        this.tagGroupService.findBy([
            new Filter('lk', 'title', 'Sentiment'),
        ])
            .subscribe((res) => this.tagGroupSubject.next(res.content));
    }
}