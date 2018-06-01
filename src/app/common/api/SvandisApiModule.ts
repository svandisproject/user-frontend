import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {PostResource} from './resource/PostResource';
import {PostService} from './services/PostService';
import {FilterResource} from './resource/FilterResource';
import {TagResource} from './resource/TagResource';
import {TagService} from './services/TagService';
import {WorkerResource} from './resource/WorkerResource';
import {WorkerService} from './services/WorkerService';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        PostResource,
        PostService,
        WorkerResource,
        WorkerService,
        TagResource,
        TagService,
        FilterResource,
    ]
})
export class SvandisApiModule {
}
