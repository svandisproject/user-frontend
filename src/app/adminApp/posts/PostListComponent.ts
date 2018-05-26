import {Component} from '@angular/core';
import {PostService} from '../../common/api/services/PostService';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {Post} from '../../common/api/dataModels/Post';
import {DataTableColumn} from '../dataTable/DataTableColumn';

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
        {columnName: 'publishedAt', columnKey: 'publishedAt'},
        {columnName: 'createdAt', columnKey: 'createdAt'},
        {columnName: 'tags', columnKey: 'tags'},
    ];

    constructor(private postService: PostService) {
        this.postService.findAll().subscribe((posts) => this.posts = posts);
    }
}
