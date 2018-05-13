import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-filter-button',
    styleUrls: ['./fitlerButton.scss'],
    template: `
        <button id="filter-table-toggle"
                ngClass="{{isOpened ? 'button-active' : ''}}"
                (click)="toggleButton()"
                class="uk-button uk-button-default dropdown-filter">
            <span uk-icon="settings"></span>
            <span uk-icon="chevron-down" *ngIf="!isOpened; else chevronUp"></span>
            <ng-template #chevronUp>
                <span uk-icon="chevron-up"></span>
            </ng-template>
        </button>`
})

export class FilterButtonComponent {
    @Input() isOpened = false;
    @Output() isOpenedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    public toggleButton(): void {
        this.isOpened = !this.isOpened;
        this.isOpenedChange.emit(this.isOpened);
    }
}