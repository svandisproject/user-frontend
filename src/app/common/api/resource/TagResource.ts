import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../http/HttpService';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {Tag} from '../dataModels/Tag';
import {AbstractCrudResource} from '../util/AbstractCrudResource';

@Injectable()
export class TagResource extends AbstractCrudResource<Tag> {
    constructor(httpService: HttpService) {
        super(SvandisApi.API_URL + '/tag', httpService);
    }


    public findBy(filters: Filter[]): Observable<Pageable<Tag>> {
        const encodedFilters: string = btoa(JSON.stringify(filters));

        return this.httpService.get(this.URL + '/filter', {
            params: {
                filter: encodedFilters
            }
        });
    }
}
