import type { ClientOptions } from '../shared';
import { CLIENT_DEFAULTS, BwickHttpClient } from '../shared';
import type { BwickApiContext } from '../bwick-api-bare';
import type { ResponseBody } from './ResponseBody';

export interface Params {
  fungibleId: string;
  addresses: string[];
  currency: string;
}

export interface AssetAddressPnl {
  realizedPnl: number;
  unrealizedPnl: number;
  totalPnl: number;
  relativeRealizedPnl: number;
  relativeUnrealizedPnl: number;
  relativeTotalPnl: number;
  averageBuyPrice: number;
  bought: number;
}

type Response = ResponseBody<AssetAddressPnl | null>;

export async function assetGetFungiblePnl(
  this: BwickApiContext,
  params: Params,
  options: ClientOptions = CLIENT_DEFAULTS
) {
  const firstAddress = params.addresses[0];
  const provider = await this.getAddressProviderHeader(firstAddress);
  const kyOptions = this.getKyOptions();
  return BwickHttpClient.post<Response>(
    {
      endpoint: 'asset/get-fungible-pnl/v1',
      body: JSON.stringify(params),
      headers: { 'Bwick-Wallet-Provider': provider },
      ...options,
    },
    kyOptions
  );
}
