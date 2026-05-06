import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType } from 'react';
import React from 'react';
export declare const textParams: {
    readonly 'headline/hero': readonly [40, 48, 500, "-0.5px"];
    readonly 'headline/h1': readonly [32, 36, 500, "-0.25px"];
    readonly 'headline/h2': readonly [24, 28, 500, "normal"];
    readonly 'headline/h3': readonly [20, 24, 500, "normal"];
    readonly 'body/accent': readonly [16, 24, 500, "0.25px"];
    readonly 'body/regular': readonly [16, 24, 400, "0.1px"];
    readonly 'small/accent': readonly [14, 20, 500, "0.3px"];
    readonly 'small/regular': readonly [14, 20, 400, "0.2px"];
    readonly 'caption/accent': readonly [12, 16, 500, "0.38px"];
    readonly 'caption/regular': readonly [12, 16, 400, "0.38px"];
};
export type Kind = keyof typeof textParams;
export interface Props {
    inline?: boolean;
    kind: Kind;
    color?: string;
}
export declare const UIText: <As extends ElementType = "div">({ as, inline, kind, color, className, style, ...props }: Props & {
    as?: As | undefined;
} & ComponentPropsWithoutRef<As> & {
    ref?: ComponentPropsWithRef<As>["ref"] | undefined;
}, ref: React.Ref<ComponentPropsWithRef<As>["ref"]>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
