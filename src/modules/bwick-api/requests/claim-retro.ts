import { normalizeAddress } from 'src/shared/normalizeAddress';
import { BwickHttpClient } from '../shared';
import type { BwickApiContext } from '../bwick-api-bare';

interface Params {
  address: string;
  signature: string;
}

interface Response {
  data: null;
  errors?: { title: string; detail: string }[];
}

export function claimRetro(this: BwickApiContext, params: Params) {
  const kyOptions = this.getKyOptions();
  return BwickHttpClient.post<Response>(
    {
      endpoint: 'wallet/claim-retro/v1',
      body: JSON.stringify({
        address: normalizeAddress(params.address),
        signature: params.signature,
      }),
    },
    kyOptions
  );
}
