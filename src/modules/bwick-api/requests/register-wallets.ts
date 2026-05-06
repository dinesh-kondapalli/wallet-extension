import type { ClientOptions } from '../shared';
import { BwickHttpClient } from '../shared';
import type { BwickApiContext } from '../bwick-api-bare';

interface Params {
  addresses: string[];
}

interface Response {
  data: null;
  errors?: { title: string; detail: string }[];
}

export function registerAddresses(
  this: BwickApiContext,
  payload: Params,
  options?: ClientOptions
) {
  const kyOptions = this.getKyOptions();
  return BwickHttpClient.post<Response>(
    {
      endpoint: 'wallet/import/v1',
      body: JSON.stringify({ addresses: payload.addresses }),
      ...options,
    },
    kyOptions
  );
}
