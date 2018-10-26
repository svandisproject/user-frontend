import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {TagGroupResource} from '../resource/TagGroupResource';
import {EditTagGroup, TagGroup} from '../dataModels/TagGroup';

@Injectable()
export class TagGroupService {

    constructor(private tagGroupResource: TagGroupResource) {
    }

    public findBy(filters: Filter[]): Observable<Pageable<TagGroup>> {
        return this.tagGroupResource.findBy(filters);
    }

    public create(tagGroup: EditTagGroup) {
        return this.tagGroupResource.create(tagGroup);
    }

    public update(tagGroup: EditTagGroup) {
        return this.tagGroupResource.update(tagGroup.id, tagGroup);
    }

    public findAll(): Observable<Pageable<TagGroup>> {
        return this.tagGroupResource.findAll();
    }
}
