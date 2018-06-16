import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {Ico} from '../dataModels/Ico';
import {IcoResource} from '../resource/IcoResource';

@Injectable()
export class IcoService {
    constructor(private icoResource: IcoResource) {
    }

    public findAll(): Observable<Pageable<Ico>> {
        return this.icoResource.findAll();
    }

    public findBy(filters: Filter[], page: number = 1): Observable<Pageable<Ico>> {
        return this.icoResource.findBy(filters, String(page));
    }

    public findById(icoId: string): Observable<Ico> {
        return this.icoResource.findById(icoId);
    }

    public saveOrCreate(ico: Ico, id?: string): Observable<Ico> {
        if (id) {
            return this.icoResource.update(id, {ico: ico});
        } else {
            return this.icoResource.create({ico: ico});
        }
    }
}
