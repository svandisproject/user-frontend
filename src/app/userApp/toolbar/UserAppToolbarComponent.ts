import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {MenuItem, MenuItems} from './MenuItems';
import {Observable} from 'rxjs';
import {IpcService} from '../../common/electron/IpcService';
import {WorkerService} from '../../common/api/services/WorkerService';
import {UserAuthService} from '../../common/user/UserAuthService';
import {AuthService} from '../../common/auth/AuthService';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-toolbar',
    templateUrl: 'userAppToolbar.html',
    styleUrls: ['userAppToolbar.scss']
})

export class UserAppToolbarComponent implements OnInit {
    public items: MenuItem[] = MenuItems;
    public sidebarOpen = false;

    constructor(private ipcService: IpcService,
                private userService: UserAuthService,
                private authService: AuthService,
                private router: Router,
                private workerService: WorkerService) {
    }

    ngOnInit() {
        if (this.ipcService.isInitialized() && !_.find(this.items, {title: 'NAVIGATION.FRONT.ITEM.DATA_MINING_APP'})) {
            this.items.push({icon: 'stars', link: 'data-mining-app', title: 'NAVIGATION.FRONT.ITEM.DATA_MINING_APP'});
        }
    }

    public isAdmin(): boolean {
        return this.userService.hasRoleAdmin();
    }

    public isWorkerRunning(): Observable<boolean> {
        return this.workerService.isRunning();
    }

    public logout(): void {
        this.authService.removeToken();
        this.router.navigate(['login']);
    }
}