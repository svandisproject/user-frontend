import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {TokenResource} from '../resource/TokenResource';
import {Token} from '../dataModels/Token';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import {format} from 'd3-format';

@Injectable()
export class TokenService {
    constructor(private tokenResource: TokenResource) {
    }

    public findAll(): Observable<Pageable<Token>> {
        return this.tokenResource.findAll(true)
            .pipe(
                map((resp) => {
                    resp.content = _.map(resp.content, (token) => {
                        token.change = format('0%')(token.change as number);
                        token.price = this.scienceToFloat(token.price as number);
                        return token;
                    });
                    return resp;
                })
            );
    }

    public findBy(filters: Filter[], page: number = 1): Observable<Pageable<Token>> {
        return this.tokenResource.findBy(filters, String(page), true)
            .pipe(
                map((resp) => {
                    resp.content = _.map(resp.content, (token) => {
                        token.change = format('0%')(token.change as number);
                        token.price = this.scienceToFloat(token.price as number);
                        return token;
                    });
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

    public convertPrices(tokenPageable: Pageable<Token>): Pageable<Token> {
        tokenPageable.content =
            _.map(tokenPageable.content, (token) => this.formatPrices(token));
        return tokenPageable;
    }

    private formatPrices(token: Token): Token {
        token.market_cap = format('.2s')(token.market_cap as number || 0).replace(/G/, 'B');
        token.volume = format('.2s')(token.volume as number || 0).replace(/G/, 'B');
        return token;
    }

    private scienceToFloat(value: number) {
        return parseFloat(Number(value).toFixed(4));
    }
}
