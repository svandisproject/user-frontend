/**
 * columnName ca be i18n key string
 */
export interface GeneralDataTableColumn {
    columnName: string;
    columnKey: string;
    isDate?: boolean;
    columnClass?: string;
    isFlag?: boolean;
    isArray?: boolean;
    truncateSize?: number;
    arrayItemKey?: string;
    isBoolean?: boolean;
}
