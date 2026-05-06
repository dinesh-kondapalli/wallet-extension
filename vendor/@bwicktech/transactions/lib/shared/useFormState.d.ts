export type NullablePartial<T> = {
    [P in keyof T]?: T[P] | null;
};
type Result<T extends object> = {
    state: NullablePartial<T>;
    handleChange: <K extends keyof T>(key: K, value?: T[K]) => void;
};
export declare function useSearchParamsState<T extends Record<string, unknown>>(keys: (keyof T)[]): readonly [Partial<T>, (setStateAction: (value: Partial<T>) => Partial<T>) => void];
export declare function useFormState<T extends Record<string, unknown>>({ defaultState, keys, onChange, }: {
    defaultState?: NullablePartial<T>;
    keys: (keyof T)[];
    onChange?: <K extends keyof T>(params: {
        key: K;
        value?: T[K];
        state: Partial<T>;
    }) => void;
}): Result<T>;
export {};
