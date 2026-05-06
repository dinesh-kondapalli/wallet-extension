import l from "react";
import { c } from "./classnames-f1ed0714.js";
const s = "_visuallyHidden_1hgyy_1", n = "_decorator_1hgyy_11", r = "_label_1hgyy_25", i = "_input_1hgyy_35", o = "_circle_1hgyy_67", e = {
  visuallyHidden: s,
  decorator: n,
  label: r,
  input: i,
  circle: o
};
function d({ className: t, ...a }) {
  return /* @__PURE__ */ l.createElement("label", { className: c(e.label, t) }, /* @__PURE__ */ l.createElement(
    "input",
    {
      type: "checkbox",
      ...a,
      className: c(e.input, e.visuallyHidden)
    }
  ), /* @__PURE__ */ l.createElement("div", { className: e.decorator }, /* @__PURE__ */ l.createElement("div", { className: e.circle })));
}
export {
  d as Toggle
};
