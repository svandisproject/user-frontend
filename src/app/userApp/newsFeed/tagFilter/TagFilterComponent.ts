import {Component, OnInit} from '@angular/core';
import {Filter} from '../../../common/api/dataModels/Filter';
import {BehaviorSubject, Observable} from 'rxjs';
import {TagGroup} from '../../../common/api/dataModels/TagGroup';
import {TagGroupService} from '../../../common/api/services/TagGroupService';
import {MatSelectChange} from '@angular/material';
import * as _ from 'lodash';

@Component({
    selector: 'app-news-feed-filter',
    templateUrl: 'tagFilter.html'
})

export class TagFilterComponent implements OnInit {
    private tagGroupSubject: BehaviorSubject<TagGroup[]> = new BehaviorSubject<TagGroup[]>(null);
    private selectedFilterGroups: { groupId: number, tagId: string }[] = [];
    constructor(private tagGroupService: TagGroupService) {
    }

    ngOnInit() {
        this.loadTagGroups();
    }

    public filterSelect(event: MatSelectChange, group: TagGroup) {
        const selectedFilterGroup = _.find(this.selectedFilterGroups, (f) => f.groupId === group.id);

        if (!selectedFilterGroup) {
            this.selectedFilterGroups.push({groupId: group.id, tagId: event.value});
        } else {
            selectedFilterGroup.tagId = event.value;
        }

        const filters: Filter[] = _.map(this.selectedFilterGroups, (g) => {
            if (g.tagId) {
                return new Filter('eq', 'tags.id', g.tagId);
            }
        });

        this.tagGroupService.emitChange(_.compact(filters));
    }

    public getTagGroups(): Observable<TagGroup[]> {
        return this.tagGroupSubject.asObservable();
    }

    private loadTagGroups() {
        this.tagGroupService.findBy([
            new Filter('ne', 'enabled', 'false'),
        ])
            .subscribe((res) => this.tagGroupSubject.next(res.content));
    }
}