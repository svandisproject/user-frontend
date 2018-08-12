import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {IpcService} from '../electron/IpcService';

@Injectable()
export class ElectronAppGuard implements CanActivate {
    constructor(private ipcService: IpcService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.ipcService.isInitialized()) {
            return true;
        }

        return false;
    }
}