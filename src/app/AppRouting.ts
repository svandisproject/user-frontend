import {Route} from '@angular/router';
import {LoginPageComponent} from './common/pages/login/LoginPageComponent';

export const AppRouting: Route[] = [
    // Lazy load admin
    {path: 'admin', loadChildren: './adminApp/AdminModule#AdminModule'},
    // Lazy load user
    {path: 'user', loadChildren: './userApp/UserAppModule#UserAppModule'},
    {path: 'widget', loadChildren: './widgetGeneratorApp/WidgetGeneratorModule#WidgetGeneratorModule'},

    {path: 'login', component: LoginPageComponent},

    {path: '', redirectTo: 'user/news-feed', pathMatch: 'full'},
];