import {SyncAwareService} from '../../common/filters/SyncAwareService';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

export class FilterInitFactory {

    public static factory(...services: SyncAwareService[]): () => Promise<any>[] {
        const promises: Promise<any>[] =
            _.map(services, service => FilterInitFactory.initFilterSettings(service).toPromise());

        return () => promises;
    }

    private static initFilterSettings(service: SyncAwareService): Observable<any> {
        return service.loadInitial();
    }
}
