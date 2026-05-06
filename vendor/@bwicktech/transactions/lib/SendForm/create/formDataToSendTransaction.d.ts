import { Asset, NFT } from 'defi-sdk';
import { Networks } from '../../shared/Networks.type';
import { Transaction } from '../types';
export interface Result<T extends 'token' | 'nft'> {
    asset: T extends 'token' ? Asset : NFT;
    amount: string;
    receiver: string;
    transaction: Transaction;
}
export declare function formDataToSendTransaction({ chainName, amount: value, asset, from, to, networks, }: {
    chainName: string;
    amount: string;
    from: string;
    to: string;
    asset: Asset;
    networks: Networks;
}): Result<'token'>;
export declare function formDataToSendNFTTransaction({ chainName, nftAmount: amount, nftItem, from, to, networks, }: {
    chainName: string;
    nftAmount: string;
    nftItem: NFT;
    from: string;
    to: string;
    networks: Networks;
}): Result<'nft'>;
