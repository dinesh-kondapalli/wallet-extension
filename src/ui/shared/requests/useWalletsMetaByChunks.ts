import { useQuery } from '@tanstack/react-query';
import { BwickAPI } from 'src/modules/bwick-api/bwick-api.client';
import { normalizeAddress } from 'src/shared/normalizeAddress';
import { queryClient } from './queryClient';

export function useWalletsMetaByChunks({
  addresses,
  enabled = true,
  suspense = true,
  useErrorBoundary = true,
  staleTime,
}: {
  addresses: string[];
  enabled?: boolean;
  suspense?: boolean;
  useErrorBoundary?: boolean;
  staleTime?: number;
}) {
  return useQuery({
    enabled: enabled && addresses.length > 0,
    queryKey: ['BwickAPI.getWalletsMetaByChunks', addresses],
    queryFn: async () => {
      const result = await BwickAPI.getWalletsMetaByChunks(addresses);
      if (result.length > 1) {
        result.forEach((walletMeta) => {
          const normalizedAddress = normalizeAddress(walletMeta.address);
          queryClient.setQueryData(
            ['BwickAPI.getWalletsMetaByChunks', [normalizedAddress]],
            [walletMeta]
          );
        });
      }
      return result;
    },
    suspense,
    useErrorBoundary,
    staleTime,
  });
}
