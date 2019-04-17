import {Route} from '@angular/router';
import {GeneratorComponent} from './generator/GeneratorComponent';
import {AuthGuard} from '../common/guards/AuthGuard';

export const WidgetGeneratorRouting: Route[] = [
    /*{path: '', component: GeneratorComponent, canActivate: [AuthGuard]}*/
    {path: '', component: GeneratorComponent}
];