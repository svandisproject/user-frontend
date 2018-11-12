import {Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatSelectChange} from '@angular/material';

@Component({
    selector: 'app-news-feed-like-filter',
    templateUrl: 'likeFilter.html'
})
export class LikeFilterComponent {
    @Output() periodSelect: EventEmitter<string> = new EventEmitter<string>();
    public periodValues = [
        { title: 'today', value: 'day' },
        { title: 'this week', value: 'week' },
        { title: 'this month', value: 'month' }
    ];

    public filterSelect(event: MatSelectChange) {
        this.periodSelect.emit(event.value);
    }
}