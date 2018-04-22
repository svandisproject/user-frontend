import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {PostResource} from './resource/PostResource';
import {PostService} from './services/PostService';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        PostResource,
        PostService
    ]
})
export class SvandisApiModule {
}
