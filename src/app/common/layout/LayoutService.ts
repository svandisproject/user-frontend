import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class LayoutService {

    constructor(private breakpointObserver: BreakpointObserver) {
    }


    public isMobile(): Observable<boolean> {
        return this.breakpointObserver
            .observe([Breakpoints.Tablet, Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Handset])
            .pipe(map((result) => result.matches));
    }

    public isBreakPoint(breakPoint: string): Observable<boolean> {
        return this.breakpointObserver
            .observe([breakPoint])
            .pipe(map((result) => result.matches));
    }
}