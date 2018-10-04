// TODO: Extend and improve while adding or working with class definition
export declare class Web3Interface {
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
    constructor(args?: any)
}