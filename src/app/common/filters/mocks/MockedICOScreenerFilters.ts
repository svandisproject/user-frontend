import {AdvancedFilterItem} from '../dataModels/AdvancedFilterItem';
import {FilterType} from '../dataModels/FilterType';

export const MockedICOScreenerFilters: AdvancedFilterItem[] = [
    {
        type: FilterType.SELECT,
        options: [{label: 'any'}, {label: 'option 1'}, {label: 'option 2'}],
        id: '1',
        label: 'Token type',
        value: ''
    },
    {
        type: FilterType.SELECT,
        options: [{label: 'any'}, {label: 'option 1'}, {label: 'option 2'}],
        id: '2',
        label: 'Open presale',
        value: ''
    },
    {
        type: FilterType.SELECT,
        options: [{label: 'any'}, {label: 'option 1', selected: true}, {label: 'option 2'}],
        id: '3',
        label: 'Countries restrictions',
        value: ''
    },
    {
        type: FilterType.SELECT,
        options: [{label: 'any'}, {label: 'option 1'}, {label: 'option 2'}],
        id: '4',
        label: 'ICO token price (USD)',
        value: ''
    },
    {
        type: FilterType.SELECT,
        options: [{label: 'any'}, {label: 'option 1'}, {label: 'option 2'}],
        id: '5',
        label: 'ICO token price (ETH)',
        value: ''
    },
    {
        type: FilterType.SELECT,
        options: [{label: 'any'}, {label: 'option 1'}, {label: 'option 2'}],
        selected: false,
        id: '6',
        label: 'Blockchain advisors',
        value: ''
    },
    {
        type: FilterType.SELECT,
        options: [{label: 'any'}, {label: 'option 1'}, {label: 'option 2'}],
        id: '7',
        label: 'Industry advisors',
        value: ''
    },
    {
        type: FilterType.SELECT,
        id: '8',
        options: [{label: 'any'}, {label: 'option 1'}, {label: 'option 2'}],
        label: 'Legal partners',
        value: ''
    },
    {
        type: FilterType.SELECT,
        id: '9',
        options: [{label: 'any'}, {label: 'option 1'}, {label: 'option 2'}],
        label: 'Smart contract audit',
        value: ''
    },
    {
        type: FilterType.SELECT,
        id: '10',
        options: [{label: 'any'}, {label: 'option 1'}, {label: 'option 2'}],
        label: 'Product',
        value: ''
    },
    {
        type: FilterType.SELECT,
        id: '11',
        options: [{label: 'any'}, {label: 'option 1'}, {label: 'option 2'}],
        label: 'Industry',
        value: ''
    },
    {
        type: FilterType.SWITCH,
        id: '12',
        options: [{label: 'Yes'}, {label: 'No'}],
        label: 'Whitelist',
        value: ''
    },
    {
        type: FilterType.SWITCH,
        id: '13',
        options: [{label: 'Yes'}, {label: 'No'}],
        label: 'KYC',
        value: ''
    },
    {
        type: FilterType.SELECT,
        id: '15',
        options: [{label: 'any'}, {label: 'option 1'}, {label: 'option 2'}],
        label: 'Competitors',
        value: ''
    },
    {
        type: FilterType.SELECT,
        id: '14',
        options: [{label: 'any'}, {label: 'option 1'}, {label: 'option 2'}],
        label: 'Country',
        value: ''
    },
];
