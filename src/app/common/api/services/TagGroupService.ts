import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {TagGroupResource} from '../resource/TagGroupResource';
import {TagGroup} from '../dataModels/TagGroup';

@Injectable()
export class TagGroupService {

    constructor(private tagGroupResource: TagGroupResource) {
    }

    public findBy(filters: Filter[]): Observable<Pageable<TagGroup>> {
        return this.tagGroupResource.findBy(filters);
    }

    public findAll(): Observable<Pageable<TagGroup>> {
        return this.tagGroupResource.findAll();
    }
}
