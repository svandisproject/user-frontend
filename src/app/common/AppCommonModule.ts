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


@NgModule({
    imports: [
        FormsModule,
        SvandisApiModule,
        FiltersModule,
        TranslateModule
    ],
    declarations: [
        ListReversePipe,
        RangeSliderComponent,
        TruncatePipe,
        SearchFormComponent,
        LoginPageComponent
    ],
    exports: [
        FormsModule,
        SvandisApiModule,
        FiltersModule,
        LoginPageComponent,
        RangeSliderComponent,
        SearchFormComponent,
        TruncatePipe,
        ListReversePipe
    ]
})
export class AppCommonModule {
}
