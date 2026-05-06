/// <reference types="lodash" />
export declare class Chain {
    value: string;
    constructor(value: string);
    toString(): string;
}
export declare const createChain: ((chain: string) => Chain) & import('lodash').MemoizedFunction;
