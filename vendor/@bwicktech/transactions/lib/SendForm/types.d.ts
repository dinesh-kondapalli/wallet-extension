import { AddressPosition } from 'defi-sdk';
export type FormType = 'token' | 'nft';
export type AddressPositionItem = Pick<AddressPosition, 'id' | 'asset' | 'quantity' | 'chain'>;
export interface Transaction {
    from: string;
    to: string;
    data: string;
    gas?: string;
    value?: string;
    nonce?: number;
    gasPrice?: string;
    chainId?: string;
    maxPriorityFeePerGas?: string;
    maxFeePerGas?: string;
}
