import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import * as _ from 'lodash';
import {TagService} from '../../common/api/services/TagService';
import {Tag} from '../../common/api/dataModels/Tag';
import {Post} from '../../common/api/dataModels/Post';
import {PostService} from '../../common/api/services/PostService';

@Component({
    selector: 'app-tag-tool',
    templateUrl: './tagTool.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tagTool.scss']
})
export class TagToolComponent {
    @Input() post: Post;
    @Output() tagSelected: EventEmitter<void> = new EventEmitter<void>();

    public availableTags = [
        {title: 'Bullish', icon: 'arrow-up'},
        {title: 'Bearish', icon: 'arrow-down'},
        {title: 'Important', icon: 'warning'},
        {title: 'Toxic', icon: 'bolt'}
    ];

    constructor(private tagService: TagService,
                private postService: PostService) {
        _.merge(this.availableTags, this.tagService.getMainTags());
        this.availableTags = _.filter(this.availableTags, (tag: Tag) => tag.id);
    }

    public setTag(tag: Tag): void {
        tag = _.omit(tag, ['icon']) as Tag;

        if (this.isSelected(tag)) {
            this.post.tags = _.filter(this.post.tags, (t) => t.title !== tag.title);
        } else {
            this.post.tags.push(tag);
        }

        this.postService.saveOrCreate(this.post, this.post.id)
            .subscribe(() => this.tagSelected.emit());

    }

    public isSelected(tag: Tag): boolean {
        return _.includes(this.post.tags, tag);
    }
}