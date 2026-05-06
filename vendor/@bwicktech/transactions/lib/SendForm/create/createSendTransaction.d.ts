import { Networks } from '../../shared/Networks.type';
import { Transaction } from '../types';
/**
 * In Ethers v6, toBeHex ensures the value is always represented as a valid
 * hexadecimal string with consistent zero-padding according to its byte length.
 * Example: toBeHex('0xde0b6b3a7640000') results in '0x0de0b6b3a7640000'
 * — it adds a leading 0 to make the total byte-length consistent.
 * To be safe and not break tests, we want to make the conversion compatible
 * with how ethers v5 worked
 */
export declare function toEthersV5CompatibleHexValue(value: string | number): string;
export interface SendTransaction {
    tokenInterface: 'erc20' | 'native';
    inputToken: string | null;
    from: string;
    to: string;
    value: string;
    chainId: string;
}
export declare function createSendNativeOrContractTransaction({ tokenInterface, from, to, value, chainId: maybeChainId, inputToken, }: SendTransaction): Transaction;
export declare function createSendTransaction(networks: Networks, { from, to, value, chainId: maybeChainId, inputToken, }: Omit<SendTransaction, 'tokenInterface'>): Transaction;
