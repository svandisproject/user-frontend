import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Post} from '../dataModels/Post';
import {SvandisApi} from '../config/SvandisApi';
import {HttpService} from '../../http/HttpService';
import {Pageable} from '../dataModels/pageable/Pageable';
import {map} from 'rxjs/operators';

@Injectable()
export class PostResource {
    private readonly URL: string = SvandisApi.API_URL + '/post';

    constructor(private httpService: HttpService) {
    }

    public findAll(): Observable<Pageable<Post>> {
        return this.httpService.get(this.URL)
            .pipe(
                map((res) => {
                    return <Pageable<Post>>{
                        content: res.rows,
                        total: res.total,
                        pageRequest: {
                            page: res.current_page,
                            size: res.total_pages
                        }
                    };
                })
            );
    }
}
