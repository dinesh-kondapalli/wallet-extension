import { AddressNFT, AddressPosition, Asset, Client, NFT } from 'defi-sdk';
import { Store } from 'store-unit';
import { CustomConfiguration } from '../shared/user-configuration/types';
import { Networks } from '../shared/Networks.type';
import { EmptyAddressPosition } from '../shared/EmptyAddressPosition';
import { FormType } from './types';
interface SendFormStateInternal {
    from: string | null;
    type: FormType;
    addressInputValue: string | null;
    tokenChain: string;
    nftFilterChain: string;
    to: string | null;
    nftAmount: string;
    tokenValue: string;
    tokenGas: string | null;
    nftGas: string | null;
    nftId: string;
    nftContractAddress: string;
    nftChain: string;
    tokenAssetCode: string;
}
export type SendFormState = Partial<SendFormStateInternal>;
export declare class SendFormStore extends Store<SendFormState> {
    static defaultState: {
        type: "token";
        nftAmount: string;
    };
    private defaults;
    userValues: Store<SendFormState>;
    configuration: Store<CustomConfiguration>;
    private getNetworks;
    constructor(defaultState: SendFormState, userState: SendFormState, { getNetworks, DEFAULT_CONFIGURATION, }: {
        getNetworks: () => Promise<Networks>;
        DEFAULT_CONFIGURATION: CustomConfiguration;
    });
    private internalSetState;
    setDefault<K extends keyof SendFormState, T extends SendFormState[K]>(key: K, value: T): void;
    handleChange: <K extends keyof SendFormStateInternal>(key: K, value?: SendFormStateInternal[K]) => void;
    setState(): void;
    createSendTransaction({ from, to, tokenValue, asset, tokenChain, }: {
        from: string;
        to: string;
        tokenValue: string;
        tokenChain: string;
        asset: Asset;
    }): Promise<import('./create/formDataToSendTransaction').Result<"token">>;
    createSendNFTTransaction({ from, to, nftAmount, nftItem, nftChain, }: {
        from: string;
        to: string;
        nftChain: string;
        nftItem: NFT;
        nftAmount: string;
    }): Promise<import('./create/formDataToSendTransaction').Result<"nft">>;
}
export type FormPosition = AddressPosition | EmptyAddressPosition;
export interface SendFormView {
    store: SendFormStore;
    handleChange: InstanceType<typeof SendFormStore>['handleChange'];
    tokenItemQuery: {
        data: FormPosition | null;
        isLoading: boolean;
    };
    nftItemQuery: {
        data: AddressNFT | null;
        isLoading: boolean;
    };
    tokenItem: FormPosition | null;
    nftItem: AddressNFT | null;
    availablePositions: AddressPosition[] | null;
}
export declare function useSendForm({ address, positions, currencyCode, getNetworks, DEFAULT_CONFIGURATION, client, }: {
    address: string | null;
    positions?: AddressPosition[];
    currencyCode: string;
    getNetworks: () => Promise<Networks>;
    DEFAULT_CONFIGURATION: CustomConfiguration;
    client: Client;
}): SendFormView;
export {};
