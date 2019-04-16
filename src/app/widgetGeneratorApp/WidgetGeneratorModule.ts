import {NgModule} from '@angular/core';
import {GeneratorComponent} from './generator/GeneratorComponent';
import {RouterModule} from '@angular/router';
import {WidgetGeneratorRouting} from './WidgetGeneratorRouting';
import {CommonModule} from '@angular/common';
import {CommonMaterialModule} from '../common/material/CommonMaterialModule';

@NgModule({
    imports: [
        CommonModule,
        CommonMaterialModule,
        RouterModule.forChild(WidgetGeneratorRouting)
    ],
    exports: [],
    declarations: [GeneratorComponent],
    providers: [],
})
export class WidgetGeneratorModule {
}
