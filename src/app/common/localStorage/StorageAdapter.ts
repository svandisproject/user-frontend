import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class StorageAdapter<T> {
    protected readonly STORAGE_KEY: string;

    protected saveSubject: BehaviorSubject<T> = new BehaviorSubject<T>(null);

    constructor(storageKey: string) {
        this.STORAGE_KEY = storageKey;
    }

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
}
