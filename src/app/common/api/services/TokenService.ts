import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {TokenResource} from '../resource/TokenResource';
import {Token} from '../dataModels/Token';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import {format} from 'd3-format';
import {Sorting} from '../util/Sorting';

@Injectable()
export class TokenService {
    constructor(private tokenResource: TokenResource) {
    }

    public findAll(): Observable<Pageable<Token>> {
        return this.tokenResource.findAll(true)
            .pipe(
                map((resp) => {
                    resp.content = _.map(resp.content, (token) => this.format(token));
                    return resp;
                })
            );
    }

    public findBy(filters: Filter[], page: number = 1, sort?: Sorting): Observable<Pageable<Token>> {
        return this.tokenResource.findBy(filters, String(page), sort)
            .pipe(
                map((resp) => {
                    resp.content = _.map(resp.content, (token) => this.format(token));
                    return resp;
                })
            );
    }


    public findById(tokenId: string): Observable<Token> {
        return this.tokenResource.findById(tokenId);
    }

    public saveOrCreate(token: Token, id?: string): Observable<Token> {
        if (id) {
            return this.tokenResource.update(id, {token: token});
        } else {
            return this.tokenResource.create({token: token});
        }
    }

    private format(token: Token): Token {
        token.price = this.scienceToFloat(token.price as number);
        token.change = format('.06f')(token.change as number);
        token.weekly_change = format('.1f')(token.weekly_change as number);
        token.year_to_day_change = format('.2f')(token.year_to_day_change as number);
        token.market_cap = format('.2s')(token.market_cap as number || 0).replace(/G/, 'B');
        token.volume = format('.2s')(token.volume as number || 0).replace(/G/, 'B');
        return token;
    }

    private scienceToFloat(value: number) {
        return parseFloat(Number(value).toFixed(4));
    }
}
