import { useQuery } from '@tanstack/react-query';
import { type Params } from '../requests/asset-get-fungible-full-info';
import type { AssetFullInfo } from '../requests/asset-get-fungible-full-info';
import type { ResponseBody } from '../requests/ResponseBody';
import type { BackendSourceParams } from '../shared';

export function useAssetFullInfo(
  params: Params,
  { source }: BackendSourceParams,
  {
    suspense = false,
    enabled = true,
  }: { suspense?: boolean; enabled?: boolean } = {}
) {
  return useQuery({
    queryKey: ['assetGetFungibleFullInfo', params, source],
    queryFn: async () =>
      ({
        data: null as unknown as AssetFullInfo,
      } as ResponseBody<AssetFullInfo>),
    suspense,
    enabled,
    staleTime: 20000,
    retry: 1,
  });
}
