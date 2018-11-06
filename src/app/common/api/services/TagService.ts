import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {TagResource} from '../resource/TagResource';
import {Tag} from '../dataModels/Tag';
import {map, tap} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class TagService {
    public static readonly PER_PAGE = 200;
    private readonly RECENT_STORAGE_KEY = 'RECENT_TAGS';
    private readonly MAX_RECENT_TAGS = 5;
    private mainTags: Tag[] = [];
    constructor(private tagResource: TagResource) {
    }

    public findAll(): Observable<Pageable<Tag>> {
        return this.tagResource.findAll(null, {per_page: TagService.PER_PAGE, page: 1});
    }

    public findBy(filters: Filter[], page: number = 1): Observable<Pageable<Tag>> {
        return this.tagResource.findBy(filters, String(page), null, 100);
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

    public delete(id: string | number): Observable<void> {
        return this.tagResource.delete(id);
    }

    public saveOrCreate(tag: Tag, id?: string): Observable<Tag> {
        if (id) {
            return this.tagResource.update(id, {tag: tag});
        } else {
            return this.tagResource.create({tag: tag});
        }
    }

    public addTagToRecent(tag: Tag): Tag[] {
        let tags = this.getRecentTags() || [];
        const isAdded = _.find(tags, (t) => t.id === tag.id);

        if (isAdded) {
            return tags;
        }

        tags.unshift(tag);
        tags = _.take(tags, this.MAX_RECENT_TAGS);
        localStorage.setItem(this.RECENT_STORAGE_KEY, JSON.stringify(tags));
        return tags;
    }

    public getRecentTags(): Tag[] {
        try {
            return JSON.parse(localStorage.getItem(this.RECENT_STORAGE_KEY));
        } catch {
            return [];
        }
    }
}
