import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import * as _ from 'lodash';
import {TagService} from '../../common/api/services/TagService';
import {Tag} from '../../common/api/dataModels/Tag';
import {Post} from '../../common/api/dataModels/Post';
import {PostService} from '../../common/api/services/PostService';

@Component({
    selector: 'app-tag-tool',
    templateUrl: './tagTool.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./tagTool.scss'],
})
export class TagToolComponent implements OnInit, OnChanges {
    @Input() post: Post;
    @Input() isMenu = true;
    @Input() canEdit = true;
    @Output() postChange: EventEmitter<Post> = new EventEmitter<Post>();

    public availableTags: any[] = [
        {title: 'Bullish', icon: 'arrow_upward'},
        {title: 'Bearish', icon: 'arrow_downward'},
        {title: 'Important', icon: 'warning'},
        {title: 'Toxic', icon: 'offline_bolt'}
    ];
    public currentPost: Post;

    constructor(private tagService: TagService,
                private postService: PostService) {
    }

    ngOnInit(): void {
        this.initAvailableTags();
    }

    ngOnChanges(): void {
        this.initAvailableTags();
    }

    public setTag(tag: Tag): void {
        if (this.canEdit) {
            tag = _.omit(tag, ['icon']) as Tag;

            if (this.isSelected(tag)) {
                this.currentPost.tags = _.filter(this.currentPost.tags, (t) => t.title !== tag.title);
            } else {
                this.currentPost.tags.push(tag);
            }
            this.postService.saveOrCreate(this.currentPost, this.post.id)
                .subscribe((post) => this.postChange.emit(post));
        }
    }

    public isSelected(tag: Tag): boolean {
        tag = _.omit(tag, ['icon']) as Tag;
        return _.some(this.currentPost.tags, tag);
    }

    private initAvailableTags() {
        _.intersectionWith(this.availableTags, this.tagService.getMainTags(), (arrVal, other) => {
            if (arrVal.title === other.title) {
                arrVal.id = other.id;
            }
        });
        this.availableTags = _.filter(this.availableTags, (tag: Tag) => tag.id) as AvailableTags[];
        this.currentPost = _.cloneDeep(this.post);
        if (!this.canEdit) {

            this.availableTags = _.filter(this.availableTags, (tag) => {
                tag = _.omit(tag, ['icon']);
                return _.some(this.currentPost.tags, tag);
            });
        }
    }
}

interface AvailableTags {
    title: string;
    icon: string;
}