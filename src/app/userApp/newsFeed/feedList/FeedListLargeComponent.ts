import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FeedListComponent} from './FeedListComponent';
import {AuthService} from '../../../common/auth/AuthService';
import {UserRoles} from '../../../common/user/UserRoles';
import * as _ from 'lodash';

@Component({
    selector: 'app-feed-list-large',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './feedListLarge.html',
    styleUrls: ['feedListLarge.scss']
})
export class FeedListLargeComponent extends FeedListComponent {
    constructor(private authService: AuthService) {
        super();
    }

    public isAdmin(): boolean {
        return _.includes(this.authService.getDecodedToken().roles, UserRoles.ADMIN);
    }
}