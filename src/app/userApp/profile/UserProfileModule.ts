import {NgModule} from '@angular/core';
import {UserProfileDetailsComponent} from './details/UserProfileDetailsComponent';
import {RouterModule} from '@angular/router';
import {UserProfileRouteConfig} from './UserProfileRouteConfig';


@NgModule({
    imports: [
        RouterModule.forChild(UserProfileRouteConfig)
    ],
    exports: [],
    declarations: [
        UserProfileDetailsComponent
    ],
    providers: [],
})
export class UserProfileModule {
}
