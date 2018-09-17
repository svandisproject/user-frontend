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

// asset: {id: 19385, ticker: "XAL", price: 2.5, posts: [], convertable: false}
// convertable: false
// id: 19385
// posts: []
// price: 2.5
// ticker: "XAL"
// competitors: []
// country: "EE"
// dates: {}
// description: "Auxledger enables organizations to build their fully customizable network as per business & compliance requirements. The multi-tiered networks deployed on Auxledger public network ensures data integrity across the ecosystem while maintaining interoperability with other networks using Auxledger decentralize consensus protocol."
// finance: {token_price_eth: 0, accepted_currencies: ["ETH", "LTC", "BTC", "XRP", "LTC", "Fiat"],…}
// industries: [{title: "Infrastructure", icos: []}]
// links: {twitter: "https://twitter.com/auxledger/", slack: "",…}
// partners: []
// remote_id: 4855
// restricted_countries: ["US"]
// team: [{name: "Prof. Rudolf Mauch", title: "Blockchain Advisor",…},…]
// title: "Auxledger"