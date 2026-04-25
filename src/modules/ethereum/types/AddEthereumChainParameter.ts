export interface AddEthereumChainParameter {
  standard?: 'eip155' | 'cosmos';
  chainId: string; // EIP-155 hex/integer value or Cosmos chain id
  chainName: string;
  bech32Prefix?: string;
  nativeCurrency: {
    // code: string | null;
    name: string;
    symbol: string; // 2-6 characters long
    decimals: number; // 18
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
  hidden?: boolean; // Not in standart, but this is a part of Network Form
  is_testnet?: boolean; // User-defined testnet status for custom networks
}
