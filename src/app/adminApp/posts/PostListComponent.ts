import {Component, ViewEncapsulation} from '@angular/core';
import {PostService} from '../../common/api/services/PostService';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {Post} from '../../common/api/dataModels/Post';
import {GeneralDataTableColumn} from '../../common/dataTable/GeneralDataTableColumn';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app-admin-posts',
    templateUrl: './postList.html',
    encapsulation: ViewEncapsulation.None
})

export class PostListComponent {
    public posts: Pageable<Post>;

    public columns: GeneralDataTableColumn[] = [
        {columnName: 'id', columnKey: 'id'},
        {columnName: 'title', columnKey: 'title'},
        {columnName: 'source', columnKey: 'source'},
        {columnName: 'Published At', columnKey: 'published_at', isDate: true},
        {columnName: 'Created At', columnKey: 'created_at', isDate: true},
        {columnName: 'tags', columnKey: 'tags', isArray: true, arrayItemKey: 'title'},
    ];

    constructor(private postService: PostService,
                private route: ActivatedRoute,
                private router: Router) {
        this.postService.findAll().subscribe((posts) => this.posts = posts);
    }

    public editPost(post: Post): void {
        this.router.navigate(['admin', 'posts', 'edit', post.id]);
    }

    public addPost(): void {
        this.router.navigate(['admin', 'posts', 'create']);
    }

    public loadPage(pageEvent: PageEvent): void {
        this.postService.findBy(null, pageEvent.pageIndex + 1)
            .subscribe((res) => this.posts = res);
    }
}
