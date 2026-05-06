import memoizeOne from 'memoize-one';
import { client as defiSdkClient, Client } from 'defi-sdk';
import {
  DEFI_SDK_API_URL,
  DEFI_SDK_API_TOKEN,
  BACKEND_ENV,
  DEFI_SDK_TESTNET_API_URL,
} from 'src/env/config';
import { version } from 'src/shared/packageVersion';
import { platform } from 'src/shared/analytics/platform';
import { BackgroundMemoryCache } from './BackgroundMemoryCache';
import { hooks } from './defi-sdk-config';

export const backgroundCache = new BackgroundMemoryCache();

export async function configureUIClient() {
  // This client instance uses background script's memory as cache
  return backgroundCache.load().then(() => {
    const url = DEFI_SDK_API_URL || 'wss://127.0.0.1:1';
    const apiToken = DEFI_SDK_API_TOKEN || 'disabled';
    defiSdkClient.configure({
      getCacheKey: ({ key }) => key,
      cache: backgroundCache,
      url,
      apiToken,
      hooks,
      ioOptions: {
        query: Object.assign(
          { platform, platform_version: version },
          BACKEND_ENV ? { backend_env: BACKEND_ENV } : undefined
        ),
      },
    });
  });
}

export const configureUITestClient = memoizeOne(() => {
  const url = DEFI_SDK_TESTNET_API_URL || 'wss://127.0.0.1:1';
  const apiToken = DEFI_SDK_API_TOKEN || 'disabled';
  const testClient = new Client({
    url,
    apiToken,
    hooks,
    ioOptions: {
      query: Object.assign(
        { platform, platform_version: version },
        BACKEND_ENV ? { backend_env: BACKEND_ENV } : undefined
      ),
    },
  });
  return testClient;
});
