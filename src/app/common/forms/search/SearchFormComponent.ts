import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Form} from '@angular/forms';

@Component({
    selector: 'app-search-form',
    styles: ['form.uk-search-default { width: 250px }'],
    template: `
        <form #form="ngForm" (submit)="onSubmit(form)" class="uk-search uk-search-default">
            <a href="" class="uk-search-icon-flip" uk-search-icon></a>
            <input class="uk-search-input" type="search" [placeholder]="placeholder">
        </form>
    `
})
export class SearchFormComponent {
    @Input() placeholder = 'Search...';
    @Output() submitted: EventEmitter<Form> = new EventEmitter<Form>();

    public onSubmit(form: Form) {
        this.submitted.emit(form);
    }
}
