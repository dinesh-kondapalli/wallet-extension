import { isSolanaAddress } from 'src/modules/solana/shared';
import { isCosmosAddress } from 'src/modules/cosmos/shared';
import { invariant } from '../invariant';
import { isEthereumAddress } from '../isEthereumAddress';
import { type NetworkBlockchainType } from './classifiers';

const supportedTypes = new Set<NetworkBlockchainType>([
  'evm',
  'solana',
  'cosmos',
]);

function isSubsetOf<T>(a: Set<T>, b: unknown[]): b is T[] {
  return b.every((item) => a.has(item as T));
}

export function assertKnownEcosystems(
  values: string[]
): asserts values is NetworkBlockchainType[] {
  invariant(
    isSubsetOf(supportedTypes, values),
    `Invalid ecosystem values: ${values}`
  );
}

export function isMatchForEcosystem(
  address: string,
  ecosystem: NetworkBlockchainType
) {
  if (ecosystem === 'evm') {
    return isEthereumAddress(address);
  } else if (ecosystem === 'solana') {
    return isSolanaAddress(address);
  } else if (ecosystem === 'cosmos') {
    return isCosmosAddress(address);
  } else {
    throw new Error(`Unsupported ecosystem param: ${ecosystem}`);
  }
}
