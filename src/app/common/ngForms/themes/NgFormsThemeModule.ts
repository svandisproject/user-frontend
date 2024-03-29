import {NgModule} from '@angular/core';
import {MaterialDynamicInputComponent} from './material/MaterialDynamicInputComponent';
import {MaterialDynamicFormComponent} from './material/MaterialDynamicFormComponent';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        MatCardModule,
        MatDividerModule,
        MatChipsModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        TranslateModule,
        MatInputModule
    ],
    declarations: [
        MaterialDynamicInputComponent,
        MaterialDynamicFormComponent,
    ],
    exports: [
        MaterialDynamicFormComponent,
        MaterialDynamicInputComponent
    ]
})
export class NgFormsThemeModule {
}
