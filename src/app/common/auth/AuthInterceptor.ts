import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../auth/AuthService';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {AuthNoTokenException} from '../auth/AuthNoTokenException';
import * as _ from 'lodash';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService: AuthService;
    private httpClient: HttpClient;
    private router: Router;

    constructor(private injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isAssetsRequest(req)) {
            return next.handle(req);
        }

        this.authService = this.injector.get(AuthService);
        this.httpClient = this.injector.get(HttpClient);
        this.router = this.injector.get(Router);

        const authorizedRequest: HttpRequest<any> = this.getAuthorizedRequest(req);

        return next.handle(authorizedRequest)
            .do(null, (err: any) => this.handleError(err, req));
    }

    private isAssetsRequest(req: HttpRequest<any>) {
        return _.includes(req.url, 'assets');
    }

    private handleError(err: any, request: HttpRequest<any>) {
        if (err instanceof HttpErrorResponse) {
            this.handleAuthError(err, request);
        }
    }

    private handleAuthError(err: HttpErrorResponse, request: HttpRequest<any>) {
        if (err.status === 401) {
            this.router.navigate(['login']);
            throw new AuthNoTokenException();
            // TODO: for now no refreshes
            // this.authService.refreshToken().subscribe(() => {
            //     this.httpClient.request(request.clone(request))
            //         .subscribe();
            // });
        }
    }

    private getAuthorizedRequest(request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({
            headers: request.headers.append('Authorization', this.authService.getAuthTokenString())
        });
    }
}