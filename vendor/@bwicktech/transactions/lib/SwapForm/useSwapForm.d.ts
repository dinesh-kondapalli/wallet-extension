import { AddressPosition, Asset, Client } from 'defi-sdk';
import { Store } from 'store-unit';
import { EmptyAddressPosition } from '../shared/EmptyAddressPosition';
import { CustomConfiguration } from '../shared/user-configuration/types';
import { Chain } from '../shared/Chain';
export type FormType = 'buy' | 'sell' | 'exchange';
interface SwapFormStateInternal {
    chainInput: string;
    /** @deprecated */
    formTypeInput: FormType;
    primaryInput: 'spend' | 'receive';
    spendInput: string;
    receiveInput: string;
    spendTokenInput: string;
    receiveTokenInput: string;
    gas: string;
}
export type SwapFormState = Partial<SwapFormStateInternal>;
export declare class SwapFormStore extends Store<SwapFormState> {
    static defaultState: {
        formTypeInput: string;
    };
    private defaults;
    userValues: Store<SwapFormState>;
    configuration: Store<CustomConfiguration>;
    constructor({ defaultState, userState, DEFAULT_CONFIGURATION, }: {
        defaultState: SwapFormState;
        userState: SwapFormState;
        DEFAULT_CONFIGURATION: CustomConfiguration;
    });
    private internalSetState;
    setDefault<K extends keyof SwapFormState, T extends SwapFormState[K]>(key: K, value: T): void;
    setDefaults(state: SwapFormState): void;
    handleChange: <K extends keyof SwapFormStateInternal>(key: K, value?: SwapFormStateInternal[K]) => void;
    handleAmountChange: (type: 'spend' | 'receive', value?: string) => void;
    handleTokenChange(name: 'spendTokenInput' | 'receiveTokenInput', value: string): void;
    reverseTokens: () => void;
    handleFormTypeChange: (type: FormType) => void;
    setState(): void;
}
export interface SwapFormView {
    store: SwapFormStore;
    handleChange: InstanceType<typeof SwapFormStore>['handleChange'];
    spendAsset: Asset | null;
    spendAssetQuery: {
        data: Asset | null;
        isLoading: boolean;
    };
    receiveAsset: Asset | null;
    receiveAssetQuery: {
        data: Asset | null;
        isLoading: boolean;
    };
    spendPosition: AddressPosition | EmptyAddressPosition | null;
    receivePosition: AddressPosition | EmptyAddressPosition | null;
    availablePositions: AddressPosition[];
}
export declare function useSwapForm({ asset_code, positions, getNativeAssetId, currency, client, supportedChains, DEFAULT_CONFIGURATION, getPopularTokens, }: {
    asset_code: string | null;
    positions: AddressPosition[] | null;
    getNativeAssetId: (chain: Chain) => Promise<string | null>;
    currency: string;
    client: Client;
    supportedChains: Chain[];
    DEFAULT_CONFIGURATION: CustomConfiguration;
    getPopularTokens: (chain: Chain) => Promise<string[]>;
}): SwapFormView;
export {};
