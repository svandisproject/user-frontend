import {Component, ViewEncapsulation} from '@angular/core';
import {FilterFactory} from '../../common/api/util/FilterFactory';
import {PostService} from '../../common/api/services/PostService';
import {Pageable} from '../../common/api/dataModels/pageable/Pageable';
import {Post} from '../../common/api/dataModels/Post';
import {SearchFilterSettings} from '../../common/filters/dataModels/FilterSettings';
import {Filter} from '../../common/api/dataModels/Filter';
import * as _ from 'lodash';
import {FilterItem} from '../../common/filters/dataModels/FilterItem';

@Component({
    selector: 'app-news-feed',
    templateUrl: './newsFeed.html',
    styleUrls: ['./newsFeed.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NewsFeedComponent {
    public posts: Pageable<Post>;

    constructor(private postService: PostService) {
        this.postService.findAll().subscribe(posts => this.posts = posts);
    }


    public onFilterChange($event: SearchFilterSettings): void {
        this.filterPosts($event);
    }

    private filterPosts(searchFilters: SearchFilterSettings): void {
        this.postService.findAllBy(this.buildFilters(searchFilters)).subscribe((posts) => {
            this.posts = posts;
        });
    }

    private buildFilters(settings: SearchFilterSettings): Filter[] {
        const factory: FilterFactory = new FilterFactory();

        _.forEach(_.flatMap(settings), (filterItem: FilterItem) => {
            if (filterItem.value && filterItem.property) {
                factory.add(new Filter('lk', filterItem.property, filterItem.value));
            }
        });

        return factory.build();
    }
}
