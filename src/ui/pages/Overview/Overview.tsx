import { useStore } from '@store-unit/react';
import { useQuery } from '@tanstack/react-query';
import ArrowDownIcon from 'jsx:src/ui/assets/caret-down-filled.svg';
import ReadonlyIcon from 'jsx:src/ui/assets/visible.svg';
import React, { useEffect, useMemo, useRef } from 'react';
import { RenderArea } from 'react-area';
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import { useCurrency } from 'src/modules/currency/useCurrency';
import { createChain } from 'src/modules/networks/Chain';
import {
  useMainnetNetwork,
  useNetworkConfig,
  useNetworks,
} from 'src/modules/networks/useNetworks';
import { useHttpClientSource } from 'src/modules/bwick-api/hooks/useHttpClientSource';
import { useWalletPortfolio } from 'src/modules/bwick-api/hooks/useWalletPortfolio';
import { useWalletPnl } from 'src/modules/bwick-api/hooks/useWalletPnl';
import { getBundledBwickNetworkConfig } from 'src/modules/ethereum/chains/bundledChainConfigs';
import { useAddressPositionsFromNode } from 'src/ui/shared/requests/useAddressPositionsFromNode';
import { SidepanelOptionsButton } from 'src/shared/sidepanel/SidepanelOptionsButton';
import { invariant } from 'src/shared/invariant';
import type { ExternallyOwnedAccount } from 'src/shared/types/ExternallyOwnedAccount';
import { isReadonlyContainer } from 'src/shared/types/validators';
import { useBodyStyle } from 'src/ui/components/Background/Background';
import { CopyButton } from 'src/ui/components/CopyButton';
import { DelayedRender } from 'src/ui/components/DelayedRender/DelayedRender';
import { CenteredFillViewportView } from 'src/ui/components/FillView/FillView';
import noResultsImg from 'url:src/ui/assets/no-results@2x.png';
import { NavigationTitle } from 'src/ui/components/NavigationTitle';
import { PageBottom } from 'src/ui/components/PageBottom';
import { PageColumn } from 'src/ui/components/PageColumn';
import { PageFullBleedColumn } from 'src/ui/components/PageFullBleedColumn';
import { ViewLoading } from 'src/ui/components/ViewLoading';
import { WalletSourceIcon } from 'src/ui/components/WalletSourceIcon';
import { usePreferences } from 'src/ui/features/preferences';
import { walletPort } from 'src/ui/shared/channels';
import { getActiveTabOrigin } from 'src/ui/shared/requests/getActiveTabOrigin';
import { getWalletGroupByAddress } from 'src/ui/shared/requests/getWalletGroupByAddress';
import { requestChainForOrigin } from 'src/ui/shared/requests/requestChainForOrigin';
import { useIsConnectedToActiveTab } from 'src/ui/shared/requests/useIsConnectedToActiveTab';
import { useEvent } from 'src/ui/shared/useEvent';
import { useProfileName, WalletNameType } from 'src/ui/shared/useProfileName';
import { useAddressParams } from 'src/ui/shared/user-address/useAddressParams';
import { usePendingTransactions } from 'src/ui/transactions/usePendingTransactions';
import { Button } from 'src/ui/ui-kit/Button';
import { HStack } from 'src/ui/ui-kit/HStack';
import {
  SegmentedControlGroup,
  SegmentedControlLink,
} from 'src/ui/ui-kit/SegmentedControl';
import { Spacer } from 'src/ui/ui-kit/Spacer';
import { TextLink } from 'src/ui/ui-kit/TextLink';
import { UIText } from 'src/ui/ui-kit/UIText';
import { UnstyledButton } from 'src/ui/ui-kit/UnstyledButton';
import { UnstyledLink } from 'src/ui/ui-kit/UnstyledLink';
import { VStack } from 'src/ui/ui-kit/VStack';
import { getAddressType } from 'src/shared/wallet/classifiers';
import { isMatchForEcosystem } from 'src/shared/wallet/shared';
import { isEthereumAddress } from 'src/shared/isEthereumAddress';
import { normalizeAddress } from 'src/shared/normalizeAddress';
import { Networks } from 'src/modules/networks/Networks';
import { getWalletDisplayName } from 'src/ui/shared/getWalletDisplayName';
import { ViewSuspense } from '../../components/ViewSuspense';
import { WalletAvatar } from '../../components/WalletAvatar';
import { HistoryList } from '../History/History';
import { SettingsLinkIcon } from '../Settings/SettingsLinkIcon';
import { SearchLinkIcon } from '../Search';
import { ActionButtonsRow } from './ActionButtonsRow';
import { PercentageChange } from './PercentageChange';
import { BackupReminder } from './BackupReminder';
import { Banners } from './Banners';
import { ConnectionHeader } from './ConnectionHeader';
import { NonFungibleTokens } from './NonFungibleTokens';
import { Positions } from './Positions';
import {
  TABS_OFFSET_METER_ID,
  TAB_SELECTOR_HEIGHT,
  TAB_TOP_PADDING,
  getCurrentTabsOffset,
  getMinTabContentHeight,
  getStickyOffset,
  offsetValues,
} from './getTabsOffset';

