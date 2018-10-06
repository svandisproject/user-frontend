import {Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-fab-save-btn',
    template: `
        <button *ngIf="stateChanged"
                matTooltip="Save changes"
                aria-label="Save changes"
                mat-fab
                color="accent"
                [@enterAnimation]>
            <mat-icon>check</mat-icon>
        </button>`,
    styles: ['button {bottom: 5%; right: 5%; position: fixed; color: white; z-index: 3}'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({transform: 'translateX(100%)', opacity: 0}),
                    animate('250ms', style({transform: 'translateX(0)', opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateX(0)', opacity: 1}),
                    animate('250ms', style({transform: 'translateX(100%)', opacity: 0}))
                ])
            ]
        )
    ],
})

export class SaveButtonComponent {
    @Input() stateChanged = false;
}
