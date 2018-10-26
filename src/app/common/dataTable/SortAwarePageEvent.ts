import {PageEvent, Sort} from '@angular/material';

export interface SortAwarePageEvent extends PageEvent, Sort {
}