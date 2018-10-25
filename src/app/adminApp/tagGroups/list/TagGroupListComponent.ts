import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {GeneralDataTableColumn} from '../../../common/dataTable/GeneralDataTableColumn';
import {ActivatedRoute, Router} from '@angular/router';
import {TagGroup} from '../../../common/api/dataModels/TagGroup';
import {TagGroupService} from '../../../common/api/services/TagGroupService';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'app-admin-tag-groups',
    templateUrl: 'tagGroupList.html',
    encapsulation: ViewEncapsulation.None
})

export class TagGroupListComponent implements OnInit {
    public columns: GeneralDataTableColumn[] = [
        {columnName: 'ID', columnKey: 'id'},
        {columnName: 'Title', columnKey: 'title'},
        {columnName: 'Tags', columnKey: 'tags', isArray: true, arrayItemKey: 'title'},
    ];

    private tagGroupSubject: BehaviorSubject<Pageable<TagGroup>> = new BehaviorSubject<Pageable<TagGroup>>(null);

    constructor(private tagGroupService: TagGroupService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.tagGroupService.findAll()
            .subscribe((res) => this.tagGroupSubject.next(res));
    }

    public getDataSet(): Observable<Pageable<TagGroup>> {
        return this.tagGroupSubject.asObservable();
    }

    // public loadPage(pageEvent: PageEvent): void {
    //     this.postService.findBy(null, pageEvent.pageIndex + 1)
    //         .subscribe((res) => this.posts = res);
    // }
}
