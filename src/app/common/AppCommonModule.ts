import {NgModule} from '@angular/core';
import {LoginPageComponent} from './pages/login/LoginPageComponent';
import {TranslateModule} from '@ngx-translate/core';
import {ListReversePipe} from './pipes/ListReversePipe';
import {TruncatePipe} from './pipes/TruncatePipe';
import {FormsModule} from '@angular/forms';
import {SearchFormComponent} from './forms/search/SearchFormComponent';
import {RangeSliderComponent} from './forms/rangeSlider/RangeSliderComponent';
import {SvandisApiModule} from './api/SvandisApiModule';
import {FiltersModule} from './filters/FiltersModule';
import {CommonModule} from '@angular/common';
import {FilterButtonComponent} from './filters/filterButton/FilterButtonComponent';
import {OrderModule} from 'ngx-order-pipe';
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgFormsModule} from './ngForms/NgFormsModule';
import {ToggleInputComponent} from './forms/toggle/ToggleInputComponent';
import {BlockUIModule} from 'ng-block-ui';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule} from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SvandisApiModule,
        OrderModule,
        FiltersModule,
        NgFormsModule,
        BrowserAnimationsModule,
        TagInputModule,
        BlockUIModule,
        MatButtonModule,
        MatGridListModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        TranslateModule
    ],
    declarations: [
        ListReversePipe,
        RangeSliderComponent,
        FilterButtonComponent,
        ToggleInputComponent,
        TruncatePipe,
        SearchFormComponent,
        LoginPageComponent
    ],
    exports: [
        NgFormsModule,
        CommonModule,
        FormsModule,
        OrderModule,
        FormsModule,
        SvandisApiModule,
        FilterButtonComponent,
        FiltersModule,
        LoginPageComponent,
        ToggleInputComponent,
        RangeSliderComponent,
        SearchFormComponent,
        TruncatePipe,
        ListReversePipe
    ]
})
export class AppCommonModule {
}
