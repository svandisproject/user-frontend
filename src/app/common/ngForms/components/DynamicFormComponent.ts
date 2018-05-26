import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BaseInput} from '../inputs/base/BaseInput';
import {AbstractControl} from '@angular/forms/src/model';
import {NgFormsInputOptions} from './NgFormsOptions';

@Component({
    selector: 'ng-forms',
    templateUrl: './dynamicForm.html',
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DynamicFormComponent implements OnInit {

    @Input() inputs: BaseInput[] = [];
    @Input() options: NgFormsInputOptions = {
        columns: 1,
        submitLabel: 'Submit'
    };

    @Output() formSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    public form: FormGroup;

    public getWidth(): string {
        switch (this.options.columns) {
            case 1:
                return 'w-100';
            case 2:
                return 'w-50';
            case 3:
                return 'w-33';
        }
    }

    public ngOnInit() {
        this.buildForm();
    }

    public onSubmit(form: FormGroup) {
        this.formSubmit.emit(form);
    }

    private buildForm() {
        const formGroup: { [key: string]: AbstractControl } = {};

        this.inputs.forEach(input => formGroup[input.name] = input.getFormControl());
        this.form = new FormGroup(formGroup);
    }
}
