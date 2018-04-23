import {NgModule} from '@angular/core';
import {LoginPageComponent} from './pages/login/LoginPageComponent';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
    imports: [TranslateModule],
    declarations: [LoginPageComponent],
    exports: [LoginPageComponent]
})
export class AppCommonModule {
}
