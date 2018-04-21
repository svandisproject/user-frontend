import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-news-feed',
    templateUrl: './newsFeed.html',
    styleUrls: ['./newsFeed.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewsFeedComponent {
    public imAPropertyThatIsVisibleInTemplate: string;

    constructor() {
        this.imAPropertyThatIsVisibleInTemplate = 'Yo how are you ?';
    }

    public onClickIllCallAUiKitMethod() {
        UIkit.modal.alert('Hey its working');
    }
}
