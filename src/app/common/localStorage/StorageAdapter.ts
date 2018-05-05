import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

export class StorageAdapter<T> {
    protected readonly STORAGE_KEY: string;
    protected observer: Observer<T>;
    protected changeObservable: Observable<T>;

    constructor(storageKey: string) {
        this.STORAGE_KEY = storageKey;
        this.changeObservable = Observable.create((observer) => this.observer = observer);
    }

    public get(): T {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    }

    public post(payload: T): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payload));
        this.observer.next(payload);
    }

    public storageChange(): Observable<T> {
        return this.changeObservable;
    }
}
