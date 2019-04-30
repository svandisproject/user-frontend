import {NgModule} from '@angular/core';
import {GeneratorComponent} from './generator/GeneratorComponent';
import {RouterModule} from '@angular/router';
import {WidgetGeneratorRouting} from './WidgetGeneratorRouting';
import {CommonModule} from '@angular/common';
import {CommonMaterialModule} from '../common/material/CommonMaterialModule';
import {PrismModule} from '@ngx-prism/core';
import {GeneratorService} from './services/GeneratorService';
import {TagsResource} from './resource/GeneratorResource';
import {ClipboardCopyDirective} from './directives/ClipboardCopyDirective';
import {DashboardResource} from './resource/DashboardResource';
import {NewsWidgetModule} from './newsWidget/NewsWidgetModule';

@NgModule({
    imports: [
        CommonModule,
        CommonMaterialModule,
        RouterModule.forChild(WidgetGeneratorRouting),
        NewsWidgetModule,
        PrismModule
    ],
    exports: [],
    declarations: [
        ClipboardCopyDirective,
        GeneratorComponent
    ],
    providers: [
        GeneratorService,
        TagsResource,
        DashboardResource
    ],
})
export class WidgetGeneratorModule {
}
