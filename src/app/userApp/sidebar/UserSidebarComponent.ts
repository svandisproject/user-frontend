import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {IpcService} from '../../common/electron/IpcService';
import {WorkerService} from '../../common/api/services/WorkerService';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Router} from '@angular/router';


@Component({
    selector: 'app-user-sidebar',
    templateUrl: './userSidebar.html',
    styleUrls: ['./userSidebar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserSidebarComponent {
    @Input() opened = false;
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    public isMobile = false;

    constructor(private ipcService: IpcService,
                private breakpointObserver: BreakpointObserver,
                private router: Router,
                private workerService: WorkerService) {
        breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Handset])
            .subscribe((result) => this.isMobile = result.matches);
    }

    public isWorkerRunning(): Observable<boolean> {
        return this.workerService.isRunning();
    }

    public isWebFeed(): boolean {
        return this.router.url.includes('news-feed');
    }
}
