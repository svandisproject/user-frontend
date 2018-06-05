import {Component, ViewEncapsulation} from '@angular/core';
import {DataTableColumn} from '../dataTable/DataTableColumn';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {ActivatedRoute, Router} from '@angular/router';
import {WebFeed} from '../../common/api/dataModels/WebFeed';
import {WebFeedService} from '../../common/api/services/WebFeedService';

@Component({
    selector: 'app-admin-web-feeds',
    styleUrls: ['./webFeedList.scss'],
    templateUrl: './webFeedList.html',
    encapsulation: ViewEncapsulation.None
})
export class WebFeedListComponent {
    public feeds: Pageable<WebFeed>;

    public columns: DataTableColumn[] = [
        {columnName: 'id', columnKey: 'id'},
        {columnName: 'title', columnKey: 'title'},
        {columnName: 'url', columnKey: 'url'},
        {columnName: 'linkSelector', columnKey: 'linkSelector'},
        {columnName: 'timeInterval', columnKey: 'timeInterval'},
    ];

    constructor(private webFeedService: WebFeedService,
                private route: ActivatedRoute,
                private router: Router) {
        this.webFeedService.findAll()
            .subscribe((feeds) => this.feeds = feeds);
    }

    public editFeed(feed: WebFeed): void {
        this.router.navigate(['admin', 'web-feed', 'edit', feed.id]);
    }

    public addFeed(): void {
        this.router.navigate(['admin', 'web-feed', 'create']);
    }
}