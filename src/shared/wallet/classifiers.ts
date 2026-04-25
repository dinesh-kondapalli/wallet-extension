import { isSolanaAddress } from 'src/modules/solana/shared';
import { isCosmosAddress } from 'src/modules/cosmos/shared';
import { isEthereumAddress } from '../isEthereumAddress';

export const BLOCKCHAIN_TYPES = ['evm', 'solana'] as const;
export type BlockchainType = (typeof BLOCKCHAIN_TYPES)[number];
export type NetworkBlockchainType = BlockchainType | 'cosmos';

export function getAddressType(address: string): NetworkBlockchainType {
  if (isEthereumAddress(address)) {
    return 'evm';
  } else if (isSolanaAddress(address)) {
    return 'solana';
  } else if (isCosmosAddress(address)) {
    return 'cosmos';
  } else {
    throw new Error(`Unexpected address type: ${address}`);
  }
}
