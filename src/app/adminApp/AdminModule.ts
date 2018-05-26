import {NgModule} from '@angular/core';
import {AdminNavComponent} from './adminNav/AdminNavComponent';
import {
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from './dataTable/DataTableComponent';
import {PostListComponent} from './posts/PostListComponent';
import {AdminComponent} from './AdminComponent';
import {RouterModule} from '@angular/router';
import {AdminRouteConfigs} from './AdminRouteConfig';
import {EditPostComponent} from './posts/edit/EditPostComponent';
import {AppCommonModule} from '../common/AppCommonModule';
import {EditPostResolver} from './posts/edit/EditPostResolver';

@NgModule({
    imports: [
        AppCommonModule,
        CommonModule,
        MatSidenavModule,
        MatCardModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatGridListModule,
        MatSortModule,
        MatTableModule,
        TranslateModule,
        MatListModule,
        RouterModule.forChild(AdminRouteConfigs)
    ],
    declarations: [
        AdminComponent,
        DataTableComponent,
        PostListComponent,
        EditPostComponent,
        AdminNavComponent
    ],
    providers: [
        EditPostResolver
    ],
    exports: [
        DataTableComponent,
        MatSidenavModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatGridListModule,
        MatCardModule,
        MatSortModule,
        MatTableModule,
        AdminNavComponent
    ]
})
export class AdminModule {

}