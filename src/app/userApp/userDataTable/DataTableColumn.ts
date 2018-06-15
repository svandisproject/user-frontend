/**
 * columnName ca be i18n key string
 */
export interface DataTableColumn {
    columnName: string;
    columnKey: string;
    isHeadColumn?: boolean;
    isPositiveHeading?: boolean;
    isNegativeHeading?: boolean;
    isList?: boolean;
}
