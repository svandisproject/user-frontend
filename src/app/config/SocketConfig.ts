import {SocketIoConfig} from 'ng-socket-io';

export const SocketConfig: SocketIoConfig = {
    url: 'ws://localhost:3030',
    options: {
        transports: ['websocket']
    }
};