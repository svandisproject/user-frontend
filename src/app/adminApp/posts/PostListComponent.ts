import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PostService} from '../../common/api/services/PostService';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {Post} from '../../common/api/dataModels/Post';
import {GeneralDataTableColumn} from '../../common/dataTable/GeneralDataTableColumn';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, PageEvent} from '@angular/material';
import {ConfirmationDialogComponent} from '../../common/dialogs/confirmation/ConfirmationDialogComponent';
import {finalize, switchMap} from 'rxjs/operators';
import {Filter} from '../../common/api/dataModels/Filter';

@Component({
    selector: 'app-admin-posts',
    templateUrl: './postList.html',
    styleUrls: ['postList.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PostListComponent implements OnInit {
    public posts: Pageable<Post>;
    public isLoading = false;
    public currentPage = 1;
    public tableSettings = {
        filter: false,
        actionMenu: true,
        paginationOptions: {
            itemsPerPage: 50
        },
        selectByColumn: true
    };
    public columns: GeneralDataTableColumn[] = [
        {columnName: 'id', columnKey: 'id'},
        {columnName: 'title', columnKey: 'title', truncateSize: 80},
        {columnName: 'source', columnKey: 'source'},
        {columnName: 'Published At', columnKey: 'published_at', isDate: true},
        {columnName: 'Created At', columnKey: 'created_at', isDate: true},
        {columnName: 'Tags', columnKey: 'tags', isArray: true, arrayItemKey: 'title'},
    ];

    constructor(private postService: PostService,
                private route: ActivatedRoute,
                private dialog: MatDialog,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .pipe(
                switchMap((params) => {
                    if (params) {
                        this.currentPage = params.page;
                    }
                    return this.postService.findBy([new Filter('ne', 'tags.title', 'Trash')], this.currentPage);
                })
            )
            .subscribe((res) => this.posts = res);
    }

    public editPost(post: Post): void {
        this.router.navigate(['admin', 'posts', 'edit', post.id]);
    }

    public addPost(): void {
        this.router.navigate(['admin', 'posts', 'create']);
    }

    public markAsTrash(post: Post): void {
        const ref = this.dialog.open(ConfirmationDialogComponent,
            {data: {message: 'Are you sure you want to mark the post as trash ?'}});
        ref.afterClosed().subscribe((approved) => {
            if (approved) {
                this.isLoading = true;
                this.postService.markTrash(post)
                    .pipe(
                        finalize(() => this.isLoading = false),
                        switchMap(() => this.postService.findBy([new Filter('ne', 'tags.title', 'Trash')], this.currentPage))
                    )
                    .subscribe((res) => this.posts = res);
            }
        });
    }

    public loadPage(pageEvent: PageEvent): void {
        this.isLoading = true;
        this.currentPage = pageEvent.pageIndex + 1;
        this.router.navigate(['.'], {queryParams: {page: this.currentPage}, relativeTo: this.route});
        this.postService.findBy([new Filter('ne', 'tags.title', 'Trash')], this.currentPage)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe((res) => this.posts = res);
    }
}
