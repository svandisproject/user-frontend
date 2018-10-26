import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {GeneralDataTableColumn} from '../../../common/dataTable/GeneralDataTableColumn';
import {EditTagGroup, TagGroup} from '../../../common/api/dataModels/TagGroup';
import {TagGroupService} from '../../../common/api/services/TagGroupService';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {CreateTagGroupDialogComponent} from '../dialogs/CreateTagGroupDialogComponent';
import {finalize} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
    selector: 'app-admin-tag-groups',
    templateUrl: 'tagGroupList.html',
    encapsulation: ViewEncapsulation.None
})

export class TagGroupListComponent implements OnInit {
    public isLoading = false;
    public columns: GeneralDataTableColumn[] = [
        {columnName: 'ID', columnKey: 'id'},
        {columnName: 'Title', columnKey: 'title'},
        {columnName: 'Tags', columnKey: 'tags', isArray: true, arrayItemKey: 'title'},
    ];

    private tagGroupSubject: BehaviorSubject<Pageable<TagGroup>> = new BehaviorSubject<Pageable<TagGroup>>(null);

    constructor(private tagGroupService: TagGroupService,
                private matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.tagGroupService.findAll()
            .subscribe((res) => this.tagGroupSubject.next(res));
    }

    public getDataSet(): Observable<Pageable<TagGroup>> {
        return this.tagGroupSubject.asObservable();
    }

    public edit(group: TagGroup) {
        const ref = this.matDialog.open(CreateTagGroupDialogComponent, {data: {group: group}});
        ref.afterClosed().subscribe((res) => {
            if (res) {
                this.updateGroups(res);
            }
        });
    }

    public create() {
        const ref = this.matDialog.open(CreateTagGroupDialogComponent);
        ref.afterClosed().subscribe((res) => {
            if (res) {
                this.updateGroups(res, true);
            }
        });
    }

    private updateGroups(res: EditTagGroup, isNew = false) {
        this.isLoading = true;
        this.tagGroupService[isNew ? 'create' : 'update'](res)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe((group) => {
                const groups = this.tagGroupSubject.getValue();
                if (isNew) {
                    groups.content.push(group);
                } else {
                    const index = _.findIndex(groups.content, (g) => g.id === group.id);
                    groups.content[index] = group;
                }
                this.tagGroupSubject.next(_.cloneDeep(groups));
            });
    }

// public loadPage(pageEvent: PageEvent): void {
    //     this.postService.findBy(null, pageEvent.pageIndex + 1)
    //         .subscribe((res) => this.posts = res);
    // }
}
