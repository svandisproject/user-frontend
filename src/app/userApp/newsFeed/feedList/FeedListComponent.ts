import {Component, Input, NgZone, ViewEncapsulation} from '@angular/core';
import {PusherService} from '../../../common/pusher/services/PusherService';
import {Channel} from 'pusher-js';
import {NewsFeedPusherEvent} from '../dataModels/NewsFeedPusherEvent';
import {Post} from '../../../common/api/dataModels/Post';
import {PostService} from '../../../common/api/services/PostService';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';

@Component({
    selector: 'app-feed-list',
    templateUrl: './feedList.html',
    styles: ['app-feed-list {margin-top: 15px; display: block}'],
    encapsulation: ViewEncapsulation.None
})
export class FeedListComponent {
    @Input() posts: Pageable<Post>;

    private pusherChannel: Channel;

    private readonly PUSHER_EVENT = 'new-post';
    private readonly PUSHER_CHANNEL = 'news-feed';

    constructor(private postService: PostService,
                private zone: NgZone,
                private pusherService: PusherService) {
        this.subscribeToPusherNews();
    }

    public onScroll($event) {
    }

    private subscribeToPusherNews() {
        this.pusherChannel = this.pusherService.connectToChannel(this.PUSHER_CHANNEL);
        this.pusherService.getChannelEventObservable(this.PUSHER_EVENT, this.pusherChannel)
            .subscribe((eventData: NewsFeedPusherEvent) => {
                this.zone.run(() => {
                    this.posts.content.unshift(eventData.message);
                });
            });
    }
}
