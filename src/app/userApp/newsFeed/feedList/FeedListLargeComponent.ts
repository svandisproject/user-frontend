import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FeedListComponent} from './FeedListComponent';

@Component({
    selector: 'app-feed-list-large',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './feedListLarge.html'
})
export class FeedListLargeComponent extends FeedListComponent {
}