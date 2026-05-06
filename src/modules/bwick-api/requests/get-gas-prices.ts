import type { ChainGasPrice } from 'src/modules/ethereum/transactions/gasPrices/types';
import type { Chain } from 'src/modules/networks/Chain';
import type { ClientOptions } from '../shared';
import { BwickHttpClient } from '../shared';
import type { BwickApiContext } from '../bwick-api-bare';

interface Params {
  chain: Chain;
}

interface Response {
  data: ChainGasPrice;
  errors?: { title: string; detail: string }[];
}

export function getGasPrices(
  this: BwickApiContext,
  { chain }: Params,
  options?: ClientOptions
) {
  const params = new URLSearchParams({ chain: chain.toString() });
  const kyOptions = this.getKyOptions();
  const endpoint = `chain/get-gas-prices/v1?${params}`;
  return BwickHttpClient.get<Response>({ endpoint, ...options }, kyOptions);
}
