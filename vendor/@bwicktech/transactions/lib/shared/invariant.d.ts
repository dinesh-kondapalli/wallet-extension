/**
 * Inspired by: https://www.npmjs.com/package/tiny-invariant
 */
export declare function invariant<T>(value: T | false | null | undefined, message: string | (() => Error)): asserts value is T;
