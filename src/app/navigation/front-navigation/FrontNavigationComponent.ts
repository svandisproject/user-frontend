import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationItem} from '../NavigationItem';
import {FrontNavigation} from '../../config/FrontNavigation';

@Component({
    selector: 'app-front-navigation',
    templateUrl: './frontNavigation.html',
    styleUrls: ['./frontNavigation.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FrontNavigationComponent {
    public navItems: NavigationItem[] = FrontNavigation;
}
