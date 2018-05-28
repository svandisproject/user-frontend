import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {PostResource} from './resource/PostResource';
import {PostService} from './services/PostService';
import {FilterResource} from './resource/FilterResource';
import {TagResource} from './resource/TagResource';
import {TagService} from './services/TagService';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        PostResource,
        PostService,
        TagResource,
        TagService,
        FilterResource,
    ]
})
export class SvandisApiModule {
}
