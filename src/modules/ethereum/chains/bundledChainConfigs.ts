import { INTERNAL_ORIGIN } from 'src/background/constants';
import type { AddEthereumChainParameter } from 'src/modules/ethereum/types/AddEthereumChainParameter';
import { toNetworkConfig } from 'src/modules/networks/helpers';
import type { NetworkConfig } from 'src/modules/networks/NetworkConfig';
import { toCustomNetworkIdFromConfig } from './helpers';
import type { EthereumChainConfig } from './types';

/**
 * Pre-installed custom networks (merged into chain config store when missing).
 * Kept in sync with the in-app "Add network" flow for the BWICK Cosmos chain.
 */
export const BWICK_COSMOS: AddEthereumChainParameter = {
  standard: 'cosmos',
  chainId: 'bwick-1',
  chainName: 'BWICK',
  bech32Prefix: 'bwick',
  nativeCurrency: {
    name: 'BWICK',
    symbol: 'BWICK',
    decimals: 6,
  },
  rpcUrls: ['http://174.138.87.223:1317'],
  is_testnet: false,
};

function toBundledEntry(value: AddEthereumChainParameter): EthereumChainConfig {
  const t = Date.now();
  return {
    id: toCustomNetworkIdFromConfig({
      standard: value.standard || 'eip155',
      chainId: value.chainId,
    }),
    origin: INTERNAL_ORIGIN,
    created: t,
    updated: t,
    previousIds: null,
    value,
  };
}

const bundled: EthereumChainConfig[] = [toBundledEntry(BWICK_COSMOS)];

const BWICK_NETWORK_ID = toCustomNetworkIdFromConfig({
  standard: 'cosmos',
  chainId: BWICK_COSMOS.chainId,
});

/**
 * Same BWICK config as the persisted chain entry, for UI that loads before
 * the networks store finishes its first fetch.
 */
export function getBundledBwickNetworkConfig(): NetworkConfig {
  return toNetworkConfig(BWICK_COSMOS, BWICK_NETWORK_ID);
}

export function getBundledChainConfigsMissingFrom(
  existing: EthereumChainConfig[]
): EthereumChainConfig[] {
  const existingIds = new Set(existing.map((c) => c.id));
  return bundled.filter((c) => !existingIds.has(c.id));
}
