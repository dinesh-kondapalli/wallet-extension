import n from "react";
import { c as u } from "./classnames-f1ed0714.js";
const h = "_uitext_tij8c_1", d = {
  uitext: h
}, f = {
  // [font-size, line-height, weight, letter-spacing]
  "headline/hero": [40, 48, 500, "-0.5px"],
  "headline/h1": [32, 36, 500, "-0.25px"],
  "headline/h2": [24, 28, 500, "normal"],
  "headline/h3": [20, 24, 500, "normal"],
  "body/accent": [16, 24, 500, "0.25px"],
  "body/regular": [16, 24, 400, "0.1px"],
  "small/accent": [14, 20, 500, "0.3px"],
  "small/regular": [14, 20, 400, "0.2px"],
  "caption/accent": [12, 16, 500, "0.38px"],
  "caption/regular": [12, 16, 400, "0.38px"]
}, g = (e) => {
  const t = f[e];
  if (!t)
    throw new Error(`Unsupported text kind: ${e}`);
  return t;
}, y = ({
  as: e,
  inline: t = !1,
  kind: r,
  color: a = "currentColor",
  className: o,
  style: i,
  ...l
}, s) => {
  const [c, p, x, m] = g(r);
  return n.createElement(e || "div", {
    ref: s,
    className: u(o, d.uitext),
    style: {
      display: t ? "inline-block" : void 0,
      fontSize: c,
      lineHeight: `${p}px`,
      fontWeight: x,
      letterSpacing: m,
      color: a,
      ...i
    },
    ...l
  });
}, S = n.forwardRef(
  y
);
export {
  S as UIText,
  f as uiTextParams
};
