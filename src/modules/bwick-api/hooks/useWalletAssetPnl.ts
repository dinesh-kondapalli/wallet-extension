import { useQuery } from '@tanstack/react-query';
import type { Params } from '../requests/asset-get-fungible-pnl';
import { BwickAPI } from '../bwick-api.client';
import type { BackendSourceParams } from '../shared';

export function useWalletAssetPnl(
  params: Params,
  { source }: BackendSourceParams,
  {
    suspense = false,
    enabled = true,
  }: {
    suspense?: boolean;
    enabled?: boolean;
  } = {}
) {
  return useQuery({
    queryKey: ['assetGetFungiblePnl', params, source],
    queryFn: () => BwickAPI.assetGetFungiblePnl(params, { source }),
    suspense,
    enabled,
    staleTime: 20000,
  });
}
