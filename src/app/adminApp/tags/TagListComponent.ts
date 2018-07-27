import {Component, ViewEncapsulation} from '@angular/core';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {DataTableColumn} from '../dataTable/DataTableColumn';
import {ActivatedRoute, Router} from '@angular/router';
import {Tag} from '../../common/api/dataModels/Tag';
import {TagService} from '../../common/api/services/TagService';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app-admin-tags',
    templateUrl: './tagList.html',
    styleUrls: ['./tagList.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TagListComponent {
    public tags: Pageable<Tag>;

    public columns: DataTableColumn[] = [
        {columnName: 'id', columnKey: 'id'},
        {columnName: 'title', columnKey: 'title'},
    ];

    constructor(private tagService: TagService,
                private route: ActivatedRoute,
                private router: Router) {
        this.tagService.findAll().subscribe((tags) => this.tags = tags);
    }

    public editTag(tag: Tag): void {
        this.router.navigate(['admin', 'tag', 'edit', tag.id]);
    }

    public addTag(): void {
        this.router.navigate(['admin', 'tag', 'create']);
    }

    public loadPage(pageEvent: PageEvent): void {
        this.tagService.findBy(null, pageEvent.pageIndex + 1)
            .subscribe((res) => this.tags = res);
    }
}
