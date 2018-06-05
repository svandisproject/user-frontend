import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {WebFeedResource} from '../resource/WebFeedResource';
import {WebFeed} from '../dataModels/WebFeed';

@Injectable()
export class WebFeedService {
    constructor(private webFeedResource: WebFeedResource) {
    }

    public findAll(): Observable<Pageable<WebFeed>> {
        return this.webFeedResource.findAll();
    }

    public findBy(filters: Filter[]): Observable<Pageable<WebFeed>> {
        return this.webFeedResource.findBy(filters);
    }

    public findById(tagId: string): Observable<WebFeed> {
        return this.webFeedResource.findById(tagId);
    }

    public saveOrCreate(tag: WebFeed, id?: string): Observable<WebFeed> {
        if (id) {
            return this.webFeedResource.update(id, {tag: tag});
        } else {
            return this.webFeedResource.create({tag: tag});
        }
    }
}
