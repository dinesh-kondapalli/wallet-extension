# @bwicktech/solana-wallet-standard

A package for Wallet Standard implementation: https://github.com/anza-xyz/wallet-standard/blob/master/WALLET.md

All code is adapated from https://github.com/anza-xyz/wallet-standard/tree/master/packages/wallets/ghost/src with modifications to dynamically pass `name`, `icon` and `features`

## Install

```sh
npm install @bwicktech/solana-wallet-standard
```

## Get Started

Reference implementation:

```ts
import EventEmitter from 'events';
import type { Ghost } from '@bwicktech/solana-wallet-standard';
import { initialize } from '@bwicktech/solana-wallet-standard';
import type {
  PublicKey,
  Transaction,
  VersionedTransaction
} from '@solana/web3.js';
import type {
  SolanaSignInInput,
  SolanaSignInOutput
} from '@solana/wallet-standard-features';

class BwickSolana extends EventEmitter implements Ghost {
  name = 'BWICK';
  icon = `data:image/svg+xml;base64,...`;
  publicKey: PublicKey | null;

  async connect(): Promise<{ publicKey: PublicKey }> {
    throw new Error('connect: Not Implemented');
  }

  async disconnect(): Promise<void> {
    throw new Error('disconnect: Not Implemented');
  }

  signIn(
    _input?: SolanaSignInInput | undefined
  ): Promise<SolanaSignInOutput> {
    throw new Error('signIn: Not Implemented');
  }

  signMessage(
    _message: Uint8Array
  ): Promise<{ signature: Uint8Array }> {
    throw new Error('signMessage: Not Implemented');
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T
  ): Promise<T> {
    throw new Error('signTransaction: Not Implemented');
  }

  signAllTransactions<T extends Transaction | VersionedTransaction>(
    _transactions: T[]
  ): Promise<T[]> {
    throw new Error('signAllTransactions: Not Implemented');
  }

  async signAndSendTransaction<
    T extends Transaction | VersionedTransaction
  >(
    transaction: T,
    _options?: SendOptions | undefined
  ): Promise<{ signature: string }> {
    throw new Error('signAndSendTransaction: Not Implemented');
  }
}

const bwickSolana = new BwickSolana();
initialize(bwickSolana);
```
