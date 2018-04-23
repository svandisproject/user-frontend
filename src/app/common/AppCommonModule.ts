import {NgModule} from '@angular/core';
import {LoginPageComponent} from './pages/login/LoginPageComponent';
import {TranslateModule} from '@ngx-translate/core';
import {ListReversePipe} from './pipes/ListReversePipe';


@NgModule({
    imports: [TranslateModule],
    declarations: [
        ListReversePipe,
        LoginPageComponent
    ],
    exports: [
        LoginPageComponent,
        ListReversePipe
    ]
})
export class AppCommonModule {
}
