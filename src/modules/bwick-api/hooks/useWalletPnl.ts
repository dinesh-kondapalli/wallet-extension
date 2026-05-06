import { useQuery } from '@tanstack/react-query';
import { persistentQuery } from 'src/ui/shared/requests/queryClientPersistence';
import { queryClient } from 'src/ui/shared/requests/queryClient';
import type { Params, WalletPnL } from '../requests/wallet-get-pnl';
import type { ResponseBody } from '../requests/ResponseBody';
import type { BackendSourceParams } from '../shared';

const EMPTY_WALLET_PNL: WalletPnL = {
  totalPnl: 0,
  realizedPnl: 0,
  unrealizedPnl: 0,
  relativeTotalPnl: 0,
  relativeRealizedPnl: 0,
  relativeUnrealizedPnl: 0,
};

const STALE_TIME = 20000;
const QUERY_KEY = 'walletGetPnl';

export function queryWalletPnl(
  params: Params,
  clientParams: BackendSourceParams
) {
  return queryClient.fetchQuery({
    queryKey: persistentQuery([QUERY_KEY, params, clientParams]),
    queryFn: async () =>
      ({ data: EMPTY_WALLET_PNL } as ResponseBody<WalletPnL>),
    staleTime: STALE_TIME,
  });
}

export function useWalletPnl(
  params: Params,
  { source }: BackendSourceParams,
  {
    suspense = false,
    enabled = true,
    keepPreviousData = false,
    refetchInterval,
    refetchOnWindowFocus = true,
  }: {
    suspense?: boolean;
    enabled?: boolean;
    keepPreviousData?: boolean;
    refetchInterval?: number;
    refetchOnWindowFocus?: boolean;
  } = {}
) {
  return useQuery({
    queryKey: persistentQuery([QUERY_KEY, params, { source }]),
    queryFn: async () =>
      ({ data: EMPTY_WALLET_PNL } as ResponseBody<WalletPnL>),
    retry: 0, // if not 0, there are too many rerenders if the queryFn throws synchronously
    suspense,
    enabled,
    keepPreviousData,
    staleTime: STALE_TIME,
    refetchInterval,
    refetchOnWindowFocus,
  });
}
