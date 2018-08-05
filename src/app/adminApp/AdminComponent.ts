import {Component, OnDestroy, Renderer2, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.html',
    styleUrls: ['./admin.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AdminComponent implements OnDestroy {
    constructor(private renderer: Renderer2) {
        this.renderer.addClass(document.documentElement, 'admin-panel');
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.documentElement, 'admin-panel');
    }
}