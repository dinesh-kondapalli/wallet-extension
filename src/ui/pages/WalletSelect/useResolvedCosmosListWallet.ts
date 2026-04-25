import { useQuery } from '@tanstack/react-query';
import { isEthereumAddress } from 'src/shared/isEthereumAddress';
import { walletPort } from 'src/ui/shared/channels';
import type { NetworkConfig } from 'src/modules/networks/NetworkConfig';
import type { DisplayWallet } from './shared';

/**
 * UI wallet groups never include private keys, so {@link normalizeWalletForDisplay}
 * cannot derive Cosmos bech32 locally. Resolve the same address as the overview
 * header via the background signer.
 */
export function useResolvedCosmosListWallet(
  wallet: DisplayWallet,
  selectedNetwork: NetworkConfig | null
): { displayWallet: DisplayWallet; balanceAndConnectionAddress: string } {
  const selectedChainId = selectedNetwork?.id ?? null;
  const evmSigner = isEthereumAddress(wallet.sourceAddress)
    ? wallet.sourceAddress
    : isEthereumAddress(wallet.address)
    ? wallet.address
    : null;

  const balanceAndConnectionAddress = evmSigner || wallet.address;

  const { data: cosmosAddress } = useQuery({
    queryKey: [
      'wallet/getAddressForChain',
      evmSigner,
      selectedChainId,
    ] as const,
    queryFn: () =>
      walletPort.request('getAddressForChain', {
        address: evmSigner as string,
        chain: selectedChainId as string,
      }),
    enabled: Boolean(
      selectedNetwork?.standard === 'cosmos' && selectedChainId && evmSigner
    ),
    staleTime: 60_000,
  });

  if (cosmosAddress && typeof cosmosAddress === 'string') {
    return {
      displayWallet: { ...wallet, address: cosmosAddress },
      balanceAndConnectionAddress,
    };
  }
  return { displayWallet: wallet, balanceAndConnectionAddress };
}
