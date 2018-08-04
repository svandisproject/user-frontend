export interface Token {
    industry: {
        title: string
    };
    title: string;
    price: number | string;
    ticker: string;
    change: number | string;
    market_cap: number | string;
    volume: number | string;
    weekly_change: number | string;
    year_to_day_change: number;
}