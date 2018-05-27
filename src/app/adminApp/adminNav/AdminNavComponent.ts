import {Component} from '@angular/core';
import {NavigationItem} from '../../userApp/navigation/NavigationItem';

@Component({
    selector: 'app-admin-nav',
    templateUrl: './adminNav.html',
    styleUrls: ['./adminNav.scss']
})
export class AdminNavComponent {
    public menuItems: NavigationItem[] = [
        {text: 'Posts', path: 'posts'},
        {text: 'Tags', path: 'tags'},
    ];
}
