import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Pageable} from '../dataModels/pageable/Pageable';
import {Filter} from '../dataModels/Filter';
import {TokenResource} from '../resource/TokenResource';
import {Token} from '../dataModels/Token';

@Injectable()
export class TokenService {
    constructor(private tokenResource: TokenResource) {
    }

    public findAll(): Observable<Pageable<Token>> {
        return this.tokenResource.findAll(true);
    }

    public findBy(filters: Filter[], page: number = 1): Observable<Pageable<Token>> {
        return this.tokenResource.findBy(filters, String(page));
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
}
