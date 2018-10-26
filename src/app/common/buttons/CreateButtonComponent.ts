import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-fab-create-btn',
    template: `
        <button [matTooltip]="label"
                [attr.aria-label]="label"
                mat-fab color="accent">
            <mat-icon>add</mat-icon>
        </button>`,
    styles: ['button {bottom: 5%; right: 5%; position: fixed; color: white; z-index: 3}'],
})

export class CreateButtonComponent {
    @Input() stateChanged = false;
    @Input() label = 'Create new';
}
