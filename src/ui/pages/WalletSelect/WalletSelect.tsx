import React, { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FillView } from 'src/ui/components/FillView';
import { PageColumn } from 'src/ui/components/PageColumn';
import { walletPort } from 'src/ui/shared/channels';
import { useAddressParams } from 'src/ui/shared/user-address/useAddressParams';
import { HStack } from 'src/ui/ui-kit/HStack';
import { UIText } from 'src/ui/ui-kit/UIText';
import { PageBottom } from 'src/ui/components/PageBottom';
import { setCurrentAddress } from 'src/ui/shared/requests/setCurrentAddress';
import { NavigationTitle } from 'src/ui/components/NavigationTitle';
import { UnstyledLink } from 'src/ui/ui-kit/UnstyledLink';
import AddIcon from 'jsx:src/ui/assets/plus.svg';
import EditIcon from 'jsx:src/ui/assets/edit.svg';
import SettingsIcon from 'jsx:src/ui/assets/settings.svg';
import { Button } from 'src/ui/ui-kit/Button';
import { VStack } from 'src/ui/ui-kit/VStack';
import { useBackgroundKind } from 'src/ui/components/Background';
import { Spacer } from 'src/ui/ui-kit/Spacer';
import type { WalletGroup } from 'src/shared/types/WalletGroup';
import { isReadonlyContainer } from 'src/shared/types/validators';
import { useCurrency } from 'src/modules/currency/useCurrency';
import { NeutralDecimals } from 'src/ui/ui-kit/NeutralDecimals';
import { formatCurrencyToParts } from 'src/shared/units/formatCurrencyValue';
import PortfolioIcon from 'jsx:src/ui/assets/portfolio.svg';
import { Media } from 'src/ui/ui-kit/Media';
import { ellipsis } from 'src/ui/shared/typography';
import { ViewLoading } from 'src/ui/components/ViewLoading';
import { isMatchForEcosystem } from 'src/shared/wallet/shared';
import type { NetworkBlockchainType } from 'src/shared/wallet/classifiers';
import { getBundledBwickNetworkConfig } from 'src/modules/ethereum/chains/bundledChainConfigs';
import {
  useNetworkConfig,
  useNetworks,
} from 'src/modules/networks/useNetworks';
import { isEthereumAddress } from 'src/shared/isEthereumAddress';
import { isSolanaAddress } from 'src/modules/solana/shared';
import { isCosmosAddress } from 'src/modules/cosmos/shared';
import { BlurrableBalance } from 'src/ui/components/BlurrableBalance';
import { usePreferences } from 'src/ui/features/preferences';
import { whiteBackgroundKind } from 'src/ui/components/Background/Background';
import type { WalletListGroup } from 'src/shared/wallet/wallet-list';
import {
  DEFAULT_WALLET_LIST_GROUPS,
  getWalletId,
} from 'src/shared/wallet/wallet-list';
import { SearchInput } from 'src/ui/ui-kit/Input/SearchInput';
import { DebouncedInput } from 'src/ui/ui-kit/Input/DebouncedInput';
import * as styles from './styles.module.css';
import { WalletList } from './WalletList';
import { WalletListEdit } from './WalletListEdit';
import { getFullWalletList, type AnyWallet } from './shared';
import { useWalletSearchPredicate } from './useWalletSearchPredicate';

function PortfolioRow({
  walletGroups,
  walletsOrder,
}: {
  walletGroups: WalletGroup[];
  walletsOrder?: WalletListGroup[];
}) {
  const { currency } = useCurrency();

  const groups = useMemo(
    () =>
      getFullWalletList({
        walletsOrder,
        walletGroups,
      }),
    [walletsOrder, walletGroups]
  );

  const portfolioWalletIdSet = useMemo(() => {
    return new Set(groups?.[0]?.walletIds || []);
  }, [groups]);

  useMemo(() => {
    return walletGroups
      .flatMap((group) =>
        group.walletContainer.wallets.map((wallet) => ({
          address: wallet.address,
          groupId: group.id,
        }))
      )
      .filter(({ address, groupId }) =>
        portfolioWalletIdSet.has(getWalletId({ address, groupId }))
      )
      .map(({ address }) => address);
  }, [walletGroups, portfolioWalletIdSet]);
  const isLoading = false;
  const walletPortfolio = { totalValue: 0 };

  return (
    <div className={styles.portfolio}>
      <HStack gap={4} justifyContent="space-between" alignItems="center">
        <Media
          vGap={0}
          image={<PortfolioIcon className={styles.portfolioIcon} />}
          text={<UIText kind="small/regular">Portfolio</UIText>}
          detailText={
            <UIText kind="headline/h3" style={{ display: 'flex' }}>
              {isLoading || !walletPortfolio ? (
                ellipsis
              ) : (
                <BlurrableBalance kind="headline/h3" color="var(--black)">
                  <NeutralDecimals
                    parts={formatCurrencyToParts(
                      walletPortfolio.totalValue || 0,
                      'en',
                      currency
                    )}
                  />
                </BlurrableBalance>
              )}
            </UIText>
          }
        />
      </HStack>
    </div>
  );
}

