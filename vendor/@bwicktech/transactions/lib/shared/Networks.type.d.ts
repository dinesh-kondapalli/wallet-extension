import { Asset } from 'defi-sdk';
import { Chain } from './Chain';
type NetworkSpecification = {
    standard: 'eip155';
    specification: {
        eip155: null | {
            eip1559: boolean;
            id: number;
        };
    };
};
interface NetworkAsset {
    id: string;
    address: null | string;
    name: string;
    symbol: string;
    decimals: number;
}
export type NetworkConfig = NetworkSpecification & {
    id: string;
    is_testnet?: boolean;
    name: string;
    icon_url: string;
    explorer_token_url: string | null;
    explorer_tx_url: string | null;
    explorer_address_url: string | null;
    explorer_home_url: string | null;
    explorer_name: string | null;
    explorer_urls: string[] | null;
    rpc_url_internal: string | null;
    rpc_url_public: string[] | null;
    supports_trading: boolean;
    supports_sending: boolean;
    supports_bridging: boolean;
    supports_actions: boolean;
    supports_nft_positions: boolean;
    supports_positions: boolean;
    supports_sponsored_transactions: boolean;
    native_asset: NetworkAsset | null;
    wrapped_native_asset: NetworkAsset | null;
    /**
     * Client-side value.
     * Whether to display this network among select options
     */
    hidden?: boolean;
    /**
     * Client-side value.
     * User-defined rpc url that has priority over rpc_url_internal
     */
    rpc_url_user?: string;
};
type SupportsFlags = Exclude<keyof {
    [K in keyof NetworkConfig as K extends `supports_${infer S}` ? S : never]: NetworkConfig[K];
}, 'bridge'>;
export interface Networks {
    getNetworks(): NetworkConfig[];
    getChainId(chain: Chain): string | null;
    getNativeAssetIdsForTrading(): string[];
    getChainName(chain: Chain): string;
    getNetworkById(chainId: string): NetworkConfig;
    hasNetworkById(chainId: string): boolean;
    getNetworkByName(chain: Chain): NetworkConfig | undefined;
    getChainById(chainId: string): Chain;
    getChainNameById(chainId: string): string;
    getExplorerHomeUrlByName(chain: Chain): string | null | undefined;
    getExplorerTxUrlById(chainId: string, hash: string): string | undefined;
    getExplorerTxUrlByName(chain: Chain, hash: string): string | undefined;
    getExplorerAddressUrlByName(chain: Chain, address: string): string | undefined;
    getExplorerTokenUrlByName(chain: Chain, address: string): string | undefined;
    getExplorerNameByChainName(chain: Chain): string | null | undefined;
    supports(purpose: SupportsFlags, chain: Chain): boolean;
    isNativeAsset(asset: Asset, chainId: string): boolean;
    isNativeAddress(address: string | null, chainId: string): boolean;
    getRpcUrlInternal(chain: Chain): string;
    getRpcUrlPublic(chain: Chain): string;
}
export {};
