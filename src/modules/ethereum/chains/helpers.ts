import { normalizeChainId } from 'src/shared/normalizeChainId';
import type { AddEthereumChainParameter } from '../types/AddEthereumChainParameter';

const CUSTOM_NETWORK_PREFIX = 'zerion-custom-network-';

export function toCustomNetworkId(chainId: string) {
  return `${CUSTOM_NETWORK_PREFIX}${normalizeChainId(chainId)}`;
}

export function toCustomNetworkIdFromConfig({
  standard,
  chainId,
}: Pick<AddEthereumChainParameter, 'standard' | 'chainId'>) {
  if (standard === 'cosmos') {
    return `${CUSTOM_NETWORK_PREFIX}cosmos-${chainId.toLowerCase()}`;
  }
  return toCustomNetworkId(chainId);
}

export function isCustomNetworkId(networkId: string) {
  return networkId.startsWith(CUSTOM_NETWORK_PREFIX);
}
