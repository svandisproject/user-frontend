import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../../common/api/dataModels/Post';
import {UserAuthService} from '../../../common/user/UserAuthService';

@Component({
    selector: 'app-post-details',
    templateUrl: 'postDetails.html'
})

export class PostDetailsComponent implements OnInit {
    @Input() post: Post;
    @Output() postChange: EventEmitter<Post> = new EventEmitter<Post>();

    constructor(private userAuthService: UserAuthService) {
    }

    ngOnInit() {
    }

    public readMore(url: string) {
        window.open(url, '_blank');
    }

    public isAdmin(): boolean {
        return this.userAuthService.hasRoleAdmin();
    }
}