import {Component, Input, ViewEncapsulation} from '@angular/core';
import {MenuItem, MenuItems} from './MenuItems';
import {IpcService} from '../../common/electron/IpcService';
import {WorkerService} from '../../common/api/services/WorkerService';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


@Component({
    selector: 'app-user-sidebar',
    templateUrl: './userSidebar.html',
    styleUrls: ['./userSidebar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserSidebarComponent {
    @Input() opened = false;

    public items: MenuItem[] = MenuItems;
    public isMobile = false;

    constructor(private ipcService: IpcService,
                private breakpointObserver: BreakpointObserver,
                private workerService: WorkerService) {
        if (this.ipcService.isInitialized() && !_.find(this.items, { title: 'NAVIGATION.FRONT.ITEM.DATA_MINING_APP' }) ) {
            this.items.push({icon: 'stars', link: 'data-mining-app', title: 'NAVIGATION.FRONT.ITEM.DATA_MINING_APP'});
        }

        breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Handset])
            .subscribe((result) => this.isMobile = result.matches);
    }

    public isWorkerRunning(): Observable<boolean> {
        return this.workerService.isRunning();
    }
}
