import { Asset } from 'defi-sdk';
import { default as BigNumber } from 'bignumber.js';
import { Chain } from './Chain';
export declare function getAssetImplementationInChain({ asset, chain, }: {
    asset?: Asset;
    chain: Chain;
}): {
    address: string | null;
    decimals: number;
} | undefined;
export declare function getDecimals({ asset, chain }: {
    asset: Asset;
    chain: Chain;
}): number;
export declare function getAddress({ asset, chain, }: {
    asset?: Asset;
    chain: Chain;
}): string | null | undefined;
export declare function getCommonQuantity({ asset, chain, baseQuantity, }: {
    asset: Asset;
    chain: Chain;
    baseQuantity: BigNumber.Value;
}): BigNumber;
export declare function getBaseQuantity({ asset, chain, commonQuantity, }: {
    asset: Asset;
    chain: Chain;
    commonQuantity: BigNumber.Value;
}): BigNumber;
