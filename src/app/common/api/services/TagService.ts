import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {TagResource} from '../resource/TagResource';
import {Tag} from '../dataModels/Tag';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class TagService {
    private mainTags: Tag[] = [];

    constructor(private tagResource: TagResource) {
    }

    public findAll(): Observable<Pageable<Tag>> {
        return this.tagResource.findAll(null, {per_page: 100, page: 1});
    }

    public findBy(filters: Filter[], page: number = 1): Observable<Pageable<Tag>> {
        return this.tagResource.findBy(filters, String(page));
    }

    public findById(tagId: string): Observable<Tag> {
        return this.tagResource.findById(tagId);
    }

    public loadMainTags(): Observable<Tag[]> {
        return this.tagResource.findBy([
            new Filter('in', 'title', ['Bullish', 'Bearish', 'Important', 'Toxic']),
        ])
            .pipe(
                map((res) => res.content),
                tap((res) => this.mainTags = res)
            );
    }

    public getMainTags(): Tag[] {
        return this.mainTags;
    }

    public saveOrCreate(tag: Tag, id?: string): Observable<Tag> {
        if (id) {
            return this.tagResource.update(id, {tag: tag});
        } else {
            return this.tagResource.create({tag: tag});
        }
    }
}
