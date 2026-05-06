import { BwickHttpClient } from '../shared';
import type { BwickApiContext } from '../bwick-api-bare';

interface Params {
  referralCode: string;
}

export interface ReferrerData {
  referralCode: string;
  address: string | null;
  handle: string | null;
}

interface Response {
  data: ReferrerData;
  errors?: { title: string; detail: string }[];
}

export function checkReferral(this: BwickApiContext, payload: Params) {
  const params = new URLSearchParams({ referralCode: payload.referralCode });
  const kyOptions = this.getKyOptions();
  const endpoint = `wallet/check-referral/v1?${params}`;
  return BwickHttpClient.get<Response>({ endpoint }, kyOptions);
}
