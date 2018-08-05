import {Route} from '@angular/router';

export const AppRouting: Route[] = [
    // Lazy load admin
    {path: 'admin', loadChildren: './adminApp/AdminModule#AdminModule'}
];