function PendingTransactionsIndicator() {
  const pendingTxs = usePendingTransactions();

  if (pendingTxs.length === 0) {
    return null;
  } else {
    return (
      <svg
        viewBox="0 0 16 16"
        style={{ width: 8, height: 8, position: 'relative', top: -4 }}
      >
        <circle cx="8" cy="8" r="8" fill="var(--notice-500)" />
      </svg>
    );
  }
}

/**
 * Product requirement:
 * if we're in default mode (not testnet), but the current dapp chain
 * is a testnet, we want to hide positions and history to supposedly avoid
 * confusion for the user
 */
function TestnetworkGuard({
  dappChain: dappChainStr,
  renderGuard,
  children,
}: React.PropsWithChildren<{
  dappChain: string | null;
  renderGuard: ({
    testnetModeEnabled,
  }: {
    testnetModeEnabled: boolean;
  }) => React.ReactNode;
}>) {
  const { preferences } = usePreferences();
  const dappChain = dappChainStr ? createChain(dappChainStr) : null;
  const { networks, isLoading } = useNetworks(
    dappChainStr ? [dappChainStr] : undefined
  );
  const currentNetwork = dappChain
    ? networks?.getNetworkByName(dappChain)
    : null;
  const { data: mainnetNetwork } = useMainnetNetwork({
    chain: dappChainStr || null,
    enabled:
      Boolean(preferences?.testnetMode?.on) &&
      !isLoading &&
      !currentNetwork &&
      Boolean(dappChainStr),
  });
  const network = currentNetwork || mainnetNetwork;
  const testnetModeEnabled = Boolean(preferences?.testnetMode?.on);
  if (
    dappChainStr &&
    network &&
    testnetModeEnabled !== Boolean(network.is_testnet)
  ) {
    return renderGuard({ testnetModeEnabled });
  }
  return children;
}

function AccountHeadline({
  wallet,
  displayAddress,
}: {
  wallet: ExternallyOwnedAccount;
  displayAddress?: string | null;
}) {
  const profileData = useProfileName(wallet, { maxCharacters: 16 });
  const showChainDerivedAddress =
    Boolean(displayAddress) &&
    normalizeAddress(displayAddress || '') !== normalizeAddress(wallet.address);
  if (profileData.type === WalletNameType.customName) {
    return <>{profileData.value}</>;
  }
  if (showChainDerivedAddress) {
    return (
      <>
        {getWalletDisplayName(
          { address: displayAddress as string, name: null },
          { maxCharacters: 16 }
        )}
      </>
    );
  }
  return <>{profileData.value}</>;
}

