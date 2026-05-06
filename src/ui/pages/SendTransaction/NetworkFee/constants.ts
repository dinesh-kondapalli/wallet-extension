import type { NetworkFeeSpeed } from '@bwicktech/transactions';

export const NETWORK_SPEED_TO_TITLE: Record<NetworkFeeSpeed, string> = {
  fast: 'Fast',
  average: 'Average',
  custom: 'Custom',
};
