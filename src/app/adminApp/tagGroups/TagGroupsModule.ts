import {NgModule} from '@angular/core';
import {TagGroupListComponent} from './list/TagGroupListComponent';
import {AppCommonModule} from '../../common/AppCommonModule';
import {CommonModule} from '@angular/common';
import {CommonMaterialModule} from '../../common/material/CommonMaterialModule';
import {RouterModule} from '@angular/router';
import {TagGroupsRouteConfig} from './TagGroupsRouteConfig';


@NgModule({
    imports: [
        AppCommonModule,
        CommonModule,
        CommonMaterialModule,
        RouterModule.forChild(TagGroupsRouteConfig)
    ],
    exports: [],
    declarations: [
        TagGroupListComponent
    ],
    providers: [],
})
export class TagGroupsModule {
}
