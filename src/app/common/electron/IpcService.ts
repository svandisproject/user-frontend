import {Injectable} from '@angular/core';
import {IpcRenderer} from 'electron';

@Injectable()
export class IpcService {
    private readonly ipc: IpcRenderer | undefined = void 0;

    constructor() {
        if (window['require']) {
            try {
                this.ipc = window['require']('electron').ipcRenderer;
            } catch (e) {
                throw e;
            }
        } else {
            console.warn('Electron\'s IPC was not loaded');
        }
    }

    public on(channel: string, listener: any): void {
        if (!this.ipc) {
            return;
        }
        this.ipc.on(channel, listener);
    }

    public send(channel: string, ...args): void {
        if (!this.ipc) {
            return;
        }
        this.ipc.send(channel, ...args);
    }

}