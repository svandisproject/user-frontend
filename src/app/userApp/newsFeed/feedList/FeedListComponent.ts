import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Post} from '../../../common/api/dataModels/Post';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {PageEvent} from '@angular/material';

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

    @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    public pageIndexSubtractor = 1;

    public onPageChange(pageEvent: PageEvent): void {
        this.pageChange.emit(pageEvent);
    }

    public isFirstPage(): boolean {
        return this.posts.page_request.page === 1;
    }

    public isLastPage(): boolean {
        return this.posts.page_request.page === this.posts.page_request.size;
    }
}

