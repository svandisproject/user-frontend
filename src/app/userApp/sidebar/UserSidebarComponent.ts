import {Component, ViewEncapsulation} from '@angular/core';
import {MenuItem, MenuItems} from './MenuItems';
import {IpcService} from '../../common/electron/IpcService';


@Component({
    selector: 'app-user-sidebar',
    templateUrl: './userSidebar.html',
    styleUrls: ['./userSidebar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserSidebarComponent {
    public items: MenuItem[] = MenuItems;

    constructor(private ipcService: IpcService) {
        if (this.ipcService.isInitialized()) {
            this.items.push({icon: 'stars', link: 'data-mining-app', title: 'NAVIGATION.FRONT.ITEM.DATA_MINING_APP'});
        }
    }
}
