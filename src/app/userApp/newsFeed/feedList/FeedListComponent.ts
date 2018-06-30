import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Post} from '../../../common/api/dataModels/Post';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';

@Component({
    selector: 'app-feed-list',
    templateUrl: './feedList.html',
    styles: ['app-feed-list {margin-top: 15px; display: block}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FeedListComponent {
    @Input() posts: Pageable<Post>;
    @Input() isLoading = false;

    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

    public nextPage(): void {
        this.pageChange.emit(this.posts.page_request.page + 1);
    }

    public previousPage(): void {
        this.pageChange.emit(this.posts.page_request.page - 1);
    }

    public isFirstPage(): boolean {
        return this.posts.page_request.page === 1;
    }

    public isLastPage(): boolean {
        return this.posts.page_request.page === this.posts.page_request.size;
    }
}

