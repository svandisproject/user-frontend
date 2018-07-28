import {Component} from '@angular/core';

@Component({
    selector: 'app-admin-nav',
    templateUrl: './adminNav.html',
    styleUrls: ['./adminNav.scss']
})
export class AdminNavComponent {
    public menuItems = [
        {text: 'Posts', path: 'posts'},
        {text: 'Tags', path: 'tags'},
        {text: 'WebFeeds', path: 'web-feeds'},
    ];
}
