import { ethers } from 'ethers';
import { bech32 } from 'bech32';

const BECH32_CHARSET = '023456789acdefghjklmnpqrstuvwxyz';

export function isCosmosChainId(value: string) {
  return /^[a-z0-9][a-z0-9-]{1,62}$/.test(value);
}

export function isCosmosBech32Prefix(value: string) {
  return /^[a-z0-9]{1,20}$/.test(value);
}

export function isCosmosAddress(address: string) {
  if (address !== address.toLowerCase()) {
    return false;
  }
  const separator = address.lastIndexOf('1');
  if (separator <= 0 || separator + 7 > address.length) {
    return false;
  }
  const hrp = address.slice(0, separator);
  const data = address.slice(separator + 1);
  return (
    isCosmosBech32Prefix(hrp) &&
    data.length <= 87 &&
    [...data].every((char) => BECH32_CHARSET.includes(char))
  );
}

export function isCosmosAddressForPrefix(address: string, prefix: string) {
  return isCosmosAddress(address) && address.startsWith(`${prefix}1`);
}

export function deriveCosmosAddress({
  privateKey,
  prefix,
}: {
  privateKey: string;
  prefix: string;
}) {
  const compressedPublicKey = new ethers.SigningKey(privateKey)
    .compressedPublicKey;
  const sha256Hash = ethers.sha256(compressedPublicKey);
  const addressBytes = ethers.getBytes(ethers.ripemd160(sha256Hash));
  return bech32.encode(prefix, bech32.toWords(addressBytes));
}

export function guessCosmosNativeDenoms(symbol: string) {
  const normalized = symbol.trim().toLowerCase();
  if (!normalized) {
    return [];
  }
  return Array.from(new Set([`u${normalized}`, normalized]));
}
