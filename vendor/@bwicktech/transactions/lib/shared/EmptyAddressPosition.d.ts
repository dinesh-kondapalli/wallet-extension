import { Asset } from 'defi-sdk';
import { Chain } from './Chain';
export declare class EmptyAddressPosition {
    asset: Asset;
    quantity: string;
    chain: string;
    id: string;
    constructor({ asset, chain }: {
        asset: Asset;
        chain: Chain;
    });
}
