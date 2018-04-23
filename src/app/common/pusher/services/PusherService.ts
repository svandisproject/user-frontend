import {Injectable} from '@angular/core';
import {PusherConfig} from '../configs/PusherConfig';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import * as _ from 'lodash';
import {Channel, Pusher} from 'pusher-js';
import * as pusher from 'lodash';

@Injectable()
export class PusherService {
    private socket: Pusher;
    private currentChannel: Channel;

    constructor() {
        this.initSocket();
    }

    public initSocket(): Pusher {
        this.socket = new pusher(PusherConfig.APP_KEY, {
            cluster: 'eu',
            encrypted: true
        });
        return this.socket;
    }

    public getSocket(): Pusher {
        return this.socket;
    }

    public connectToChannel(channelName: string): Channel {
        this.currentChannel = this.socket.subscribe(channelName);
        return this.currentChannel;
    }

    public getChannel(): Channel {
        return this.currentChannel;
    }

    public getChannelEventObservable(eventName: string, channel?: Channel): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            channel = channel || this.getChannel();

            channel.bind(eventName, (data) => {
                observer.next(data);
            });

            // On dispose unbind
            return () => this.currentChannel.unbind(eventName);
        });
    }

    public isConnected(): boolean {
        return !_.isEmpty(this.currentChannel);
    }
}
