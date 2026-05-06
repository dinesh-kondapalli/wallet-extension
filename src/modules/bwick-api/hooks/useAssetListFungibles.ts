import { useQuery } from '@tanstack/react-query';
import { BwickAPI } from 'src/modules/bwick-api/bwick-api.client';
import { type Params } from '../requests/asset-list-fungibles';

export function useAssetListFungibles(
  params: Params,
  { suspense = false }: { suspense?: boolean } = {}
) {
  return useQuery({
    queryKey: ['assetListFungibles', params],
    queryFn: () => BwickAPI.assetListFungibles(params),
    suspense,
    staleTime: 20000,
  });
}
