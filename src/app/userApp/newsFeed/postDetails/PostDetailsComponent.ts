import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Post} from '../../../common/api/dataModels/Post';
import {UserAuthService} from '../../../common/user/UserAuthService';

@Component({
    selector: 'app-post-details',
    templateUrl: 'postDetails.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['postDetails.scss']
})

export class PostDetailsComponent implements OnInit {
    @Input() post: Post;
    @Output() postChange: EventEmitter<Post> = new EventEmitter<Post>();
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    constructor(private userAuthService: UserAuthService) {
    }

    ngOnInit() {
    }

    public readMore(url: string) {
        window.open(url, '_blank');
    }

    public getSource(url: string): string {
        return new URL(url).hostname;
    }

    public isAdmin(): boolean {
        return this.userAuthService.hasRoleAdmin();
    }
}