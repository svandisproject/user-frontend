import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FilterFactory} from '../../common/api/util/FilterFactory';
import {PostService} from '../../common/api/services/PostService';
import {UserAuthService} from '../../common/user/UserAuthService';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {Post} from '../../common/api/dataModels/Post';
import {SearchFilterSettings} from '../../common/filters/dataModels/FilterSettings';
import {Filter} from '../../common/api/dataModels/Filter';
import * as _ from 'lodash';
import {FilterItem} from '../../common/filters/dataModels/FilterItem';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {PusherService} from '../../common/pusher/services/PusherService';
import {Channel} from 'pusher-js';
import {MatSnackBar, PageEvent} from '@angular/material';
import {TagGroupService} from '../../common/api/services/TagGroupService';

@Component({
    selector: 'app-news-feed',
    templateUrl: './newsFeed.html',
    styleUrls: ['./newsFeed.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewsFeedComponent implements OnInit {
    public posts: Pageable<Post>;
    public isFeedListSmall = true;
    public isLoading = false;
    public selectedPost: Post;
    public currentFilters: Filter[];
    public readonly itemsPerPage = 50;

    private pusherChannel: Channel;
    private currentFilterSettings: SearchFilterSettings = <SearchFilterSettings> {};
    private currentPageIndex = 1;
    private readonly PUSHER_EVENT = 'new-post';
    private readonly PUSHER_CHANNEL = 'news-feed';
    private sortOptions: any = {
        sort: 'published_at',
        per_page: this.itemsPerPage,
        direction: 'desc'
    };

    constructor(private postService: PostService,
                private snack: MatSnackBar,
                private pusherService: PusherService,
                private tagGroupService: TagGroupService,
                private userAuthService: UserAuthService) {
        this.loadPage();
        this.subscribeToPusherNews();
    }

    ngOnInit(): void {
        this.tagGroupService.onFilterChange()
            .subscribe((filters) => this.onTagFilter(filters));
    }

    public loadPage(pageEvent?: PageEvent): void {
        this.currentPageIndex = _.has(pageEvent, 'pageIndex') ? pageEvent.pageIndex + 1 : this.currentPageIndex;
        this.filterPosts(this.currentFilterSettings, this.currentPageIndex);
    }

    public onSearch($event: FilterItem): void {
        this.currentFilterSettings['searchTerms'] = [$event];
        this.filterPosts(this.currentFilterSettings, 1);
    }

    private onTagFilter(filters: Filter[]) {
        this.currentFilters = filters;
        this.filterPosts(this.currentFilterSettings, 1);
    }

    public updatePost(post: Post) {
        this.selectedPost = post;
        const index = _.findIndex(this.posts.content, (p) => p.id === post.id);
        this.posts.content[index] = post;
        this.posts = _.cloneDeep(this.posts);
    }

    public loadMostLikedPosts(period: string) {
        if (!['day', 'week', 'month'].includes(period)) {
            return this.filterPosts(this.currentFilterSettings, 1);
        }

        this.isLoading = true;
        this.postService.findMostLikedInPeriod(period)
            .pipe(
                catchError(err => this.errorHandler(err)),
                finalize(() => this.isLoading = false)
            )
            .subscribe(posts => this.afterPostsLoad(posts));
    }

    private subscribeToPusherNews(): void {
        this.pusherChannel = this.pusherService.connectToChannel(this.PUSHER_CHANNEL);
        this.pusherService.getChannelEventObservable(this.PUSHER_EVENT, this.pusherChannel)
            .subscribe(() => {
                this.loadPage();
                this.snack.open('Feed updated', null, {verticalPosition: 'top'});
            });
    }

    private filterPosts(searchFilters: SearchFilterSettings, page?: number): void {
        let filters = this.buildFilters(searchFilters);
        if (this.currentFilters) {
            filters = _.concat(filters, this.currentFilters);
        }
        this.loadPosts(filters, page);
    }

    private loadPosts(filters: Filter[], page: number) {
        this.isLoading = true;
        this.postService.findBy(filters, page, this.sortOptions)
            .pipe(
                catchError(err => this.errorHandler(err)),
                finalize(() => this.isLoading = false)
            )
            .subscribe(posts => this.afterPostsLoad(posts));
    }

    private afterPostsLoad(posts) {
        this.userAuthService.getCurrentUser().subscribe(user => {
            for (const post of posts.content) {
                if (user.likedArticles.includes(post.id)) {
                    post.isLiked = true;
                }
            }
            this.posts = posts;
        });
    }

    private errorHandler(err: HttpErrorResponse) {
        if (err.status === 404) {
            this.resetPosts();
        }
        return of(this.posts);
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
        // factory.add(new Filter('ne', 'tags.title', 'Trash'));
        return factory.build();
    }
}
