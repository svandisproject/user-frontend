import {NgModule} from '@angular/core';
import {GeneratorComponent} from './generator/GeneratorComponent';
import {RouterModule} from '@angular/router';
import {WidgetGeneratorRouting} from './WidgetGeneratorRouting';
import {CommonModule} from '@angular/common';
import {CommonMaterialModule} from '../common/material/CommonMaterialModule';
import {PrismModule} from '@ngx-prism/core';
import {GeneratorService} from './generator/services/generator.service';
@NgModule({
    imports: [
        CommonModule,
        CommonMaterialModule,
        RouterModule.forChild(WidgetGeneratorRouting),
        PrismModule
    ],
    exports: [],
    declarations: [GeneratorComponent],
    providers: [GeneratorService],
})
export class WidgetGeneratorModule {
}
