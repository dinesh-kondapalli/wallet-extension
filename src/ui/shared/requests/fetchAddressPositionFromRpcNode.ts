import { Connection, PublicKey } from '@solana/web3.js';
import type { AddressPosition } from 'defi-sdk';
import { guessCosmosNativeDenoms } from 'src/modules/cosmos/shared';
import type { NetworkConfig } from 'src/modules/networks/NetworkConfig';
import { Networks } from 'src/modules/networks/Networks';
import { isMatchForEcosystem } from 'src/shared/wallet/shared';
import { eth_getBalance } from 'src/modules/ethereum/eth_getBalance';
import { createAddressPosition } from './shared/createAddressPosition';

async function solanaGetBalance({
  address,
  rpcUrl,
}: {
  address: string;
  rpcUrl: string;
}) {
  const connection = new Connection(rpcUrl);
  const res = await connection.getBalance(new PublicKey(address));
  return res;
}

interface FetchBalanceParams {
  address: string;
  network: NetworkConfig;
}

async function fetchAddressPositionFromSolanaNode({
  address,
  network,
}: FetchBalanceParams) {
  const rpcUrl = Networks.getNetworkRpcUrlInternal(network);
  const balance = await solanaGetBalance({ address, rpcUrl });
  return createAddressPosition({ balance: String(balance), network });
}

async function fetchAddressPositionFromEvmNode({
  address,
  network,
}: FetchBalanceParams) {
  const rpcUrl = Networks.getNetworkRpcUrlInternal(network);
  const balance = await eth_getBalance(rpcUrl, address);
  return createAddressPosition({ balance, network });
}

async function fetchAddressPositionFromCosmosNode({
  address,
  network,
}: FetchBalanceParams) {
  const rpcUrl = Networks.getNetworkRpcUrlInternal(network);
  const endpoint = new URL(
    `/cosmos/bank/v1beta1/balances/${address}`,
    rpcUrl
  ).toString();
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Cosmos balance request failed: ${response.status}`);
  }
  const data = (await response.json()) as {
    balances?: Array<{ denom?: string; amount?: string }>;
  };
  const candidateDenoms = guessCosmosNativeDenoms(
    network.native_asset?.symbol || ''
  );
  const balanceEntry =
    data.balances?.find((item) =>
      item.denom ? candidateDenoms.includes(item.denom.toLowerCase()) : false
    ) || data.balances?.[0];
  return createAddressPosition({
    balance: balanceEntry?.amount || '0',
    network,
  });
}

/** Fetches balance directly from an RPC Node */
export async function fetchAddressPositionFromRpcNode({
  address,
  network,
}: {
  address: string;
  network: NetworkConfig;
}): Promise<AddressPosition | null> {
  const ecosystem = Networks.getEcosystem(network);
  if (!isMatchForEcosystem(address, ecosystem)) {
    return null;
  }
  if (ecosystem === 'solana') {
    return fetchAddressPositionFromSolanaNode({ address, network });
  } else if (ecosystem === 'evm') {
    return fetchAddressPositionFromEvmNode({ address, network });
  } else if (ecosystem === 'cosmos') {
    return fetchAddressPositionFromCosmosNode({ address, network });
  } else {
    throw new Error(`Unsupported ecosystem: ${ecosystem}`);
  }
}
