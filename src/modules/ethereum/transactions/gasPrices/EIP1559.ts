import type { EIP1559 } from '@bwicktech/transactions';

export type EIP1559Base = EIP1559 & {
  baseFee: number;
};
