import {Component, ViewEncapsulation} from '@angular/core';
import {FilterFactory} from '../../common/api/util/FilterFactory';
import {PostService} from '../../common/api/services/PostService';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {Post} from '../../common/api/dataModels/Post';
import {SearchFilterSettings} from '../../common/filters/dataModels/FilterSettings';
import {Filter} from '../../common/api/dataModels/Filter';
import * as _ from 'lodash';
import {FilterItem} from '../../common/filters/dataModels/FilterItem';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {NewsFeedPusherEvent} from './dataModels/NewsFeedPusherEvent';
import {PusherService} from '../../common/pusher/services/PusherService';
import {Channel} from 'pusher-js';

@Component({
    selector: 'app-news-feed',
    templateUrl: './newsFeed.html',
    styleUrls: ['./newsFeed.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewsFeedComponent {
    public posts: Pageable<Post>;
    private pusherChannel: Channel;

    private readonly PUSHER_EVENT = 'new-post';
    private readonly PUSHER_CHANNEL = 'news-feed';

    constructor(private postService: PostService,
                private pusherService: PusherService) {
        this.postService.findAll()
            .subscribe(posts => {
                this.posts = posts;
                this.subscribeToPusherNews();
            });
    }

    public onFilterChange($event: SearchFilterSettings): void {
        this.filterPosts($event);
    }

    private subscribeToPusherNews(): void {
        this.pusherChannel = this.pusherService.connectToChannel(this.PUSHER_CHANNEL);
        this.pusherService.getChannelEventObservable(this.PUSHER_EVENT, this.pusherChannel)
            .subscribe((eventData: NewsFeedPusherEvent) => {
                this.posts.content.push(eventData.message);
            });
    }

    private filterPosts(searchFilters: SearchFilterSettings): void {
        this.postService.findBy(this.buildFilters(searchFilters))
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    if (err.status === 404) {
                        this.resetPosts();
                    }
                    return of(this.posts);
                })
            )
            .subscribe((posts) => {
                this.posts = posts;
            });
    }

    private resetPosts() {
        this.posts = {
            content: [],
            page_request: {
                page: 1,
                size: 0
            },
            total: 0
        };
    }

    private buildFilters(settings: SearchFilterSettings): Filter[] {
        const factory: FilterFactory = new FilterFactory();

        _.forEach(_.flatMap(settings), (filterItem: FilterItem) => {
            if (filterItem.value && filterItem.property) {
                factory.add(new Filter('lk', filterItem.property, filterItem.value));
            }
        });

        return factory.build();
    }
}
