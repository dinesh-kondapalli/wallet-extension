import { AddressPosition } from 'defi-sdk';
export declare function getPositionValue(position: AddressPosition): number;
export declare function getChainWithMostAssetValue(positions: AddressPosition[], asset_code?: string): string | undefined;
export declare function sortPositionsByValue(positions?: AddressPosition[] | null): AddressPosition[];
