import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {AbstractFilterService} from '../../common/filters/AbstractFilterService';

export class FilterInitFactory {

    public static factory(...services: AbstractFilterService<any>[]): () => Promise<any>[] {
        const promises: Promise<any>[] =
            _.map(services, service => FilterInitFactory.initFilterSettings(service).toPromise());

        return () => promises;
    }

    private static initFilterSettings(service: AbstractFilterService<any>): Observable<any> {
        if (service.isStorageEmpty()) {
            return service.loadInitial();
        } else {
            return Observable.of(true);
        }
    }
}
