import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Post} from '../../../common/api/dataModels/Post';
import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';

@Component({
    selector: 'app-feed-list',
    templateUrl: './feedList.html',
    styles: ['app-feed-list {margin-top: 15px; display: block}'],
    encapsulation: ViewEncapsulation.None
})
export class FeedListComponent {
    @Input() posts: Pageable<Post>;
    @Output() scrolled: EventEmitter<void> = new EventEmitter<void>();

    public onScroll($event) {
        this.scrolled.emit();
    }
}
