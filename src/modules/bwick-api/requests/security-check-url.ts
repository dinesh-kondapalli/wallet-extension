import type { ClientOptions } from '../shared';
import { BwickHttpClient } from '../shared';
import type { BwickApiContext } from '../bwick-api-bare';

interface Params {
  url: string;
}

interface Response {
  data: {
    maliciousScore: number;
    flags: {
      isMalicious: boolean;
    };
  } | null;
  errors?: { title: string; detail: string }[];
}

export function securityCheckUrl(
  this: BwickApiContext,
  payload: Params,
  options?: ClientOptions
) {
  const params = new URLSearchParams({ url: payload.url });
  const kyOptions = this.getKyOptions();
  const endpoint = `security/check-url/v1?${params}`;
  return BwickHttpClient.get<Response>({ endpoint, ...options }, kyOptions);
}
