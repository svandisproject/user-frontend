import {NgModule} from '@angular/core';
import {DynamicFormComponent} from './components/DynamicFormComponent';
import {DynamicInputComponent} from './components/DynamicInputComponent';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgFormsThemeModule} from './themes/NgFormsThemeModule';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        TranslateModule,
        NgFormsThemeModule,
        ReactiveFormsModule
    ],
    declarations: [
        DynamicFormComponent,
        DynamicInputComponent
    ],
    exports: [
        NgFormsThemeModule,
        DynamicFormComponent,
        DynamicInputComponent
    ]
})
export class NgFormsModule {

}