export function WalletSelect() {
  useBackgroundKind(whiteBackgroundKind);
  const navigate = useNavigate();

  const { preferences, setPreferences } = usePreferences();
  const [searchParams, setSearchParams] = useSearchParams();
  const ecosystem = searchParams.get('ecosystem') as NetworkBlockchainType;
  const editMode = searchParams.get('edit') === 'true';
  const setEditMode = useCallback(
    (value: boolean) => {
      if (value) {
        searchParams.set('edit', 'true');
      } else {
        searchParams.delete('edit');
      }
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const [searchQuery, setSearchQuery] = useState('');
  const selectedChain = searchParams.get('chain');
  const { data: selectedNetwork } = useNetworkConfig(selectedChain);
  const { networks } = useNetworks();
  const fallbackCosmosNetwork = useMemo(
    () =>
      networks?.getDefaultNetworks('cosmos')[0] ||
      getBundledBwickNetworkConfig(),
    [networks]
  );
  const effectiveSelectedNetwork = selectedNetwork || fallbackCosmosNetwork;
  const selectedEcosystem = effectiveSelectedNetwork
    ? effectiveSelectedNetwork.standard === 'eip155'
      ? 'evm'
      : effectiveSelectedNetwork.standard
    : null;

  const { data: walletGroups, isLoading: isLoadingWalletGroups } = useQuery({
    queryKey: ['wallet/uiGetWalletGroups'],
    queryFn: () => walletPort.request('uiGetWalletGroups'),
    useErrorBoundary: true,
  });
  const ownedGroups = useMemo(
    () =>
      walletGroups?.filter(
        (group) => !isReadonlyContainer(group.walletContainer)
      ),
    [walletGroups]
  );
  const ownedAddresses = useMemo(
    () =>
      ownedGroups?.flatMap((group) =>
        group.walletContainer.wallets.map((wallet) => wallet.address)
      ) || [],
    [ownedGroups]
  );

  const allWallets = useMemo(
    () => walletGroups?.flatMap((g) => g.walletContainer.wallets) ?? [],
    [walletGroups]
  );
  const totalWalletCount = allWallets.length;

  const ownedAddressesCount = ownedAddresses.length;

  const matchesSearch = useWalletSearchPredicate({
    searchQuery,
    walletsMeta: undefined,
  });

  const { singleAddress, refetch } = useAddressParams();
  const setCurrentAddressMutation = useMutation({
    mutationFn: (address: string) => setCurrentAddress({ address }),
    onSuccess() {
      refetch();
      navigate(-1);
    },
  });

  const isLoading = isLoadingWalletGroups;

  const walletListPredicate = useCallback(
    (wallet: AnyWallet) => {
      const canDeriveCosmosAddress =
        effectiveSelectedNetwork?.standard === 'cosmos' &&
        Boolean(effectiveSelectedNetwork.specification.cosmos?.bech32_prefix) &&
        'privateKey' in wallet &&
        isEthereumAddress(wallet.address);

      const matchesEcosystem =
        selectedEcosystem === 'cosmos'
          ? canDeriveCosmosAddress ||
            isCosmosAddress(wallet.address) ||
            isSolanaAddress(wallet.address)
          : !selectedEcosystem && !ecosystem
          ? true
          : selectedEcosystem
          ? isMatchForEcosystem(wallet.address, selectedEcosystem)
          : ecosystem
          ? isMatchForEcosystem(wallet.address, ecosystem)
          : true;

      return matchesEcosystem && matchesSearch(wallet);
    },
    [ecosystem, effectiveSelectedNetwork, matchesSearch, selectedEcosystem]
  );

  if (isLoading) {
    return <ViewLoading kind="network" />;
  }

  const title = (
    <NavigationTitle
      title="Wallets"
      elementEnd={
        <HStack
          gap={editMode ? 8 : 0}
          alignItems="center"
          style={{ position: 'relative', left: editMode ? -52 : -36 }}
        >
          {editMode ? (
            <Button
              kind="ghost"
              size={36}
              style={{ padding: 6 }}
              as={UnstyledLink}
              to="/wallets"
              title="Manage Wallets"
            >
              <SettingsIcon style={{ width: 24, height: 24 }} />
            </Button>
          ) : (
            <Button
              kind="ghost"
              size={36}
              style={{ padding: 6 }}
              title="Edit Wallets"
              onClick={() => {
                setEditMode(true);
              }}
            >
              <EditIcon style={{ width: 24, height: 24 }} />
            </Button>
          )}
          {editMode ? (
            <Button
              kind="ghost"
              size={36}
              style={{ padding: 6 }}
              onClick={() => {
                setEditMode(false);
              }}
            >
              Done
            </Button>
          ) : (
            <Button
              kind="ghost"
              size={36}
              style={{ padding: 6 }}
              as={UnstyledLink}
              to="/get-started"
              title="Add Wallet"
            >
              <AddIcon style={{ width: 24, height: 24 }} />
            </Button>
          )}
        </HStack>
      }
    />
  );

  if (!walletGroups?.length) {
    return (
      <PageColumn>
        {title}
        <FillView>
          <UIText kind="headline/h2" color="var(--neutral-500)">
            No Wallets
          </UIText>
        </FillView>
      </PageColumn>
    );
  }

  return (
    <PageColumn>
      {title}
      <Spacer height={10} />
      {ownedAddressesCount > 1 && !editMode ? (
        <PortfolioRow
          walletGroups={walletGroups}
          walletsOrder={preferences?.walletsOrder}
        />
      ) : null}
      {ownedAddressesCount > 1 && totalWalletCount >= 5 && !editMode ? (
        <Spacer height={16} />
      ) : null}
      {totalWalletCount >= 5 && !editMode ? (
        <DebouncedInput
          value={searchQuery}
          delay={300}
          onChange={setSearchQuery}
          render={({ value, handleChange }) => (
            <SearchInput
              boxHeight={40}
              type="search"
              placeholder="Search wallets"
              autoFocus={true}
              value={value}
              onChange={(event) => handleChange(event.currentTarget.value)}
            />
          )}
        />
      ) : null}
      <VStack
        gap={2}
        style={{
          ['--surface-background-color' as string]: 'transparent',
        }}
      >
        {editMode ? (
          <WalletListEdit
            walletsOrder={
              preferences?.walletsOrder || DEFAULT_WALLET_LIST_GROUPS
            }
            walletGroups={walletGroups}
            selectedChain={selectedChain}
            selectedNetwork={effectiveSelectedNetwork}
            allWallets={allWallets}
            onChange={(newOrder) => {
              setPreferences({
                walletsOrder: newOrder,
              });
            }}
          />
        ) : (
          <WalletList
            walletsOrder={preferences?.walletsOrder}
            walletGroups={walletGroups}
            selectedChain={selectedChain}
            selectedNetwork={effectiveSelectedNetwork}
            allWallets={allWallets}
            onSelect={(wallet) => {
              const nextAddress = wallet.sourceAddress || wallet.address;
              setCurrentAddressMutation.mutate(nextAddress);
            }}
            selectedAddress={singleAddress}
            showAddressValues={true}
            predicate={walletListPredicate}
            renderItemFooter={() => null}
          />
        )}
        {editMode ? null : (
          <div
            style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}
          >
            <Button
              kind="neutral"
              size={36}
              style={{ paddingInline: 12 }}
              as={UnstyledLink}
              to="/get-started"
              title="Add Wallet"
            >
              Add Wallet
            </Button>
          </div>
        )}
      </VStack>
      <PageBottom />
    </PageColumn>
  );
}
