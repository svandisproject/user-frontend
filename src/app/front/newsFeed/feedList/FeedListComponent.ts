import {Component, ViewEncapsulation} from '@angular/core';
import {Post} from '../../../svandisApi/dataModels/Post';
import {PostService} from '../../../svandisApi/services/PostService';
import {PusherService} from '../../../common/pusher/services/PusherService';
import {Channel} from 'pusher-js';
import {NewsFeedPusherEvent} from '../dataModels/NewsFeedPusherEvent';

@Component({
    selector: 'app-feed-list',
    templateUrl: './feedList.html',
    encapsulation: ViewEncapsulation.None
})
export class FeedListComponent {
    public posts: Post[] = [];
    private pusherChannel: Channel;

    private readonly PUSHER_EVENT = 'new-post';
    private readonly PUSHER_CHANNEL = 'news-feed';

    constructor(private postService: PostService,
                private pusherService: PusherService) {

        this.postService.findAll().subscribe((posts) => this.posts = posts);
        this.subscribeToPusherNews();
    }

    private subscribeToPusherNews() {
        this.pusherChannel = this.pusherService.connectToChannel(this.PUSHER_CHANNEL);
        this.pusherService.getChannelEventObservable(this.PUSHER_EVENT, this.pusherChannel)
            .subscribe((eventData: NewsFeedPusherEvent) => {
                this.posts.push(eventData.message);
            });
    }
}
