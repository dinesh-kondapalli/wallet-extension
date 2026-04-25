import { isTruthy } from 'is-truthy-ts';
import type { BareWallet } from 'src/shared/types/BareWallet';
import type { DeviceAccount } from 'src/shared/types/Device';
import type { ExternallyOwnedAccount } from 'src/shared/types/ExternallyOwnedAccount';
import { isEthereumAddress } from 'src/shared/isEthereumAddress';
import { isSolanaAddress } from 'src/modules/solana/shared';
import type { NetworkConfig } from 'src/modules/networks/NetworkConfig';
import { isReadonlyAccount } from 'src/shared/types/validators';
import {
  DEFAULT_WALLET_LIST_GROUP_ID,
  DEFAULT_WALLET_LIST_GROUPS,
  getWalletId,
  WATCHLIST_WALLET_LIST_GROUP_ID,
  type WalletListGroup,
} from 'src/shared/wallet/wallet-list';
import { deriveCosmosAddress } from 'src/modules/cosmos/shared';

function isUsablePrivateKey(value: string) {
  return /^0x[0-9a-fA-F]{64}$/.test(value);
}

export type AnyWallet = ExternallyOwnedAccount | BareWallet | DeviceAccount;

export interface WalletGroupInfo {
  id: string;
  walletContainer: {
    wallets: AnyWallet[];
  };
}

export interface DisplayWallet extends ExternallyOwnedAccount {
  sourceAddress: string;
}

export function toCosmosWallets({
  wallets,
  network,
}: {
  wallets: AnyWallet[];
  network: NetworkConfig;
}): DisplayWallet[] {
  const prefix = network.specification.cosmos?.bech32_prefix;
  if (!prefix) {
    return [];
  }
  return wallets.flatMap((wallet) => {
    if (
      'privateKey' in wallet &&
      isEthereumAddress(wallet.address) &&
      isUsablePrivateKey(wallet.privateKey)
    ) {
      return [
        {
          address: deriveCosmosAddress({
            privateKey: wallet.privateKey,
            prefix,
          }),
          name: wallet.name,
          sourceAddress: wallet.address,
        },
      ];
    }
    return [];
  });
}

export function normalizeWalletForDisplay({
  wallet,
  selectedChain,
  selectedNetwork,
  allWallets,
}: {
  wallet: AnyWallet;
  selectedChain: string | null;
  selectedNetwork: NetworkConfig | null;
  allWallets: AnyWallet[];
}): DisplayWallet {
  if (
    selectedNetwork?.standard === 'cosmos' &&
    isEthereumAddress(wallet.address) &&
    'privateKey' in wallet &&
    isUsablePrivateKey(wallet.privateKey)
  ) {
    const prefix = selectedNetwork.specification.cosmos?.bech32_prefix;
    if (prefix) {
      return {
        address: deriveCosmosAddress({
          privateKey: wallet.privateKey,
          prefix,
        }),
        name: wallet.name,
        sourceAddress: wallet.address,
      };
    }
  }
  if (selectedChain === 'solana' && isEthereumAddress(wallet.address)) {
    const solWallet = allWallets.find((item) => isSolanaAddress(item.address));
    if (solWallet) {
      return {
        address: solWallet.address,
        name: solWallet.name,
        sourceAddress: wallet.address,
      };
    }
  }
  return {
    address: wallet.address,
    name: wallet.name,
    sourceAddress: wallet.address,
  };
}

export function isWalletMatchForSelection({
  wallet,
  selectedAddress,
  selectedChain,
  selectedNetwork,
  allWallets,
}: {
  wallet: AnyWallet;
  selectedAddress: string;
  selectedChain: string | null;
  selectedNetwork: NetworkConfig | null;
  allWallets: AnyWallet[];
}) {
  const displayWallet = normalizeWalletForDisplay({
    wallet,
    selectedChain,
    selectedNetwork,
    allWallets,
  });
  if (displayWallet.address === selectedAddress) {
    return true;
  }
  if (wallet.address === selectedAddress) {
    return true;
  }
  if (selectedNetwork?.standard === 'cosmos') {
    const cosmosWallets = toCosmosWallets({
      wallets: [wallet],
      network: selectedNetwork,
    });
    return cosmosWallets.some((item) => item.address === selectedAddress);
  }
  return false;
}

/**
 * @description
 * Populate saved walletsOrder with all existing wallets.
 * Connected wallets that are not in the saved order will be added to the default group.
 * Readonly wallets that are not in the saved order will be added to the watchlist group.
 * Also filter wallets by predicate if provided.
 */
export function getFullWalletList({
  walletsOrder = DEFAULT_WALLET_LIST_GROUPS,
  walletGroups,
  predicate,
  filterEmptyGroups = true,
}: {
  walletsOrder?: WalletListGroup[];
  walletGroups: WalletGroupInfo[];
  predicate?: (item: AnyWallet) => boolean;
  filterEmptyGroups?: boolean;
}): WalletListGroup[] {
  const filteredWalletIds = new Set<string>();
  for (const group of walletGroups) {
    for (const wallet of group.walletContainer.wallets) {
      if (predicate && !predicate(wallet)) {
        continue;
      }
      filteredWalletIds.add(
        getWalletId({
          address: wallet.address,
          groupId: group.id,
        })
      );
    }
  }
  const usedWalletIds = new Set<string>();
  const result: WalletListGroup[] = walletsOrder.map((group) => ({
    id: group.id,
    title: group.title,
    walletIds: group.walletIds
      .map((walletId) => {
        if (walletId && filteredWalletIds.has(walletId)) {
          usedWalletIds.add(walletId);
          return walletId;
        }
        return null;
      })
      .filter(isTruthy),
  }));

  for (const group of walletGroups) {
    for (const wallet of group.walletContainer.wallets) {
      if (predicate && !predicate(wallet)) {
        continue;
      }
      const walletId = getWalletId({
        address: wallet.address,
        groupId: group.id,
      });
      if (usedWalletIds.has(walletId)) {
        continue;
      }
      const isReadonly = isReadonlyAccount(wallet);
      const targetWalletGroup = isReadonly
        ? WATCHLIST_WALLET_LIST_GROUP_ID
        : DEFAULT_WALLET_LIST_GROUP_ID;
      const targetGroup = result.find((g) => g.id === targetWalletGroup);
      if (!targetGroup) {
        throw new Error(
          `Wallet group with id "${targetWalletGroup}" not found in result. Cannot add wallet with id "${walletId}".`
        );
      }
      targetGroup.walletIds.push(walletId);
    }
  }

  return filterEmptyGroups
    ? result.filter((group) => group.walletIds.length > 0)
    : result;
}
