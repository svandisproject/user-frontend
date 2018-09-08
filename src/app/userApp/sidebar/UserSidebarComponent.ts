import {Component, ViewEncapsulation} from '@angular/core';
import {MenuItem, MenuItems} from './MenuItems';
import {IpcService} from '../../common/electron/IpcService';
import {WorkerService} from '../../common/api/services/WorkerService';
import {Observable} from 'rxjs';
import * as _ from 'lodash';


@Component({
    selector: 'app-user-sidebar',
    templateUrl: './userSidebar.html',
    styleUrls: ['./userSidebar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserSidebarComponent {
    public items: MenuItem[] = MenuItems;

    constructor(private ipcService: IpcService,
                private workerService: WorkerService) {
        if (this.ipcService.isInitialized() && !this.isDataMiningMenuItesExists()) {
            this.items.push({icon: 'stars', link: 'data-mining-app', title: 'NAVIGATION.FRONT.ITEM.DATA_MINING_APP'});
        }
    }

    public isWorkerRunning(): Observable<boolean> {
        return this.workerService.isRunning();
    }

    private isDataMiningMenuItesExists(): boolean {
        return !!(_.filter(this.items, item => item.title === 'NAVIGATION.FRONT.ITEM.DATA_MINING_APP').length);
    }
}
