import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {PostResource} from './resource/PostResource';
import {PostService} from './services/PostService';
import {FilterResource} from './resource/FilterResource';
import {TagResource} from './resource/TagResource';
import {TagService} from './services/TagService';
import {WorkerResource} from './resource/WorkerResource';
import {WorkerService} from './services/WorkerService';
import {WebFeedResource} from './resource/WebFeedResource';
import {WebFeedService} from './services/WebFeedService';
import {IcoResource} from './resource/IcoResource';
import {IcoService} from './services/IcoService';
import {TokenResource} from './resource/TokenResource';
import {TokenService} from './services/TokenService';
import {UserResource} from './resource/UserResource';
import {UserService} from './services/UserService';
import {TagGroupResource} from './resource/TagGroupResource';
import {TagGroupService} from './services/TagGroupService';
import {LikeResource} from './resource/LikeResource';
import {LikeService} from './services/LikeService';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        PostResource,
        PostService,
        IcoResource,
        IcoService,
        WorkerResource,
        WorkerService,
        WebFeedResource,
        WebFeedService,
        TokenResource,
        TokenService,
        TagResource,
        TagService,
        TagGroupResource,
        TagGroupService,
        FilterResource,
        UserResource,
        UserService,
        LikeResource,
        LikeService
    ]
})
export class SvandisApiModule {
}
