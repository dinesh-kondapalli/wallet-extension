import { capitalize } from 'capitalize-ts';
import type { Brand } from 'src/shared/type-utils/Brand';
import type { WalletGroup } from 'src/shared/types/WalletGroup';
import { isAccountContainer } from 'src/shared/types/validators';

type AccountProviderName = Brand<string, 'AccountProviderName'>;

enum AccountProvider {
  bwickExtension = 'bwickExtension',
  viewerNotAdded = 'viewerNotAdded',
  readOnly = 'readOnly',
}

export function getProviderNameFromGroup(
  group: WalletGroup | null
): AccountProvider | AccountProviderName {
  return group
    ? isAccountContainer(group.walletContainer)
      ? (group.walletContainer.provider as AccountProviderName) ??
        AccountProvider.readOnly
      : AccountProvider.bwickExtension
    : AccountProvider.viewerNotAdded;
}

export function getProviderForApiV4(
  provider: AccountProvider | AccountProviderName
) {
  switch (provider) {
    case AccountProvider.viewerNotAdded: {
      return 'viewer_not_added';
    }
    case AccountProvider.bwickExtension: {
      return 'bwick-extension';
    }
    case AccountProvider.readOnly: {
      return 'Read Only';
    }
    default: {
      return provider;
    }
  }
}

export function getProviderForMetabase(
  provider: AccountProvider | AccountProviderName
) {
  switch (provider) {
    case AccountProvider.viewerNotAdded: {
      return 'viewer_not_added';
    }
    case AccountProvider.bwickExtension: {
      return 'Bwick Wallet';
    }
    case AccountProvider.readOnly: {
      return 'Read only'; // matching with ios event
    }
    default: {
      return capitalize(provider);
    }
  }
}

export const getProviderForMixpanel = getProviderForMetabase;
