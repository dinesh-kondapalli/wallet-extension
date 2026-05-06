import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { persistentQuery } from 'src/ui/shared/requests/queryClientPersistence';
import { queryClient } from 'src/ui/shared/requests/queryClient';
import { fetchHyperliquidBalance } from 'src/modules/hyperliquid/fetchHyperliquidBalance';
import { getAddressType } from 'src/shared/wallet/classifiers';
import type { Params, WalletPortfolio } from '../requests/wallet-get-portfolio';
import type { ResponseBody } from '../requests/ResponseBody';
import type { BackendSourceParams } from '../shared';

const EMPTY_WALLET_PORTFOLIO: WalletPortfolio = {
  totalValue: 0,
  change24h: { relative: 0, absolute: 0 },
  chains: {},
  nfts: { lastPrice: 0, floorPrice: 0 },
  positionsChainsDistribution: {},
  positionsTypesDistribution: {
    assets: 0,
    deposited: 0,
    borrowed: 0,
    locked: 0,
    staked: 0,
  },
};

const STALE_TIME = 20000;
const QUERY_KEY = 'walletGetPortfolio';

export function queryWalletPortfolio(
  params: Params,
  clientParams: BackendSourceParams
) {
  return queryClient.fetchQuery({
    queryKey: persistentQuery([QUERY_KEY, params, clientParams]),
    queryFn: async () =>
      ({ data: EMPTY_WALLET_PORTFOLIO } as ResponseBody<WalletPortfolio>),
    staleTime: STALE_TIME,
  });
}

export function useWalletPortfolio(
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
  const portfolioQuery = useQuery({
    queryKey: persistentQuery([QUERY_KEY, params, source]),
    queryFn: async () =>
      ({ data: EMPTY_WALLET_PORTFOLIO } as ResponseBody<WalletPortfolio>),
    retry: 0, // if not 0, there are too many rerenders if the queryFn throws synchronously
    suspense,
    enabled,
    keepPreviousData,
    staleTime: STALE_TIME,
    refetchInterval,
    refetchOnWindowFocus,
  });

  const address = params.addresses[0] ?? '';
  const isEvmAddress = address && getAddressType(address) === 'evm';
  const hyperliquidQuery = useQuery({
    queryKey: ['hyperliquidBalance', address],
    queryFn: () => fetchHyperliquidBalance(address),
    retry: 0,
    suspense,
    enabled: Boolean(enabled && isEvmAddress),
    keepPreviousData,
    staleTime: STALE_TIME,
    refetchInterval,
    refetchOnWindowFocus,
  });

  const hyperliquidBalance = hyperliquidQuery.data ?? null;

  const data = useMemo(() => {
    const portfolioData = portfolioQuery.data;
    if (!portfolioData || hyperliquidBalance == null) {
      return portfolioData;
    }
    return {
      ...portfolioData,
      data: {
        ...portfolioData.data,
        totalValue: portfolioData.data.totalValue + hyperliquidBalance,
      },
    };
  }, [portfolioQuery.data, hyperliquidBalance]);

  return {
    ...portfolioQuery,
    data,
    hyperliquidBalance,
  };
}
