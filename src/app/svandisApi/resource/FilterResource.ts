import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FilterSettings} from '../dataModels/FilterSettings';

@Injectable()
export class FilterResource {

    public getFilterSettings(): Observable<FilterSettings> {
        return Observable.of(mockedSettings);
    }

    public saveSettings(fitleSettings: FilterSettings): Observable<any> {
        return Observable.of(null);
    }
}


const mockedSettings: FilterSettings = {
    searchQuery: ['keyword'],
    assets: [
        {id: '1', label: 'Option 1', value: 'option1', selected: false},
        {id: '2', label: 'Option 2', value: 'option2', selected: false},
        {id: '3', label: 'Option 3', value: 'option3', selected: false},
        {id: '4', label: 'Option 4', value: 'option4', selected: false},
    ],
    region: [
        {id: '1', label: 'Option 1', value: 'option1', selected: false},
        {id: '2', label: 'Option 2', value: 'option2', selected: false},
        {id: '3', label: 'Option 3', value: 'option3', selected: false},
        {id: '4', label: 'Option 4', value: 'option4', selected: false},
    ],
    activityFields: [
        {id: '1', label: 'All', selected: false},
        {id: '2', label: 'Politics', selected: true},
        {id: '3', label: 'Economy', selected: false},
        {id: '4', label: 'Exchange listing', selected: false},
        {id: '5', label: 'Business', selected: false},
        {id: '6', label: 'Investing', selected: false},
        {id: '7', label: 'Tech', selected: false},
    ],
    importanceFilters: [
        {id: '1', label: 'All', selected: false},
        {id: '2', label: 'Old', selected: true},
        {id: '3', label: 'Ordinary', selected: false},
        {id: '4', label: 'Breaking', selected: false},
    ],
    votingFilters: [
        {id: '1', label: 'Bullish', selected: false},
        {id: '2', label: 'Bearish', selected: true},
        {id: '3', label: 'Important', selected: false},
        {id: '4', label: 'Toxic', selected: false},
    ]
};