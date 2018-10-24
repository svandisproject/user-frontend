import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-admin-nav',
    templateUrl: './adminNav.html',
    styleUrls: ['./adminNav.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdminNavComponent {
    public menuItems = [
        {text: 'Tags', path: 'tags'},
        {text: 'Posts', path: 'posts'},
        {text: 'WebFeeds', path: 'web-feeds'},
    ];
}
