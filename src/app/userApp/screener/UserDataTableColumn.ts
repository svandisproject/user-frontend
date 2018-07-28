/**
 * columnName ca be i18n key string
 */
import {GeneralDataTableColumn} from '../../common/dataTable/GeneralDataTableColumn';

export interface UserDataTableColumn extends GeneralDataTableColumn {
    isHeadColumn?: boolean;
    isPositiveHeading?: boolean;
    isNegativeHeading?: boolean;
    isList?: boolean;
}
