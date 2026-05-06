import { NFT } from 'defi-sdk';
import { Transaction } from '../types';
export declare function createSendNFTTransaction({ from, to, nft, chainId, amount, }: {
    nft: NFT;
    from: string;
    to: string;
    amount?: string;
    chainId: string;
}): Transaction;
