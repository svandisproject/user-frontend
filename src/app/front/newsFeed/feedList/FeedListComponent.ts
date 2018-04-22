import {Component, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Post} from '../../../svandisApi/dataModels/Post';
import {PostService} from '../../../svandisApi/services/PostService';

@Component({
    selector: 'app-feed-list',
    templateUrl: './feedList.html',
    encapsulation: ViewEncapsulation.None
})
export class FeedListComponent {
    public posts: Observable<Post[]>;

    constructor(private postService: PostService) {
        this.posts = this.postService.findAll();
    }
}
