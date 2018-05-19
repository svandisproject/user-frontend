import {Component, NgZone, ViewEncapsulation} from '@angular/core';
import {PusherService} from '../../../common/pusher/services/PusherService';
import {Channel} from 'pusher-js';
import {NewsFeedPusherEvent} from '../dataModels/NewsFeedPusherEvent';
import {Post} from '../../../common/api/dataModels/Post';
import {PostService} from '../../../common/api/services/PostService';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';
import {FilterFactory} from '../../../common/api/util/FilterFactory';

@Component({
    selector: 'app-feed-list',
    templateUrl: './feedList.html',
    encapsulation: ViewEncapsulation.None
})
export class FeedListComponent {
    public postPageable: Pageable<Post>;

    private pusherChannel: Channel;

    private readonly PUSHER_EVENT = 'new-post';
    private readonly PUSHER_CHANNEL = 'news-feed';

    constructor(private postService: PostService,
                private zone: NgZone,
                private pusherService: PusherService) {
        const filterFactory: FilterFactory = new FilterFactory().add({
            type: 'lk',
            property: 'title',
            value: 'Test post 1'
        });

        this.postService.findAllBy(filterFactory.build()).subscribe((posts) => {
            this.postPageable = posts;
        });

        this.subscribeToPusherNews();
    }

    public onScroll($event) {
    }

    private subscribeToPusherNews() {
        this.pusherChannel = this.pusherService.connectToChannel(this.PUSHER_CHANNEL);
        this.pusherService.getChannelEventObservable(this.PUSHER_EVENT, this.pusherChannel)
            .subscribe((eventData: NewsFeedPusherEvent) => {
                this.zone.run(() => {
                    this.postPageable.content.unshift(eventData.message);
                });
            });
    }
}
