import type { Client } from 'defi-sdk';
import { getBundledBwickNetworkConfig } from '../ethereum/chains/bundledChainConfigs';
import type { NetworkConfig } from './NetworkConfig';

export function getNetworks({
  ids,
  client: _client,
  include_testnets: _include_testnets,
  supported_only: _supported_only = false,
}: {
  ids: string[] | null;
  client: Client;
  include_testnets: boolean;
  supported_only: boolean;
}): Promise<NetworkConfig[]> {
  const bwick = getBundledBwickNetworkConfig();
  return Promise.resolve(
    ids?.length
      ? [bwick].filter((network) => ids.includes(network.id))
      : [bwick]
  );
}

export async function getNetworkByChainId(chainId: string, _client: Client) {
  const bwick = getBundledBwickNetworkConfig();
  const normalizedChainId = chainId.toLowerCase();
  if (
    bwick.specification.cosmos?.chain_id === normalizedChainId ||
    bwick.id === normalizedChainId ||
    normalizedChainId.includes('bwick')
  ) {
    return bwick;
  }
  return null;
}
