import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonMaterialModule} from '../../common/material/CommonMaterialModule';
import {PostListComponent} from './PostListComponent';
import {EditPostComponent} from './edit/EditPostComponent';
import {RouterModule} from '@angular/router';
import {PostRouteConfig} from './PostRouteConfig';
import {FormsModule} from '@angular/forms';
import {AppCommonModule} from '../../common/AppCommonModule';
import {DataTableModule} from '../../common/dataTable/DataTableModule';

@NgModule({
    imports: [
        AppCommonModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(PostRouteConfig),
        DataTableModule,
        CommonMaterialModule
    ],
    exports: [],
    declarations: [
        PostListComponent,
        EditPostComponent,
    ],
    providers: [],
})
export class PostsModule {
}
