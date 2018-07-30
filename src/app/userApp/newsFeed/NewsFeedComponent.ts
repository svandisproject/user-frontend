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
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {NewsFeedPusherEvent} from './dataModels/NewsFeedPusherEvent';
import {PusherService} from '../../common/pusher/services/PusherService';
import {Channel} from 'pusher-js';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app-news-feed',
    templateUrl: './newsFeed.html',
    styleUrls: ['./newsFeed.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewsFeedComponent {
    public posts: Pageable<Post>;
    public isFeedListSmall = false;
    public isLoading = false;

    private pusherChannel: Channel;
    private currentFilterSettings: SearchFilterSettings;
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

    public loadPage(pageEvent: PageEvent): void {
        this.filterPosts(this.currentFilterSettings, pageEvent.pageIndex + 1);
    }

    public onFilterChange($event: SearchFilterSettings): void {
        this.currentFilterSettings = $event;
        this.filterPosts($event);
    }

    public toggleFeedList($event: boolean) {
        this.isFeedListSmall = $event;
    }

    private subscribeToPusherNews(): void {
        this.pusherChannel = this.pusherService.connectToChannel(this.PUSHER_CHANNEL);
        this.pusherService.getChannelEventObservable(this.PUSHER_EVENT, this.pusherChannel)
            .subscribe((eventData: NewsFeedPusherEvent) => {
                this.posts.content.unshift(eventData.message);
            });
    }

    private filterPosts(searchFilters: SearchFilterSettings, page?: number): void {
        this.isLoading = true;
        this.postService.findBy(this.buildFilters(searchFilters), page)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    if (err.status === 404) {
                        this.resetPosts();
                    }
                    return of(this.posts);
                }),
                finalize(() => this.isLoading = false)
            )
            .subscribe((posts) => {
                this.posts = posts;
            });
    }

    private mergePosts(posts: Pageable<Post>) {
        _.mergeWith(this.posts, posts, (objValue, srcValue) => {
            if (_.isArray(objValue)) {
                return objValue.concat(srcValue);
            }
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
