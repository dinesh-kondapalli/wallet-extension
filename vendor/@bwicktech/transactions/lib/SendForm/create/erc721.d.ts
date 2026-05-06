interface Params {
    tokenId: string;
    tokenContract: string;
    from: string;
    to: string;
    chainId: string;
}
export declare function createSendTransaction({ from, to, chainId, tokenId, tokenContract, }: Params): {
    from: string;
    to: string;
    data: string;
    chainId: string;
};
export {};
