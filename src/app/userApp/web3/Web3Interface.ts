export declare interface Web3Interface {
    eth: {
        accounts: {
            wallet: {
                clear(): any
                encrypt(...args): any
                create(...args): any
            }
            decrypt(...args): any
            sign(...args): any
            recover(...args): any
        }
    };
    utils: {
        isAddress(...args): any
    };
}