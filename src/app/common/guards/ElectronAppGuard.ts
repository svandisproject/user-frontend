import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {IpcService} from '../electron/IpcService';

@Injectable()
export class ElectronAppGuard implements CanActivate {
    constructor(private ipcService: IpcService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.ipcService.isInitialized();
    }
}