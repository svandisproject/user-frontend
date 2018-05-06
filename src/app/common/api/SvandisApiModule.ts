import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {PostResource} from './resource/PostResource';
import {PostService} from './services/PostService';
import {FilterResource} from './resource/FilterResource';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        PostResource,
        PostService,
        FilterResource,
    ]
})
export class SvandisApiModule {
}
