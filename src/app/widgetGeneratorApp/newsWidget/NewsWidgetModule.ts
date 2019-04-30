import {NewsFeedService} from './services/news-feed.service';
import {CommonModule} from '@angular/common';
import {DomainPipe} from './pipes/domain.pipe';
import {NgModule} from '@angular/core';
import {GeneralNewsWidgetComponent} from './GeneralNewsWidgetComponent';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        GeneralNewsWidgetComponent,
        DomainPipe
    ],
    exports: [
        GeneralNewsWidgetComponent,
        DomainPipe
    ],
    entryComponents: [
        GeneralNewsWidgetComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        NewsFeedService
    ]
})
export class NewsWidgetModule {
}
