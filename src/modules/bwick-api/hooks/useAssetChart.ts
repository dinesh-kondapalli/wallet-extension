import { useQuery } from '@tanstack/react-query';
import { BwickAPI } from 'src/modules/bwick-api/bwick-api.client';
import { type Params } from '../requests/asset-get-chart';

export function useAssetChart(params: Params) {
  return useQuery({
    queryKey: ['assetGetChart', params],
    queryFn: () => BwickAPI.assetGetChart(params),
    suspense: false,
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
}
