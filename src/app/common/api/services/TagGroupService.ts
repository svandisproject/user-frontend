import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {TagGroupResource} from '../resource/TagGroupResource';
import {EditTagGroup, TagGroup} from '../dataModels/TagGroup';
import {BehaviorSubject} from 'rxjs';
import {share} from 'rxjs/operators';

@Injectable()
export class TagGroupService {
    private filterSelectSubject = new BehaviorSubject<Filter[]>(null);

    constructor(private tagGroupResource: TagGroupResource) {
    }

    public findBy(filters: Filter[]): Observable<Pageable<TagGroup>> {
        return this.tagGroupResource.findBy(filters);
    }

    public findAllEnabled(): Observable<Pageable<TagGroup>> {
        return this.findBy([
            new Filter('eq', 'enabled', 'true'),
        ]);
    }

    public emitChange(filters: Filter[]) {
        this.filterSelectSubject.next(filters);
    }

    public onFilterChange(): Observable<Filter[]> {
        return this.filterSelectSubject.asObservable().pipe(share());
    }

    public getSelectedFitlers(): Filter[] {
        return this.filterSelectSubject.getValue();
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