function CurrentAccountControls({
  displayAddress,
  walletSelectPath,
}: {
  displayAddress?: string | null;
  walletSelectPath: string;
}) {
  const { singleAddress, ready } = useAddressParams();
  const { data: wallet } = useQuery({
    queryKey: ['wallet/uiGetCurrentWallet'],
    queryFn: () => walletPort.request('uiGetCurrentWallet'),
  });
  if (!ready || !wallet) {
    return null;
  }
  const addressToCopy = displayAddress || wallet.address || singleAddress;
  return (
    <HStack gap={0} alignItems="center">
      <Button
        kind="text-primary"
        size={40}
        as={UnstyledLink}
        to={walletSelectPath}
        title="Select Account"
        className="parent-hover"
        style={{
          paddingInline: '8px 4px',
          ['--button-text-hover' as string]: 'var(--neutral-800)',
          ['--parent-content-color' as string]: 'var(--neutral-500)',
          ['--parent-hovered-content-color' as string]: 'var(--black)',
        }}
      >
        <HStack gap={4} alignItems="center">
          <UIText
            kind="headline/h3"
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              <AccountHeadline
                wallet={wallet}
                displayAddress={displayAddress}
              />
            </span>
            <ArrowDownIcon
              className="content-hover"
              style={{ width: 24, height: 24 }}
            />
          </UIText>
        </HStack>
      </Button>
      <CopyButton
        title="Copy Address"
        textToCopy={addressToCopy}
        tooltipContent="Address Copied"
      />

      <RenderArea name="wallet-name-end" />
    </HStack>
  );
}

function DevelopmentOnly({ children }: React.PropsWithChildren) {
  if (process.env.NODE_ENV === 'development') {
    return children as JSX.Element;
  } else {
    return null;
  }
}

let didRenderOnce = false;
let didRunEffectOnce = false;
function RenderTimeMeasure() {
  // Expected measures:
  // TAB
  // Overview render: ~30ms
  // Overview render effect: ~75ms
  //
  // POPUP
  // Overview render: ~40ms
  // Overview render effect: ~74ms
  //
  if (!didRenderOnce) {
    console.timeEnd('UI render'); // eslint-disable-line no-console
  }

  useEffect(() => {
    if (!didRunEffectOnce) {
      console.timeEnd('UI render effect'); // eslint-disable-line no-console
    }
    didRunEffectOnce = true;
  }, []);
  didRenderOnce = true;
  return null;
}

function ReadonlyMode() {
  return (
    <div
      style={{
        backgroundColor: 'var(--neutral-100)',
        borderRadius: 8,
        padding: '8px 12px',
      }}
    >
      <UIText kind="small/accent" color="var(--neutral-500)">
        <HStack gap={8} justifyContent="space-between">
          <HStack gap={8}>
            <ReadonlyIcon />
            <span>You’re in view-only mode</span>
          </HStack>
          <TextLink
            to="/get-started/existing-select"
            style={{ color: 'var(--primary)' }}
          >
            Import Wallet
          </TextLink>
        </HStack>
      </UIText>
    </div>
  );
}

