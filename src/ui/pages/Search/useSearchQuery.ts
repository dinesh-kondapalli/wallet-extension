import { useQuery } from '@tanstack/react-query';
import { BwickAPI } from 'src/modules/bwick-api/bwick-api.client';
import type { Response } from 'src/modules/bwick-api/requests/search-query';

export function useSearchQuery({
  query,
  currency,
  limit = 5,
}: {
  query: string;
  currency: string;
  limit?: number;
}) {
  return useQuery<Response | null>({
    queryKey: ['searchQuery', query, currency, limit],
    queryFn: () => {
      return BwickAPI.searchQuery({
        query,
        currency,
        limit,
      });
    },
    enabled: query.trim().length > 0,
    staleTime: 30000,
    suspense: false,
  });
}
