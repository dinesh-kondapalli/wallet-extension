import { ServiceLocator } from 'src/background/initialize';
import { invariant } from 'src/shared/invariant';
import { getAddressProviderHeader } from './requests/shared.background';
import type { BwickApiContext } from './bwick-api-bare';
import { BwickApiBare } from './bwick-api-bare';

const context: BwickApiContext = {
  getAddressProviderHeader: (address: string) => {
    const wallet = ServiceLocator.account?.getCurrentWallet();
    invariant(wallet, 'Wallet instance is not available at this point');
    return getAddressProviderHeader(wallet, address);
  },
  getKyOptions: () => ({}),
};

export const BwickAPI = Object.assign(context, BwickApiBare);
export type BwickApiBackground = typeof BwickAPI;
