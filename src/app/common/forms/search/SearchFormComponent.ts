import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Form} from '@angular/forms';

@Component({
    selector: 'app-search-form, [app-search-form-inline]',
    styleUrls: ['./searchForm.scss'],
    templateUrl: './searchForm.html'
})
export class SearchFormComponent {
    @Input() placeholder = 'Search...';
    @Input('app-search-form-inline') inline;
    @Output() submitted: EventEmitter<Form> = new EventEmitter<Form>();

    public onSubmit(form: Form) {
        this.submitted.emit(form);
    }
}
