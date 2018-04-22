import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-feed-list',
    templateUrl: './feedList.html',
    encapsulation: ViewEncapsulation.None
})
export class FeedListComponent {
    @Input() feeds: Observable<Feed[]>;
}
