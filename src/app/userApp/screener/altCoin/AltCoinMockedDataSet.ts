import {Pageable} from '../../../common/api/dataModels/pageable/Pageable';

export const AltCoinMockedDataSet: Pageable<any> = {
    content: [
        {
            ticker: 'BTS',
            name: 'BitShares',
            industry: 'Blockchain',
            marketCap: '602m',
            price: '0.23',
            change: '20.29%',
            changeWeek: '59.9%',
            changeYtd: '-65%',
            volume: '33m'
        },
        {
            ticker: 'BTS',
            name: 'BitShares',
            industry: 'Blockchain',
            marketCap: '602m',
            price: '0.23',
            change: '20.29%',
            changeWeek: '59.9%',
            changeYtd: '-65%',
            volume: '33m'
        },
        {
            ticker: 'BTS',
            name: 'BitShares',
            industry: 'Blockchain',
            marketCap: '602m',
            price: '0.23',
            change: '20.29%',
            changeWeek: '59.9%',
            changeYtd: '-65%',
            volume: '33m'
        }
    ],
    total: 100,
    page_request: {
        size: 10,
        page: 1
    }
};