import type { ClientOptions } from '../shared';
import { BwickHttpClient } from '../shared';
import type { BwickApiContext } from '../bwick-api-bare';

interface Params {
  addresses: string[];
  chain: string;
}

interface Response {
  data: null;
  errors?: { title: string; detail: string }[];
}

export function registerChain(
  this: BwickApiContext,
  payload: Params,
  options?: ClientOptions
) {
  const { chain, addresses } = payload;
  const kyOptions = this.getKyOptions();
  return BwickHttpClient.post<Response>(
    {
      endpoint: 'wallet/connect-chain/v1',
      body: JSON.stringify({ chain, addresses }),
      ...options,
    },
    kyOptions
  );
}
