export interface Ico {
    advisors: string[];
    competitors: string[];
    country: string;
    hard_cap: string;
    industries: IcoIndustry[];
    kyc: boolean;
    partners: string[];
    raised: number | string;
    remote_id: number;
    restricted_countries: string[];
    team: string[];
    title: string;
    token_price: number | string;
}

export interface IcoIndustry {
    title: string;
}

export interface NewIco {
    asset: {
        convertable: boolean;
        id: number;
        posts: any[];
        price: number;
        ticker: string;
    };
    competitors: any[];
    country: string;
    dates: any;
    descriptions: string;
    finance: any;
    industries: any[];
    links: any;
    partners: any[];
    remote_id: number;
    restricted_countries: string[];
    team: Array<{ name: string, title: string }>;
    title: string;
}