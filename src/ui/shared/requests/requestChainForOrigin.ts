import { createChain } from 'src/modules/networks/Chain';
import type { NetworkBlockchainType } from 'src/shared/wallet/classifiers';
import { walletPort } from 'src/ui/shared/channels';

export function requestChainForOrigin(
  tabOrigin: string,
  standard: NetworkBlockchainType
) {
  return walletPort
    .request('requestChainForOrigin', { origin: tabOrigin, standard })
    .then((chain) => createChain(chain));
}
