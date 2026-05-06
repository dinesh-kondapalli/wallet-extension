import type { IncomingTransaction } from 'src/modules/ethereum/types/IncomingTransaction';
import { normalizeChainId } from 'src/shared/normalizeChainId';
import { valueToHex } from 'src/shared/units/valueToHex';
import { GAS_PER_PUBDATA_BYTE_DEFAULT } from 'src/modules/ethereum/account-abstraction/constants';
import type { PartiallyOptional } from 'src/shared/type-utils/PartiallyOptional';
import { BwickHttpClient } from '../shared';
import type { ClientOptions } from '../shared';
import type { BwickApiContext } from '../bwick-api-bare';
import type { ResponseBody } from './ResponseBody';

type HexString = string;

interface PaymasterEligibilityParams {
  transaction: {
    from: HexString;
    to: HexString;
    nonce: HexString;
    chainId: HexString;
    gas: HexString;
    gasPerPubdataByte: HexString;
    value: HexString;
    data: HexString;
  };
}

type NonNullableRequiredKeys<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

type Keys = keyof PaymasterEligibilityParams['transaction'];
type PaymasterEligibilityParamsAdapted = NonNullableRequiredKeys<
  Pick<
    IncomingTransaction,
    Exclude<Keys, 'gasPerPubdataByte' | 'value' | 'data'>
  >
> &
  Pick<IncomingTransaction, 'value' | 'data'> & {
    gasPerPubdataByte?: string;
  };

type PaymasterEligibilityResponse = ResponseBody<{
  eligible: boolean;
  eta: null | number;
}>;

export function paymasterCheckEligibility(
  this: BwickApiContext,
  tx: PaymasterEligibilityParamsAdapted,
  options?: ClientOptions
) {
  const {
    from,
    to,
    nonce,
    value = '0x0',
    chainId,
    data = '0x0',
    gas,
    gasPerPubdataByte = GAS_PER_PUBDATA_BYTE_DEFAULT,
  } = tx;
  const params: PaymasterEligibilityParams = {
    transaction: {
      from,
      to,
      chainId: normalizeChainId(chainId),
      nonce: valueToHex(nonce),
      value: valueToHex(value ?? '0x0'),
      data: valueToHex(data ?? '0x0'),
      gas: valueToHex(gas),
      gasPerPubdataByte,
    },
  };
  const kyOptions = this.getKyOptions();
  const endpoint = '/paymaster/check-eligibility/v2';
  return BwickHttpClient.post<PaymasterEligibilityResponse>(
    {
      endpoint,
      body: JSON.stringify(params),
      ...options,
    },
    kyOptions
  );
}

interface PaymasterParamsRequest {
  transaction: {
    from: HexString;
    to: HexString;
    nonce: HexString;
    chainId: HexString;
    gas: HexString;
    gasPerPubdataByte: HexString;
    maxFee: HexString;
    maxPriorityFee: HexString;
    value: HexString;
    data: HexString;
  };
}

type PaymasterParamsResponseData = {
  eligible: boolean;
  paymasterParams: null | {
    paymaster: string;
    paymasterInput: string;
  };
  suggestedGas?: string | null;
};

type PaymasterParamsResponse = ResponseBody<PaymasterParamsResponseData>;

export function getPaymasterParams(
  this: BwickApiContext,
  requestAdapted: {
    transaction: PartiallyOptional<
      PaymasterParamsRequest['transaction'],
      'value' | 'data'
    >;
  },
  options?: ClientOptions
) {
  const { transaction } = requestAdapted;
  const params: PaymasterParamsRequest = {
    transaction: {
      value: transaction.value ?? '0x0',
      data: transaction.data ?? '0x0',
      from: transaction.from,
      to: transaction.to,
      nonce: transaction.nonce,
      chainId: transaction.chainId,
      gas: transaction.gas,
      gasPerPubdataByte: transaction.gasPerPubdataByte,
      maxFee: transaction.maxFee,
      maxPriorityFee: transaction.maxPriorityFee,
    },
  };
  const kyOptions = this.getKyOptions();
  const endpoint = '/paymaster/get-params/v3';
  return BwickHttpClient.post<PaymasterParamsResponse>(
    {
      endpoint,
      body: JSON.stringify(params),
      ...options,
    },
    kyOptions
  );
}
