import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {HttpRequestOptions} from './HttpRequestOptions';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient) {
    }

    public get(url: string, options?: HttpRequestOptions): Observable<any> {
        return this.httpClient.get(url, <HttpRequestOptions> options);
    }

    public post(url: string, requestBody?: any, options?: HttpRequestOptions): Observable<any> {
        return this.httpClient.post(url, requestBody, <HttpRequestOptions> options);
    }

    public put(url: string, requestBody?: any, options?: HttpRequestOptions): Observable<any> {
        return this.httpClient.put(url, requestBody, <HttpRequestOptions> options);
    }

    public delete(url: string, options?: HttpRequestOptions): Observable<any> {
        return this.httpClient.delete(url, <HttpRequestOptions> options);
    }

}
