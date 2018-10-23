import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {SvandisTagGroupResource} from '../resource/SvandisTagGroupResource';
import {TagGroup} from '../dataModels/TagGroup';

@Injectable()
export class SvandisTagGroupService {

    constructor(private tagResource: SvandisTagGroupResource) {
    }

    public findBy(filters: Filter[]): Observable<Pageable<TagGroup>> {
        return this.tagResource.findBy(filters);
    }
}
