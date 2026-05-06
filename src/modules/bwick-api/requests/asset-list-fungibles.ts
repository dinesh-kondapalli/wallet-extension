import type { ClientOptions } from '../shared';
import { BwickHttpClient } from '../shared';
import type { Fungible } from '../types/Fungible';
import type { FungibleAssetsSortedBy } from '../types/FungibleAssetsSortedBy';
import type { BwickApiContext } from '../bwick-api-bare';

export interface Params {
  fungibleIds?: string[];
  currency?: string;
  sort?: FungibleAssetsSortedBy;
}

export interface Response {
  data: Fungible[];
  errors?: { title: string; detail: string }[];
}

export function assetListFungibles(
  this: BwickApiContext,
  params: Params,
  options?: ClientOptions
) {
  const endpoint = 'asset/list-fungibles/v1';
  const kyOptions = this.getKyOptions();
  return BwickHttpClient.post<Response>(
    { endpoint, body: JSON.stringify(params), ...options },
    kyOptions
  );
}
