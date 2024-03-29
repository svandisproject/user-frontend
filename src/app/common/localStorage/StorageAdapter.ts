import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

export abstract class StorageAdapter<T> {
    protected abstract readonly STORAGE_KEY: string;

    protected saveSubject: BehaviorSubject<T> = new BehaviorSubject<T>(null);

    public get(): T {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    }

    public post(payload: T): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payload));
        this.saveSubject.next(payload);
    }

    public storageChange(): Observable<T> {
        return this.saveSubject;
    }

    public isStorageEmpty(): boolean {
        return _.isEmpty(this.get());
    }
}
