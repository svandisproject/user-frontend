import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-input-toggle',
    styleUrls: ['./toggleInput.scss'],
    encapsulation: ViewEncapsulation.None,
    template: `
        <label class="switch">
            <input type="checkbox" (click)="doToggle()">
            <span class="slider"></span>
        </label>
    `
})
export class ToggleInputComponent {
    public isToggled = false;
    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    public doToggle(): void {
        this.isToggled = !this.isToggled;
        this.toggle.emit(this.isToggled);
    }
}