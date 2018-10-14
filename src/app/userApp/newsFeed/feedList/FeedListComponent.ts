import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Post} from '../../../common/api/dataModels/Post';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {PageEvent} from '@angular/material';
import * as _ from 'lodash';
import {UserAuthService} from '../../../common/user/UserAuthService';
import {DateTime, Duration} from 'luxon';

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
    public displayedColumns: string[] = ['published_at', 'title'];
    public selectedRow: Post;

    constructor(protected userAuth: UserAuthService) {
    }

    public isAdmin(): boolean {
        return this.userAuth.hasRoleAdmin();
    }

    public onPageChange(pageEvent: PageEvent): void {
        this.pageChange.emit(pageEvent);
    }

    public getSource(url: string): string {
        return new URL(url).hostname;
    }

    public getPublishedAt(date: string): string {
        const duration = Duration.fromMillis(new Date().getTime() - new Date(date).getTime());
        const hours = duration.as('hours');
        const minutes = duration.as('minutes');

        if (hours > 23) {
            return DateTime.fromJSDate(new Date(date)).toFormat('M/d/yy, h:mm');
        } else if (hours < 1) {
            return duration.toFormat('m\'m\' ago');
        } else if (minutes < 1) {
            return '1m ago';
        } else {
            return duration.toFormat('h\'h\' ago');
        }
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

