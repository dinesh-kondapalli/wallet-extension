interface Params {
    tokenId: string;
    tokenContract: string;
    from: string;
    to: string;
    amount: string;
    chainId: string;
}
export declare function createSendTransaction({ from, to, amount, chainId, tokenId, tokenContract, }: Params): {
    from: string;
    to: string;
    data: string;
    chainId: string;
};
export {};
