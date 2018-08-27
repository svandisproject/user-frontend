import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {Ico} from '../dataModels/Ico';
import {IcoResource} from '../resource/IcoResource';
import {Sorting} from '../util/Sorting';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';


@Injectable()
export class IcoService {
    constructor(private icoResource: IcoResource) {
    }

    public findAll(): Observable<Pageable<Ico>> {
        return this.icoResource.findAll()
            .pipe(
                map((resp) => {
                    resp.content = _.map(resp.content, (ico) => this.format(ico));
                    return resp;
                })
            );
    }

    public findBy(filters: Filter[], page: number = 1, sort?: Sorting): Observable<Pageable<Ico>> {
        return this.icoResource.findBy(filters, String(page), sort)
            .pipe(
                map((resp) => {
                    resp.content = _.map(resp.content, (ico) => this.format(ico));
                    return resp;
                })
            );
    }

    private format(ico: Ico): Ico {
        ico.token_price = parseFloat(String(ico.token_price)).toFixed(6);
        return ico;
    }
}
