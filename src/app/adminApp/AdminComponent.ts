import {Component, OnDestroy, Renderer2} from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.html',
})

export class AdminComponent implements OnDestroy {
    constructor(private renderer: Renderer2) {
        this.renderer.addClass(document.documentElement, 'admin-panel');
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.documentElement, 'admin-panel');
    }
}