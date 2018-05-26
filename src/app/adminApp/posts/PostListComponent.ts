import {Component} from '@angular/core';
import {PostService} from '../../common/api/services/PostService';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {Post} from '../../common/api/dataModels/Post';
import {DataTableColumn} from '../dataTable/DataTableColumn';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-admin-posts',
    templateUrl: './postList.html'
})

export class PostListComponent {
    public posts: Pageable<Post>;

    public columns: DataTableColumn[] = [
        {columnName: 'id', columnKey: 'id'},
        {columnName: 'title', columnKey: 'title'},
        {columnName: 'url', columnKey: 'url'},
        {columnName: 'content', columnKey: 'content'},
        {columnName: 'source', columnKey: 'source'},
        {columnName: 'Published At', columnKey: 'published_at', isDate: true},
        {columnName: 'Created At', columnKey: 'created_at', isDate: true},
        {columnName: 'tags', columnKey: 'tags'},
    ];

    constructor(private postService: PostService,
                private route: ActivatedRoute,
                private router: Router) {
        this.postService.findAll().subscribe((posts) => this.posts = posts);
    }

    public editPost(post: Post): void {
        this.router.navigate(['admin', 'post', 'edit', post.id]);
    }
}