function OverviewComponent() {
  useBodyStyle(
    useMemo(() => ({ ['--background' as string]: 'var(--z-index-0)' }), [])
  );
  const { currency } = useCurrency();
  const location = useLocation();
  const {
    singleAddress: address,
    params,
    singleAddressNormalized,
  } = useAddressParams();
  useProfileName({ address, name: null });
  const { data: walletGroup } = useQuery({
    queryKey: ['getWalletGroupByAddress', address],
    queryFn: () => getWalletGroupByAddress(address),
  });
  const isReadonlyGroup =
    walletGroup && isReadonlyContainer(walletGroup.walletContainer);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedChain =
    searchParams.get('chain') || getBundledBwickNetworkConfig().id;
  const setSelectedChain = useEvent((value: string | null) => {
    // setSearchParams is not a stable reference: https://github.com/remix-run/react-router/issues/9304
    setSearchParams(
      (current) => {
        if (value) {
          current.set('chain', value);
        } else {
          current.delete('chain');
        }
        return current;
      },
      { replace: true }
    );
  });
  const { data: network } = useNetworkConfig(
    selectedChain || getBundledBwickNetworkConfig().id
  );
  const {
    data: selectedChainAddress,
    isLoading: isLoadingSelectedChainAddress,
  } = useQuery({
    queryKey: [
      'wallet/getAddressForChain',
      address,
      selectedChain,
      selectedChain ?? getBundledBwickNetworkConfig().id,
    ],
    queryFn: async () => {
      invariant(selectedChain, 'selectedChain is required');
      invariant(address, 'address is required');
      return walletPort.request('getAddressForChain', {
        address,
        chain: selectedChain || getBundledBwickNetworkConfig().id,
      });
    },
    enabled: Boolean(address && selectedChain),
  });
  const displayAddress = isLoadingSelectedChainAddress
    ? singleAddressNormalized
    : selectedChainAddress || singleAddressNormalized;
  const walletSelectPath = selectedChain
    ? `/wallet-select?${new URLSearchParams({
        chain: selectedChain,
      }).toString()}`
    : '/wallet-select';

  useEffect(() => {
    const networkEcosystem = network ? Networks.getEcosystem(network) : null;
    const allowCosmosFromEvm =
      networkEcosystem === 'cosmos' &&
      Boolean(address && isEthereumAddress(address));
    if (
      network &&
      !allowCosmosFromEvm &&
      networkEcosystem &&
      !isMatchForEcosystem(address, networkEcosystem)
    ) {
      setSelectedChain(null);
    }
  }, [address, network, setSelectedChain]);

  useEffect(() => {
    if (network?.standard === 'eip155') {
      setSelectedChain(null);
    }
  }, [network, setSelectedChain]);

  const httpSource = useHttpClientSource();
  const { data, isLoading: isLoadingPortfolio } = useWalletPortfolio(
    { addresses: [params.address], currency },
    { source: httpSource },
    { enabled: false, refetchInterval: 40000 }
  );
  const walletPortfolio = data?.data;

  const { data: pnlData } = useWalletPnl(
    { addresses: [params.address], currency },
    { source: httpSource },
    { enabled: false, refetchInterval: 40000 }
  );
  const walletPnl = pnlData?.data;

  const { data: bwickOverviewPositions } = useAddressPositionsFromNode({
    address: selectedChainAddress || singleAddressNormalized,
    chain: createChain(getBundledBwickNetworkConfig().id),
    staleTime: 1000 * 20,
    enabled: Boolean(singleAddressNormalized),
    suspense: false,
  });

  const fallbackTotalValue =
    bwickOverviewPositions?.reduce((sum, item) => {
      const price = item.asset?.price?.value || 0;
      const qty = Number(item.quantity || 0);
      return sum + price * qty;
    }, 0) ?? 0;

  const offsetValuesState = useStore(offsetValues);

  const handleTabChange = (to: string) => {
    const isActiveTabClicked = location.pathname === to;
    window.scrollTo({
      behavior: isActiveTabClicked ? 'smooth' : 'instant',
      top: Math.min(window.scrollY, getCurrentTabsOffset(offsetValuesState)),
    });
  };

  const { data: tabData } = useQuery({
    queryKey: ['activeTab/origin'],
    queryFn: getActiveTabOrigin,
    useErrorBoundary: true,
  });
  const activeTabOrigin = tabData?.tabOrigin;
  const { data: siteChain } = useQuery({
    queryKey: ['requestChainForOrigin', activeTabOrigin, address],
    queryFn: async () => {
      if (activeTabOrigin) {
        return requestChainForOrigin(activeTabOrigin, getAddressType(address));
      }
      return null;
    },
    enabled: Boolean(activeTabOrigin),
    useErrorBoundary: true,
    suspense: false,
  });

  const { data: isConnected } = useIsConnectedToActiveTab(
    singleAddressNormalized
  );

  const dappChain = isConnected ? siteChain?.toString() : null;

  const tabFallback = (
    <CenteredFillViewportView
      maxHeight={getMinTabContentHeight(offsetValuesState)}
    >
      <DelayedRender delay={2000}>
        <ViewLoading kind="network" />
      </DelayedRender>
    </CenteredFillViewportView>
  );

  const { preferences, setPreferences } = usePreferences();
  const isTestnetMode = Boolean(preferences?.testnetMode?.on);
  const isTestnetModeOnFirstRender = useRef<boolean | null>(isTestnetMode);
  useEffect(() => {
    // reset filter chain when switching between modes
    // so that we do not show unsupported network data
    if (isTestnetModeOnFirstRender.current !== isTestnetMode) {
      isTestnetModeOnFirstRender.current = null; // make it never equal current value
      setSelectedChain(null);
    }
  }, [isTestnetMode, setSelectedChain]);
  const testnetGuardView = (
    <CenteredFillViewportView
      adjustForNavigationBar={true}
      maxHeight={getMinTabContentHeight(offsetValuesState)}
    >
      <VStack gap={16} style={{ textAlign: 'center' }}>
        <img
          src={noResultsImg}
          style={{ height: 64, placeSelf: 'center' }}
          alt=""
        />
        <VStack gap={8}>
          <UIText kind="headline/h3">Wrong Environment</UIText>
          <UIText kind="small/regular" color="var(--neutral-500)">
            <div>
              {preferences?.testnetMode?.on ? (
                <UnstyledButton
                  className="underline hover:no-underline"
                  onClick={() => {
                    setPreferences({ testnetMode: null });
                  }}
                >
                  Turn off Testnet Mode
                </UnstyledButton>
              ) : (
                <UnstyledButton
                  className="underline hover:no-underline"
                  onClick={() => {
                    setPreferences({ testnetMode: { on: true } });
                  }}
                >
                  Turn on Testnet Mode
                </UnstyledButton>
              )}{' '}
              or change your network
            </div>
          </UIText>
        </VStack>
      </VStack>
    </CenteredFillViewportView>
  );

  /**
   * Creates href such that "chain" search-param is preserved between
   * tabs, but clicking on current tab resets searchParams
   */
  const createTo = (to: string, { end = false } = {}) => {
    if (!selectedChain) {
      return to;
    }
    const isActiveRoute = end
      ? location.pathname === to
      : location.pathname.startsWith(to);
    if (isActiveRoute) {
      return to;
    } else {
      return `${to}?chain=${selectedChain}`;
    }
  };

  return (
    <PageColumn
      style={{
        ['--column-padding-inline' as string]: '8px',
        ['--background' as string]: 'var(--neutral-100)',
      }}
    >
      <PageFullBleedColumn
        paddingInline={true}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 'var(--navbar-index)',
          paddingInline: 0,
        }}
      >
        <ConnectionHeader />
        <BackupReminder />
        <div style={{ backgroundColor: 'var(--white)' }}>
          <Spacer height={16} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingInline: '8px 16px',
              height: 24,
            }}
          >
            <CurrentAccountControls
              displayAddress={displayAddress}
              walletSelectPath={walletSelectPath}
            />
            <HStack gap={0} alignItems="center">
              <SearchLinkIcon />
              <SettingsLinkIcon />
              <SidepanelOptionsButton />
            </HStack>
          </div>
          <Spacer height={16} />
        </div>
      </PageFullBleedColumn>
      <div
        style={{
          height: isLoadingPortfolio ? 68 : undefined,
          paddingInline: 8,
        }}
      >
        <HStack gap={12} alignItems="center">
          {!isLoadingPortfolio ? (
            <WalletAvatar
              address={address}
              size={64}
              borderRadius={12}
              icon={
                <WalletSourceIcon
                  address={address}
                  groupId={null}
                  style={{ width: 24, height: 24 }}
                  borderRadius={8}
                  cutoutStroke={3}
                />
              }
            />
          ) : null}
          <PercentageChange
            walletPortfolio={walletPortfolio}
            walletPnl={walletPnl}
            currency={currency}
            fallbackTotalValue={fallbackTotalValue}
          />
        </HStack>
      </div>
      <Spacer height={16} />
      <div style={{ paddingInline: 'var(--column-padding-inline)' }}>
        {isReadonlyGroup ? (
          <ReadonlyMode />
        ) : (
          <ActionButtonsRow
            receiveAddress={displayAddress}
            selectedChain={selectedChain}
          />
        )}
      </div>
      <DevelopmentOnly>
        <RenderTimeMeasure />
      </DevelopmentOnly>
      <Spacer height={isReadonlyGroup ? 16 : 24} />
      <Banners address={singleAddressNormalized} />
      <div id={TABS_OFFSET_METER_ID} />
      <PageFullBleedColumn
        paddingInline={false}
        style={{
          position: 'sticky',
          top: getStickyOffset(offsetValuesState),
          zIndex: 'var(--max-layout-index)',
          backgroundColor: 'var(--background)',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--white)',
            height: TAB_SELECTOR_HEIGHT,
          }}
        >
          <SegmentedControlGroup
            style={{
              paddingInline: 16,
              gap: 24,
              borderBottom: 'none',
            }}
            childrenLayout="start"
          >
            <div
              style={{
                height: 2,
                backgroundColor: 'var(--neutral-200)',
                position: 'absolute',
                bottom: -1,
                left: 16,
                right: 16,
                zIndex: 0,
              }}
            />
            <SegmentedControlLink
              to={createTo('/overview', { end: true })}
              end={true}
              onClick={() => handleTabChange('/overview')}
            >
              Tokens
            </SegmentedControlLink>
            <SegmentedControlLink
              to={createTo('/overview/nfts')}
              onClick={() => handleTabChange('/overview/nfts')}
            >
              NFTs
            </SegmentedControlLink>
            <SegmentedControlLink
              to={createTo('/overview/history')}
              onClick={() => handleTabChange('/overview/history')}
            >
              History <PendingTransactionsIndicator />
            </SegmentedControlLink>
          </SegmentedControlGroup>
        </div>
      </PageFullBleedColumn>
      <PageFullBleedColumn
        paddingInline={false}
        style={{
          position: 'relative',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--white)',
          ['--surface-background-color' as string]: 'var(--white)',
        }}
      >
        <div style={{ minHeight: getMinTabContentHeight(offsetValuesState) }}>
          <Routes>
            <Route
              path="/"
              element={
                <ViewSuspense logDelays={true} fallback={tabFallback}>
                  <NavigationTitle title={null} documentTitle="Overview" />
                  <div
                    style={{
                      height: TAB_TOP_PADDING,
                      position: 'sticky',
                      top:
                        getStickyOffset(offsetValuesState) +
                        TAB_SELECTOR_HEIGHT,
                      zIndex: 1,
                      backgroundColor: 'var(--white)',
                    }}
                  />
                  <TestnetworkGuard
                    dappChain={dappChain || null}
                    renderGuard={() => testnetGuardView}
                  >
                    <VStack gap={20}>
                      <Positions
                        dappChain={dappChain || null}
                        selectedChain={
                          selectedChain || getBundledBwickNetworkConfig().id
                        }
                        selectedChainAddress={selectedChainAddress}
                        onChainChange={setSelectedChain}
                      />
                    </VStack>
                  </TestnetworkGuard>
                </ViewSuspense>
              }
            />
            <Route
              path="/nfts"
              element={
                <ViewSuspense logDelays={true} fallback={tabFallback}>
                  <NavigationTitle title={null} documentTitle="NFTs" />
                  <Spacer height={TAB_TOP_PADDING} />
                  <TestnetworkGuard
                    dappChain={dappChain || null}
                    renderGuard={() => testnetGuardView}
                  >
                    <NonFungibleTokens
                      dappChain={dappChain || null}
                      selectedChain={selectedChain}
                      onChainChange={setSelectedChain}
                    />
                  </TestnetworkGuard>
                </ViewSuspense>
              }
            />
            <Route
              path="/history"
              element={
                <ViewSuspense logDelays={true} fallback={tabFallback}>
                  <NavigationTitle title={null} documentTitle="History" />
                  <Spacer height={TAB_TOP_PADDING} />
                  <TestnetworkGuard
                    dappChain={dappChain || null}
                    renderGuard={() => testnetGuardView}
                  >
                    <HistoryList
                      selectedChain={selectedChain}
                      onChainChange={setSelectedChain}
                    />
                  </TestnetworkGuard>
                </ViewSuspense>
              }
            />
          </Routes>
          <PageBottom />
        </div>
      </PageFullBleedColumn>
    </PageColumn>
  );
}

export function Overview() {
  return <OverviewComponent />;
}
