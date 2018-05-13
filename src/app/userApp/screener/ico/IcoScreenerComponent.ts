import {Component} from '@angular/core';
import {GeneralScreenerComponent} from '../GeneralScreenerComponent';
import {IcoFilterService} from '../../../common/filters/IcoFilterService';

@Component({
    templateUrl: '../generalScreener.html'
})
export class IcoScreenerComponent extends GeneralScreenerComponent {

    constructor(public filterService: IcoFilterService) {
        super();
    }
}
