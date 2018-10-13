import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Post} from '../../../common/api/dataModels/Post';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {PageEvent} from '@angular/material';
import * as _ from 'lodash';
import {UserAuthService} from '../../../common/user/UserAuthService';

@Component({
    selector: 'app-feed-list',
    templateUrl: './feedList.html',
    styleUrls: ['feedList.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FeedListComponent {
    @Input() posts: Pageable<Post>;
    @Input() isLoading = false;

    @Output() selectPost: EventEmitter<Post> = new EventEmitter<Post>();
    @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    public pageIndexSubtractor = 1;

    constructor(protected userAuth: UserAuthService) {
    }

    public isAdmin(): boolean {
        return this.userAuth.hasRoleAdmin();
    }

    public onPageChange(pageEvent: PageEvent): void {
        this.pageChange.emit(pageEvent);
    }

    public isFirstPage(): boolean {
        return this.posts.page_request.page === 1;
    }

    public isLastPage(): boolean {
        return this.posts.page_request.page === this.posts.page_request.size;
    }

    public getSentimentCssClass(post): string {
        if (!_.isEmpty(post.tags)) {
            const tagNames = _.map(post.tags, tag => tag.title);
            if (_.includes(tagNames, 'Bullish')) {
                return 'sentiment_very_satisfied';
            }
            if (_.includes(tagNames, 'Bearish')) {
                return 'sentiment_very_dissatisfied';
            }
        }

        return 'sentiment_satisfied';
    }
}

