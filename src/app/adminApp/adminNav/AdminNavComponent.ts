import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-admin-nav',
    templateUrl: './adminNav.html',
    styleUrls: ['./adminNav.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdminNavComponent {
    public menuItems = [
        {text: 'Posts', path: 'posts'},
        {text: 'Tags', path: 'tags'},
        {text: 'WebFeeds', path: 'web-feeds'},
    ];
}
