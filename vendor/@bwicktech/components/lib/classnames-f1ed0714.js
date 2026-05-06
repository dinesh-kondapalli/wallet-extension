function s(...r) {
  let t = "";
  for (let e = 0; e < arguments.length; e++) {
    const n = arguments[e];
    n && (t += t.length === 0 ? n : ` ${n}`);
  }
  return t;
}
export {
  s as c
};
