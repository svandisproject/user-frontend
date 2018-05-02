import {FilterType} from './FilterType';
import {AdvancedFilterItem} from './AdvancedFilterItem';

export const MockedICOScreenerFilters: AdvancedFilterItem[] = [
    {
        type: FilterType.SELECT,
        options: ['any', 'option 1', 'option 2'],
        selected: false,
        id: '1',
        label: 'Token type',
        value: ''
    },
    {
        type: FilterType.SELECT,
        options: ['any', 'option 1', 'option 2'],
        selected: false,
        id: '2',
        label: 'Open presale',
        value: ''
    },
    {
        type: FilterType.SELECT,
        options: ['any', 'option 1', 'option 2'],
        selected: false,
        id: '3',
        label: 'Countries restrictions',
        value: ''
    },
    {
        type: FilterType.SELECT,
        options: ['any', 'option 1', 'option 2'],
        selected: false,
        id: '4',
        label: 'ICO token price (USD)',
        value: ''
    },
    {
        type: FilterType.SELECT,
        options: ['any', 'option 1', 'option 2'],
        selected: false,
        id: '5',
        label: 'ICO token price (ETH)',
        value: ''
    },
    {
        type: FilterType.SELECT,
        options: ['any', 'option 1', 'option 2'],
        selected: false,
        id: '6',
        label: 'Blockchain advisors',
        value: ''
    },
    {
        type: FilterType.SELECT,
        options: ['any', 'option 1', 'option 2'],
        selected: false,
        id: '7',
        label: 'Industry advisors',
        value: ''
    }
];
