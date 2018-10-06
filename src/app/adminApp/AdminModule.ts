import {NgModule} from '@angular/core';
import {AdminNavComponent} from './adminNav/AdminNavComponent';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatListModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {PostListComponent} from './posts/PostListComponent';
import {AdminComponent} from './AdminComponent';
import {RouterModule} from '@angular/router';
import {AdminRouteConfigs} from './AdminRouteConfig';
import {EditPostComponent} from './posts/edit/EditPostComponent';
import {AppCommonModule} from '../common/AppCommonModule';
import {EditPostResolver} from './posts/edit/EditPostResolver';
import {TagListComponent} from './tags/TagListComponent';
import {EditWebFeedComponent} from './webFeed/edit/EditWebFeedComponent';
import {EditWebFeedResolver} from './webFeed/edit/EditWebFeedResolver';
import {WebFeedListComponent} from './webFeed/WebFeedListComponent';
import {EditTagComponent} from './tags/edit/EditTagComponent';
import {EditTagResolver} from './tags/edit/EditTagResolver';
import {AppCommonProvidersModule} from '../common/AppCommonProvidersModule';
import {CommonMaterialModule} from '../common/material/CommonMaterialModule';

@NgModule({
    imports: [
        AppCommonModule,
        AppCommonProvidersModule,
        CommonModule,
        CommonMaterialModule,
        TranslateModule,
        MatListModule,
        RouterModule.forChild(AdminRouteConfigs)
    ],
    declarations: [
        AdminComponent,
        PostListComponent,
        EditPostComponent,
        WebFeedListComponent,
        EditWebFeedComponent,
        TagListComponent,
        EditTagComponent,
        AdminNavComponent
    ],
    providers: [
        EditTagResolver,
        EditWebFeedResolver,
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {duration: 2500}
        },
        EditPostResolver
    ],
    exports: [
        CommonMaterialModule,
        AdminNavComponent
    ]
})
export class AdminModule {

}