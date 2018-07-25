import {Component} from '@angular/core';
import {MenuItem, MenuItems} from './MenuItems';


@Component({
    selector: 'app-user-sidebar',
    templateUrl: './userSidebar.html',
    styleUrls: ['./userSidebar.scss'],
})
export class UserSidebarComponent {
    public items: MenuItem[] = MenuItems;
}
