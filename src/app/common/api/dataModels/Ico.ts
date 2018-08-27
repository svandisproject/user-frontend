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