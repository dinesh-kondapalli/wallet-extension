import { invariant } from 'src/shared/invariant';
import type { AddEthereumChainParameter } from '../ethereum/types/AddEthereumChainParameter';
import { toCustomNetworkIdFromConfig } from '../ethereum/chains/helpers';
import type { NetworkConfig } from './NetworkConfig';
import { Networks } from './Networks';

export function toNetworkConfig(
  value: AddEthereumChainParameter,
  maybeId: string | null
): NetworkConfig {
  invariant(value.rpcUrls, 'RPC URL should be defined in network config');
  invariant(value.chainId, 'chainId should be defined in network config');
  const standard = value.standard || 'eip155';
  const id = maybeId ?? toCustomNetworkIdFromConfig(value);
  if (standard === 'cosmos') {
    return {
      supports_sending: false,
      supports_trading: false,
      supports_bridging: false,
      supports_actions: false,
      supports_nft_positions: false,
      supports_positions: false,
      supports_sponsored_transactions: false,
      supports_simulations: false,
      name: value.chainName,
      id,
      explorer_home_url: value.blockExplorerUrls?.[0] || null,
      explorer_address_url: null,
      explorer_name: null,
      explorer_token_url: null,
      explorer_tx_url: null,
      explorer_urls: null,
      icon_url: value.iconUrls?.[0] || '',
      native_asset: {
        name: value.nativeCurrency?.name,
        address: null,
        decimals: value.nativeCurrency?.decimals,
        symbol: value.nativeCurrency?.symbol,
        icon_url: null,
        id: value.nativeCurrency?.symbol?.toLowerCase() || '',
      },
      rpc_url_internal: null,
      rpc_url_public: value.rpcUrls,
      wrapped_native_asset: null,
      standard: 'cosmos',
      specification: {
        cosmos: {
          chain_id: value.chainId,
          bech32_prefix: value.bech32Prefix || null,
        },
      },
      is_testnet: value.is_testnet,
    };
  }
  return {
    supports_sending: true,
    supports_trading: false,
    supports_bridging: false,
    supports_actions: false,
    supports_nft_positions: false,
    supports_positions: false,
    supports_sponsored_transactions: false,
    supports_simulations: false,
    name: value.chainName,
    id,
    explorer_home_url: value.blockExplorerUrls?.[0] || null,
    explorer_address_url: null,
    explorer_name: null,
    explorer_token_url: null,
    explorer_tx_url: null,
    explorer_urls: null,
    icon_url: value.iconUrls?.[0] || '',
    native_asset: {
      name: value.nativeCurrency?.name,
      address: null,
      decimals: value.nativeCurrency?.decimals,
      symbol: value.nativeCurrency?.symbol,
      icon_url: null,
      id: value.nativeCurrency?.symbol?.toLowerCase() === 'eth' ? 'eth' : '',
    },
    rpc_url_internal: null,
    rpc_url_public: value.rpcUrls,
    wrapped_native_asset: null,
    standard: 'eip155',
    specification: {
      eip155: {
        eip1559: false,
        id: Number(value.chainId),
      },
    },
    is_testnet: value.is_testnet,
  };
}

export function toAddEthereumChainParameter(
  item: Pick<
    NetworkConfig,
    | 'rpc_url_user'
    | 'rpc_url_internal'
    | 'rpc_url_public'
    | 'native_asset'
    | 'name'
    | 'icon_url'
    | 'explorer_tx_url'
    | 'explorer_home_url'
    | 'hidden'
    | 'is_testnet'
    | 'specification'
    | 'standard'
  >
): AddEthereumChainParameter {
  return {
    rpcUrls: item.rpc_url_user
      ? [item.rpc_url_user]
      : item.rpc_url_internal
      ? [item.rpc_url_internal]
      : item.rpc_url_public?.length
      ? item.rpc_url_public
      : [],
    nativeCurrency: {
      symbol: item.native_asset?.symbol || '<unknown>',
      decimals: (item.native_asset?.decimals || NaN) as 18,
      name: item.native_asset?.name || '<unknown>',
    },
    standard: item.standard === 'cosmos' ? 'cosmos' : 'eip155',
    chainId: Networks.getChainReferenceId(item),
    chainName: item.name,
    bech32Prefix: item.specification.cosmos?.bech32_prefix || undefined,
    blockExplorerUrls:
      item.explorer_tx_url || item.explorer_home_url
        ? [item.explorer_tx_url || item.explorer_home_url || '']
        : [],
    iconUrls: [item.icon_url],
    hidden: item.hidden,
    is_testnet: item.is_testnet,
  };
}
