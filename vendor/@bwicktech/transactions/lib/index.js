var oo = Object.defineProperty;
var co = (t, e, n) => e in t ? oo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var T = (t, e, n) => (co(t, typeof e != "symbol" ? e + "" : e, n), n), ir = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
};
var x = (t, e, n) => (ir(t, e, "read from private field"), n ? n.call(t) : e.get(t)), j = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
}, V = (t, e, n, r) => (ir(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n);
var ps = (t, e, n, r) => ({
  set _(s) {
    V(t, e, s, n);
  },
  get _() {
    return x(t, e, r);
  }
}), q = (t, e, n) => (ir(t, e, "access private method"), n);
import { useRef as ds, useState as Br, useEffect as pt, useMemo as _e, useCallback as Ri, useLayoutEffect as uo } from "react";
import { useAssetsPrices as En, useAddressNftPosition as lo } from "defi-sdk";
import { useSearchParams as fo } from "react-router-dom";
import { useQuery as gs } from "@tanstack/react-query";
function Tn(t) {
  return t != null;
}
var pn = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function Fr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function ho(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(n, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), n;
}
let po = () => ({
  events: {},
  emit(t, ...e) {
    (this.events[t] || []).forEach((n) => n(...e));
  },
  on(t, e) {
    return (this.events[t] = this.events[t] || []).push(e), () => this.events[t] = (this.events[t] || []).filter((n) => n !== e);
  }
});
const go = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createNanoEvents: po
}, Symbol.toStringTag, { value: "Module" })), yo = /* @__PURE__ */ ho(go);
var We, mo = yo, bo = /* @__PURE__ */ function() {
  function t(n) {
    this.state = void 0, this.emitter = void 0, this.state = n, this.emitter = mo.createNanoEvents();
  }
  var e = t.prototype;
  return e.on = function(n, r) {
    return this.emitter.on(n, r);
  }, e.getState = function() {
    return this.state;
  }, e.setState = function(n) {
    var r;
    if ((r = typeof n == "function" ? n(this.state) : n) !== this.state) {
      var s = this.state;
      this.state = r, this.emitter.emit("change", this.state, s);
    }
  }, e.setStateSilent = function(n) {
    this.state = n;
  }, t;
}();
We = bo;
function vo(t) {
  return "dispose" in t && !!t.dispose;
}
function gr(t, e) {
  const n = ds(e);
  n.current !== e && (n.current = e);
  const [r, s] = Br(() => t.getState()), i = ds(r), a = t.getState();
  return a !== r && (i.current !== a && n.current.some((o) => a[o] !== r[o]) && s(a), i.current = a), pt(() => {
    let o = !1;
    s(t.getState());
    const u = t.on("change", (f, m) => {
      !o && n.current && n.current.some((v) => f[v] !== m[v]) && s(f);
    });
    return () => {
      o = !0, u(), vo(t) && t.dispose();
    };
  }, [t]), r;
}
const An = {
  Ethereum: "ethereum",
  Polygon: "polygon",
  Celo: "celo",
  Base: "base",
  Zero: "zero"
};
var wo = typeof pn == "object" && pn && pn.Object === Object && pn, Ui = wo, $o = Ui, Eo = typeof self == "object" && self && self.Object === Object && self, To = $o || Eo || Function("return this")(), Me = To, Ao = Me, Oo = Ao.Symbol, Mt = Oo, ys = Mt, Li = Object.prototype, _o = Li.hasOwnProperty, xo = Li.toString, Xt = ys ? ys.toStringTag : void 0;
function So(t) {
  var e = _o.call(t, Xt), n = t[Xt];
  try {
    t[Xt] = void 0;
    var r = !0;
  } catch (i) {
  }
  var s = xo.call(t);
  return r && (e ? t[Xt] = n : delete t[Xt]), s;
}
var No = So, Io = Object.prototype, Po = Io.toString;
function Co(t) {
  return Po.call(t);
}
var ko = Co, ms = Mt, Ro = No, Uo = ko, Lo = "[object Null]", Bo = "[object Undefined]", bs = ms ? ms.toStringTag : void 0;
function Fo(t) {
  return t == null ? t === void 0 ? Bo : Lo : bs && bs in Object(t) ? Ro(t) : Uo(t);
}
var Gt = Fo;
function Do(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Vt = Do, Mo = Gt, Go = Vt, Vo = "[object AsyncFunction]", Ho = "[object Function]", jo = "[object GeneratorFunction]", Ko = "[object Proxy]";
function zo(t) {
  if (!Go(t))
    return !1;
  var e = Mo(t);
  return e == Ho || e == jo || e == Vo || e == Ko;
}
var Bi = zo, Wo = Me, Jo = Wo["__core-js_shared__"], Xo = Jo, ar = Xo, vs = function() {
  var t = /[^.]+$/.exec(ar && ar.keys && ar.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function qo(t) {
  return !!vs && vs in t;
}
var Yo = qo, Zo = Function.prototype, Qo = Zo.toString;
function ec(t) {
  if (t != null) {
    try {
      return Qo.call(t);
    } catch (e) {
    }
    try {
      return t + "";
    } catch (e) {
    }
  }
  return "";
}
var Fi = ec, tc = Bi, nc = Yo, rc = Vt, sc = Fi, ic = /[\\^$.*+?()[\]{}|]/g, ac = /^\[object .+?Constructor\]$/, oc = Function.prototype, cc = Object.prototype, uc = oc.toString, lc = cc.hasOwnProperty, fc = RegExp(
  "^" + uc.call(lc).replace(ic, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function hc(t) {
  if (!rc(t) || nc(t))
    return !1;
  var e = tc(t) ? fc : ac;
  return e.test(sc(t));
}
var pc = hc;
function dc(t, e) {
  return t == null ? void 0 : t[e];
}
var gc = dc, yc = pc, mc = gc;
function bc(t, e) {
  var n = mc(t, e);
  return yc(n) ? n : void 0;
}
var At = bc, vc = At, wc = vc(Object, "create"), Gn = wc, ws = Gn;
function $c() {
  this.__data__ = ws ? ws(null) : {}, this.size = 0;
}
var Ec = $c;
function Tc(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Ac = Tc, Oc = Gn, _c = "__lodash_hash_undefined__", xc = Object.prototype, Sc = xc.hasOwnProperty;
function Nc(t) {
  var e = this.__data__;
  if (Oc) {
    var n = e[t];
    return n === _c ? void 0 : n;
  }
  return Sc.call(e, t) ? e[t] : void 0;
}
var Ic = Nc, Pc = Gn, Cc = Object.prototype, kc = Cc.hasOwnProperty;
function Rc(t) {
  var e = this.__data__;
  return Pc ? e[t] !== void 0 : kc.call(e, t);
}
var Uc = Rc, Lc = Gn, Bc = "__lodash_hash_undefined__";
function Fc(t, e) {
  var n = this.__data__;
  return this.size += this.has(t) ? 0 : 1, n[t] = Lc && e === void 0 ? Bc : e, this;
}
var Dc = Fc, Mc = Ec, Gc = Ac, Vc = Ic, Hc = Uc, jc = Dc;
function Ht(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Ht.prototype.clear = Mc;
Ht.prototype.delete = Gc;
Ht.prototype.get = Vc;
Ht.prototype.has = Hc;
Ht.prototype.set = jc;
var Kc = Ht;
function zc() {
  this.__data__ = [], this.size = 0;
}
var Wc = zc;
function Jc(t, e) {
  return t === e || t !== t && e !== e;
}
var Dr = Jc, Xc = Dr;
function qc(t, e) {
  for (var n = t.length; n--; )
    if (Xc(t[n][0], e))
      return n;
  return -1;
}
var Vn = qc, Yc = Vn, Zc = Array.prototype, Qc = Zc.splice;
function eu(t) {
  var e = this.__data__, n = Yc(e, t);
  if (n < 0)
    return !1;
  var r = e.length - 1;
  return n == r ? e.pop() : Qc.call(e, n, 1), --this.size, !0;
}
var tu = eu, nu = Vn;
function ru(t) {
  var e = this.__data__, n = nu(e, t);
  return n < 0 ? void 0 : e[n][1];
}
var su = ru, iu = Vn;
function au(t) {
  return iu(this.__data__, t) > -1;
}
var ou = au, cu = Vn;
function uu(t, e) {
  var n = this.__data__, r = cu(n, t);
  return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
}
var lu = uu, fu = Wc, hu = tu, pu = su, du = ou, gu = lu;
function jt(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
jt.prototype.clear = fu;
jt.prototype.delete = hu;
jt.prototype.get = pu;
jt.prototype.has = du;
jt.prototype.set = gu;
var Hn = jt, yu = At, mu = Me, bu = yu(mu, "Map"), Mr = bu, $s = Kc, vu = Hn, wu = Mr;
function $u() {
  this.size = 0, this.__data__ = {
    hash: new $s(),
    map: new (wu || vu)(),
    string: new $s()
  };
}
var Eu = $u;
function Tu(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
var Au = Tu, Ou = Au;
function _u(t, e) {
  var n = t.__data__;
  return Ou(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
var jn = _u, xu = jn;
function Su(t) {
  var e = xu(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
var Nu = Su, Iu = jn;
function Pu(t) {
  return Iu(this, t).get(t);
}
var Cu = Pu, ku = jn;
function Ru(t) {
  return ku(this, t).has(t);
}
var Uu = Ru, Lu = jn;
function Bu(t, e) {
  var n = Lu(this, t), r = n.size;
  return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
}
var Fu = Bu, Du = Eu, Mu = Nu, Gu = Cu, Vu = Uu, Hu = Fu;
function Kt(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Kt.prototype.clear = Du;
Kt.prototype.delete = Mu;
Kt.prototype.get = Gu;
Kt.prototype.has = Vu;
Kt.prototype.set = Hu;
var Gr = Kt, Di = Gr, ju = "Expected a function";
function Vr(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(ju);
  var n = function() {
    var r = arguments, s = e ? e.apply(this, r) : r[0], i = n.cache;
    if (i.has(s))
      return i.get(s);
    var a = t.apply(this, r);
    return n.cache = i.set(s, a) || i, a;
  };
  return n.cache = new (Vr.Cache || Di)(), n;
}
Vr.Cache = Di;
var Mi = Vr;
const Ku = /* @__PURE__ */ Fr(Mi);
class zu {
  constructor(e) {
    T(this, "value");
    this.value = e;
  }
  toString() {
    return this.value;
  }
}
const Kn = Ku((t) => new zu(t));
class yr {
  constructor({ asset: e, chain: n }) {
    T(this, "asset");
    T(this, "quantity");
    T(this, "chain");
    T(this, "id");
    this.asset = e, this.quantity = "0", this.chain = n.toString(), this.id = e.id || e.asset_code;
  }
}
function Wu(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, s = Array(r); ++n < r; )
    s[n] = e(t[n], n, t);
  return s;
}
var Gi = Wu, Ju = Hn;
function Xu() {
  this.__data__ = new Ju(), this.size = 0;
}
var qu = Xu;
function Yu(t) {
  var e = this.__data__, n = e.delete(t);
  return this.size = e.size, n;
}
var Zu = Yu;
function Qu(t) {
  return this.__data__.get(t);
}
var el = Qu;
function tl(t) {
  return this.__data__.has(t);
}
var nl = tl, rl = Hn, sl = Mr, il = Gr, al = 200;
function ol(t, e) {
  var n = this.__data__;
  if (n instanceof rl) {
    var r = n.__data__;
    if (!sl || r.length < al - 1)
      return r.push([t, e]), this.size = ++n.size, this;
    n = this.__data__ = new il(r);
  }
  return n.set(t, e), this.size = n.size, this;
}
var cl = ol, ul = Hn, ll = qu, fl = Zu, hl = el, pl = nl, dl = cl;
function zt(t) {
  var e = this.__data__ = new ul(t);
  this.size = e.size;
}
zt.prototype.clear = ll;
zt.prototype.delete = fl;
zt.prototype.get = hl;
zt.prototype.has = pl;
zt.prototype.set = dl;
var Hr = zt;
function gl(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r && e(t[n], n, t) !== !1; )
    ;
  return t;
}
var yl = gl, ml = At, bl = function() {
  try {
    var t = ml(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch (e) {
  }
}(), Vi = bl, Es = Vi;
function vl(t, e, n) {
  e == "__proto__" && Es ? Es(t, e, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : t[e] = n;
}
var Hi = vl, wl = Hi, $l = Dr, El = Object.prototype, Tl = El.hasOwnProperty;
function Al(t, e, n) {
  var r = t[e];
  (!(Tl.call(t, e) && $l(r, n)) || n === void 0 && !(e in t)) && wl(t, e, n);
}
var ji = Al, Ol = ji, _l = Hi;
function xl(t, e, n, r) {
  var s = !n;
  n || (n = {});
  for (var i = -1, a = e.length; ++i < a; ) {
    var o = e[i], u = r ? r(n[o], t[o], o, n, t) : void 0;
    u === void 0 && (u = t[o]), s ? _l(n, o, u) : Ol(n, o, u);
  }
  return n;
}
var ln = xl;
function Sl(t, e) {
  for (var n = -1, r = Array(t); ++n < t; )
    r[n] = e(n);
  return r;
}
var Nl = Sl;
function Il(t) {
  return t != null && typeof t == "object";
}
var at = Il, Pl = Gt, Cl = at, kl = "[object Arguments]";
function Rl(t) {
  return Cl(t) && Pl(t) == kl;
}
var Ul = Rl, Ts = Ul, Ll = at, Ki = Object.prototype, Bl = Ki.hasOwnProperty, Fl = Ki.propertyIsEnumerable, Dl = Ts(function() {
  return arguments;
}()) ? Ts : function(t) {
  return Ll(t) && Bl.call(t, "callee") && !Fl.call(t, "callee");
}, jr = Dl, Ml = Array.isArray, Ge = Ml, In = { exports: {} };
function Gl() {
  return !1;
}
var Vl = Gl;
In.exports;
(function(t, e) {
  var n = Me, r = Vl, s = e && !e.nodeType && e, i = s && !0 && t && !t.nodeType && t, a = i && i.exports === s, o = a ? n.Buffer : void 0, u = o ? o.isBuffer : void 0, f = u || r;
  t.exports = f;
})(In, In.exports);
var Kr = In.exports, Hl = 9007199254740991, jl = /^(?:0|[1-9]\d*)$/;
function Kl(t, e) {
  var n = typeof t;
  return e = e == null ? Hl : e, !!e && (n == "number" || n != "symbol" && jl.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var zi = Kl, zl = 9007199254740991;
function Wl(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= zl;
}
var zr = Wl, Jl = Gt, Xl = zr, ql = at, Yl = "[object Arguments]", Zl = "[object Array]", Ql = "[object Boolean]", ef = "[object Date]", tf = "[object Error]", nf = "[object Function]", rf = "[object Map]", sf = "[object Number]", af = "[object Object]", of = "[object RegExp]", cf = "[object Set]", uf = "[object String]", lf = "[object WeakMap]", ff = "[object ArrayBuffer]", hf = "[object DataView]", pf = "[object Float32Array]", df = "[object Float64Array]", gf = "[object Int8Array]", yf = "[object Int16Array]", mf = "[object Int32Array]", bf = "[object Uint8Array]", vf = "[object Uint8ClampedArray]", wf = "[object Uint16Array]", $f = "[object Uint32Array]", J = {};
J[pf] = J[df] = J[gf] = J[yf] = J[mf] = J[bf] = J[vf] = J[wf] = J[$f] = !0;
J[Yl] = J[Zl] = J[ff] = J[Ql] = J[hf] = J[ef] = J[tf] = J[nf] = J[rf] = J[sf] = J[af] = J[of] = J[cf] = J[uf] = J[lf] = !1;
function Ef(t) {
  return ql(t) && Xl(t.length) && !!J[Jl(t)];
}
var Tf = Ef;
function Af(t) {
  return function(e) {
    return t(e);
  };
}
var Wr = Af, Pn = { exports: {} };
Pn.exports;
(function(t, e) {
  var n = Ui, r = e && !e.nodeType && e, s = r && !0 && t && !t.nodeType && t, i = s && s.exports === r, a = i && n.process, o = function() {
    try {
      var u = s && s.require && s.require("util").types;
      return u || a && a.binding && a.binding("util");
    } catch (f) {
    }
  }();
  t.exports = o;
})(Pn, Pn.exports);
var Jr = Pn.exports, Of = Tf, _f = Wr, As = Jr, Os = As && As.isTypedArray, xf = Os ? _f(Os) : Of, Wi = xf, Sf = Nl, Nf = jr, If = Ge, Pf = Kr, Cf = zi, kf = Wi, Rf = Object.prototype, Uf = Rf.hasOwnProperty;
function Lf(t, e) {
  var n = If(t), r = !n && Nf(t), s = !n && !r && Pf(t), i = !n && !r && !s && kf(t), a = n || r || s || i, o = a ? Sf(t.length, String) : [], u = o.length;
  for (var f in t)
    (e || Uf.call(t, f)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (f == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (f == "offset" || f == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (f == "buffer" || f == "byteLength" || f == "byteOffset") || // Skip index properties.
    Cf(f, u))) && o.push(f);
  return o;
}
var Ji = Lf, Bf = Object.prototype;
function Ff(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || Bf;
  return t === n;
}
var Xr = Ff;
function Df(t, e) {
  return function(n) {
    return t(e(n));
  };
}
var Xi = Df, Mf = Xi, Gf = Mf(Object.keys, Object), Vf = Gf, Hf = Xr, jf = Vf, Kf = Object.prototype, zf = Kf.hasOwnProperty;
function Wf(t) {
  if (!Hf(t))
    return jf(t);
  var e = [];
  for (var n in Object(t))
    zf.call(t, n) && n != "constructor" && e.push(n);
  return e;
}
var Jf = Wf, Xf = Bi, qf = zr;
function Yf(t) {
  return t != null && qf(t.length) && !Xf(t);
}
var qi = Yf, Zf = Ji, Qf = Jf, eh = qi;
function th(t) {
  return eh(t) ? Zf(t) : Qf(t);
}
var zn = th, nh = ln, rh = zn;
function sh(t, e) {
  return t && nh(e, rh(e), t);
}
var ih = sh;
function ah(t) {
  var e = [];
  if (t != null)
    for (var n in Object(t))
      e.push(n);
  return e;
}
var oh = ah, ch = Vt, uh = Xr, lh = oh, fh = Object.prototype, hh = fh.hasOwnProperty;
function ph(t) {
  if (!ch(t))
    return lh(t);
  var e = uh(t), n = [];
  for (var r in t)
    r == "constructor" && (e || !hh.call(t, r)) || n.push(r);
  return n;
}
var dh = ph, gh = Ji, yh = dh, mh = qi;
function bh(t) {
  return mh(t) ? gh(t, !0) : yh(t);
}
var qr = bh, vh = ln, wh = qr;
function $h(t, e) {
  return t && vh(e, wh(e), t);
}
var Eh = $h, Cn = { exports: {} };
Cn.exports;
(function(t, e) {
  var n = Me, r = e && !e.nodeType && e, s = r && !0 && t && !t.nodeType && t, i = s && s.exports === r, a = i ? n.Buffer : void 0, o = a ? a.allocUnsafe : void 0;
  function u(f, m) {
    if (m)
      return f.slice();
    var v = f.length, A = o ? o(v) : new f.constructor(v);
    return f.copy(A), A;
  }
  t.exports = u;
})(Cn, Cn.exports);
var Th = Cn.exports;
function Ah(t, e) {
  var n = -1, r = t.length;
  for (e || (e = Array(r)); ++n < r; )
    e[n] = t[n];
  return e;
}
var Oh = Ah;
function _h(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, s = 0, i = []; ++n < r; ) {
    var a = t[n];
    e(a, n, t) && (i[s++] = a);
  }
  return i;
}
var xh = _h;
function Sh() {
  return [];
}
var Yi = Sh, Nh = xh, Ih = Yi, Ph = Object.prototype, Ch = Ph.propertyIsEnumerable, _s = Object.getOwnPropertySymbols, kh = _s ? function(t) {
  return t == null ? [] : (t = Object(t), Nh(_s(t), function(e) {
    return Ch.call(t, e);
  }));
} : Ih, Yr = kh, Rh = ln, Uh = Yr;
function Lh(t, e) {
  return Rh(t, Uh(t), e);
}
var Bh = Lh;
function Fh(t, e) {
  for (var n = -1, r = e.length, s = t.length; ++n < r; )
    t[s + n] = e[n];
  return t;
}
var Zr = Fh, Dh = Xi, Mh = Dh(Object.getPrototypeOf, Object), Qr = Mh, Gh = Zr, Vh = Qr, Hh = Yr, jh = Yi, Kh = Object.getOwnPropertySymbols, zh = Kh ? function(t) {
  for (var e = []; t; )
    Gh(e, Hh(t)), t = Vh(t);
  return e;
} : jh, Zi = zh, Wh = ln, Jh = Zi;
function Xh(t, e) {
  return Wh(t, Jh(t), e);
}
var qh = Xh, Yh = Zr, Zh = Ge;
function Qh(t, e, n) {
  var r = e(t);
  return Zh(t) ? r : Yh(r, n(t));
}
var Qi = Qh, ep = Qi, tp = Yr, np = zn;
function rp(t) {
  return ep(t, np, tp);
}
var ea = rp, sp = Qi, ip = Zi, ap = qr;
function op(t) {
  return sp(t, ap, ip);
}
var ta = op, cp = At, up = Me, lp = cp(up, "DataView"), fp = lp, hp = At, pp = Me, dp = hp(pp, "Promise"), gp = dp, yp = At, mp = Me, bp = yp(mp, "Set"), vp = bp, wp = At, $p = Me, Ep = wp($p, "WeakMap"), Tp = Ep, mr = fp, br = Mr, vr = gp, wr = vp, $r = Tp, na = Gt, Wt = Fi, xs = "[object Map]", Ap = "[object Object]", Ss = "[object Promise]", Ns = "[object Set]", Is = "[object WeakMap]", Ps = "[object DataView]", Op = Wt(mr), _p = Wt(br), xp = Wt(vr), Sp = Wt(wr), Np = Wt($r), lt = na;
(mr && lt(new mr(new ArrayBuffer(1))) != Ps || br && lt(new br()) != xs || vr && lt(vr.resolve()) != Ss || wr && lt(new wr()) != Ns || $r && lt(new $r()) != Is) && (lt = function(t) {
  var e = na(t), n = e == Ap ? t.constructor : void 0, r = n ? Wt(n) : "";
  if (r)
    switch (r) {
      case Op:
        return Ps;
      case _p:
        return xs;
      case xp:
        return Ss;
      case Sp:
        return Ns;
      case Np:
        return Is;
    }
  return e;
});
var Wn = lt, Ip = Object.prototype, Pp = Ip.hasOwnProperty;
function Cp(t) {
  var e = t.length, n = new t.constructor(e);
  return e && typeof t[0] == "string" && Pp.call(t, "index") && (n.index = t.index, n.input = t.input), n;
}
var kp = Cp, Rp = Me, Up = Rp.Uint8Array, ra = Up, Cs = ra;
function Lp(t) {
  var e = new t.constructor(t.byteLength);
  return new Cs(e).set(new Cs(t)), e;
}
var es = Lp, Bp = es;
function Fp(t, e) {
  var n = e ? Bp(t.buffer) : t.buffer;
  return new t.constructor(n, t.byteOffset, t.byteLength);
}
var Dp = Fp, Mp = /\w*$/;
function Gp(t) {
  var e = new t.constructor(t.source, Mp.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var Vp = Gp, ks = Mt, Rs = ks ? ks.prototype : void 0, Us = Rs ? Rs.valueOf : void 0;
function Hp(t) {
  return Us ? Object(Us.call(t)) : {};
}
var jp = Hp, Kp = es;
function zp(t, e) {
  var n = e ? Kp(t.buffer) : t.buffer;
  return new t.constructor(n, t.byteOffset, t.length);
}
var Wp = zp, Jp = es, Xp = Dp, qp = Vp, Yp = jp, Zp = Wp, Qp = "[object Boolean]", ed = "[object Date]", td = "[object Map]", nd = "[object Number]", rd = "[object RegExp]", sd = "[object Set]", id = "[object String]", ad = "[object Symbol]", od = "[object ArrayBuffer]", cd = "[object DataView]", ud = "[object Float32Array]", ld = "[object Float64Array]", fd = "[object Int8Array]", hd = "[object Int16Array]", pd = "[object Int32Array]", dd = "[object Uint8Array]", gd = "[object Uint8ClampedArray]", yd = "[object Uint16Array]", md = "[object Uint32Array]";
function bd(t, e, n) {
  var r = t.constructor;
  switch (e) {
    case od:
      return Jp(t);
    case Qp:
    case ed:
      return new r(+t);
    case cd:
      return Xp(t, n);
    case ud:
    case ld:
    case fd:
    case hd:
    case pd:
    case dd:
    case gd:
    case yd:
    case md:
      return Zp(t, n);
    case td:
      return new r();
    case nd:
    case id:
      return new r(t);
    case rd:
      return qp(t);
    case sd:
      return new r();
    case ad:
      return Yp(t);
  }
}
var vd = bd, wd = Vt, Ls = Object.create, $d = function() {
  function t() {
  }
  return function(e) {
    if (!wd(e))
      return {};
    if (Ls)
      return Ls(e);
    t.prototype = e;
    var n = new t();
    return t.prototype = void 0, n;
  };
}(), Ed = $d, Td = Ed, Ad = Qr, Od = Xr;
function _d(t) {
  return typeof t.constructor == "function" && !Od(t) ? Td(Ad(t)) : {};
}
var xd = _d, Sd = Wn, Nd = at, Id = "[object Map]";
function Pd(t) {
  return Nd(t) && Sd(t) == Id;
}
var Cd = Pd, kd = Cd, Rd = Wr, Bs = Jr, Fs = Bs && Bs.isMap, Ud = Fs ? Rd(Fs) : kd, Ld = Ud, Bd = Wn, Fd = at, Dd = "[object Set]";
function Md(t) {
  return Fd(t) && Bd(t) == Dd;
}
var Gd = Md, Vd = Gd, Hd = Wr, Ds = Jr, Ms = Ds && Ds.isSet, jd = Ms ? Hd(Ms) : Vd, Kd = jd, zd = Hr, Wd = yl, Jd = ji, Xd = ih, qd = Eh, Yd = Th, Zd = Oh, Qd = Bh, eg = qh, tg = ea, ng = ta, rg = Wn, sg = kp, ig = vd, ag = xd, og = Ge, cg = Kr, ug = Ld, lg = Vt, fg = Kd, hg = zn, pg = qr, dg = 1, gg = 2, yg = 4, sa = "[object Arguments]", mg = "[object Array]", bg = "[object Boolean]", vg = "[object Date]", wg = "[object Error]", ia = "[object Function]", $g = "[object GeneratorFunction]", Eg = "[object Map]", Tg = "[object Number]", aa = "[object Object]", Ag = "[object RegExp]", Og = "[object Set]", _g = "[object String]", xg = "[object Symbol]", Sg = "[object WeakMap]", Ng = "[object ArrayBuffer]", Ig = "[object DataView]", Pg = "[object Float32Array]", Cg = "[object Float64Array]", kg = "[object Int8Array]", Rg = "[object Int16Array]", Ug = "[object Int32Array]", Lg = "[object Uint8Array]", Bg = "[object Uint8ClampedArray]", Fg = "[object Uint16Array]", Dg = "[object Uint32Array]", W = {};
W[sa] = W[mg] = W[Ng] = W[Ig] = W[bg] = W[vg] = W[Pg] = W[Cg] = W[kg] = W[Rg] = W[Ug] = W[Eg] = W[Tg] = W[aa] = W[Ag] = W[Og] = W[_g] = W[xg] = W[Lg] = W[Bg] = W[Fg] = W[Dg] = !0;
W[wg] = W[ia] = W[Sg] = !1;
function On(t, e, n, r, s, i) {
  var a, o = e & dg, u = e & gg, f = e & yg;
  if (n && (a = s ? n(t, r, s, i) : n(t)), a !== void 0)
    return a;
  if (!lg(t))
    return t;
  var m = og(t);
  if (m) {
    if (a = sg(t), !o)
      return Zd(t, a);
  } else {
    var v = rg(t), A = v == ia || v == $g;
    if (cg(t))
      return Yd(t, o);
    if (v == aa || v == sa || A && !s) {
      if (a = u || A ? {} : ag(t), !o)
        return u ? eg(t, qd(a, t)) : Qd(t, Xd(a, t));
    } else {
      if (!W[v])
        return s ? t : {};
      a = ig(t, v, o);
    }
  }
  i || (i = new zd());
  var N = i.get(t);
  if (N)
    return N;
  i.set(t, a), fg(t) ? t.forEach(function(L) {
    a.add(On(L, e, n, L, t, i));
  }) : ug(t) && t.forEach(function(L, R) {
    a.set(R, On(L, e, n, R, t, i));
  });
  var k = f ? u ? ng : tg : u ? pg : hg, C = m ? void 0 : k(t);
  return Wd(C || t, function(L, R) {
    C && (R = L, L = t[R]), Jd(a, R, On(L, e, n, R, t, i));
  }), a;
}
var Mg = On, Gg = Gt, Vg = at, Hg = "[object Symbol]";
function jg(t) {
  return typeof t == "symbol" || Vg(t) && Gg(t) == Hg;
}
var Jn = jg, Kg = Ge, zg = Jn, Wg = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Jg = /^\w*$/;
function Xg(t, e) {
  if (Kg(t))
    return !1;
  var n = typeof t;
  return n == "number" || n == "symbol" || n == "boolean" || t == null || zg(t) ? !0 : Jg.test(t) || !Wg.test(t) || e != null && t in Object(e);
}
var ts = Xg, qg = Mi, Yg = 500;
function Zg(t) {
  var e = qg(t, function(r) {
    return n.size === Yg && n.clear(), r;
  }), n = e.cache;
  return e;
}
var Qg = Zg, ey = Qg, ty = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ny = /\\(\\)?/g, ry = ey(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(ty, function(n, r, s, i) {
    e.push(s ? i.replace(ny, "$1") : r || n);
  }), e;
}), sy = ry, Gs = Mt, iy = Gi, ay = Ge, oy = Jn, cy = 1 / 0, Vs = Gs ? Gs.prototype : void 0, Hs = Vs ? Vs.toString : void 0;
function oa(t) {
  if (typeof t == "string")
    return t;
  if (ay(t))
    return iy(t, oa) + "";
  if (oy(t))
    return Hs ? Hs.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -cy ? "-0" : e;
}
var uy = oa, ly = uy;
function fy(t) {
  return t == null ? "" : ly(t);
}
var hy = fy, py = Ge, dy = ts, gy = sy, yy = hy;
function my(t, e) {
  return py(t) ? t : dy(t, e) ? [t] : gy(yy(t));
}
var Xn = my;
function by(t) {
  var e = t == null ? 0 : t.length;
  return e ? t[e - 1] : void 0;
}
var vy = by, wy = Jn, $y = 1 / 0;
function Ey(t) {
  if (typeof t == "string" || wy(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -$y ? "-0" : e;
}
var fn = Ey, Ty = Xn, Ay = fn;
function Oy(t, e) {
  e = Ty(e, t);
  for (var n = 0, r = e.length; t != null && n < r; )
    t = t[Ay(e[n++])];
  return n && n == r ? t : void 0;
}
var ns = Oy;
function _y(t, e, n) {
  var r = -1, s = t.length;
  e < 0 && (e = -e > s ? 0 : s + e), n = n > s ? s : n, n < 0 && (n += s), s = e > n ? 0 : n - e >>> 0, e >>>= 0;
  for (var i = Array(s); ++r < s; )
    i[r] = t[r + e];
  return i;
}
var xy = _y, Sy = ns, Ny = xy;
function Iy(t, e) {
  return e.length < 2 ? t : Sy(t, Ny(e, 0, -1));
}
var Py = Iy, Cy = Xn, ky = vy, Ry = Py, Uy = fn;
function Ly(t, e) {
  return e = Cy(e, t), t = Ry(t, e), t == null || delete t[Uy(ky(e))];
}
var By = Ly, Fy = Gt, Dy = Qr, My = at, Gy = "[object Object]", Vy = Function.prototype, Hy = Object.prototype, ca = Vy.toString, jy = Hy.hasOwnProperty, Ky = ca.call(Object);
function zy(t) {
  if (!My(t) || Fy(t) != Gy)
    return !1;
  var e = Dy(t);
  if (e === null)
    return !0;
  var n = jy.call(e, "constructor") && e.constructor;
  return typeof n == "function" && n instanceof n && ca.call(n) == Ky;
}
var Wy = zy, Jy = Wy;
function Xy(t) {
  return Jy(t) ? void 0 : t;
}
var qy = Xy, js = Mt, Yy = jr, Zy = Ge, Ks = js ? js.isConcatSpreadable : void 0;
function Qy(t) {
  return Zy(t) || Yy(t) || !!(Ks && t && t[Ks]);
}
var e0 = Qy, t0 = Zr, n0 = e0;
function ua(t, e, n, r, s) {
  var i = -1, a = t.length;
  for (n || (n = n0), s || (s = []); ++i < a; ) {
    var o = t[i];
    e > 0 && n(o) ? e > 1 ? ua(o, e - 1, n, r, s) : t0(s, o) : r || (s[s.length] = o);
  }
  return s;
}
var r0 = ua, s0 = r0;
function i0(t) {
  var e = t == null ? 0 : t.length;
  return e ? s0(t, 1) : [];
}
var a0 = i0;
function o0(t, e, n) {
  switch (n.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, n[0]);
    case 2:
      return t.call(e, n[0], n[1]);
    case 3:
      return t.call(e, n[0], n[1], n[2]);
  }
  return t.apply(e, n);
}
var c0 = o0, u0 = c0, zs = Math.max;
function l0(t, e, n) {
  return e = zs(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, s = -1, i = zs(r.length - e, 0), a = Array(i); ++s < i; )
      a[s] = r[e + s];
    s = -1;
    for (var o = Array(e + 1); ++s < e; )
      o[s] = r[s];
    return o[e] = n(a), u0(t, this, o);
  };
}
var f0 = l0;
function h0(t) {
  return function() {
    return t;
  };
}
var p0 = h0;
function d0(t) {
  return t;
}
var la = d0, g0 = p0, Ws = Vi, y0 = la, m0 = Ws ? function(t, e) {
  return Ws(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: g0(e),
    writable: !0
  });
} : y0, b0 = m0, v0 = 800, w0 = 16, $0 = Date.now;
function E0(t) {
  var e = 0, n = 0;
  return function() {
    var r = $0(), s = w0 - (r - n);
    if (n = r, s > 0) {
      if (++e >= v0)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
var T0 = E0, A0 = b0, O0 = T0, _0 = O0(A0), x0 = _0, S0 = a0, N0 = f0, I0 = x0;
function P0(t) {
  return I0(N0(t, void 0, S0), t + "");
}
var C0 = P0, k0 = Gi, R0 = Mg, U0 = By, L0 = Xn, B0 = ln, F0 = qy, D0 = C0, M0 = ta, G0 = 1, V0 = 2, H0 = 4, j0 = D0(function(t, e) {
  var n = {};
  if (t == null)
    return n;
  var r = !1;
  e = k0(e, function(i) {
    return i = L0(i, t), r || (r = i.length > 1), i;
  }), B0(t, M0(t), n), r && (n = R0(n, G0 | V0 | H0, F0));
  for (var s = e.length; s--; )
    U0(n, e[s]);
  return n;
}), K0 = j0;
const kn = /* @__PURE__ */ Fr(K0);
function Js(t, e) {
  const n = {};
  for (const r of t) {
    const s = e.get(r.toString());
    s && (n[r] = s);
  }
  return n;
}
function rs(t) {
  const [e, n] = fo(), r = _e(
    () => Js(t, e),
    [t, e]
  ), s = Ri(
    (i) => {
      n(
        (a) => {
          const o = i(
            Js(t, a)
          );
          for (const u of t) {
            const f = o[u];
            f ? a.set(u.toString(), f) : a.delete(u.toString());
          }
          return a;
        },
        { replace: !0 }
      );
    },
    [t, n]
  );
  return [r, s];
}
function Sw({
  defaultState: t,
  keys: e,
  onChange: n
}) {
  const [r, s] = rs(e), i = Ri(
    (a, o) => {
      const u = (f) => o === void 0 ? kn(f, [a]) : {
        ...f,
        [a]: o
      };
      s(u), n == null || n({ key: a, value: o, state: u(r) });
    },
    [n, r, s]
  );
  return {
    state: { ...t, ...r },
    handleChange: i
  };
}
var z0 = Jn;
function W0(t, e, n) {
  for (var r = -1, s = t.length; ++r < s; ) {
    var i = t[r], a = e(i);
    if (a != null && (o === void 0 ? a === a && !z0(a) : n(a, o)))
      var o = a, u = i;
  }
  return u;
}
var J0 = W0;
function X0(t, e) {
  return t > e;
}
var q0 = X0, Y0 = "__lodash_hash_undefined__";
function Z0(t) {
  return this.__data__.set(t, Y0), this;
}
var Q0 = Z0;
function em(t) {
  return this.__data__.has(t);
}
var tm = em, nm = Gr, rm = Q0, sm = tm;
function Rn(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.__data__ = new nm(); ++e < n; )
    this.add(t[e]);
}
Rn.prototype.add = Rn.prototype.push = rm;
Rn.prototype.has = sm;
var im = Rn;
function am(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (e(t[n], n, t))
      return !0;
  return !1;
}
var om = am;
function cm(t, e) {
  return t.has(e);
}
var um = cm, lm = im, fm = om, hm = um, pm = 1, dm = 2;
function gm(t, e, n, r, s, i) {
  var a = n & pm, o = t.length, u = e.length;
  if (o != u && !(a && u > o))
    return !1;
  var f = i.get(t), m = i.get(e);
  if (f && m)
    return f == e && m == t;
  var v = -1, A = !0, N = n & dm ? new lm() : void 0;
  for (i.set(t, e), i.set(e, t); ++v < o; ) {
    var k = t[v], C = e[v];
    if (r)
      var L = a ? r(C, k, v, e, t, i) : r(k, C, v, t, e, i);
    if (L !== void 0) {
      if (L)
        continue;
      A = !1;
      break;
    }
    if (N) {
      if (!fm(e, function(R, O) {
        if (!hm(N, O) && (k === R || s(k, R, n, r, i)))
          return N.push(O);
      })) {
        A = !1;
        break;
      }
    } else if (!(k === C || s(k, C, n, r, i))) {
      A = !1;
      break;
    }
  }
  return i.delete(t), i.delete(e), A;
}
var fa = gm;
function ym(t) {
  var e = -1, n = Array(t.size);
  return t.forEach(function(r, s) {
    n[++e] = [s, r];
  }), n;
}
var mm = ym;
function bm(t) {
  var e = -1, n = Array(t.size);
  return t.forEach(function(r) {
    n[++e] = r;
  }), n;
}
var vm = bm, Xs = Mt, qs = ra, wm = Dr, $m = fa, Em = mm, Tm = vm, Am = 1, Om = 2, _m = "[object Boolean]", xm = "[object Date]", Sm = "[object Error]", Nm = "[object Map]", Im = "[object Number]", Pm = "[object RegExp]", Cm = "[object Set]", km = "[object String]", Rm = "[object Symbol]", Um = "[object ArrayBuffer]", Lm = "[object DataView]", Ys = Xs ? Xs.prototype : void 0, or = Ys ? Ys.valueOf : void 0;
function Bm(t, e, n, r, s, i, a) {
  switch (n) {
    case Lm:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case Um:
      return !(t.byteLength != e.byteLength || !i(new qs(t), new qs(e)));
    case _m:
    case xm:
    case Im:
      return wm(+t, +e);
    case Sm:
      return t.name == e.name && t.message == e.message;
    case Pm:
    case km:
      return t == e + "";
    case Nm:
      var o = Em;
    case Cm:
      var u = r & Am;
      if (o || (o = Tm), t.size != e.size && !u)
        return !1;
      var f = a.get(t);
      if (f)
        return f == e;
      r |= Om, a.set(t, e);
      var m = $m(o(t), o(e), r, s, i, a);
      return a.delete(t), m;
    case Rm:
      if (or)
        return or.call(t) == or.call(e);
  }
  return !1;
}
var Fm = Bm, Zs = ea, Dm = 1, Mm = Object.prototype, Gm = Mm.hasOwnProperty;
function Vm(t, e, n, r, s, i) {
  var a = n & Dm, o = Zs(t), u = o.length, f = Zs(e), m = f.length;
  if (u != m && !a)
    return !1;
  for (var v = u; v--; ) {
    var A = o[v];
    if (!(a ? A in e : Gm.call(e, A)))
      return !1;
  }
  var N = i.get(t), k = i.get(e);
  if (N && k)
    return N == e && k == t;
  var C = !0;
  i.set(t, e), i.set(e, t);
  for (var L = a; ++v < u; ) {
    A = o[v];
    var R = t[A], O = e[A];
    if (r)
      var te = a ? r(O, R, A, e, t, i) : r(R, O, A, t, e, i);
    if (!(te === void 0 ? R === O || s(R, O, n, r, i) : te)) {
      C = !1;
      break;
    }
    L || (L = A == "constructor");
  }
  if (C && !L) {
    var ae = t.constructor, ne = e.constructor;
    ae != ne && "constructor" in t && "constructor" in e && !(typeof ae == "function" && ae instanceof ae && typeof ne == "function" && ne instanceof ne) && (C = !1);
  }
  return i.delete(t), i.delete(e), C;
}
var Hm = Vm, cr = Hr, jm = fa, Km = Fm, zm = Hm, Qs = Wn, ei = Ge, ti = Kr, Wm = Wi, Jm = 1, ni = "[object Arguments]", ri = "[object Array]", dn = "[object Object]", Xm = Object.prototype, si = Xm.hasOwnProperty;
function qm(t, e, n, r, s, i) {
  var a = ei(t), o = ei(e), u = a ? ri : Qs(t), f = o ? ri : Qs(e);
  u = u == ni ? dn : u, f = f == ni ? dn : f;
  var m = u == dn, v = f == dn, A = u == f;
  if (A && ti(t)) {
    if (!ti(e))
      return !1;
    a = !0, m = !1;
  }
  if (A && !m)
    return i || (i = new cr()), a || Wm(t) ? jm(t, e, n, r, s, i) : Km(t, e, u, n, r, s, i);
  if (!(n & Jm)) {
    var N = m && si.call(t, "__wrapped__"), k = v && si.call(e, "__wrapped__");
    if (N || k) {
      var C = N ? t.value() : t, L = k ? e.value() : e;
      return i || (i = new cr()), s(C, L, n, r, i);
    }
  }
  return A ? (i || (i = new cr()), zm(t, e, n, r, s, i)) : !1;
}
var Ym = qm, Zm = Ym, ii = at;
function ha(t, e, n, r, s) {
  return t === e ? !0 : t == null || e == null || !ii(t) && !ii(e) ? t !== t && e !== e : Zm(t, e, n, r, ha, s);
}
var pa = ha, Qm = Hr, e1 = pa, t1 = 1, n1 = 2;
function r1(t, e, n, r) {
  var s = n.length, i = s, a = !r;
  if (t == null)
    return !i;
  for (t = Object(t); s--; ) {
    var o = n[s];
    if (a && o[2] ? o[1] !== t[o[0]] : !(o[0] in t))
      return !1;
  }
  for (; ++s < i; ) {
    o = n[s];
    var u = o[0], f = t[u], m = o[1];
    if (a && o[2]) {
      if (f === void 0 && !(u in t))
        return !1;
    } else {
      var v = new Qm();
      if (r)
        var A = r(f, m, u, t, e, v);
      if (!(A === void 0 ? e1(m, f, t1 | n1, r, v) : A))
        return !1;
    }
  }
  return !0;
}
var s1 = r1, i1 = Vt;
function a1(t) {
  return t === t && !i1(t);
}
var da = a1, o1 = da, c1 = zn;
function u1(t) {
  for (var e = c1(t), n = e.length; n--; ) {
    var r = e[n], s = t[r];
    e[n] = [r, s, o1(s)];
  }
  return e;
}
var l1 = u1;
function f1(t, e) {
  return function(n) {
    return n == null ? !1 : n[t] === e && (e !== void 0 || t in Object(n));
  };
}
var ga = f1, h1 = s1, p1 = l1, d1 = ga;
function g1(t) {
  var e = p1(t);
  return e.length == 1 && e[0][2] ? d1(e[0][0], e[0][1]) : function(n) {
    return n === t || h1(n, t, e);
  };
}
var y1 = g1, m1 = ns;
function b1(t, e, n) {
  var r = t == null ? void 0 : m1(t, e);
  return r === void 0 ? n : r;
}
var v1 = b1;
function w1(t, e) {
  return t != null && e in Object(t);
}
var $1 = w1, E1 = Xn, T1 = jr, A1 = Ge, O1 = zi, _1 = zr, x1 = fn;
function S1(t, e, n) {
  e = E1(e, t);
  for (var r = -1, s = e.length, i = !1; ++r < s; ) {
    var a = x1(e[r]);
    if (!(i = t != null && n(t, a)))
      break;
    t = t[a];
  }
  return i || ++r != s ? i : (s = t == null ? 0 : t.length, !!s && _1(s) && O1(a, s) && (A1(t) || T1(t)));
}
var N1 = S1, I1 = $1, P1 = N1;
function C1(t, e) {
  return t != null && P1(t, e, I1);
}
var k1 = C1, R1 = pa, U1 = v1, L1 = k1, B1 = ts, F1 = da, D1 = ga, M1 = fn, G1 = 1, V1 = 2;
function H1(t, e) {
  return B1(t) && F1(e) ? D1(M1(t), e) : function(n) {
    var r = U1(n, t);
    return r === void 0 && r === e ? L1(n, t) : R1(e, r, G1 | V1);
  };
}
var j1 = H1;
function K1(t) {
  return function(e) {
    return e == null ? void 0 : e[t];
  };
}
var z1 = K1, W1 = ns;
function J1(t) {
  return function(e) {
    return W1(e, t);
  };
}
var X1 = J1, q1 = z1, Y1 = X1, Z1 = ts, Q1 = fn;
function eb(t) {
  return Z1(t) ? q1(Q1(t)) : Y1(t);
}
var tb = eb, nb = y1, rb = j1, sb = la, ib = Ge, ab = tb;
function ob(t) {
  return typeof t == "function" ? t : t == null ? sb : typeof t == "object" ? ib(t) ? rb(t[0], t[1]) : nb(t) : ab(t);
}
var cb = ob, ub = J0, lb = q0, fb = cb;
function hb(t, e) {
  return t && t.length ? ub(t, fb(e), lb) : void 0;
}
var pb = hb;
const db = /* @__PURE__ */ Fr(pb);
function Er(t) {
  return Number(t.value) || 0;
}
function ya(t, e) {
  const n = t.reduce(
    (r, s) => {
      var i;
      return s.type === "asset" && (!e || ((i = s.asset) == null ? void 0 : i.asset_code) === e) && (r[s.chain] = (r[s.chain] || 0) + Er(s)), r;
    },
    {}
  );
  return db(Object.keys(n), (r) => n[r]);
}
function Un(t) {
  return t ? t.sort((e, n) => Er(n) - Er(e)) : [];
}
var gb = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, ur = Math.ceil, Te = Math.floor, ge = "[BigNumber Error] ", ai = ge + "Number primitive has more than 15 significant digits: ", Se = 1e14, F = 14, lr = 9007199254740991, fr = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], tt = 1e7, ie = 1e9;
function ma(t) {
  var e, n, r, s = O.prototype = { constructor: O, toString: null, valueOf: null }, i = new O(1), a = 20, o = 4, u = -7, f = 21, m = -1e7, v = 1e7, A = !1, N = 1, k = 0, C = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, L = "0123456789abcdefghijklmnopqrstuvwxyz", R = !0;
  function O(c, l) {
    var h, w, d, y, E, p, g, $, b = this;
    if (!(b instanceof O))
      return new O(c, l);
    if (l == null) {
      if (c && c._isBigNumber === !0) {
        b.s = c.s, !c.c || c.e > v ? b.c = b.e = null : c.e < m ? b.c = [b.e = 0] : (b.e = c.e, b.c = c.c.slice());
        return;
      }
      if ((p = typeof c == "number") && c * 0 == 0) {
        if (b.s = 1 / c < 0 ? (c = -c, -1) : 1, c === ~~c) {
          for (y = 0, E = c; E >= 10; E /= 10, y++)
            ;
          y > v ? b.c = b.e = null : (b.e = y, b.c = [c]);
          return;
        }
        $ = String(c);
      } else {
        if (!gb.test($ = String(c)))
          return r(b, $, p);
        b.s = $.charCodeAt(0) == 45 ? ($ = $.slice(1), -1) : 1;
      }
      (y = $.indexOf(".")) > -1 && ($ = $.replace(".", "")), (E = $.search(/e/i)) > 0 ? (y < 0 && (y = E), y += +$.slice(E + 1), $ = $.substring(0, E)) : y < 0 && (y = $.length);
    } else {
      if (Y(l, 2, L.length, "Base"), l == 10 && R)
        return b = new O(c), X(b, a + b.e + 1, o);
      if ($ = String(c), p = typeof c == "number") {
        if (c * 0 != 0)
          return r(b, $, p, l);
        if (b.s = 1 / c < 0 ? ($ = $.slice(1), -1) : 1, O.DEBUG && $.replace(/^0\.0*|\./, "").length > 15)
          throw Error(ai + c);
      } else
        b.s = $.charCodeAt(0) === 45 ? ($ = $.slice(1), -1) : 1;
      for (h = L.slice(0, l), y = E = 0, g = $.length; E < g; E++)
        if (h.indexOf(w = $.charAt(E)) < 0) {
          if (w == ".") {
            if (E > y) {
              y = g;
              continue;
            }
          } else if (!d && ($ == $.toUpperCase() && ($ = $.toLowerCase()) || $ == $.toLowerCase() && ($ = $.toUpperCase()))) {
            d = !0, E = -1, y = 0;
            continue;
          }
          return r(b, String(c), p, l);
        }
      p = !1, $ = n($, l, 10, b.s), (y = $.indexOf(".")) > -1 ? $ = $.replace(".", "") : y = $.length;
    }
    for (E = 0; $.charCodeAt(E) === 48; E++)
      ;
    for (g = $.length; $.charCodeAt(--g) === 48; )
      ;
    if ($ = $.slice(E, ++g)) {
      if (g -= E, p && O.DEBUG && g > 15 && (c > lr || c !== Te(c)))
        throw Error(ai + b.s * c);
      if ((y = y - E - 1) > v)
        b.c = b.e = null;
      else if (y < m)
        b.c = [b.e = 0];
      else {
        if (b.e = y, b.c = [], E = (y + 1) % F, y < 0 && (E += F), E < g) {
          for (E && b.c.push(+$.slice(0, E)), g -= F; E < g; )
            b.c.push(+$.slice(E, E += F));
          E = F - ($ = $.slice(E)).length;
        } else
          E -= g;
        for (; E--; $ += "0")
          ;
        b.c.push(+$);
      }
    } else
      b.c = [b.e = 0];
  }
  O.clone = ma, O.ROUND_UP = 0, O.ROUND_DOWN = 1, O.ROUND_CEIL = 2, O.ROUND_FLOOR = 3, O.ROUND_HALF_UP = 4, O.ROUND_HALF_DOWN = 5, O.ROUND_HALF_EVEN = 6, O.ROUND_HALF_CEIL = 7, O.ROUND_HALF_FLOOR = 8, O.EUCLID = 9, O.config = O.set = function(c) {
    var l, h;
    if (c != null)
      if (typeof c == "object") {
        if (c.hasOwnProperty(l = "DECIMAL_PLACES") && (h = c[l], Y(h, 0, ie, l), a = h), c.hasOwnProperty(l = "ROUNDING_MODE") && (h = c[l], Y(h, 0, 8, l), o = h), c.hasOwnProperty(l = "EXPONENTIAL_AT") && (h = c[l], h && h.pop ? (Y(h[0], -ie, 0, l), Y(h[1], 0, ie, l), u = h[0], f = h[1]) : (Y(h, -ie, ie, l), u = -(f = h < 0 ? -h : h))), c.hasOwnProperty(l = "RANGE"))
          if (h = c[l], h && h.pop)
            Y(h[0], -ie, -1, l), Y(h[1], 1, ie, l), m = h[0], v = h[1];
          else if (Y(h, -ie, ie, l), h)
            m = -(v = h < 0 ? -h : h);
          else
            throw Error(ge + l + " cannot be zero: " + h);
        if (c.hasOwnProperty(l = "CRYPTO"))
          if (h = c[l], h === !!h)
            if (h)
              if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                A = h;
              else
                throw A = !h, Error(ge + "crypto unavailable");
            else
              A = h;
          else
            throw Error(ge + l + " not true or false: " + h);
        if (c.hasOwnProperty(l = "MODULO_MODE") && (h = c[l], Y(h, 0, 9, l), N = h), c.hasOwnProperty(l = "POW_PRECISION") && (h = c[l], Y(h, 0, ie, l), k = h), c.hasOwnProperty(l = "FORMAT"))
          if (h = c[l], typeof h == "object")
            C = h;
          else
            throw Error(ge + l + " not an object: " + h);
        if (c.hasOwnProperty(l = "ALPHABET"))
          if (h = c[l], typeof h == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(h))
            R = h.slice(0, 10) == "0123456789", L = h;
          else
            throw Error(ge + l + " invalid: " + h);
      } else
        throw Error(ge + "Object expected: " + c);
    return {
      DECIMAL_PLACES: a,
      ROUNDING_MODE: o,
      EXPONENTIAL_AT: [u, f],
      RANGE: [m, v],
      CRYPTO: A,
      MODULO_MODE: N,
      POW_PRECISION: k,
      FORMAT: C,
      ALPHABET: L
    };
  }, O.isBigNumber = function(c) {
    if (!c || c._isBigNumber !== !0)
      return !1;
    if (!O.DEBUG)
      return !0;
    var l, h, w = c.c, d = c.e, y = c.s;
    e:
      if ({}.toString.call(w) == "[object Array]") {
        if ((y === 1 || y === -1) && d >= -ie && d <= ie && d === Te(d)) {
          if (w[0] === 0) {
            if (d === 0 && w.length === 1)
              return !0;
            break e;
          }
          if (l = (d + 1) % F, l < 1 && (l += F), String(w[0]).length == l) {
            for (l = 0; l < w.length; l++)
              if (h = w[l], h < 0 || h >= Se || h !== Te(h))
                break e;
            if (h !== 0)
              return !0;
          }
        }
      } else if (w === null && d === null && (y === null || y === 1 || y === -1))
        return !0;
    throw Error(ge + "Invalid BigNumber: " + c);
  }, O.maximum = O.max = function() {
    return ae(arguments, -1);
  }, O.minimum = O.min = function() {
    return ae(arguments, 1);
  }, O.random = function() {
    var c = 9007199254740992, l = Math.random() * c & 2097151 ? function() {
      return Te(Math.random() * c);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(h) {
      var w, d, y, E, p, g = 0, $ = [], b = new O(i);
      if (h == null ? h = a : Y(h, 0, ie), E = ur(h / F), A)
        if (crypto.getRandomValues) {
          for (w = crypto.getRandomValues(new Uint32Array(E *= 2)); g < E; )
            p = w[g] * 131072 + (w[g + 1] >>> 11), p >= 9e15 ? (d = crypto.getRandomValues(new Uint32Array(2)), w[g] = d[0], w[g + 1] = d[1]) : ($.push(p % 1e14), g += 2);
          g = E / 2;
        } else if (crypto.randomBytes) {
          for (w = crypto.randomBytes(E *= 7); g < E; )
            p = (w[g] & 31) * 281474976710656 + w[g + 1] * 1099511627776 + w[g + 2] * 4294967296 + w[g + 3] * 16777216 + (w[g + 4] << 16) + (w[g + 5] << 8) + w[g + 6], p >= 9e15 ? crypto.randomBytes(7).copy(w, g) : ($.push(p % 1e14), g += 7);
          g = E / 7;
        } else
          throw A = !1, Error(ge + "crypto unavailable");
      if (!A)
        for (; g < E; )
          p = l(), p < 9e15 && ($[g++] = p % 1e14);
      for (E = $[--g], h %= F, E && h && (p = fr[F - h], $[g] = Te(E / p) * p); $[g] === 0; $.pop(), g--)
        ;
      if (g < 0)
        $ = [y = 0];
      else {
        for (y = -1; $[0] === 0; $.splice(0, 1), y -= F)
          ;
        for (g = 1, p = $[0]; p >= 10; p /= 10, g++)
          ;
        g < F && (y -= F - g);
      }
      return b.e = y, b.c = $, b;
    };
  }(), O.sum = function() {
    for (var c = 1, l = arguments, h = new O(l[0]); c < l.length; )
      h = h.plus(l[c++]);
    return h;
  }, n = function() {
    var c = "0123456789";
    function l(h, w, d, y) {
      for (var E, p = [0], g, $ = 0, b = h.length; $ < b; ) {
        for (g = p.length; g--; p[g] *= w)
          ;
        for (p[0] += y.indexOf(h.charAt($++)), E = 0; E < p.length; E++)
          p[E] > d - 1 && (p[E + 1] == null && (p[E + 1] = 0), p[E + 1] += p[E] / d | 0, p[E] %= d);
      }
      return p.reverse();
    }
    return function(h, w, d, y, E) {
      var p, g, $, b, _, U, I, D, z = h.indexOf("."), re = a, G = o;
      for (z >= 0 && (b = k, k = 0, h = h.replace(".", ""), D = new O(w), U = D.pow(h.length - z), k = b, D.c = l(
        Ve(Ee(U.c), U.e, "0"),
        10,
        d,
        c
      ), D.e = D.c.length), I = l(h, w, d, E ? (p = L, c) : (p = c, L)), $ = b = I.length; I[--b] == 0; I.pop())
        ;
      if (!I[0])
        return p.charAt(0);
      if (z < 0 ? --$ : (U.c = I, U.e = $, U.s = y, U = e(U, D, re, G, d), I = U.c, _ = U.r, $ = U.e), g = $ + re + 1, z = I[g], b = d / 2, _ = _ || g < 0 || I[g + 1] != null, _ = G < 4 ? (z != null || _) && (G == 0 || G == (U.s < 0 ? 3 : 2)) : z > b || z == b && (G == 4 || _ || G == 6 && I[g - 1] & 1 || G == (U.s < 0 ? 8 : 7)), g < 1 || !I[0])
        h = _ ? Ve(p.charAt(1), -re, p.charAt(0)) : p.charAt(0);
      else {
        if (I.length = g, _)
          for (--d; ++I[--g] > d; )
            I[g] = 0, g || (++$, I = [1].concat(I));
        for (b = I.length; !I[--b]; )
          ;
        for (z = 0, h = ""; z <= b; h += p.charAt(I[z++]))
          ;
        h = Ve(h, $, p.charAt(0));
      }
      return h;
    };
  }(), e = function() {
    function c(w, d, y) {
      var E, p, g, $, b = 0, _ = w.length, U = d % tt, I = d / tt | 0;
      for (w = w.slice(); _--; )
        g = w[_] % tt, $ = w[_] / tt | 0, E = I * g + $ * U, p = U * g + E % tt * tt + b, b = (p / y | 0) + (E / tt | 0) + I * $, w[_] = p % y;
      return b && (w = [b].concat(w)), w;
    }
    function l(w, d, y, E) {
      var p, g;
      if (y != E)
        g = y > E ? 1 : -1;
      else
        for (p = g = 0; p < y; p++)
          if (w[p] != d[p]) {
            g = w[p] > d[p] ? 1 : -1;
            break;
          }
      return g;
    }
    function h(w, d, y, E) {
      for (var p = 0; y--; )
        w[y] -= p, p = w[y] < d[y] ? 1 : 0, w[y] = p * E + w[y] - d[y];
      for (; !w[0] && w.length > 1; w.splice(0, 1))
        ;
    }
    return function(w, d, y, E, p) {
      var g, $, b, _, U, I, D, z, re, G, K, ue, hn, rr, sr, ke, Jt, $e = w.s == d.s ? 1 : -1, he = w.c, ee = d.c;
      if (!he || !he[0] || !ee || !ee[0])
        return new O(
          // Return NaN if either NaN, or both Infinity or 0.
          !w.s || !d.s || (he ? ee && he[0] == ee[0] : !ee) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            he && he[0] == 0 || !ee ? $e * 0 : $e / 0
          )
        );
      for (z = new O($e), re = z.c = [], $ = w.e - d.e, $e = y + $ + 1, p || (p = Se, $ = Ae(w.e / F) - Ae(d.e / F), $e = $e / F | 0), b = 0; ee[b] == (he[b] || 0); b++)
        ;
      if (ee[b] > (he[b] || 0) && $--, $e < 0)
        re.push(1), _ = !0;
      else {
        for (rr = he.length, ke = ee.length, b = 0, $e += 2, U = Te(p / (ee[0] + 1)), U > 1 && (ee = c(ee, U, p), he = c(he, U, p), ke = ee.length, rr = he.length), hn = ke, G = he.slice(0, ke), K = G.length; K < ke; G[K++] = 0)
          ;
        Jt = ee.slice(), Jt = [0].concat(Jt), sr = ee[0], ee[1] >= p / 2 && sr++;
        do {
          if (U = 0, g = l(ee, G, ke, K), g < 0) {
            if (ue = G[0], ke != K && (ue = ue * p + (G[1] || 0)), U = Te(ue / sr), U > 1)
              for (U >= p && (U = p - 1), I = c(ee, U, p), D = I.length, K = G.length; l(I, G, D, K) == 1; )
                U--, h(I, ke < D ? Jt : ee, D, p), D = I.length, g = 1;
            else
              U == 0 && (g = U = 1), I = ee.slice(), D = I.length;
            if (D < K && (I = [0].concat(I)), h(G, I, K, p), K = G.length, g == -1)
              for (; l(ee, G, ke, K) < 1; )
                U++, h(G, ke < K ? Jt : ee, K, p), K = G.length;
          } else
            g === 0 && (U++, G = [0]);
          re[b++] = U, G[0] ? G[K++] = he[hn] || 0 : (G = [he[hn]], K = 1);
        } while ((hn++ < rr || G[0] != null) && $e--);
        _ = G[0] != null, re[0] || re.splice(0, 1);
      }
      if (p == Se) {
        for (b = 1, $e = re[0]; $e >= 10; $e /= 10, b++)
          ;
        X(z, y + (z.e = b + $ * F - 1) + 1, E, _);
      } else
        z.e = $, z.r = +_;
      return z;
    };
  }();
  function te(c, l, h, w) {
    var d, y, E, p, g;
    if (h == null ? h = o : Y(h, 0, 8), !c.c)
      return c.toString();
    if (d = c.c[0], E = c.e, l == null)
      g = Ee(c.c), g = w == 1 || w == 2 && (E <= u || E >= f) ? yn(g, E) : Ve(g, E, "0");
    else if (c = X(new O(c), l, h), y = c.e, g = Ee(c.c), p = g.length, w == 1 || w == 2 && (l <= y || y <= u)) {
      for (; p < l; g += "0", p++)
        ;
      g = yn(g, y);
    } else if (l -= E, g = Ve(g, y, "0"), y + 1 > p) {
      if (--l > 0)
        for (g += "."; l--; g += "0")
          ;
    } else if (l += y - p, l > 0)
      for (y + 1 == p && (g += "."); l--; g += "0")
        ;
    return c.s < 0 && d ? "-" + g : g;
  }
  function ae(c, l) {
    for (var h, w, d = 1, y = new O(c[0]); d < c.length; d++)
      w = new O(c[d]), (!w.s || (h = ut(y, w)) === l || h === 0 && y.s === l) && (y = w);
    return y;
  }
  function ne(c, l, h) {
    for (var w = 1, d = l.length; !l[--d]; l.pop())
      ;
    for (d = l[0]; d >= 10; d /= 10, w++)
      ;
    return (h = w + h * F - 1) > v ? c.c = c.e = null : h < m ? c.c = [c.e = 0] : (c.e = h, c.c = l), c;
  }
  r = function() {
    var c = /^(-?)0([xbo])(?=\w[\w.]*$)/i, l = /^([^.]+)\.$/, h = /^\.([^.]+)$/, w = /^-?(Infinity|NaN)$/, d = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(y, E, p, g) {
      var $, b = p ? E : E.replace(d, "");
      if (w.test(b))
        y.s = isNaN(b) ? null : b < 0 ? -1 : 1;
      else {
        if (!p && (b = b.replace(c, function(_, U, I) {
          return $ = (I = I.toLowerCase()) == "x" ? 16 : I == "b" ? 2 : 8, !g || g == $ ? U : _;
        }), g && ($ = g, b = b.replace(l, "$1").replace(h, "0.$1")), E != b))
          return new O(b, $);
        if (O.DEBUG)
          throw Error(ge + "Not a" + (g ? " base " + g : "") + " number: " + E);
        y.s = null;
      }
      y.c = y.e = null;
    };
  }();
  function X(c, l, h, w) {
    var d, y, E, p, g, $, b, _ = c.c, U = fr;
    if (_) {
      e: {
        for (d = 1, p = _[0]; p >= 10; p /= 10, d++)
          ;
        if (y = l - d, y < 0)
          y += F, E = l, g = _[$ = 0], b = Te(g / U[d - E - 1] % 10);
        else if ($ = ur((y + 1) / F), $ >= _.length)
          if (w) {
            for (; _.length <= $; _.push(0))
              ;
            g = b = 0, d = 1, y %= F, E = y - F + 1;
          } else
            break e;
        else {
          for (g = p = _[$], d = 1; p >= 10; p /= 10, d++)
            ;
          y %= F, E = y - F + d, b = E < 0 ? 0 : Te(g / U[d - E - 1] % 10);
        }
        if (w = w || l < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        _[$ + 1] != null || (E < 0 ? g : g % U[d - E - 1]), w = h < 4 ? (b || w) && (h == 0 || h == (c.s < 0 ? 3 : 2)) : b > 5 || b == 5 && (h == 4 || w || h == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (y > 0 ? E > 0 ? g / U[d - E] : 0 : _[$ - 1]) % 10 & 1 || h == (c.s < 0 ? 8 : 7)), l < 1 || !_[0])
          return _.length = 0, w ? (l -= c.e + 1, _[0] = U[(F - l % F) % F], c.e = -l || 0) : _[0] = c.e = 0, c;
        if (y == 0 ? (_.length = $, p = 1, $--) : (_.length = $ + 1, p = U[F - y], _[$] = E > 0 ? Te(g / U[d - E] % U[E]) * p : 0), w)
          for (; ; )
            if ($ == 0) {
              for (y = 1, E = _[0]; E >= 10; E /= 10, y++)
                ;
              for (E = _[0] += p, p = 1; E >= 10; E /= 10, p++)
                ;
              y != p && (c.e++, _[0] == Se && (_[0] = 1));
              break;
            } else {
              if (_[$] += p, _[$] != Se)
                break;
              _[$--] = 0, p = 1;
            }
        for (y = _.length; _[--y] === 0; _.pop())
          ;
      }
      c.e > v ? c.c = c.e = null : c.e < m && (c.c = [c.e = 0]);
    }
    return c;
  }
  function Q(c) {
    var l, h = c.e;
    return h === null ? c.toString() : (l = Ee(c.c), l = h <= u || h >= f ? yn(l, h) : Ve(l, h, "0"), c.s < 0 ? "-" + l : l);
  }
  return s.absoluteValue = s.abs = function() {
    var c = new O(this);
    return c.s < 0 && (c.s = 1), c;
  }, s.comparedTo = function(c, l) {
    return ut(this, new O(c, l));
  }, s.decimalPlaces = s.dp = function(c, l) {
    var h, w, d, y = this;
    if (c != null)
      return Y(c, 0, ie), l == null ? l = o : Y(l, 0, 8), X(new O(y), c + y.e + 1, l);
    if (!(h = y.c))
      return null;
    if (w = ((d = h.length - 1) - Ae(this.e / F)) * F, d = h[d])
      for (; d % 10 == 0; d /= 10, w--)
        ;
    return w < 0 && (w = 0), w;
  }, s.dividedBy = s.div = function(c, l) {
    return e(this, new O(c, l), a, o);
  }, s.dividedToIntegerBy = s.idiv = function(c, l) {
    return e(this, new O(c, l), 0, 1);
  }, s.exponentiatedBy = s.pow = function(c, l) {
    var h, w, d, y, E, p, g, $, b, _ = this;
    if (c = new O(c), c.c && !c.isInteger())
      throw Error(ge + "Exponent not an integer: " + Q(c));
    if (l != null && (l = new O(l)), p = c.e > 14, !_.c || !_.c[0] || _.c[0] == 1 && !_.e && _.c.length == 1 || !c.c || !c.c[0])
      return b = new O(Math.pow(+Q(_), p ? c.s * (2 - gn(c)) : +Q(c))), l ? b.mod(l) : b;
    if (g = c.s < 0, l) {
      if (l.c ? !l.c[0] : !l.s)
        return new O(NaN);
      w = !g && _.isInteger() && l.isInteger(), w && (_ = _.mod(l));
    } else {
      if (c.e > 9 && (_.e > 0 || _.e < -1 || (_.e == 0 ? _.c[0] > 1 || p && _.c[1] >= 24e7 : _.c[0] < 8e13 || p && _.c[0] <= 9999975e7)))
        return y = _.s < 0 && gn(c) ? -0 : 0, _.e > -1 && (y = 1 / y), new O(g ? 1 / y : y);
      k && (y = ur(k / F + 2));
    }
    for (p ? (h = new O(0.5), g && (c.s = 1), $ = gn(c)) : (d = Math.abs(+Q(c)), $ = d % 2), b = new O(i); ; ) {
      if ($) {
        if (b = b.times(_), !b.c)
          break;
        y ? b.c.length > y && (b.c.length = y) : w && (b = b.mod(l));
      }
      if (d) {
        if (d = Te(d / 2), d === 0)
          break;
        $ = d % 2;
      } else if (c = c.times(h), X(c, c.e + 1, 1), c.e > 14)
        $ = gn(c);
      else {
        if (d = +Q(c), d === 0)
          break;
        $ = d % 2;
      }
      _ = _.times(_), y ? _.c && _.c.length > y && (_.c.length = y) : w && (_ = _.mod(l));
    }
    return w ? b : (g && (b = i.div(b)), l ? b.mod(l) : y ? X(b, k, o, E) : b);
  }, s.integerValue = function(c) {
    var l = new O(this);
    return c == null ? c = o : Y(c, 0, 8), X(l, l.e + 1, c);
  }, s.isEqualTo = s.eq = function(c, l) {
    return ut(this, new O(c, l)) === 0;
  }, s.isFinite = function() {
    return !!this.c;
  }, s.isGreaterThan = s.gt = function(c, l) {
    return ut(this, new O(c, l)) > 0;
  }, s.isGreaterThanOrEqualTo = s.gte = function(c, l) {
    return (l = ut(this, new O(c, l))) === 1 || l === 0;
  }, s.isInteger = function() {
    return !!this.c && Ae(this.e / F) > this.c.length - 2;
  }, s.isLessThan = s.lt = function(c, l) {
    return ut(this, new O(c, l)) < 0;
  }, s.isLessThanOrEqualTo = s.lte = function(c, l) {
    return (l = ut(this, new O(c, l))) === -1 || l === 0;
  }, s.isNaN = function() {
    return !this.s;
  }, s.isNegative = function() {
    return this.s < 0;
  }, s.isPositive = function() {
    return this.s > 0;
  }, s.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, s.minus = function(c, l) {
    var h, w, d, y, E = this, p = E.s;
    if (c = new O(c, l), l = c.s, !p || !l)
      return new O(NaN);
    if (p != l)
      return c.s = -l, E.plus(c);
    var g = E.e / F, $ = c.e / F, b = E.c, _ = c.c;
    if (!g || !$) {
      if (!b || !_)
        return b ? (c.s = -l, c) : new O(_ ? E : NaN);
      if (!b[0] || !_[0])
        return _[0] ? (c.s = -l, c) : new O(b[0] ? E : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          o == 3 ? -0 : 0
        ));
    }
    if (g = Ae(g), $ = Ae($), b = b.slice(), p = g - $) {
      for ((y = p < 0) ? (p = -p, d = b) : ($ = g, d = _), d.reverse(), l = p; l--; d.push(0))
        ;
      d.reverse();
    } else
      for (w = (y = (p = b.length) < (l = _.length)) ? p : l, p = l = 0; l < w; l++)
        if (b[l] != _[l]) {
          y = b[l] < _[l];
          break;
        }
    if (y && (d = b, b = _, _ = d, c.s = -c.s), l = (w = _.length) - (h = b.length), l > 0)
      for (; l--; b[h++] = 0)
        ;
    for (l = Se - 1; w > p; ) {
      if (b[--w] < _[w]) {
        for (h = w; h && !b[--h]; b[h] = l)
          ;
        --b[h], b[w] += Se;
      }
      b[w] -= _[w];
    }
    for (; b[0] == 0; b.splice(0, 1), --$)
      ;
    return b[0] ? ne(c, b, $) : (c.s = o == 3 ? -1 : 1, c.c = [c.e = 0], c);
  }, s.modulo = s.mod = function(c, l) {
    var h, w, d = this;
    return c = new O(c, l), !d.c || !c.s || c.c && !c.c[0] ? new O(NaN) : !c.c || d.c && !d.c[0] ? new O(d) : (N == 9 ? (w = c.s, c.s = 1, h = e(d, c, 0, 3), c.s = w, h.s *= w) : h = e(d, c, 0, N), c = d.minus(h.times(c)), !c.c[0] && N == 1 && (c.s = d.s), c);
  }, s.multipliedBy = s.times = function(c, l) {
    var h, w, d, y, E, p, g, $, b, _, U, I, D, z, re, G = this, K = G.c, ue = (c = new O(c, l)).c;
    if (!K || !ue || !K[0] || !ue[0])
      return !G.s || !c.s || K && !K[0] && !ue || ue && !ue[0] && !K ? c.c = c.e = c.s = null : (c.s *= G.s, !K || !ue ? c.c = c.e = null : (c.c = [0], c.e = 0)), c;
    for (w = Ae(G.e / F) + Ae(c.e / F), c.s *= G.s, g = K.length, _ = ue.length, g < _ && (D = K, K = ue, ue = D, d = g, g = _, _ = d), d = g + _, D = []; d--; D.push(0))
      ;
    for (z = Se, re = tt, d = _; --d >= 0; ) {
      for (h = 0, U = ue[d] % re, I = ue[d] / re | 0, E = g, y = d + E; y > d; )
        $ = K[--E] % re, b = K[E] / re | 0, p = I * $ + b * U, $ = U * $ + p % re * re + D[y] + h, h = ($ / z | 0) + (p / re | 0) + I * b, D[y--] = $ % z;
      D[y] = h;
    }
    return h ? ++w : D.splice(0, 1), ne(c, D, w);
  }, s.negated = function() {
    var c = new O(this);
    return c.s = -c.s || null, c;
  }, s.plus = function(c, l) {
    var h, w = this, d = w.s;
    if (c = new O(c, l), l = c.s, !d || !l)
      return new O(NaN);
    if (d != l)
      return c.s = -l, w.minus(c);
    var y = w.e / F, E = c.e / F, p = w.c, g = c.c;
    if (!y || !E) {
      if (!p || !g)
        return new O(d / 0);
      if (!p[0] || !g[0])
        return g[0] ? c : new O(p[0] ? w : d * 0);
    }
    if (y = Ae(y), E = Ae(E), p = p.slice(), d = y - E) {
      for (d > 0 ? (E = y, h = g) : (d = -d, h = p), h.reverse(); d--; h.push(0))
        ;
      h.reverse();
    }
    for (d = p.length, l = g.length, d - l < 0 && (h = g, g = p, p = h, l = d), d = 0; l; )
      d = (p[--l] = p[l] + g[l] + d) / Se | 0, p[l] = Se === p[l] ? 0 : p[l] % Se;
    return d && (p = [d].concat(p), ++E), ne(c, p, E);
  }, s.precision = s.sd = function(c, l) {
    var h, w, d, y = this;
    if (c != null && c !== !!c)
      return Y(c, 1, ie), l == null ? l = o : Y(l, 0, 8), X(new O(y), c, l);
    if (!(h = y.c))
      return null;
    if (d = h.length - 1, w = d * F + 1, d = h[d]) {
      for (; d % 10 == 0; d /= 10, w--)
        ;
      for (d = h[0]; d >= 10; d /= 10, w++)
        ;
    }
    return c && y.e + 1 > w && (w = y.e + 1), w;
  }, s.shiftedBy = function(c) {
    return Y(c, -lr, lr), this.times("1e" + c);
  }, s.squareRoot = s.sqrt = function() {
    var c, l, h, w, d, y = this, E = y.c, p = y.s, g = y.e, $ = a + 4, b = new O("0.5");
    if (p !== 1 || !E || !E[0])
      return new O(!p || p < 0 && (!E || E[0]) ? NaN : E ? y : 1 / 0);
    if (p = Math.sqrt(+Q(y)), p == 0 || p == 1 / 0 ? (l = Ee(E), (l.length + g) % 2 == 0 && (l += "0"), p = Math.sqrt(+l), g = Ae((g + 1) / 2) - (g < 0 || g % 2), p == 1 / 0 ? l = "5e" + g : (l = p.toExponential(), l = l.slice(0, l.indexOf("e") + 1) + g), h = new O(l)) : h = new O(p + ""), h.c[0]) {
      for (g = h.e, p = g + $, p < 3 && (p = 0); ; )
        if (d = h, h = b.times(d.plus(e(y, d, $, 1))), Ee(d.c).slice(0, p) === (l = Ee(h.c)).slice(0, p))
          if (h.e < g && --p, l = l.slice(p - 3, p + 1), l == "9999" || !w && l == "4999") {
            if (!w && (X(d, d.e + a + 2, 0), d.times(d).eq(y))) {
              h = d;
              break;
            }
            $ += 4, p += 4, w = 1;
          } else {
            (!+l || !+l.slice(1) && l.charAt(0) == "5") && (X(h, h.e + a + 2, 1), c = !h.times(h).eq(y));
            break;
          }
    }
    return X(h, h.e + a + 1, o, c);
  }, s.toExponential = function(c, l) {
    return c != null && (Y(c, 0, ie), c++), te(this, c, l, 1);
  }, s.toFixed = function(c, l) {
    return c != null && (Y(c, 0, ie), c = c + this.e + 1), te(this, c, l);
  }, s.toFormat = function(c, l, h) {
    var w, d = this;
    if (h == null)
      c != null && l && typeof l == "object" ? (h = l, l = null) : c && typeof c == "object" ? (h = c, c = l = null) : h = C;
    else if (typeof h != "object")
      throw Error(ge + "Argument not an object: " + h);
    if (w = d.toFixed(c, l), d.c) {
      var y, E = w.split("."), p = +h.groupSize, g = +h.secondaryGroupSize, $ = h.groupSeparator || "", b = E[0], _ = E[1], U = d.s < 0, I = U ? b.slice(1) : b, D = I.length;
      if (g && (y = p, p = g, g = y, D -= y), p > 0 && D > 0) {
        for (y = D % p || p, b = I.substr(0, y); y < D; y += p)
          b += $ + I.substr(y, p);
        g > 0 && (b += $ + I.slice(y)), U && (b = "-" + b);
      }
      w = _ ? b + (h.decimalSeparator || "") + ((g = +h.fractionGroupSize) ? _.replace(
        new RegExp("\\d{" + g + "}\\B", "g"),
        "$&" + (h.fractionGroupSeparator || "")
      ) : _) : b;
    }
    return (h.prefix || "") + w + (h.suffix || "");
  }, s.toFraction = function(c) {
    var l, h, w, d, y, E, p, g, $, b, _, U, I = this, D = I.c;
    if (c != null && (p = new O(c), !p.isInteger() && (p.c || p.s !== 1) || p.lt(i)))
      throw Error(ge + "Argument " + (p.isInteger() ? "out of range: " : "not an integer: ") + Q(p));
    if (!D)
      return new O(I);
    for (l = new O(i), $ = h = new O(i), w = g = new O(i), U = Ee(D), y = l.e = U.length - I.e - 1, l.c[0] = fr[(E = y % F) < 0 ? F + E : E], c = !c || p.comparedTo(l) > 0 ? y > 0 ? l : $ : p, E = v, v = 1 / 0, p = new O(U), g.c[0] = 0; b = e(p, l, 0, 1), d = h.plus(b.times(w)), d.comparedTo(c) != 1; )
      h = w, w = d, $ = g.plus(b.times(d = $)), g = d, l = p.minus(b.times(d = l)), p = d;
    return d = e(c.minus(h), w, 0, 1), g = g.plus(d.times($)), h = h.plus(d.times(w)), g.s = $.s = I.s, y = y * 2, _ = e($, w, y, o).minus(I).abs().comparedTo(
      e(g, h, y, o).minus(I).abs()
    ) < 1 ? [$, w] : [g, h], v = E, _;
  }, s.toNumber = function() {
    return +Q(this);
  }, s.toPrecision = function(c, l) {
    return c != null && Y(c, 1, ie), te(this, c, l, 2);
  }, s.toString = function(c) {
    var l, h = this, w = h.s, d = h.e;
    return d === null ? w ? (l = "Infinity", w < 0 && (l = "-" + l)) : l = "NaN" : (c == null ? l = d <= u || d >= f ? yn(Ee(h.c), d) : Ve(Ee(h.c), d, "0") : c === 10 && R ? (h = X(new O(h), a + d + 1, o), l = Ve(Ee(h.c), h.e, "0")) : (Y(c, 2, L.length, "Base"), l = n(Ve(Ee(h.c), d, "0"), 10, c, w, !0)), w < 0 && h.c[0] && (l = "-" + l)), l;
  }, s.valueOf = s.toJSON = function() {
    return Q(this);
  }, s._isBigNumber = !0, s[Symbol.toStringTag] = "BigNumber", s[Symbol.for("nodejs.util.inspect.custom")] = s.valueOf, t != null && O.set(t), O;
}
function Ae(t) {
  var e = t | 0;
  return t > 0 || t === e ? e : e - 1;
}
function Ee(t) {
  for (var e, n, r = 1, s = t.length, i = t[0] + ""; r < s; ) {
    for (e = t[r++] + "", n = F - e.length; n--; e = "0" + e)
      ;
    i += e;
  }
  for (s = i.length; i.charCodeAt(--s) === 48; )
    ;
  return i.slice(0, s + 1 || 1);
}
function ut(t, e) {
  var n, r, s = t.c, i = e.c, a = t.s, o = e.s, u = t.e, f = e.e;
  if (!a || !o)
    return null;
  if (n = s && !s[0], r = i && !i[0], n || r)
    return n ? r ? 0 : -o : a;
  if (a != o)
    return a;
  if (n = a < 0, r = u == f, !s || !i)
    return r ? 0 : !s ^ n ? 1 : -1;
  if (!r)
    return u > f ^ n ? 1 : -1;
  for (o = (u = s.length) < (f = i.length) ? u : f, a = 0; a < o; a++)
    if (s[a] != i[a])
      return s[a] > i[a] ^ n ? 1 : -1;
  return u == f ? 0 : u > f ^ n ? 1 : -1;
}
function Y(t, e, n, r) {
  if (t < e || t > n || t !== Te(t))
    throw Error(ge + (r || "Argument") + (typeof t == "number" ? t < e || t > n ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(t));
}
function gn(t) {
  var e = t.c.length - 1;
  return Ae(t.e / F) == e && t.c[e] % 2 != 0;
}
function yn(t, e) {
  return (t.length > 1 ? t.charAt(0) + "." + t.slice(1) : t) + (e < 0 ? "e" : "e+") + e;
}
function Ve(t, e, n) {
  var r, s;
  if (e < 0) {
    for (s = n + "."; ++e; s += n)
      ;
    t = s + t;
  } else if (r = t.length, ++e > r) {
    for (s = n, e -= r; --e; s += n)
      ;
    t += s;
  } else
    e < r && (t = t.slice(0, e) + "." + t.slice(e));
  return t;
}
var yb = ma();
function mb(t, e) {
  return new yb(t).shiftedBy(e);
}
function ba({
  asset: t,
  chain: e
}) {
  var n;
  return (n = t == null ? void 0 : t.implementations) == null ? void 0 : n[String(e)];
}
function bb({ asset: t, chain: e }) {
  var n;
  return ((n = ba({ asset: t, chain: e })) == null ? void 0 : n.decimals) || t.decimals;
}
function vb({
  asset: t,
  chain: e
}) {
  const n = ba({ asset: t, chain: e });
  return n ? n.address : void 0;
}
const wb = "6.13.4";
function $b(t, e, n) {
  const r = e.split("|").map((i) => i.trim());
  for (let i = 0; i < r.length; i++)
    switch (e) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof t === e)
          return;
    }
  const s = new Error(`invalid value for type ${e}`);
  throw s.code = "INVALID_ARGUMENT", s.argument = `value.${n}`, s.value = t, s;
}
async function Tr(t) {
  const e = Object.keys(t);
  return (await Promise.all(e.map((r) => Promise.resolve(t[r])))).reduce((r, s, i) => (r[e[i]] = s, r), {});
}
function M(t, e, n) {
  for (let r in e) {
    let s = e[r];
    const i = n ? n[r] : null;
    i && $b(s, i, r), Object.defineProperty(t, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function xt(t) {
  if (t == null)
    return "null";
  if (Array.isArray(t))
    return "[ " + t.map(xt).join(", ") + " ]";
  if (t instanceof Uint8Array) {
    const e = "0123456789abcdef";
    let n = "0x";
    for (let r = 0; r < t.length; r++)
      n += e[t[r] >> 4], n += e[t[r] & 15];
    return n;
  }
  if (typeof t == "object" && typeof t.toJSON == "function")
    return xt(t.toJSON());
  switch (typeof t) {
    case "boolean":
    case "symbol":
      return t.toString();
    case "bigint":
      return BigInt(t).toString();
    case "number":
      return t.toString();
    case "string":
      return JSON.stringify(t);
    case "object": {
      const e = Object.keys(t);
      return e.sort(), "{ " + e.map((n) => `${xt(n)}: ${xt(t[n])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function Ft(t, e) {
  return t && t.code === e;
}
function va(t) {
  return Ft(t, "CALL_EXCEPTION");
}
function en(t, e, n) {
  let r = t;
  {
    const i = [];
    if (n) {
      if ("message" in n || "code" in n || "name" in n)
        throw new Error(`value will overwrite populated values: ${xt(n)}`);
      for (const a in n) {
        if (a === "shortMessage")
          continue;
        const o = n[a];
        i.push(a + "=" + xt(o));
      }
    }
    i.push(`code=${e}`), i.push(`version=${wb}`), i.length && (t += " (" + i.join(", ") + ")");
  }
  let s;
  switch (e) {
    case "INVALID_ARGUMENT":
      s = new TypeError(t);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      s = new RangeError(t);
      break;
    default:
      s = new Error(t);
  }
  return M(s, { code: e }), n && Object.assign(s, n), s.shortMessage == null && M(s, { shortMessage: r }), s;
}
function B(t, e, n, r) {
  if (!t)
    throw en(e, n, r);
}
function S(t, e, n, r) {
  B(t, e, "INVALID_ARGUMENT", { argument: n, value: r });
}
function wa(t, e, n) {
  n == null && (n = ""), n && (n = ": " + n), B(t >= e, "missing arguemnt" + n, "MISSING_ARGUMENT", {
    count: t,
    expectedCount: e
  }), B(t <= e, "too many arguments" + n, "UNEXPECTED_ARGUMENT", {
    count: t,
    expectedCount: e
  });
}
const Eb = ["NFD", "NFC", "NFKD", "NFKC"].reduce((t, e) => {
  try {
    if ("test".normalize(e) !== "test")
      throw new Error("bad");
    if (e === "NFD") {
      const n = String.fromCharCode(233).normalize("NFD"), r = String.fromCharCode(101, 769);
      if (n !== r)
        throw new Error("broken");
    }
    t.push(e);
  } catch (n) {
  }
  return t;
}, []);
function Tb(t) {
  B(Eb.indexOf(t) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: t }
  });
}
function ss(t, e, n) {
  if (n == null && (n = ""), t !== e) {
    let r = n, s = "new";
    n && (r += ".", s += " " + n), B(!1, `private constructor; use ${r}from* methods`, "UNSUPPORTED_OPERATION", {
      operation: s
    });
  }
}
function $a(t, e, n) {
  if (t instanceof Uint8Array)
    return n ? new Uint8Array(t) : t;
  if (typeof t == "string" && t.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((t.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(t.substring(s, s + 2), 16), s += 2;
    return r;
  }
  S(!1, "invalid BytesLike value", e || "value", t);
}
function Ye(t, e) {
  return $a(t, e, !1);
}
function De(t, e) {
  return $a(t, e, !0);
}
function Je(t, e) {
  return !(typeof t != "string" || !t.match(/^0x[0-9A-Fa-f]*$/) || typeof e == "number" && t.length !== 2 + 2 * e || e === !0 && t.length % 2 !== 0);
}
function Ab(t) {
  return Je(t, !0) || t instanceof Uint8Array;
}
const oi = "0123456789abcdef";
function se(t) {
  const e = Ye(t);
  let n = "0x";
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    n += oi[(s & 240) >> 4] + oi[s & 15];
  }
  return n;
}
function It(t) {
  return "0x" + t.map((e) => se(e).substring(2)).join("");
}
function Ot(t, e, n) {
  const r = Ye(t);
  return n != null && n > r.length && B(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: n
  }), se(r.slice(e == null ? 0 : e, n == null ? r.length : n));
}
function Ea(t, e, n) {
  const r = Ye(t);
  B(e >= r.length, "padding exceeds data length", "BUFFER_OVERRUN", {
    buffer: new Uint8Array(r),
    length: e,
    offset: e + 1
  });
  const s = new Uint8Array(e);
  return s.fill(0), n ? s.set(r, e - r.length) : s.set(r, 0), se(s);
}
function Ob(t, e) {
  return Ea(t, e, !0);
}
function _b(t, e) {
  return Ea(t, e, !1);
}
const qn = BigInt(0), Ie = BigInt(1), St = 9007199254740991;
function xb(t, e) {
  const n = Yn(t, "value"), r = BigInt(Qe(e, "width"));
  if (B(n >> r === qn, "overflow", "NUMERIC_FAULT", {
    operation: "fromTwos",
    fault: "overflow",
    value: t
  }), n >> r - Ie) {
    const s = (Ie << r) - Ie;
    return -((~n & s) + Ie);
  }
  return n;
}
function Sb(t, e) {
  let n = ot(t, "value");
  const r = BigInt(Qe(e, "width")), s = Ie << r - Ie;
  if (n < qn) {
    n = -n, B(n <= s, "too low", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: t
    });
    const i = (Ie << r) - Ie;
    return (~n & i) + Ie;
  } else
    B(n < s, "too high", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: t
    });
  return n;
}
function mn(t, e) {
  const n = Yn(t, "value"), r = BigInt(Qe(e, "bits"));
  return n & (Ie << r) - Ie;
}
function ot(t, e) {
  switch (typeof t) {
    case "bigint":
      return t;
    case "number":
      return S(Number.isInteger(t), "underflow", e || "value", t), S(t >= -St && t <= St, "overflow", e || "value", t), BigInt(t);
    case "string":
      try {
        if (t === "")
          throw new Error("empty string");
        return t[0] === "-" && t[1] !== "-" ? -BigInt(t.substring(1)) : BigInt(t);
      } catch (n) {
        S(!1, `invalid BigNumberish string: ${n.message}`, e || "value", t);
      }
  }
  S(!1, "invalid BigNumberish value", e || "value", t);
}
function Yn(t, e) {
  const n = ot(t, e);
  return B(n >= qn, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: t
  }), n;
}
const ci = "0123456789abcdef";
function Ta(t) {
  if (t instanceof Uint8Array) {
    let e = "0x0";
    for (const n of t)
      e += ci[n >> 4], e += ci[n & 15];
    return BigInt(e);
  }
  return ot(t);
}
function Qe(t, e) {
  switch (typeof t) {
    case "bigint":
      return S(t >= -St && t <= St, "overflow", e || "value", t), Number(t);
    case "number":
      return S(Number.isInteger(t), "underflow", e || "value", t), S(t >= -St && t <= St, "overflow", e || "value", t), t;
    case "string":
      try {
        if (t === "")
          throw new Error("empty string");
        return Qe(BigInt(t), e);
      } catch (n) {
        S(!1, `invalid numeric string: ${n.message}`, e || "value", t);
      }
  }
  S(!1, "invalid numeric value", e || "value", t);
}
function Nb(t) {
  return Qe(Ta(t));
}
function is(t, e) {
  let r = Yn(t, "value").toString(16);
  if (e == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = Qe(e, "width");
    for (B(s * 2 >= r.length, `value exceeds width (${s} bytes)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: t
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
function Ib(t) {
  const e = Yn(t, "value");
  if (e === qn)
    return new Uint8Array([]);
  let n = e.toString(16);
  n.length % 2 && (n = "0" + n);
  const r = new Uint8Array(n.length / 2);
  for (let s = 0; s < r.length; s++) {
    const i = s * 2;
    r[s] = parseInt(n.substring(i, i + 2), 16);
  }
  return r;
}
var Pt;
class Pb {
  /**
   *  Create a new **EventPayload** for %%emitter%% with
   *  the %%listener%% and for %%filter%%.
   */
  constructor(e, n, r) {
    /**
     *  The event filter.
     */
    T(this, "filter");
    /**
     *  The **EventEmitterable**.
     */
    T(this, "emitter");
    j(this, Pt, void 0);
    V(this, Pt, n), M(this, { emitter: e, filter: r });
  }
  /**
   *  Unregister the triggered listener for future events.
   */
  async removeListener() {
    x(this, Pt) != null && await this.emitter.off(this.filter, x(this, Pt));
  }
}
Pt = new WeakMap();
function Cb(t, e, n, r, s) {
  S(!1, `invalid codepoint at offset ${e}; ${t}`, "bytes", n);
}
function Aa(t, e, n, r, s) {
  if (t === "BAD_PREFIX" || t === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let a = e + 1; a < n.length && n[a] >> 6 === 2; a++)
      i++;
    return i;
  }
  return t === "OVERRUN" ? n.length - e - 1 : 0;
}
function kb(t, e, n, r, s) {
  return t === "OVERLONG" ? (S(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), Aa(t, e, n));
}
const Rb = Object.freeze({
  error: Cb,
  ignore: Aa,
  replace: kb
});
function Ub(t, e) {
  e == null && (e = Rb.error);
  const n = Ye(t, "bytes"), r = [];
  let s = 0;
  for (; s < n.length; ) {
    const i = n[s++];
    if (!(i >> 7)) {
      r.push(i);
      continue;
    }
    let a = null, o = null;
    if ((i & 224) === 192)
      a = 1, o = 127;
    else if ((i & 240) === 224)
      a = 2, o = 2047;
    else if ((i & 248) === 240)
      a = 3, o = 65535;
    else {
      (i & 192) === 128 ? s += e("UNEXPECTED_CONTINUE", s - 1, n, r) : s += e("BAD_PREFIX", s - 1, n, r);
      continue;
    }
    if (s - 1 + a >= n.length) {
      s += e("OVERRUN", s - 1, n, r);
      continue;
    }
    let u = i & (1 << 8 - a - 1) - 1;
    for (let f = 0; f < a; f++) {
      let m = n[s];
      if ((m & 192) != 128) {
        s += e("MISSING_CONTINUE", s, n, r), u = null;
        break;
      }
      u = u << 6 | m & 63, s++;
    }
    if (u !== null) {
      if (u > 1114111) {
        s += e("OUT_OF_RANGE", s - 1 - a, n, r, u);
        continue;
      }
      if (u >= 55296 && u <= 57343) {
        s += e("UTF16_SURROGATE", s - 1 - a, n, r, u);
        continue;
      }
      if (u <= o) {
        s += e("OVERLONG", s - 1 - a, n, r, u);
        continue;
      }
      r.push(u);
    }
  }
  return r;
}
function Oa(t, e) {
  S(typeof t == "string", "invalid string value", "str", t), e != null && (Tb(e), t = t.normalize(e));
  let n = [];
  for (let r = 0; r < t.length; r++) {
    const s = t.charCodeAt(r);
    if (s < 128)
      n.push(s);
    else if (s < 2048)
      n.push(s >> 6 | 192), n.push(s & 63 | 128);
    else if ((s & 64512) == 55296) {
      r++;
      const i = t.charCodeAt(r);
      S(r < t.length && (i & 64512) === 56320, "invalid surrogate pair", "str", t);
      const a = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(a >> 18 | 240), n.push(a >> 12 & 63 | 128), n.push(a >> 6 & 63 | 128), n.push(a & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return new Uint8Array(n);
}
function Lb(t) {
  return t.map((e) => e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10 & 1023) + 55296, (e & 1023) + 56320))).join("");
}
function Bb(t, e) {
  return Lb(Ub(t, e));
}
const pe = 32, Ar = new Uint8Array(pe), Fb = ["then"], bn = {}, _a = /* @__PURE__ */ new WeakMap();
function ft(t) {
  return _a.get(t);
}
function ui(t, e) {
  _a.set(t, e);
}
function qt(t, e) {
  const n = new Error(`deferred error during ABI decoding triggered accessing ${t}`);
  throw n.error = e, n;
}
function Or(t, e, n) {
  return t.indexOf(null) >= 0 ? e.map((r, s) => r instanceof Dt ? Or(ft(r), r, n) : r) : t.reduce((r, s, i) => {
    let a = e.getValue(s);
    return s in r || (n && a instanceof Dt && (a = Or(ft(a), a, n)), r[s] = a), r;
  }, {});
}
var Ct;
const Nt = class Nt extends Array {
  /**
   *  @private
   */
  constructor(...n) {
    const r = n[0];
    let s = n[1], i = (n[2] || []).slice(), a = !0;
    r !== bn && (s = n, i = [], a = !1);
    super(s.length);
    // No longer used; but cannot be removed as it will remove the
    // #private field from the .d.ts which may break backwards
    // compatibility
    j(this, Ct, void 0);
    s.forEach((f, m) => {
      this[m] = f;
    });
    const o = i.reduce((f, m) => (typeof m == "string" && f.set(m, (f.get(m) || 0) + 1), f), /* @__PURE__ */ new Map());
    if (ui(this, Object.freeze(s.map((f, m) => {
      const v = i[m];
      return v != null && o.get(v) === 1 ? v : null;
    }))), V(this, Ct, []), x(this, Ct) == null && x(this, Ct), !a)
      return;
    Object.freeze(this);
    const u = new Proxy(this, {
      get: (f, m, v) => {
        if (typeof m == "string") {
          if (m.match(/^[0-9]+$/)) {
            const N = Qe(m, "%index");
            if (N < 0 || N >= this.length)
              throw new RangeError("out of result range");
            const k = f[N];
            return k instanceof Error && qt(`index ${N}`, k), k;
          }
          if (Fb.indexOf(m) >= 0)
            return Reflect.get(f, m, v);
          const A = f[m];
          if (A instanceof Function)
            return function(...N) {
              return A.apply(this === v ? f : this, N);
            };
          if (!(m in f))
            return f.getValue.apply(this === v ? f : this, [m]);
        }
        return Reflect.get(f, m, v);
      }
    });
    return ui(u, ft(this)), u;
  }
  /**
   *  Returns the Result as a normal Array. If %%deep%%, any children
   *  which are Result objects are also converted to a normal Array.
   *
   *  This will throw if there are any outstanding deferred
   *  errors.
   */
  toArray(n) {
    const r = [];
    return this.forEach((s, i) => {
      s instanceof Error && qt(`index ${i}`, s), n && s instanceof Nt && (s = s.toArray(n)), r.push(s);
    }), r;
  }
  /**
   *  Returns the Result as an Object with each name-value pair. If
   *  %%deep%%, any children which are Result objects are also
   *  converted to an Object.
   *
   *  This will throw if any value is unnamed, or if there are
   *  any outstanding deferred errors.
   */
  toObject(n) {
    const r = ft(this);
    return r.reduce((s, i, a) => (B(i != null, `value at index ${a} unnamed`, "UNSUPPORTED_OPERATION", {
      operation: "toObject()"
    }), Or(r, this, n)), {});
  }
  /**
   *  @_ignore
   */
  slice(n, r) {
    n == null && (n = 0), n < 0 && (n += this.length, n < 0 && (n = 0)), r == null && (r = this.length), r < 0 && (r += this.length, r < 0 && (r = 0)), r > this.length && (r = this.length);
    const s = ft(this), i = [], a = [];
    for (let o = n; o < r; o++)
      i.push(this[o]), a.push(s[o]);
    return new Nt(bn, i, a);
  }
  /**
   *  @_ignore
   */
  filter(n, r) {
    const s = ft(this), i = [], a = [];
    for (let o = 0; o < this.length; o++) {
      const u = this[o];
      u instanceof Error && qt(`index ${o}`, u), n.call(r, u, o, this) && (i.push(u), a.push(s[o]));
    }
    return new Nt(bn, i, a);
  }
  /**
   *  @_ignore
   */
  map(n, r) {
    const s = [];
    for (let i = 0; i < this.length; i++) {
      const a = this[i];
      a instanceof Error && qt(`index ${i}`, a), s.push(n.call(r, a, i, this));
    }
    return s;
  }
  /**
   *  Returns the value for %%name%%.
   *
   *  Since it is possible to have a key whose name conflicts with
   *  a method on a [[Result]] or its superclass Array, or any
   *  JavaScript keyword, this ensures all named values are still
   *  accessible by name.
   */
  getValue(n) {
    const r = ft(this).indexOf(n);
    if (r === -1)
      return;
    const s = this[r];
    return s instanceof Error && qt(`property ${JSON.stringify(n)}`, s.error), s;
  }
  /**
   *  Creates a new [[Result]] for %%items%% with each entry
   *  also accessible by its corresponding name in %%keys%%.
   */
  static fromItems(n, r) {
    return new Nt(bn, n, r);
  }
};
Ct = new WeakMap();
let Dt = Nt;
function li(t) {
  let e = Ib(t);
  return B(e.length <= pe, "value out-of-bounds", "BUFFER_OVERRUN", { buffer: e, length: pe, offset: e.length }), e.length !== pe && (e = De(It([Ar.slice(e.length % pe), e]))), e;
}
class et {
  constructor(e, n, r, s) {
    // The coder name:
    //   - address, uint256, tuple, array, etc.
    T(this, "name");
    // The fully expanded type, including composite types:
    //   - address, uint256, tuple(address,bytes), uint256[3][4][],  etc.
    T(this, "type");
    // The localName bound in the signature, in this example it is "baz":
    //   - tuple(address foo, uint bar) baz
    T(this, "localName");
    // Whether this type is dynamic:
    //  - Dynamic: bytes, string, address[], tuple(boolean[]), etc.
    //  - Not Dynamic: address, uint256, boolean[3], tuple(address, uint8)
    T(this, "dynamic");
    M(this, { name: e, type: n, localName: r, dynamic: s }, {
      name: "string",
      type: "string",
      localName: "string",
      dynamic: "boolean"
    });
  }
  _throwError(e, n) {
    S(!1, e, this.localName, n);
  }
}
var ze, gt, kt, _n;
class _r {
  constructor() {
    j(this, kt);
    // An array of WordSize lengthed objects to concatenation
    j(this, ze, void 0);
    j(this, gt, void 0);
    V(this, ze, []), V(this, gt, 0);
  }
  get data() {
    return It(x(this, ze));
  }
  get length() {
    return x(this, gt);
  }
  appendWriter(e) {
    return q(this, kt, _n).call(this, De(e.data));
  }
  // Arrayish item; pad on the right to *nearest* WordSize
  writeBytes(e) {
    let n = De(e);
    const r = n.length % pe;
    return r && (n = De(It([n, Ar.slice(r)]))), q(this, kt, _n).call(this, n);
  }
  // Numeric item; pad on the left *to* WordSize
  writeValue(e) {
    return q(this, kt, _n).call(this, li(e));
  }
  // Inserts a numeric place-holder, returning a callback that can
  // be used to asjust the value later
  writeUpdatableValue() {
    const e = x(this, ze).length;
    return x(this, ze).push(Ar), V(this, gt, x(this, gt) + pe), (n) => {
      x(this, ze)[e] = li(n);
    };
  }
}
ze = new WeakMap(), gt = new WeakMap(), kt = new WeakSet(), _n = function(e) {
  return x(this, ze).push(e), V(this, gt, x(this, gt) + e.length), e.length;
};
var ye, we, yt, mt, nt, sn, Sr, Fn, xa;
const fs = class fs {
  constructor(e, n, r) {
    j(this, sn);
    j(this, Fn);
    // Allows incomplete unpadded data to be read; otherwise an error
    // is raised if attempting to overrun the buffer. This is required
    // to deal with an old Solidity bug, in which event data for
    // external (not public thoguh) was tightly packed.
    T(this, "allowLoose");
    j(this, ye, void 0);
    j(this, we, void 0);
    j(this, yt, void 0);
    j(this, mt, void 0);
    j(this, nt, void 0);
    M(this, { allowLoose: !!n }), V(this, ye, De(e)), V(this, yt, 0), V(this, mt, null), V(this, nt, r != null ? r : 1024), V(this, we, 0);
  }
  get data() {
    return se(x(this, ye));
  }
  get dataLength() {
    return x(this, ye).length;
  }
  get consumed() {
    return x(this, we);
  }
  get bytes() {
    return new Uint8Array(x(this, ye));
  }
  // Create a sub-reader with the same underlying data, but offset
  subReader(e) {
    const n = new fs(x(this, ye).slice(x(this, we) + e), this.allowLoose, x(this, nt));
    return V(n, mt, this), n;
  }
  // Read bytes
  readBytes(e, n) {
    let r = q(this, Fn, xa).call(this, 0, e, !!n);
    return q(this, sn, Sr).call(this, e), V(this, we, x(this, we) + r.length), r.slice(0, e);
  }
  // Read a numeric values
  readValue() {
    return Ta(this.readBytes(pe));
  }
  readIndex() {
    return Nb(this.readBytes(pe));
  }
};
ye = new WeakMap(), we = new WeakMap(), yt = new WeakMap(), mt = new WeakMap(), nt = new WeakMap(), sn = new WeakSet(), Sr = function(e) {
  var n;
  if (x(this, mt))
    return q(n = x(this, mt), sn, Sr).call(n, e);
  V(this, yt, x(this, yt) + e), B(x(this, nt) < 1 || x(this, yt) <= x(this, nt) * this.dataLength, `compressed ABI data exceeds inflation ratio of ${x(this, nt)} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`, "BUFFER_OVERRUN", {
    buffer: De(x(this, ye)),
    offset: x(this, we),
    length: e,
    info: {
      bytesRead: x(this, yt),
      dataLength: this.dataLength
    }
  });
}, Fn = new WeakSet(), xa = function(e, n, r) {
  let s = Math.ceil(n / pe) * pe;
  return x(this, we) + s > x(this, ye).length && (this.allowLoose && r && x(this, we) + n <= x(this, ye).length ? s = n : B(!1, "data out-of-bounds", "BUFFER_OVERRUN", {
    buffer: De(x(this, ye)),
    length: x(this, ye).length,
    offset: x(this, we) + s
  })), x(this, ye).slice(x(this, we), x(this, we) + s);
};
let xr = fs;
function fi(t) {
  if (!Number.isSafeInteger(t) || t < 0)
    throw new Error(`Wrong positive integer: ${t}`);
}
function Sa(t, ...e) {
  if (!(t instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (e.length > 0 && !e.includes(t.length))
    throw new Error(`Expected Uint8Array of length ${e}, not of length=${t.length}`);
}
function hi(t, e = !0) {
  if (t.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && t.finished)
    throw new Error("Hash#digest() has already been called");
}
function Db(t, e) {
  Sa(t);
  const n = e.outputLen;
  if (t.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Mb = (t) => t instanceof Uint8Array, Gb = (t) => new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4)), Vb = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Vb)
  throw new Error("Non little-endian hardware is not supported");
function Hb(t) {
  if (typeof t != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof t}`);
  return new Uint8Array(new TextEncoder().encode(t));
}
function Na(t) {
  if (typeof t == "string" && (t = Hb(t)), !Mb(t))
    throw new Error(`expected Uint8Array, got ${typeof t}`);
  return t;
}
class jb {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function Kb(t) {
  const e = (r) => t().update(Na(r)).digest(), n = t();
  return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = () => t(), e;
}
const vn = /* @__PURE__ */ BigInt(2 ** 32 - 1), pi = /* @__PURE__ */ BigInt(32);
function zb(t, e = !1) {
  return e ? { h: Number(t & vn), l: Number(t >> pi & vn) } : { h: Number(t >> pi & vn) | 0, l: Number(t & vn) | 0 };
}
function Wb(t, e = !1) {
  let n = new Uint32Array(t.length), r = new Uint32Array(t.length);
  for (let s = 0; s < t.length; s++) {
    const { h: i, l: a } = zb(t[s], e);
    [n[s], r[s]] = [i, a];
  }
  return [n, r];
}
const Jb = (t, e, n) => t << n | e >>> 32 - n, Xb = (t, e, n) => e << n | t >>> 32 - n, qb = (t, e, n) => e << n - 32 | t >>> 64 - n, Yb = (t, e, n) => t << n - 32 | e >>> 64 - n, [Ia, Pa, Ca] = [[], [], []], Zb = /* @__PURE__ */ BigInt(0), Yt = /* @__PURE__ */ BigInt(1), Qb = /* @__PURE__ */ BigInt(2), ev = /* @__PURE__ */ BigInt(7), tv = /* @__PURE__ */ BigInt(256), nv = /* @__PURE__ */ BigInt(113);
for (let t = 0, e = Yt, n = 1, r = 0; t < 24; t++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], Ia.push(2 * (5 * r + n)), Pa.push((t + 1) * (t + 2) / 2 % 64);
  let s = Zb;
  for (let i = 0; i < 7; i++)
    e = (e << Yt ^ (e >> ev) * nv) % tv, e & Qb && (s ^= Yt << (Yt << /* @__PURE__ */ BigInt(i)) - Yt);
  Ca.push(s);
}
const [rv, sv] = /* @__PURE__ */ Wb(Ca, !0), di = (t, e, n) => n > 32 ? qb(t, e, n) : Jb(t, e, n), gi = (t, e, n) => n > 32 ? Yb(t, e, n) : Xb(t, e, n);
function iv(t, e = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - e; r < 24; r++) {
    for (let a = 0; a < 10; a++)
      n[a] = t[a] ^ t[a + 10] ^ t[a + 20] ^ t[a + 30] ^ t[a + 40];
    for (let a = 0; a < 10; a += 2) {
      const o = (a + 8) % 10, u = (a + 2) % 10, f = n[u], m = n[u + 1], v = di(f, m, 1) ^ n[o], A = gi(f, m, 1) ^ n[o + 1];
      for (let N = 0; N < 50; N += 10)
        t[a + N] ^= v, t[a + N + 1] ^= A;
    }
    let s = t[2], i = t[3];
    for (let a = 0; a < 24; a++) {
      const o = Pa[a], u = di(s, i, o), f = gi(s, i, o), m = Ia[a];
      s = t[m], i = t[m + 1], t[m] = u, t[m + 1] = f;
    }
    for (let a = 0; a < 50; a += 10) {
      for (let o = 0; o < 10; o++)
        n[o] = t[a + o];
      for (let o = 0; o < 10; o++)
        t[a + o] ^= ~n[(o + 2) % 10] & n[(o + 4) % 10];
    }
    t[0] ^= rv[r], t[1] ^= sv[r];
  }
  n.fill(0);
}
class as extends jb {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(e, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = e, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, fi(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Gb(this.state);
  }
  keccak() {
    iv(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    hi(this);
    const { blockLen: n, state: r } = this;
    e = Na(e);
    const s = e.length;
    for (let i = 0; i < s; ) {
      const a = Math.min(n - this.pos, s - i);
      for (let o = 0; o < a; o++)
        r[this.pos++] ^= e[i++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: e, suffix: n, pos: r, blockLen: s } = this;
    e[r] ^= n, n & 128 && r === s - 1 && this.keccak(), e[s - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    hi(this, !1), Sa(e), this.finish();
    const n = this.state, { blockLen: r } = this;
    for (let s = 0, i = e.length; s < i; ) {
      this.posOut >= r && this.keccak();
      const a = Math.min(r - this.posOut, i - s);
      e.set(n.subarray(this.posOut, this.posOut + a), s), this.posOut += a, s += a;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return fi(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (Db(e, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(e) {
    const { blockLen: n, suffix: r, outputLen: s, rounds: i, enableXOF: a } = this;
    return e || (e = new as(n, r, s, a, i)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = i, e.suffix = r, e.outputLen = s, e.enableXOF = a, e.destroyed = this.destroyed, e;
  }
}
const av = (t, e, n) => Kb(() => new as(e, t, n)), ov = /* @__PURE__ */ av(1, 136, 256 / 8);
let ka = !1;
const Ra = function(t) {
  return ov(t);
};
let Ua = Ra;
function it(t) {
  const e = Ye(t, "data");
  return se(Ua(e));
}
it._ = Ra;
it.lock = function() {
  ka = !0;
};
it.register = function(t) {
  if (ka)
    throw new TypeError("keccak256 is locked");
  Ua = t;
};
Object.freeze(it);
const cv = BigInt(0), uv = BigInt(36);
function yi(t) {
  t = t.toLowerCase();
  const e = t.substring(2).split(""), n = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    n[s] = e[s].charCodeAt(0);
  const r = Ye(it(n));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (e[s] = e[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (e[s + 1] = e[s + 1].toUpperCase());
  return "0x" + e.join("");
}
const os = {};
for (let t = 0; t < 10; t++)
  os[String(t)] = String(t);
for (let t = 0; t < 26; t++)
  os[String.fromCharCode(65 + t)] = String(10 + t);
const mi = 15;
function lv(t) {
  t = t.toUpperCase(), t = t.substring(4) + t.substring(0, 2) + "00";
  let e = t.split("").map((r) => os[r]).join("");
  for (; e.length >= mi; ) {
    let r = e.substring(0, mi);
    e = parseInt(r, 10) % 97 + e.substring(r.length);
  }
  let n = String(98 - parseInt(e, 10) % 97);
  for (; n.length < 2; )
    n = "0" + n;
  return n;
}
const fv = function() {
  const t = {};
  for (let e = 0; e < 36; e++) {
    const n = "0123456789abcdefghijklmnopqrstuvwxyz"[e];
    t[n] = BigInt(e);
  }
  return t;
}();
function hv(t) {
  t = t.toLowerCase();
  let e = cv;
  for (let n = 0; n < t.length; n++)
    e = e * uv + fv[t[n]];
  return e;
}
function wt(t) {
  if (S(typeof t == "string", "invalid address", "address", t), t.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    t.startsWith("0x") || (t = "0x" + t);
    const e = yi(t);
    return S(!t.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || e === t, "bad address checksum", "address", t), e;
  }
  if (t.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    S(t.substring(2, 4) === lv(t), "bad icap checksum", "address", t);
    let e = hv(t.substring(4)).toString(16);
    for (; e.length < 40; )
      e = "0" + e;
    return yi("0x" + e);
  }
  S(!1, "invalid address", "address", t);
}
function La(t) {
  return t && typeof t.getAddress == "function";
}
async function hr(t, e) {
  const n = await e;
  return (n == null || n === "0x0000000000000000000000000000000000000000") && (B(typeof t != "string", "unconfigured name", "UNCONFIGURED_NAME", { value: t }), S(!1, "invalid AddressLike value; did not resolve to a value address", "target", t)), wt(n);
}
function tn(t, e) {
  if (typeof t == "string")
    return t.match(/^0x[0-9a-f]{40}$/i) ? wt(t) : (B(e != null, "ENS resolution requires a provider", "UNSUPPORTED_OPERATION", { operation: "resolveName" }), hr(t, e.resolveName(t)));
  if (La(t))
    return hr(t, t.getAddress());
  if (t && typeof t.then == "function")
    return hr(t, t);
  S(!1, "unsupported addressable value", "target", t);
}
const He = {};
function P(t, e) {
  let n = !1;
  return e < 0 && (n = !0, e *= -1), new fe(He, `${n ? "" : "u"}int${e}`, t, { signed: n, width: e });
}
function H(t, e) {
  return new fe(He, `bytes${e || ""}`, t, { size: e });
}
const bi = Symbol.for("_ethers_typed");
var bt;
const je = class je {
  /**
   *  @_ignore:
   */
  constructor(e, n, r, s) {
    /**
     *  The type, as a Solidity-compatible type.
     */
    T(this, "type");
    /**
     *  The actual value.
     */
    T(this, "value");
    j(this, bt, void 0);
    /**
     *  @_ignore:
     */
    T(this, "_typedSymbol");
    s == null && (s = null), ss(He, e, "Typed"), M(this, { _typedSymbol: bi, type: n, value: r }), V(this, bt, s), this.format();
  }
  /**
   *  Format the type as a Human-Readable type.
   */
  format() {
    if (this.type === "array")
      throw new Error("");
    if (this.type === "dynamicArray")
      throw new Error("");
    return this.type === "tuple" ? `tuple(${this.value.map((e) => e.format()).join(",")})` : this.type;
  }
  /**
   *  The default value returned by this type.
   */
  defaultValue() {
    return 0;
  }
  /**
   *  The minimum value for numeric types.
   */
  minValue() {
    return 0;
  }
  /**
   *  The maximum value for numeric types.
   */
  maxValue() {
    return 0;
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedBigInt]].
   */
  isBigInt() {
    return !!this.type.match(/^u?int[0-9]+$/);
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedData]].
   */
  isData() {
    return this.type.startsWith("bytes");
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedString]].
   */
  isString() {
    return this.type === "string";
  }
  /**
   *  Returns the tuple name, if this is a tuple. Throws otherwise.
   */
  get tupleName() {
    if (this.type !== "tuple")
      throw TypeError("not a tuple");
    return x(this, bt);
  }
  // Returns the length of this type as an array
  // - `null` indicates the length is unforced, it could be dynamic
  // - `-1` indicates the length is dynamic
  // - any other value indicates it is a static array and is its length
  /**
   *  Returns the length of the array type or ``-1`` if it is dynamic.
   *
   *  Throws if the type is not an array.
   */
  get arrayLength() {
    if (this.type !== "array")
      throw TypeError("not an array");
    return x(this, bt) === !0 ? -1 : x(this, bt) === !1 ? this.value.length : null;
  }
  /**
   *  Returns a new **Typed** of %%type%% with the %%value%%.
   */
  static from(e, n) {
    return new je(He, e, n);
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static uint8(e) {
    return P(e, 8);
  }
  /**
   *  Return a new ``uint16`` type for %%v%%.
   */
  static uint16(e) {
    return P(e, 16);
  }
  /**
   *  Return a new ``uint24`` type for %%v%%.
   */
  static uint24(e) {
    return P(e, 24);
  }
  /**
   *  Return a new ``uint32`` type for %%v%%.
   */
  static uint32(e) {
    return P(e, 32);
  }
  /**
   *  Return a new ``uint40`` type for %%v%%.
   */
  static uint40(e) {
    return P(e, 40);
  }
  /**
   *  Return a new ``uint48`` type for %%v%%.
   */
  static uint48(e) {
    return P(e, 48);
  }
  /**
   *  Return a new ``uint56`` type for %%v%%.
   */
  static uint56(e) {
    return P(e, 56);
  }
  /**
   *  Return a new ``uint64`` type for %%v%%.
   */
  static uint64(e) {
    return P(e, 64);
  }
  /**
   *  Return a new ``uint72`` type for %%v%%.
   */
  static uint72(e) {
    return P(e, 72);
  }
  /**
   *  Return a new ``uint80`` type for %%v%%.
   */
  static uint80(e) {
    return P(e, 80);
  }
  /**
   *  Return a new ``uint88`` type for %%v%%.
   */
  static uint88(e) {
    return P(e, 88);
  }
  /**
   *  Return a new ``uint96`` type for %%v%%.
   */
  static uint96(e) {
    return P(e, 96);
  }
  /**
   *  Return a new ``uint104`` type for %%v%%.
   */
  static uint104(e) {
    return P(e, 104);
  }
  /**
   *  Return a new ``uint112`` type for %%v%%.
   */
  static uint112(e) {
    return P(e, 112);
  }
  /**
   *  Return a new ``uint120`` type for %%v%%.
   */
  static uint120(e) {
    return P(e, 120);
  }
  /**
   *  Return a new ``uint128`` type for %%v%%.
   */
  static uint128(e) {
    return P(e, 128);
  }
  /**
   *  Return a new ``uint136`` type for %%v%%.
   */
  static uint136(e) {
    return P(e, 136);
  }
  /**
   *  Return a new ``uint144`` type for %%v%%.
   */
  static uint144(e) {
    return P(e, 144);
  }
  /**
   *  Return a new ``uint152`` type for %%v%%.
   */
  static uint152(e) {
    return P(e, 152);
  }
  /**
   *  Return a new ``uint160`` type for %%v%%.
   */
  static uint160(e) {
    return P(e, 160);
  }
  /**
   *  Return a new ``uint168`` type for %%v%%.
   */
  static uint168(e) {
    return P(e, 168);
  }
  /**
   *  Return a new ``uint176`` type for %%v%%.
   */
  static uint176(e) {
    return P(e, 176);
  }
  /**
   *  Return a new ``uint184`` type for %%v%%.
   */
  static uint184(e) {
    return P(e, 184);
  }
  /**
   *  Return a new ``uint192`` type for %%v%%.
   */
  static uint192(e) {
    return P(e, 192);
  }
  /**
   *  Return a new ``uint200`` type for %%v%%.
   */
  static uint200(e) {
    return P(e, 200);
  }
  /**
   *  Return a new ``uint208`` type for %%v%%.
   */
  static uint208(e) {
    return P(e, 208);
  }
  /**
   *  Return a new ``uint216`` type for %%v%%.
   */
  static uint216(e) {
    return P(e, 216);
  }
  /**
   *  Return a new ``uint224`` type for %%v%%.
   */
  static uint224(e) {
    return P(e, 224);
  }
  /**
   *  Return a new ``uint232`` type for %%v%%.
   */
  static uint232(e) {
    return P(e, 232);
  }
  /**
   *  Return a new ``uint240`` type for %%v%%.
   */
  static uint240(e) {
    return P(e, 240);
  }
  /**
   *  Return a new ``uint248`` type for %%v%%.
   */
  static uint248(e) {
    return P(e, 248);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint256(e) {
    return P(e, 256);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint(e) {
    return P(e, 256);
  }
  /**
   *  Return a new ``int8`` type for %%v%%.
   */
  static int8(e) {
    return P(e, -8);
  }
  /**
   *  Return a new ``int16`` type for %%v%%.
   */
  static int16(e) {
    return P(e, -16);
  }
  /**
   *  Return a new ``int24`` type for %%v%%.
   */
  static int24(e) {
    return P(e, -24);
  }
  /**
   *  Return a new ``int32`` type for %%v%%.
   */
  static int32(e) {
    return P(e, -32);
  }
  /**
   *  Return a new ``int40`` type for %%v%%.
   */
  static int40(e) {
    return P(e, -40);
  }
  /**
   *  Return a new ``int48`` type for %%v%%.
   */
  static int48(e) {
    return P(e, -48);
  }
  /**
   *  Return a new ``int56`` type for %%v%%.
   */
  static int56(e) {
    return P(e, -56);
  }
  /**
   *  Return a new ``int64`` type for %%v%%.
   */
  static int64(e) {
    return P(e, -64);
  }
  /**
   *  Return a new ``int72`` type for %%v%%.
   */
  static int72(e) {
    return P(e, -72);
  }
  /**
   *  Return a new ``int80`` type for %%v%%.
   */
  static int80(e) {
    return P(e, -80);
  }
  /**
   *  Return a new ``int88`` type for %%v%%.
   */
  static int88(e) {
    return P(e, -88);
  }
  /**
   *  Return a new ``int96`` type for %%v%%.
   */
  static int96(e) {
    return P(e, -96);
  }
  /**
   *  Return a new ``int104`` type for %%v%%.
   */
  static int104(e) {
    return P(e, -104);
  }
  /**
   *  Return a new ``int112`` type for %%v%%.
   */
  static int112(e) {
    return P(e, -112);
  }
  /**
   *  Return a new ``int120`` type for %%v%%.
   */
  static int120(e) {
    return P(e, -120);
  }
  /**
   *  Return a new ``int128`` type for %%v%%.
   */
  static int128(e) {
    return P(e, -128);
  }
  /**
   *  Return a new ``int136`` type for %%v%%.
   */
  static int136(e) {
    return P(e, -136);
  }
  /**
   *  Return a new ``int144`` type for %%v%%.
   */
  static int144(e) {
    return P(e, -144);
  }
  /**
   *  Return a new ``int52`` type for %%v%%.
   */
  static int152(e) {
    return P(e, -152);
  }
  /**
   *  Return a new ``int160`` type for %%v%%.
   */
  static int160(e) {
    return P(e, -160);
  }
  /**
   *  Return a new ``int168`` type for %%v%%.
   */
  static int168(e) {
    return P(e, -168);
  }
  /**
   *  Return a new ``int176`` type for %%v%%.
   */
  static int176(e) {
    return P(e, -176);
  }
  /**
   *  Return a new ``int184`` type for %%v%%.
   */
  static int184(e) {
    return P(e, -184);
  }
  /**
   *  Return a new ``int92`` type for %%v%%.
   */
  static int192(e) {
    return P(e, -192);
  }
  /**
   *  Return a new ``int200`` type for %%v%%.
   */
  static int200(e) {
    return P(e, -200);
  }
  /**
   *  Return a new ``int208`` type for %%v%%.
   */
  static int208(e) {
    return P(e, -208);
  }
  /**
   *  Return a new ``int216`` type for %%v%%.
   */
  static int216(e) {
    return P(e, -216);
  }
  /**
   *  Return a new ``int224`` type for %%v%%.
   */
  static int224(e) {
    return P(e, -224);
  }
  /**
   *  Return a new ``int232`` type for %%v%%.
   */
  static int232(e) {
    return P(e, -232);
  }
  /**
   *  Return a new ``int240`` type for %%v%%.
   */
  static int240(e) {
    return P(e, -240);
  }
  /**
   *  Return a new ``int248`` type for %%v%%.
   */
  static int248(e) {
    return P(e, -248);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int256(e) {
    return P(e, -256);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int(e) {
    return P(e, -256);
  }
  /**
   *  Return a new ``bytes1`` type for %%v%%.
   */
  static bytes1(e) {
    return H(e, 1);
  }
  /**
   *  Return a new ``bytes2`` type for %%v%%.
   */
  static bytes2(e) {
    return H(e, 2);
  }
  /**
   *  Return a new ``bytes3`` type for %%v%%.
   */
  static bytes3(e) {
    return H(e, 3);
  }
  /**
   *  Return a new ``bytes4`` type for %%v%%.
   */
  static bytes4(e) {
    return H(e, 4);
  }
  /**
   *  Return a new ``bytes5`` type for %%v%%.
   */
  static bytes5(e) {
    return H(e, 5);
  }
  /**
   *  Return a new ``bytes6`` type for %%v%%.
   */
  static bytes6(e) {
    return H(e, 6);
  }
  /**
   *  Return a new ``bytes7`` type for %%v%%.
   */
  static bytes7(e) {
    return H(e, 7);
  }
  /**
   *  Return a new ``bytes8`` type for %%v%%.
   */
  static bytes8(e) {
    return H(e, 8);
  }
  /**
   *  Return a new ``bytes9`` type for %%v%%.
   */
  static bytes9(e) {
    return H(e, 9);
  }
  /**
   *  Return a new ``bytes10`` type for %%v%%.
   */
  static bytes10(e) {
    return H(e, 10);
  }
  /**
   *  Return a new ``bytes11`` type for %%v%%.
   */
  static bytes11(e) {
    return H(e, 11);
  }
  /**
   *  Return a new ``bytes12`` type for %%v%%.
   */
  static bytes12(e) {
    return H(e, 12);
  }
  /**
   *  Return a new ``bytes13`` type for %%v%%.
   */
  static bytes13(e) {
    return H(e, 13);
  }
  /**
   *  Return a new ``bytes14`` type for %%v%%.
   */
  static bytes14(e) {
    return H(e, 14);
  }
  /**
   *  Return a new ``bytes15`` type for %%v%%.
   */
  static bytes15(e) {
    return H(e, 15);
  }
  /**
   *  Return a new ``bytes16`` type for %%v%%.
   */
  static bytes16(e) {
    return H(e, 16);
  }
  /**
   *  Return a new ``bytes17`` type for %%v%%.
   */
  static bytes17(e) {
    return H(e, 17);
  }
  /**
   *  Return a new ``bytes18`` type for %%v%%.
   */
  static bytes18(e) {
    return H(e, 18);
  }
  /**
   *  Return a new ``bytes19`` type for %%v%%.
   */
  static bytes19(e) {
    return H(e, 19);
  }
  /**
   *  Return a new ``bytes20`` type for %%v%%.
   */
  static bytes20(e) {
    return H(e, 20);
  }
  /**
   *  Return a new ``bytes21`` type for %%v%%.
   */
  static bytes21(e) {
    return H(e, 21);
  }
  /**
   *  Return a new ``bytes22`` type for %%v%%.
   */
  static bytes22(e) {
    return H(e, 22);
  }
  /**
   *  Return a new ``bytes23`` type for %%v%%.
   */
  static bytes23(e) {
    return H(e, 23);
  }
  /**
   *  Return a new ``bytes24`` type for %%v%%.
   */
  static bytes24(e) {
    return H(e, 24);
  }
  /**
   *  Return a new ``bytes25`` type for %%v%%.
   */
  static bytes25(e) {
    return H(e, 25);
  }
  /**
   *  Return a new ``bytes26`` type for %%v%%.
   */
  static bytes26(e) {
    return H(e, 26);
  }
  /**
   *  Return a new ``bytes27`` type for %%v%%.
   */
  static bytes27(e) {
    return H(e, 27);
  }
  /**
   *  Return a new ``bytes28`` type for %%v%%.
   */
  static bytes28(e) {
    return H(e, 28);
  }
  /**
   *  Return a new ``bytes29`` type for %%v%%.
   */
  static bytes29(e) {
    return H(e, 29);
  }
  /**
   *  Return a new ``bytes30`` type for %%v%%.
   */
  static bytes30(e) {
    return H(e, 30);
  }
  /**
   *  Return a new ``bytes31`` type for %%v%%.
   */
  static bytes31(e) {
    return H(e, 31);
  }
  /**
   *  Return a new ``bytes32`` type for %%v%%.
   */
  static bytes32(e) {
    return H(e, 32);
  }
  /**
   *  Return a new ``address`` type for %%v%%.
   */
  static address(e) {
    return new je(He, "address", e);
  }
  /**
   *  Return a new ``bool`` type for %%v%%.
   */
  static bool(e) {
    return new je(He, "bool", !!e);
  }
  /**
   *  Return a new ``bytes`` type for %%v%%.
   */
  static bytes(e) {
    return new je(He, "bytes", e);
  }
  /**
   *  Return a new ``string`` type for %%v%%.
   */
  static string(e) {
    return new je(He, "string", e);
  }
  /**
   *  Return a new ``array`` type for %%v%%, allowing %%dynamic%% length.
   */
  static array(e, n) {
    throw new Error("not implemented yet");
  }
  /**
   *  Return a new ``tuple`` type for %%v%%, with the optional %%name%%.
   */
  static tuple(e, n) {
    throw new Error("not implemented yet");
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static overrides(e) {
    return new je(He, "overrides", Object.assign({}, e));
  }
  /**
   *  Returns true only if %%value%% is a [[Typed]] instance.
   */
  static isTyped(e) {
    return e && typeof e == "object" && "_typedSymbol" in e && e._typedSymbol === bi;
  }
  /**
   *  If the value is a [[Typed]] instance, validates the underlying value
   *  and returns it, otherwise returns value directly.
   *
   *  This is useful for functions that with to accept either a [[Typed]]
   *  object or values.
   */
  static dereference(e, n) {
    if (je.isTyped(e)) {
      if (e.type !== n)
        throw new Error(`invalid type: expecetd ${n}, got ${e.type}`);
      return e.value;
    }
    return e;
  }
};
bt = new WeakMap();
let fe = je;
class pv extends et {
  constructor(e) {
    super("address", "address", e, !1);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(e, n) {
    let r = fe.dereference(n, "string");
    try {
      r = wt(r);
    } catch (s) {
      return this._throwError(s.message, n);
    }
    return e.writeValue(r);
  }
  decode(e) {
    return wt(is(e.readValue(), 20));
  }
}
class dv extends et {
  constructor(n) {
    super(n.name, n.type, "_", n.dynamic);
    T(this, "coder");
    this.coder = n;
  }
  defaultValue() {
    return this.coder.defaultValue();
  }
  encode(n, r) {
    return this.coder.encode(n, r);
  }
  decode(n) {
    return this.coder.decode(n);
  }
}
function Ba(t, e, n) {
  let r = [];
  if (Array.isArray(n))
    r = n;
  else if (n && typeof n == "object") {
    let u = {};
    r = e.map((f) => {
      const m = f.localName;
      return B(m, "cannot encode object for signature with missing names", "INVALID_ARGUMENT", { argument: "values", info: { coder: f }, value: n }), B(!u[m], "cannot encode object for signature with duplicate names", "INVALID_ARGUMENT", { argument: "values", info: { coder: f }, value: n }), u[m] = !0, n[m];
    });
  } else
    S(!1, "invalid tuple value", "tuple", n);
  S(e.length === r.length, "types/value length mismatch", "tuple", n);
  let s = new _r(), i = new _r(), a = [];
  e.forEach((u, f) => {
    let m = r[f];
    if (u.dynamic) {
      let v = i.length;
      u.encode(i, m);
      let A = s.writeUpdatableValue();
      a.push((N) => {
        A(N + v);
      });
    } else
      u.encode(s, m);
  }), a.forEach((u) => {
    u(s.length);
  });
  let o = t.appendWriter(s);
  return o += t.appendWriter(i), o;
}
function Fa(t, e) {
  let n = [], r = [], s = t.subReader(0);
  return e.forEach((i) => {
    let a = null;
    if (i.dynamic) {
      let o = t.readIndex(), u = s.subReader(o);
      try {
        a = i.decode(u);
      } catch (f) {
        if (Ft(f, "BUFFER_OVERRUN"))
          throw f;
        a = f, a.baseType = i.name, a.name = i.localName, a.type = i.type;
      }
    } else
      try {
        a = i.decode(t);
      } catch (o) {
        if (Ft(o, "BUFFER_OVERRUN"))
          throw o;
        a = o, a.baseType = i.name, a.name = i.localName, a.type = i.type;
      }
    if (a == null)
      throw new Error("investigate");
    n.push(a), r.push(i.localName || null);
  }), Dt.fromItems(n, r);
}
class gv extends et {
  constructor(n, r, s) {
    const i = n.type + "[" + (r >= 0 ? r : "") + "]", a = r === -1 || n.dynamic;
    super("array", i, s, a);
    T(this, "coder");
    T(this, "length");
    M(this, { coder: n, length: r });
  }
  defaultValue() {
    const n = this.coder.defaultValue(), r = [];
    for (let s = 0; s < this.length; s++)
      r.push(n);
    return r;
  }
  encode(n, r) {
    const s = fe.dereference(r, "array");
    Array.isArray(s) || this._throwError("expected array value", s);
    let i = this.length;
    i === -1 && (i = s.length, n.writeValue(s.length)), wa(s.length, i, "coder array" + (this.localName ? " " + this.localName : ""));
    let a = [];
    for (let o = 0; o < s.length; o++)
      a.push(this.coder);
    return Ba(n, a, s);
  }
  decode(n) {
    let r = this.length;
    r === -1 && (r = n.readIndex(), B(r * pe <= n.dataLength, "insufficient data length", "BUFFER_OVERRUN", { buffer: n.bytes, offset: r * pe, length: n.dataLength }));
    let s = [];
    for (let i = 0; i < r; i++)
      s.push(new dv(this.coder));
    return Fa(n, s);
  }
}
class yv extends et {
  constructor(e) {
    super("bool", "bool", e, !1);
  }
  defaultValue() {
    return !1;
  }
  encode(e, n) {
    const r = fe.dereference(n, "bool");
    return e.writeValue(r ? 1 : 0);
  }
  decode(e) {
    return !!e.readValue();
  }
}
class Da extends et {
  constructor(e, n) {
    super(e, e, n, !0);
  }
  defaultValue() {
    return "0x";
  }
  encode(e, n) {
    n = De(n);
    let r = e.writeValue(n.length);
    return r += e.writeBytes(n), r;
  }
  decode(e) {
    return e.readBytes(e.readIndex(), !0);
  }
}
class mv extends Da {
  constructor(e) {
    super("bytes", e);
  }
  decode(e) {
    return se(super.decode(e));
  }
}
class bv extends et {
  constructor(n, r) {
    let s = "bytes" + String(n);
    super(s, s, r, !1);
    T(this, "size");
    M(this, { size: n }, { size: "number" });
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(n, r) {
    let s = De(fe.dereference(r, this.type));
    return s.length !== this.size && this._throwError("incorrect data length", r), n.writeBytes(s);
  }
  decode(n) {
    return se(n.readBytes(this.size));
  }
}
const vv = new Uint8Array([]);
class wv extends et {
  constructor(e) {
    super("null", "", e, !1);
  }
  defaultValue() {
    return null;
  }
  encode(e, n) {
    return n != null && this._throwError("not null", n), e.writeBytes(vv);
  }
  decode(e) {
    return e.readBytes(0), null;
  }
}
const $v = BigInt(0), Ev = BigInt(1), Tv = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
class Av extends et {
  constructor(n, r, s) {
    const i = (r ? "int" : "uint") + n * 8;
    super(i, i, s, !1);
    T(this, "size");
    T(this, "signed");
    M(this, { size: n, signed: r }, { size: "number", signed: "boolean" });
  }
  defaultValue() {
    return 0;
  }
  encode(n, r) {
    let s = ot(fe.dereference(r, this.type)), i = mn(Tv, pe * 8);
    if (this.signed) {
      let a = mn(i, this.size * 8 - 1);
      (s > a || s < -(a + Ev)) && this._throwError("value out-of-bounds", r), s = Sb(s, 8 * pe);
    } else
      (s < $v || s > mn(i, this.size * 8)) && this._throwError("value out-of-bounds", r);
    return n.writeValue(s);
  }
  decode(n) {
    let r = mn(n.readValue(), this.size * 8);
    return this.signed && (r = xb(r, this.size * 8)), r;
  }
}
class Ov extends Da {
  constructor(e) {
    super("string", e);
  }
  defaultValue() {
    return "";
  }
  encode(e, n) {
    return super.encode(e, Oa(fe.dereference(n, "string")));
  }
  decode(e) {
    return Bb(super.decode(e));
  }
}
class wn extends et {
  constructor(n, r) {
    let s = !1;
    const i = [];
    n.forEach((o) => {
      o.dynamic && (s = !0), i.push(o.type);
    });
    const a = "tuple(" + i.join(",") + ")";
    super("tuple", a, r, s);
    T(this, "coders");
    M(this, { coders: Object.freeze(n.slice()) });
  }
  defaultValue() {
    const n = [];
    this.coders.forEach((s) => {
      n.push(s.defaultValue());
    });
    const r = this.coders.reduce((s, i) => {
      const a = i.localName;
      return a && (s[a] || (s[a] = 0), s[a]++), s;
    }, {});
    return this.coders.forEach((s, i) => {
      let a = s.localName;
      !a || r[a] !== 1 || (a === "length" && (a = "_length"), n[a] == null && (n[a] = n[i]));
    }), Object.freeze(n);
  }
  encode(n, r) {
    const s = fe.dereference(r, "tuple");
    return Ba(n, this.coders, s);
  }
  decode(n) {
    return Fa(n, this.coders);
  }
}
function nn(t) {
  return it(Oa(t));
}
function pr(t, e) {
  return {
    address: wt(t),
    storageKeys: e.map((n, r) => (S(Je(n, 32), "invalid slot", `storageKeys[${r}]`, n), n.toLowerCase()))
  };
}
function _v(t) {
  if (Array.isArray(t))
    return t.map((n, r) => Array.isArray(n) ? (S(n.length === 2, "invalid slot set", `value[${r}]`, n), pr(n[0], n[1])) : (S(n != null && typeof n == "object", "invalid address-slot set", "value", t), pr(n.address, n.storageKeys)));
  S(t != null && typeof t == "object", "invalid access list", "value", t);
  const e = Object.keys(t).map((n) => {
    const r = t[n].reduce((s, i) => (s[i] = !0, s), {});
    return pr(n, Object.keys(r).sort());
  });
  return e.sort((n, r) => n.address.localeCompare(r.address)), e;
}
function de(t) {
  const e = /* @__PURE__ */ new Set();
  return t.forEach((n) => e.add(n)), Object.freeze(e);
}
const xv = "external public payable override", Sv = de(xv.split(" ")), Ma = "constant external internal payable private public pure view override", Nv = de(Ma.split(" ")), Ga = "constructor error event fallback function receive struct", Va = de(Ga.split(" ")), Ha = "calldata memory storage payable indexed", Iv = de(Ha.split(" ")), Pv = "tuple returns", Cv = [Ga, Ha, Pv, Ma].join(" "), kv = de(Cv.split(" ")), Rv = {
  "(": "OPEN_PAREN",
  ")": "CLOSE_PAREN",
  "[": "OPEN_BRACKET",
  "]": "CLOSE_BRACKET",
  ",": "COMMA",
  "@": "AT"
}, Uv = new RegExp("^(\\s*)"), Lv = new RegExp("^([0-9]+)"), Bv = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"), ja = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"), Ka = new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");
var oe, Ne, an, Nr;
const Dn = class Dn {
  constructor(e) {
    j(this, an);
    j(this, oe, void 0);
    j(this, Ne, void 0);
    V(this, oe, 0), V(this, Ne, e.slice());
  }
  get offset() {
    return x(this, oe);
  }
  get length() {
    return x(this, Ne).length - x(this, oe);
  }
  clone() {
    return new Dn(x(this, Ne));
  }
  reset() {
    V(this, oe, 0);
  }
  // Pops and returns the value of the next token, if it is a keyword in allowed; throws if out of tokens
  popKeyword(e) {
    const n = this.peek();
    if (n.type !== "KEYWORD" || !e.has(n.text))
      throw new Error(`expected keyword ${n.text}`);
    return this.pop().text;
  }
  // Pops and returns the value of the next token if it is `type`; throws if out of tokens
  popType(e) {
    if (this.peek().type !== e) {
      const n = this.peek();
      throw new Error(`expected ${e}; got ${n.type} ${JSON.stringify(n.text)}`);
    }
    return this.pop().text;
  }
  // Pops and returns a "(" TOKENS ")"
  popParen() {
    const e = this.peek();
    if (e.type !== "OPEN_PAREN")
      throw new Error("bad start");
    const n = q(this, an, Nr).call(this, x(this, oe) + 1, e.match + 1);
    return V(this, oe, e.match + 1), n;
  }
  // Pops and returns the items within "(" ITEM1 "," ITEM2 "," ... ")"
  popParams() {
    const e = this.peek();
    if (e.type !== "OPEN_PAREN")
      throw new Error("bad start");
    const n = [];
    for (; x(this, oe) < e.match - 1; ) {
      const r = this.peek().linkNext;
      n.push(q(this, an, Nr).call(this, x(this, oe) + 1, r)), V(this, oe, r);
    }
    return V(this, oe, e.match + 1), n;
  }
  // Returns the top Token, throwing if out of tokens
  peek() {
    if (x(this, oe) >= x(this, Ne).length)
      throw new Error("out-of-bounds");
    return x(this, Ne)[x(this, oe)];
  }
  // Returns the next value, if it is a keyword in `allowed`
  peekKeyword(e) {
    const n = this.peekType("KEYWORD");
    return n != null && e.has(n) ? n : null;
  }
  // Returns the value of the next token if it is `type`
  peekType(e) {
    if (this.length === 0)
      return null;
    const n = this.peek();
    return n.type === e ? n.text : null;
  }
  // Returns the next token; throws if out of tokens
  pop() {
    const e = this.peek();
    return ps(this, oe)._++, e;
  }
  toString() {
    const e = [];
    for (let n = x(this, oe); n < x(this, Ne).length; n++) {
      const r = x(this, Ne)[n];
      e.push(`${r.type}:${r.text}`);
    }
    return `<TokenString ${e.join(" ")}>`;
  }
};
oe = new WeakMap(), Ne = new WeakMap(), an = new WeakSet(), Nr = function(e = 0, n = 0) {
  return new Dn(x(this, Ne).slice(e, n).map((r) => Object.freeze(Object.assign({}, r, {
    match: r.match - e,
    linkBack: r.linkBack - e,
    linkNext: r.linkNext - e
  }))));
};
let Pe = Dn;
function ct(t) {
  const e = [], n = (a) => {
    const o = i < t.length ? JSON.stringify(t[i]) : "$EOI";
    throw new Error(`invalid token ${o} at ${i}: ${a}`);
  };
  let r = [], s = [], i = 0;
  for (; i < t.length; ) {
    let a = t.substring(i), o = a.match(Uv);
    o && (i += o[1].length, a = t.substring(i));
    const u = { depth: r.length, linkBack: -1, linkNext: -1, match: -1, type: "", text: "", offset: i, value: -1 };
    e.push(u);
    let f = Rv[a[0]] || "";
    if (f) {
      if (u.type = f, u.text = a[0], i++, f === "OPEN_PAREN")
        r.push(e.length - 1), s.push(e.length - 1);
      else if (f == "CLOSE_PAREN")
        r.length === 0 && n("no matching open bracket"), u.match = r.pop(), e[u.match].match = e.length - 1, u.depth--, u.linkBack = s.pop(), e[u.linkBack].linkNext = e.length - 1;
      else if (f === "COMMA")
        u.linkBack = s.pop(), e[u.linkBack].linkNext = e.length - 1, s.push(e.length - 1);
      else if (f === "OPEN_BRACKET")
        u.type = "BRACKET";
      else if (f === "CLOSE_BRACKET") {
        let m = e.pop().text;
        if (e.length > 0 && e[e.length - 1].type === "NUMBER") {
          const v = e.pop().text;
          m = v + m, e[e.length - 1].value = Qe(v);
        }
        if (e.length === 0 || e[e.length - 1].type !== "BRACKET")
          throw new Error("missing opening bracket");
        e[e.length - 1].text += m;
      }
      continue;
    }
    if (o = a.match(Bv), o) {
      if (u.text = o[1], i += u.text.length, kv.has(u.text)) {
        u.type = "KEYWORD";
        continue;
      }
      if (u.text.match(Ka)) {
        u.type = "TYPE";
        continue;
      }
      u.type = "ID";
      continue;
    }
    if (o = a.match(Lv), o) {
      u.text = o[1], u.type = "NUMBER", i += u.text.length;
      continue;
    }
    throw new Error(`unexpected token ${JSON.stringify(a[0])} at position ${i}`);
  }
  return new Pe(e.map((a) => Object.freeze(a)));
}
function vi(t, e) {
  let n = [];
  for (const r in e.keys())
    t.has(r) && n.push(r);
  if (n.length > 1)
    throw new Error(`conflicting types: ${n.join(", ")}`);
}
function Zn(t, e) {
  if (e.peekKeyword(Va)) {
    const n = e.pop().text;
    if (n !== t)
      throw new Error(`expected ${t}, got ${n}`);
  }
  return e.popType("ID");
}
function Ze(t, e) {
  const n = /* @__PURE__ */ new Set();
  for (; ; ) {
    const r = t.peekType("KEYWORD");
    if (r == null || e && !e.has(r))
      break;
    if (t.pop(), n.has(r))
      throw new Error(`duplicate keywords: ${JSON.stringify(r)}`);
    n.add(r);
  }
  return Object.freeze(n);
}
function za(t) {
  let e = Ze(t, Nv);
  return vi(e, de("constant payable nonpayable".split(" "))), vi(e, de("pure view payable nonpayable".split(" "))), e.has("view") ? "view" : e.has("pure") ? "pure" : e.has("payable") ? "payable" : e.has("nonpayable") ? "nonpayable" : e.has("constant") ? "view" : "nonpayable";
}
function qe(t, e) {
  return t.popParams().map((n) => ce.from(n, e));
}
function Wa(t) {
  if (t.peekType("AT")) {
    if (t.pop(), t.peekType("NUMBER"))
      return ot(t.pop().text);
    throw new Error("invalid gas");
  }
  return null;
}
function $t(t) {
  if (t.length)
    throw new Error(`unexpected tokens at offset ${t.offset}: ${t.toString()}`);
}
const Fv = new RegExp(/^(.*)\[([0-9]*)\]$/);
function wi(t) {
  const e = t.match(Ka);
  if (S(e, "invalid type", "type", t), t === "uint")
    return "uint256";
  if (t === "int")
    return "int256";
  if (e[2]) {
    const n = parseInt(e[2]);
    S(n !== 0 && n <= 32, "invalid bytes length", "type", t);
  } else if (e[3]) {
    const n = parseInt(e[3]);
    S(n !== 0 && n <= 256 && n % 8 === 0, "invalid numeric width", "type", t);
  }
  return t;
}
const Z = {}, be = Symbol.for("_ethers_internal"), $i = "_ParamTypeInternal", Ei = "_ErrorInternal", Ti = "_EventInternal", Ai = "_ConstructorInternal", Oi = "_FallbackInternal", _i = "_FunctionInternal", xi = "_StructInternal";
var Rt, xn;
const Oe = class Oe {
  /**
   *  @private
   */
  constructor(e, n, r, s, i, a, o, u) {
    j(this, Rt);
    /**
     *  The local name of the parameter (or ``""`` if unbound)
     */
    T(this, "name");
    /**
     *  The fully qualified type (e.g. ``"address"``, ``"tuple(address)"``,
     *  ``"uint256[3][]"``)
     */
    T(this, "type");
    /**
     *  The base type (e.g. ``"address"``, ``"tuple"``, ``"array"``)
     */
    T(this, "baseType");
    /**
     *  True if the parameters is indexed.
     *
     *  For non-indexable types this is ``null``.
     */
    T(this, "indexed");
    /**
     *  The components for the tuple.
     *
     *  For non-tuple types this is ``null``.
     */
    T(this, "components");
    /**
     *  The array length, or ``-1`` for dynamic-lengthed arrays.
     *
     *  For non-array types this is ``null``.
     */
    T(this, "arrayLength");
    /**
     *  The type of each child in the array.
     *
     *  For non-array types this is ``null``.
     */
    T(this, "arrayChildren");
    if (ss(e, Z, "ParamType"), Object.defineProperty(this, be, { value: $i }), a && (a = Object.freeze(a.slice())), s === "array") {
      if (o == null || u == null)
        throw new Error("");
    } else if (o != null || u != null)
      throw new Error("");
    if (s === "tuple") {
      if (a == null)
        throw new Error("");
    } else if (a != null)
      throw new Error("");
    M(this, {
      name: n,
      type: r,
      baseType: s,
      indexed: i,
      components: a,
      arrayLength: o,
      arrayChildren: u
    });
  }
  /**
   *  Return a string representation of this type.
   *
   *  For example,
   *
   *  ``sighash" => "(uint256,address)"``
   *
   *  ``"minimal" => "tuple(uint256,address) indexed"``
   *
   *  ``"full" => "tuple(uint256 foo, address bar) indexed baz"``
   */
  format(e) {
    if (e == null && (e = "sighash"), e === "json") {
      const r = this.name || "";
      if (this.isArray()) {
        const i = JSON.parse(this.arrayChildren.format("json"));
        return i.name = r, i.type += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`, JSON.stringify(i);
      }
      const s = {
        type: this.baseType === "tuple" ? "tuple" : this.type,
        name: r
      };
      return typeof this.indexed == "boolean" && (s.indexed = this.indexed), this.isTuple() && (s.components = this.components.map((i) => JSON.parse(i.format(e)))), JSON.stringify(s);
    }
    let n = "";
    return this.isArray() ? (n += this.arrayChildren.format(e), n += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`) : this.isTuple() ? n += "(" + this.components.map((r) => r.format(e)).join(e === "full" ? ", " : ",") + ")" : n += this.type, e !== "sighash" && (this.indexed === !0 && (n += " indexed"), e === "full" && this.name && (n += " " + this.name)), n;
  }
  /**
   *  Returns true if %%this%% is an Array type.
   *
   *  This provides a type gaurd ensuring that [[arrayChildren]]
   *  and [[arrayLength]] are non-null.
   */
  isArray() {
    return this.baseType === "array";
  }
  /**
   *  Returns true if %%this%% is a Tuple type.
   *
   *  This provides a type gaurd ensuring that [[components]]
   *  is non-null.
   */
  isTuple() {
    return this.baseType === "tuple";
  }
  /**
   *  Returns true if %%this%% is an Indexable type.
   *
   *  This provides a type gaurd ensuring that [[indexed]]
   *  is non-null.
   */
  isIndexable() {
    return this.indexed != null;
  }
  /**
   *  Walks the **ParamType** with %%value%%, calling %%process%%
   *  on each type, destructing the %%value%% recursively.
   */
  walk(e, n) {
    if (this.isArray()) {
      if (!Array.isArray(e))
        throw new Error("invalid array value");
      if (this.arrayLength !== -1 && e.length !== this.arrayLength)
        throw new Error("array is wrong length");
      const r = this;
      return e.map((s) => r.arrayChildren.walk(s, n));
    }
    if (this.isTuple()) {
      if (!Array.isArray(e))
        throw new Error("invalid tuple value");
      if (e.length !== this.components.length)
        throw new Error("array is wrong length");
      const r = this;
      return e.map((s, i) => r.components[i].walk(s, n));
    }
    return n(this.type, e);
  }
  /**
   *  Walks the **ParamType** with %%value%%, asynchronously calling
   *  %%process%% on each type, destructing the %%value%% recursively.
   *
   *  This can be used to resolve ENS names by walking and resolving each
   *  ``"address"`` type.
   */
  async walkAsync(e, n) {
    const r = [], s = [e];
    return q(this, Rt, xn).call(this, r, e, n, (i) => {
      s[0] = i;
    }), r.length && await Promise.all(r), s[0];
  }
  /**
   *  Creates a new **ParamType** for %%obj%%.
   *
   *  If %%allowIndexed%% then the ``indexed`` keyword is permitted,
   *  otherwise the ``indexed`` keyword will throw an error.
   */
  static from(e, n) {
    if (Oe.isParamType(e))
      return e;
    if (typeof e == "string")
      try {
        return Oe.from(ct(e), n);
      } catch (o) {
        S(!1, "invalid param type", "obj", e);
      }
    else if (e instanceof Pe) {
      let o = "", u = "", f = null;
      Ze(e, de(["tuple"])).has("tuple") || e.peekType("OPEN_PAREN") ? (u = "tuple", f = e.popParams().map((C) => Oe.from(C)), o = `tuple(${f.map((C) => C.format()).join(",")})`) : (o = wi(e.popType("TYPE")), u = o);
      let m = null, v = null;
      for (; e.length && e.peekType("BRACKET"); ) {
        const C = e.pop();
        m = new Oe(Z, "", o, u, null, f, v, m), v = C.value, o += C.text, u = "array", f = null;
      }
      let A = null;
      if (Ze(e, Iv).has("indexed")) {
        if (!n)
          throw new Error("");
        A = !0;
      }
      const k = e.peekType("ID") ? e.pop().text : "";
      if (e.length)
        throw new Error("leftover tokens");
      return new Oe(Z, k, o, u, A, f, v, m);
    }
    const r = e.name;
    S(!r || typeof r == "string" && r.match(ja), "invalid name", "obj.name", r);
    let s = e.indexed;
    s != null && (S(n, "parameter cannot be indexed", "obj.indexed", e.indexed), s = !!s);
    let i = e.type, a = i.match(Fv);
    if (a) {
      const o = parseInt(a[2] || "-1"), u = Oe.from({
        type: a[1],
        components: e.components
      });
      return new Oe(Z, r || "", i, "array", s, null, o, u);
    }
    if (i === "tuple" || i.startsWith(
      "tuple("
      /* fix: ) */
    ) || i.startsWith(
      "("
      /* fix: ) */
    )) {
      const o = e.components != null ? e.components.map((f) => Oe.from(f)) : null;
      return new Oe(Z, r || "", i, "tuple", s, o, null, null);
    }
    return i = wi(e.type), new Oe(Z, r || "", i, i, s, null, null, null);
  }
  /**
   *  Returns true if %%value%% is a **ParamType**.
   */
  static isParamType(e) {
    return e && e[be] === $i;
  }
};
Rt = new WeakSet(), xn = function(e, n, r, s) {
  if (this.isArray()) {
    if (!Array.isArray(n))
      throw new Error("invalid array value");
    if (this.arrayLength !== -1 && n.length !== this.arrayLength)
      throw new Error("array is wrong length");
    const a = this.arrayChildren, o = n.slice();
    o.forEach((u, f) => {
      var m;
      q(m = a, Rt, xn).call(m, e, u, r, (v) => {
        o[f] = v;
      });
    }), s(o);
    return;
  }
  if (this.isTuple()) {
    const a = this.components;
    let o;
    if (Array.isArray(n))
      o = n.slice();
    else {
      if (n == null || typeof n != "object")
        throw new Error("invalid tuple value");
      o = a.map((u) => {
        if (!u.name)
          throw new Error("cannot use object value with unnamed components");
        if (!(u.name in n))
          throw new Error(`missing value for component ${u.name}`);
        return n[u.name];
      });
    }
    if (o.length !== this.components.length)
      throw new Error("array is wrong length");
    o.forEach((u, f) => {
      var m;
      q(m = a[f], Rt, xn).call(m, e, u, r, (v) => {
        o[f] = v;
      });
    }), s(o);
    return;
  }
  const i = r(this.type, n);
  i.then ? e.push(async function() {
    s(await i);
  }()) : s(i);
};
let ce = Oe;
class Et {
  /**
   *  @private
   */
  constructor(e, n, r) {
    /**
     *  The type of the fragment.
     */
    T(this, "type");
    /**
     *  The inputs for the fragment.
     */
    T(this, "inputs");
    ss(e, Z, "Fragment"), r = Object.freeze(r.slice()), M(this, { type: n, inputs: r });
  }
  /**
   *  Creates a new **Fragment** for %%obj%%, wich can be any supported
   *  ABI frgament type.
   */
  static from(e) {
    if (typeof e == "string") {
      try {
        Et.from(JSON.parse(e));
      } catch (n) {
      }
      return Et.from(ct(e));
    }
    if (e instanceof Pe)
      switch (e.peekKeyword(Va)) {
        case "constructor":
          return Xe.from(e);
        case "error":
          return me.from(e);
        case "event":
          return Be.from(e);
        case "fallback":
        case "receive":
          return Ke.from(e);
        case "function":
          return Fe.from(e);
        case "struct":
          return vt.from(e);
      }
    else if (typeof e == "object") {
      switch (e.type) {
        case "constructor":
          return Xe.from(e);
        case "error":
          return me.from(e);
        case "event":
          return Be.from(e);
        case "fallback":
        case "receive":
          return Ke.from(e);
        case "function":
          return Fe.from(e);
        case "struct":
          return vt.from(e);
      }
      B(!1, `unsupported type: ${e.type}`, "UNSUPPORTED_OPERATION", {
        operation: "Fragment.from"
      });
    }
    S(!1, "unsupported frgament object", "obj", e);
  }
  /**
   *  Returns true if %%value%% is a [[ConstructorFragment]].
   */
  static isConstructor(e) {
    return Xe.isFragment(e);
  }
  /**
   *  Returns true if %%value%% is an [[ErrorFragment]].
   */
  static isError(e) {
    return me.isFragment(e);
  }
  /**
   *  Returns true if %%value%% is an [[EventFragment]].
   */
  static isEvent(e) {
    return Be.isFragment(e);
  }
  /**
   *  Returns true if %%value%% is a [[FunctionFragment]].
   */
  static isFunction(e) {
    return Fe.isFragment(e);
  }
  /**
   *  Returns true if %%value%% is a [[StructFragment]].
   */
  static isStruct(e) {
    return vt.isFragment(e);
  }
}
class Qn extends Et {
  /**
   *  @private
   */
  constructor(n, r, s, i) {
    super(n, r, i);
    /**
     *  The name of the fragment.
     */
    T(this, "name");
    S(typeof s == "string" && s.match(ja), "invalid identifier", "name", s), i = Object.freeze(i.slice()), M(this, { name: s });
  }
}
function rn(t, e) {
  return "(" + e.map((n) => n.format(t)).join(t === "full" ? ", " : ",") + ")";
}
class me extends Qn {
  /**
   *  @private
   */
  constructor(e, n, r) {
    super(e, "error", n, r), Object.defineProperty(this, be, { value: Ei });
  }
  /**
   *  The Custom Error selector.
   */
  get selector() {
    return nn(this.format("sighash")).substring(0, 10);
  }
  /**
   *  Returns a string representation of this fragment as %%format%%.
   */
  format(e) {
    if (e == null && (e = "sighash"), e === "json")
      return JSON.stringify({
        type: "error",
        name: this.name,
        inputs: this.inputs.map((r) => JSON.parse(r.format(e)))
      });
    const n = [];
    return e !== "sighash" && n.push("error"), n.push(this.name + rn(e, this.inputs)), n.join(" ");
  }
  /**
   *  Returns a new **ErrorFragment** for %%obj%%.
   */
  static from(e) {
    if (me.isFragment(e))
      return e;
    if (typeof e == "string")
      return me.from(ct(e));
    if (e instanceof Pe) {
      const n = Zn("error", e), r = qe(e);
      return $t(e), new me(Z, n, r);
    }
    return new me(Z, e.name, e.inputs ? e.inputs.map(ce.from) : []);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **ErrorFragment**.
   */
  static isFragment(e) {
    return e && e[be] === Ei;
  }
}
class Be extends Qn {
  /**
   *  @private
   */
  constructor(n, r, s, i) {
    super(n, "event", r, s);
    /**
     *  Whether this event is anonymous.
     */
    T(this, "anonymous");
    Object.defineProperty(this, be, { value: Ti }), M(this, { anonymous: i });
  }
  /**
   *  The Event topic hash.
   */
  get topicHash() {
    return nn(this.format("sighash"));
  }
  /**
   *  Returns a string representation of this event as %%format%%.
   */
  format(n) {
    if (n == null && (n = "sighash"), n === "json")
      return JSON.stringify({
        type: "event",
        anonymous: this.anonymous,
        name: this.name,
        inputs: this.inputs.map((s) => JSON.parse(s.format(n)))
      });
    const r = [];
    return n !== "sighash" && r.push("event"), r.push(this.name + rn(n, this.inputs)), n !== "sighash" && this.anonymous && r.push("anonymous"), r.join(" ");
  }
  /**
   *  Return the topic hash for an event with %%name%% and %%params%%.
   */
  static getTopicHash(n, r) {
    return r = (r || []).map((i) => ce.from(i)), new Be(Z, n, r, !1).topicHash;
  }
  /**
   *  Returns a new **EventFragment** for %%obj%%.
   */
  static from(n) {
    if (Be.isFragment(n))
      return n;
    if (typeof n == "string")
      try {
        return Be.from(ct(n));
      } catch (r) {
        S(!1, "invalid event fragment", "obj", n);
      }
    else if (n instanceof Pe) {
      const r = Zn("event", n), s = qe(n, !0), i = !!Ze(n, de(["anonymous"])).has("anonymous");
      return $t(n), new Be(Z, r, s, i);
    }
    return new Be(Z, n.name, n.inputs ? n.inputs.map((r) => ce.from(r, !0)) : [], !!n.anonymous);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **EventFragment**.
   */
  static isFragment(n) {
    return n && n[be] === Ti;
  }
}
class Xe extends Et {
  /**
   *  @private
   */
  constructor(n, r, s, i, a) {
    super(n, r, s);
    /**
     *  Whether the constructor can receive an endowment.
     */
    T(this, "payable");
    /**
     *  The recommended gas limit for deployment or ``null``.
     */
    T(this, "gas");
    Object.defineProperty(this, be, { value: Ai }), M(this, { payable: i, gas: a });
  }
  /**
   *  Returns a string representation of this constructor as %%format%%.
   */
  format(n) {
    if (B(n != null && n !== "sighash", "cannot format a constructor for sighash", "UNSUPPORTED_OPERATION", { operation: "format(sighash)" }), n === "json")
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.payable ? "payable" : "undefined",
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((s) => JSON.parse(s.format(n)))
      });
    const r = [`constructor${rn(n, this.inputs)}`];
    return this.payable && r.push("payable"), this.gas != null && r.push(`@${this.gas.toString()}`), r.join(" ");
  }
  /**
   *  Returns a new **ConstructorFragment** for %%obj%%.
   */
  static from(n) {
    if (Xe.isFragment(n))
      return n;
    if (typeof n == "string")
      try {
        return Xe.from(ct(n));
      } catch (r) {
        S(!1, "invalid constuctor fragment", "obj", n);
      }
    else if (n instanceof Pe) {
      Ze(n, de(["constructor"]));
      const r = qe(n), s = !!Ze(n, Sv).has("payable"), i = Wa(n);
      return $t(n), new Xe(Z, "constructor", r, s, i);
    }
    return new Xe(Z, "constructor", n.inputs ? n.inputs.map(ce.from) : [], !!n.payable, n.gas != null ? n.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **ConstructorFragment**.
   */
  static isFragment(n) {
    return n && n[be] === Ai;
  }
}
class Ke extends Et {
  constructor(n, r, s) {
    super(n, "fallback", r);
    /**
     *  If the function can be sent value during invocation.
     */
    T(this, "payable");
    Object.defineProperty(this, be, { value: Oi }), M(this, { payable: s });
  }
  /**
   *  Returns a string representation of this fallback as %%format%%.
   */
  format(n) {
    const r = this.inputs.length === 0 ? "receive" : "fallback";
    if (n === "json") {
      const s = this.payable ? "payable" : "nonpayable";
      return JSON.stringify({ type: r, stateMutability: s });
    }
    return `${r}()${this.payable ? " payable" : ""}`;
  }
  /**
   *  Returns a new **FallbackFragment** for %%obj%%.
   */
  static from(n) {
    if (Ke.isFragment(n))
      return n;
    if (typeof n == "string")
      try {
        return Ke.from(ct(n));
      } catch (r) {
        S(!1, "invalid fallback fragment", "obj", n);
      }
    else if (n instanceof Pe) {
      const r = n.toString(), s = n.peekKeyword(de(["fallback", "receive"]));
      if (S(s, "type must be fallback or receive", "obj", r), n.popKeyword(de(["fallback", "receive"])) === "receive") {
        const u = qe(n);
        return S(u.length === 0, "receive cannot have arguments", "obj.inputs", u), Ze(n, de(["payable"])), $t(n), new Ke(Z, [], !0);
      }
      let a = qe(n);
      a.length ? S(a.length === 1 && a[0].type === "bytes", "invalid fallback inputs", "obj.inputs", a.map((u) => u.format("minimal")).join(", ")) : a = [ce.from("bytes")];
      const o = za(n);
      if (S(o === "nonpayable" || o === "payable", "fallback cannot be constants", "obj.stateMutability", o), Ze(n, de(["returns"])).has("returns")) {
        const u = qe(n);
        S(u.length === 1 && u[0].type === "bytes", "invalid fallback outputs", "obj.outputs", u.map((f) => f.format("minimal")).join(", "));
      }
      return $t(n), new Ke(Z, a, o === "payable");
    }
    if (n.type === "receive")
      return new Ke(Z, [], !0);
    if (n.type === "fallback") {
      const r = [ce.from("bytes")], s = n.stateMutability === "payable";
      return new Ke(Z, r, s);
    }
    S(!1, "invalid fallback description", "obj", n);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FallbackFragment**.
   */
  static isFragment(n) {
    return n && n[be] === Oi;
  }
}
class Fe extends Qn {
  /**
   *  @private
   */
  constructor(n, r, s, i, a, o) {
    super(n, "function", r, i);
    /**
     *  If the function is constant (e.g. ``pure`` or ``view`` functions).
     */
    T(this, "constant");
    /**
     *  The returned types for the result of calling this function.
     */
    T(this, "outputs");
    /**
     *  The state mutability (e.g. ``payable``, ``nonpayable``, ``view``
     *  or ``pure``)
     */
    T(this, "stateMutability");
    /**
     *  If the function can be sent value during invocation.
     */
    T(this, "payable");
    /**
     *  The recommended gas limit to send when calling this function.
     */
    T(this, "gas");
    Object.defineProperty(this, be, { value: _i }), a = Object.freeze(a.slice()), M(this, { constant: s === "view" || s === "pure", gas: o, outputs: a, payable: s === "payable", stateMutability: s });
  }
  /**
   *  The Function selector.
   */
  get selector() {
    return nn(this.format("sighash")).substring(0, 10);
  }
  /**
   *  Returns a string representation of this function as %%format%%.
   */
  format(n) {
    if (n == null && (n = "sighash"), n === "json")
      return JSON.stringify({
        type: "function",
        name: this.name,
        constant: this.constant,
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((s) => JSON.parse(s.format(n))),
        outputs: this.outputs.map((s) => JSON.parse(s.format(n)))
      });
    const r = [];
    return n !== "sighash" && r.push("function"), r.push(this.name + rn(n, this.inputs)), n !== "sighash" && (this.stateMutability !== "nonpayable" && r.push(this.stateMutability), this.outputs && this.outputs.length && (r.push("returns"), r.push(rn(n, this.outputs))), this.gas != null && r.push(`@${this.gas.toString()}`)), r.join(" ");
  }
  /**
   *  Return the selector for a function with %%name%% and %%params%%.
   */
  static getSelector(n, r) {
    return r = (r || []).map((i) => ce.from(i)), new Fe(Z, n, "view", r, [], null).selector;
  }
  /**
   *  Returns a new **FunctionFragment** for %%obj%%.
   */
  static from(n) {
    if (Fe.isFragment(n))
      return n;
    if (typeof n == "string")
      try {
        return Fe.from(ct(n));
      } catch (s) {
        S(!1, "invalid function fragment", "obj", n);
      }
    else if (n instanceof Pe) {
      const s = Zn("function", n), i = qe(n), a = za(n);
      let o = [];
      Ze(n, de(["returns"])).has("returns") && (o = qe(n));
      const u = Wa(n);
      return $t(n), new Fe(Z, s, a, i, o, u);
    }
    let r = n.stateMutability;
    return r == null && (r = "payable", typeof n.constant == "boolean" ? (r = "view", n.constant || (r = "payable", typeof n.payable == "boolean" && !n.payable && (r = "nonpayable"))) : typeof n.payable == "boolean" && !n.payable && (r = "nonpayable")), new Fe(Z, n.name, r, n.inputs ? n.inputs.map(ce.from) : [], n.outputs ? n.outputs.map(ce.from) : [], n.gas != null ? n.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FunctionFragment**.
   */
  static isFragment(n) {
    return n && n[be] === _i;
  }
}
class vt extends Qn {
  /**
   *  @private
   */
  constructor(e, n, r) {
    super(e, "struct", n, r), Object.defineProperty(this, be, { value: xi });
  }
  /**
   *  Returns a string representation of this struct as %%format%%.
   */
  format() {
    throw new Error("@TODO");
  }
  /**
   *  Returns a new **StructFragment** for %%obj%%.
   */
  static from(e) {
    if (typeof e == "string")
      try {
        return vt.from(ct(e));
      } catch (n) {
        S(!1, "invalid struct fragment", "obj", e);
      }
    else if (e instanceof Pe) {
      const n = Zn("struct", e), r = qe(e);
      return $t(e), new vt(Z, n, r);
    }
    return new vt(Z, e.name, e.inputs ? e.inputs.map(ce.from) : []);
  }
  // @TODO: fix this return type
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **StructFragment**.
   */
  static isFragment(e) {
    return e && e[be] === xi;
  }
}
const Ce = /* @__PURE__ */ new Map();
Ce.set(0, "GENERIC_PANIC");
Ce.set(1, "ASSERT_FALSE");
Ce.set(17, "OVERFLOW");
Ce.set(18, "DIVIDE_BY_ZERO");
Ce.set(33, "ENUM_RANGE_ERROR");
Ce.set(34, "BAD_STORAGE_DATA");
Ce.set(49, "STACK_UNDERFLOW");
Ce.set(50, "ARRAY_RANGE_ERROR");
Ce.set(65, "OUT_OF_MEMORY");
Ce.set(81, "UNINITIALIZED_FUNCTION_CALL");
const Dv = new RegExp(/^bytes([0-9]*)$/), Mv = new RegExp(/^(u?int)([0-9]*)$/);
let dr = null, Si = 1024;
function Gv(t, e, n, r) {
  let s = "missing revert data", i = null;
  const a = null;
  let o = null;
  if (n) {
    s = "execution reverted";
    const f = Ye(n);
    if (n = se(n), f.length === 0)
      s += " (no data present; likely require(false) occurred", i = "require(false)";
    else if (f.length % 32 !== 4)
      s += " (could not decode reason; invalid data length)";
    else if (se(f.slice(0, 4)) === "0x08c379a0")
      try {
        i = r.decode(["string"], f.slice(4))[0], o = {
          signature: "Error(string)",
          name: "Error",
          args: [i]
        }, s += `: ${JSON.stringify(i)}`;
      } catch (m) {
        s += " (could not decode reason; invalid string data)";
      }
    else if (se(f.slice(0, 4)) === "0x4e487b71")
      try {
        const m = Number(r.decode(["uint256"], f.slice(4))[0]);
        o = {
          signature: "Panic(uint256)",
          name: "Panic",
          args: [m]
        }, i = `Panic due to ${Ce.get(m) || "UNKNOWN"}(${m})`, s += `: ${i}`;
      } catch (m) {
        s += " (could not decode panic code)";
      }
    else
      s += " (unknown custom error)";
  }
  const u = {
    to: e.to ? wt(e.to) : null,
    data: e.data || "0x"
  };
  return e.from && (u.from = wt(e.from)), en(s, "CALL_EXCEPTION", {
    action: t,
    data: n,
    reason: i,
    transaction: u,
    invocation: a,
    revert: o
  });
}
var rt, _t;
const Mn = class Mn {
  constructor() {
    j(this, rt);
  }
  /**
   *  Get the default values for the given %%types%%.
   *
   *  For example, a ``uint`` is by default ``0`` and ``bool``
   *  is by default ``false``.
   */
  getDefaultValue(e) {
    const n = e.map((s) => q(this, rt, _t).call(this, ce.from(s)));
    return new wn(n, "_").defaultValue();
  }
  /**
   *  Encode the %%values%% as the %%types%% into ABI data.
   *
   *  @returns DataHexstring
   */
  encode(e, n) {
    wa(n.length, e.length, "types/values length mismatch");
    const r = e.map((a) => q(this, rt, _t).call(this, ce.from(a))), s = new wn(r, "_"), i = new _r();
    return s.encode(i, n), i.data;
  }
  /**
   *  Decode the ABI %%data%% as the %%types%% into values.
   *
   *  If %%loose%% decoding is enabled, then strict padding is
   *  not enforced. Some older versions of Solidity incorrectly
   *  padded event data emitted from ``external`` functions.
   */
  decode(e, n, r) {
    const s = e.map((a) => q(this, rt, _t).call(this, ce.from(a)));
    return new wn(s, "_").decode(new xr(n, r, Si));
  }
  static _setDefaultMaxInflation(e) {
    S(typeof e == "number" && Number.isInteger(e), "invalid defaultMaxInflation factor", "value", e), Si = e;
  }
  /**
   *  Returns the shared singleton instance of a default [[AbiCoder]].
   *
   *  On the first call, the instance is created internally.
   */
  static defaultAbiCoder() {
    return dr == null && (dr = new Mn()), dr;
  }
  /**
   *  Returns an ethers-compatible [[CallExceptionError]] Error for the given
   *  result %%data%% for the [[CallExceptionAction]] %%action%% against
   *  the Transaction %%tx%%.
   */
  static getBuiltinCallException(e, n, r) {
    return Gv(e, n, r, Mn.defaultAbiCoder());
  }
};
rt = new WeakSet(), _t = function(e) {
  if (e.isArray())
    return new gv(q(this, rt, _t).call(this, e.arrayChildren), e.arrayLength, e.name);
  if (e.isTuple())
    return new wn(e.components.map((r) => q(this, rt, _t).call(this, r)), e.name);
  switch (e.baseType) {
    case "address":
      return new pv(e.name);
    case "bool":
      return new yv(e.name);
    case "string":
      return new Ov(e.name);
    case "bytes":
      return new mv(e.name);
    case "":
      return new wv(e.name);
  }
  let n = e.type.match(Mv);
  if (n) {
    let r = parseInt(n[2] || "256");
    return S(r !== 0 && r <= 256 && r % 8 === 0, "invalid " + n[1] + " bit length", "param", e), new Av(r / 8, n[1] === "int", e.name);
  }
  if (n = e.type.match(Dv), n) {
    let r = parseInt(n[1]);
    return S(r !== 0 && r <= 32, "invalid bytes length", "param", e), new bv(r, e.name);
  }
  S(!1, "invalid type", "type", e.type);
};
let Ln = Mn;
class Vv {
  /**
   *  @_ignore:
   */
  constructor(e, n, r) {
    /**
     *  The matching fragment for the ``topic0``.
     */
    T(this, "fragment");
    /**
     *  The name of the Event.
     */
    T(this, "name");
    /**
     *  The full Event signature.
     */
    T(this, "signature");
    /**
     *  The topic hash for the Event.
     */
    T(this, "topic");
    /**
     *  The arguments passed into the Event with ``emit``.
     */
    T(this, "args");
    const s = e.name, i = e.format();
    M(this, {
      fragment: e,
      name: s,
      signature: i,
      topic: n,
      args: r
    });
  }
}
class Hv {
  /**
   *  @_ignore:
   */
  constructor(e, n, r, s) {
    /**
     *  The matching fragment from the transaction ``data``.
     */
    T(this, "fragment");
    /**
     *  The name of the Function from the transaction ``data``.
     */
    T(this, "name");
    /**
     *  The arguments passed to the Function from the transaction ``data``.
     */
    T(this, "args");
    /**
     *  The full Function signature from the transaction ``data``.
     */
    T(this, "signature");
    /**
     *  The selector for the Function from the transaction ``data``.
     */
    T(this, "selector");
    /**
     *  The ``value`` (in wei) from the transaction.
     */
    T(this, "value");
    const i = e.name, a = e.format();
    M(this, {
      fragment: e,
      name: i,
      args: r,
      signature: a,
      selector: n,
      value: s
    });
  }
}
class jv {
  /**
   *  @_ignore:
   */
  constructor(e, n, r) {
    /**
     *  The matching fragment.
     */
    T(this, "fragment");
    /**
     *  The name of the Error.
     */
    T(this, "name");
    /**
     *  The arguments passed to the Error with ``revert``.
     */
    T(this, "args");
    /**
     *  The full Error signature.
     */
    T(this, "signature");
    /**
     *  The selector for the Error.
     */
    T(this, "selector");
    const s = e.name, i = e.format();
    M(this, {
      fragment: e,
      name: s,
      args: r,
      signature: i,
      selector: n
    });
  }
}
class Ni {
  /**
   *  @_ignore:
   */
  constructor(e) {
    /**
     *  The ``keccak256`` of the value logged.
     */
    T(this, "hash");
    /**
     *  @_ignore:
     */
    T(this, "_isIndexed");
    M(this, { hash: e, _isIndexed: !0 });
  }
  /**
   *  Returns ``true`` if %%value%% is an **Indexed**.
   *
   *  This provides a Type Guard for property access.
   */
  static isIndexed(e) {
    return !!(e && e._isIndexed);
  }
}
const Ii = {
  0: "generic panic",
  1: "assert(false)",
  17: "arithmetic overflow",
  18: "division or modulo by zero",
  33: "enum overflow",
  34: "invalid encoded storage byte array accessed",
  49: "out-of-bounds array access; popping on an empty array",
  50: "out-of-bounds access of an array or bytesN",
  65: "out of memory",
  81: "uninitialized function"
}, Pi = {
  "0x08c379a0": {
    signature: "Error(string)",
    name: "Error",
    inputs: ["string"],
    reason: (t) => `reverted with reason string ${JSON.stringify(t)}`
  },
  "0x4e487b71": {
    signature: "Panic(uint256)",
    name: "Panic",
    inputs: ["uint256"],
    reason: (t) => {
      let e = "unknown panic code";
      return t >= 0 && t <= 255 && Ii[t.toString()] && (e = Ii[t.toString()]), `reverted with panic code 0x${t.toString(16)} (${e})`;
    }
  }
};
var Re, Ue, Le, le, Ut, Sn, Lt, Nn;
const ht = class ht {
  /**
   *  Create a new Interface for the %%fragments%%.
   */
  constructor(e) {
    // Find a function definition by any means necessary (unless it is ambiguous)
    j(this, Ut);
    // Find an event definition by any means necessary (unless it is ambiguous)
    j(this, Lt);
    /**
     *  All the Contract ABI members (i.e. methods, events, errors, etc).
     */
    T(this, "fragments");
    /**
     *  The Contract constructor.
     */
    T(this, "deploy");
    /**
     *  The Fallback method, if any.
     */
    T(this, "fallback");
    /**
     *  If receiving ether is supported.
     */
    T(this, "receive");
    j(this, Re, void 0);
    j(this, Ue, void 0);
    j(this, Le, void 0);
    //    #structs: Map<string, StructFragment>;
    j(this, le, void 0);
    let n = [];
    typeof e == "string" ? n = JSON.parse(e) : n = e, V(this, Le, /* @__PURE__ */ new Map()), V(this, Re, /* @__PURE__ */ new Map()), V(this, Ue, /* @__PURE__ */ new Map());
    const r = [];
    for (const a of n)
      try {
        r.push(Et.from(a));
      } catch (o) {
        console.log(`[Warning] Invalid Fragment ${JSON.stringify(a)}:`, o.message);
      }
    M(this, {
      fragments: Object.freeze(r)
    });
    let s = null, i = !1;
    V(this, le, this.getAbiCoder()), this.fragments.forEach((a, o) => {
      let u;
      switch (a.type) {
        case "constructor":
          if (this.deploy) {
            console.log("duplicate definition - constructor");
            return;
          }
          M(this, { deploy: a });
          return;
        case "fallback":
          a.inputs.length === 0 ? i = !0 : (S(!s || a.payable !== s.payable, "conflicting fallback fragments", `fragments[${o}]`, a), s = a, i = s.payable);
          return;
        case "function":
          u = x(this, Le);
          break;
        case "event":
          u = x(this, Ue);
          break;
        case "error":
          u = x(this, Re);
          break;
        default:
          return;
      }
      const f = a.format();
      u.has(f) || u.set(f, a);
    }), this.deploy || M(this, {
      deploy: Xe.from("constructor()")
    }), M(this, { fallback: s, receive: i });
  }
  /**
   *  Returns the entire Human-Readable ABI, as an array of
   *  signatures, optionally as %%minimal%% strings, which
   *  removes parameter names and unneceesary spaces.
   */
  format(e) {
    const n = e ? "minimal" : "full";
    return this.fragments.map((s) => s.format(n));
  }
  /**
   *  Return the JSON-encoded ABI. This is the format Solidiy
   *  returns.
   */
  formatJson() {
    const e = this.fragments.map((n) => n.format("json"));
    return JSON.stringify(e.map((n) => JSON.parse(n)));
  }
  /**
   *  The ABI coder that will be used to encode and decode binary
   *  data.
   */
  getAbiCoder() {
    return Ln.defaultAbiCoder();
  }
  /**
   *  Get the function name for %%key%%, which may be a function selector,
   *  function name or function signature that belongs to the ABI.
   */
  getFunctionName(e) {
    const n = q(this, Ut, Sn).call(this, e, null, !1);
    return S(n, "no matching function", "key", e), n.name;
  }
  /**
   *  Returns true if %%key%% (a function selector, function name or
   *  function signature) is present in the ABI.
   *
   *  In the case of a function name, the name may be ambiguous, so
   *  accessing the [[FunctionFragment]] may require refinement.
   */
  hasFunction(e) {
    return !!q(this, Ut, Sn).call(this, e, null, !1);
  }
  /**
   *  Get the [[FunctionFragment]] for %%key%%, which may be a function
   *  selector, function name or function signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple functions match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single function in
   *  the ABI, this will throw.
   */
  getFunction(e, n) {
    return q(this, Ut, Sn).call(this, e, n || null, !0);
  }
  /**
   *  Iterate over all functions, calling %%callback%%, sorted by their name.
   */
  forEachFunction(e) {
    const n = Array.from(x(this, Le).keys());
    n.sort((r, s) => r.localeCompare(s));
    for (let r = 0; r < n.length; r++) {
      const s = n[r];
      e(x(this, Le).get(s), r);
    }
  }
  /**
   *  Get the event name for %%key%%, which may be a topic hash,
   *  event name or event signature that belongs to the ABI.
   */
  getEventName(e) {
    const n = q(this, Lt, Nn).call(this, e, null, !1);
    return S(n, "no matching event", "key", e), n.name;
  }
  /**
   *  Returns true if %%key%% (an event topic hash, event name or
   *  event signature) is present in the ABI.
   *
   *  In the case of an event name, the name may be ambiguous, so
   *  accessing the [[EventFragment]] may require refinement.
   */
  hasEvent(e) {
    return !!q(this, Lt, Nn).call(this, e, null, !1);
  }
  /**
   *  Get the [[EventFragment]] for %%key%%, which may be a topic hash,
   *  event name or event signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple events match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single event in
   *  the ABI, this will throw.
   */
  getEvent(e, n) {
    return q(this, Lt, Nn).call(this, e, n || null, !0);
  }
  /**
   *  Iterate over all events, calling %%callback%%, sorted by their name.
   */
  forEachEvent(e) {
    const n = Array.from(x(this, Ue).keys());
    n.sort((r, s) => r.localeCompare(s));
    for (let r = 0; r < n.length; r++) {
      const s = n[r];
      e(x(this, Ue).get(s), r);
    }
  }
  /**
   *  Get the [[ErrorFragment]] for %%key%%, which may be an error
   *  selector, error name or error signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple errors match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single error in
   *  the ABI, this will throw.
   */
  getError(e, n) {
    if (Je(e)) {
      const s = e.toLowerCase();
      if (Pi[s])
        return me.from(Pi[s].signature);
      for (const i of x(this, Re).values())
        if (s === i.selector)
          return i;
      return null;
    }
    if (e.indexOf("(") === -1) {
      const s = [];
      for (const [i, a] of x(this, Re))
        i.split(
          "("
          /* fix:) */
        )[0] === e && s.push(a);
      if (s.length === 0)
        return e === "Error" ? me.from("error Error(string)") : e === "Panic" ? me.from("error Panic(uint256)") : null;
      if (s.length > 1) {
        const i = s.map((a) => JSON.stringify(a.format())).join(", ");
        S(!1, `ambiguous error description (i.e. ${i})`, "name", e);
      }
      return s[0];
    }
    if (e = me.from(e).format(), e === "Error(string)")
      return me.from("error Error(string)");
    if (e === "Panic(uint256)")
      return me.from("error Panic(uint256)");
    const r = x(this, Re).get(e);
    return r || null;
  }
  /**
   *  Iterate over all errors, calling %%callback%%, sorted by their name.
   */
  forEachError(e) {
    const n = Array.from(x(this, Re).keys());
    n.sort((r, s) => r.localeCompare(s));
    for (let r = 0; r < n.length; r++) {
      const s = n[r];
      e(x(this, Re).get(s), r);
    }
  }
  // Get the 4-byte selector used by Solidity to identify a function
  /*
  getSelector(fragment: ErrorFragment | FunctionFragment): string {
      if (typeof(fragment) === "string") {
          const matches: Array<Fragment> = [ ];
  
          try { matches.push(this.getFunction(fragment)); } catch (error) { }
          try { matches.push(this.getError(<string>fragment)); } catch (_) { }
  
          if (matches.length === 0) {
              logger.throwArgumentError("unknown fragment", "key", fragment);
          } else if (matches.length > 1) {
              logger.throwArgumentError("ambiguous fragment matches function and error", "key", fragment);
          }
  
          fragment = matches[0];
      }
  
      return dataSlice(id(fragment.format()), 0, 4);
  }
      */
  // Get the 32-byte topic hash used by Solidity to identify an event
  /*
  getEventTopic(fragment: EventFragment): string {
      //if (typeof(fragment) === "string") { fragment = this.getEvent(eventFragment); }
      return id(fragment.format());
  }
  */
  _decodeParams(e, n) {
    return x(this, le).decode(e, n);
  }
  _encodeParams(e, n) {
    return x(this, le).encode(e, n);
  }
  /**
   *  Encodes a ``tx.data`` object for deploying the Contract with
   *  the %%values%% as the constructor arguments.
   */
  encodeDeploy(e) {
    return this._encodeParams(this.deploy.inputs, e || []);
  }
  /**
   *  Decodes the result %%data%% (e.g. from an ``eth_call``) for the
   *  specified error (see [[getError]] for valid values for
   *  %%key%%).
   *
   *  Most developers should prefer the [[parseCallResult]] method instead,
   *  which will automatically detect a ``CALL_EXCEPTION`` and throw the
   *  corresponding error.
   */
  decodeErrorResult(e, n) {
    if (typeof e == "string") {
      const r = this.getError(e);
      S(r, "unknown error", "fragment", e), e = r;
    }
    return S(Ot(n, 0, 4) === e.selector, `data signature does not match error ${e.name}.`, "data", n), this._decodeParams(e.inputs, Ot(n, 4));
  }
  /**
   *  Encodes the transaction revert data for a call result that
   *  reverted from the the Contract with the sepcified %%error%%
   *  (see [[getError]] for valid values for %%fragment%%) with the %%values%%.
   *
   *  This is generally not used by most developers, unless trying to mock
   *  a result from a Contract.
   */
  encodeErrorResult(e, n) {
    if (typeof e == "string") {
      const r = this.getError(e);
      S(r, "unknown error", "fragment", e), e = r;
    }
    return It([
      e.selector,
      this._encodeParams(e.inputs, n || [])
    ]);
  }
  /**
   *  Decodes the %%data%% from a transaction ``tx.data`` for
   *  the function specified (see [[getFunction]] for valid values
   *  for %%fragment%%).
   *
   *  Most developers should prefer the [[parseTransaction]] method
   *  instead, which will automatically detect the fragment.
   */
  decodeFunctionData(e, n) {
    if (typeof e == "string") {
      const r = this.getFunction(e);
      S(r, "unknown function", "fragment", e), e = r;
    }
    return S(Ot(n, 0, 4) === e.selector, `data signature does not match function ${e.name}.`, "data", n), this._decodeParams(e.inputs, Ot(n, 4));
  }
  /**
   *  Encodes the ``tx.data`` for a transaction that calls the function
   *  specified (see [[getFunction]] for valid values for %%fragment%%) with
   *  the %%values%%.
   */
  encodeFunctionData(e, n) {
    if (typeof e == "string") {
      const r = this.getFunction(e);
      S(r, "unknown function", "fragment", e), e = r;
    }
    return It([
      e.selector,
      this._encodeParams(e.inputs, n || [])
    ]);
  }
  /**
   *  Decodes the result %%data%% (e.g. from an ``eth_call``) for the
   *  specified function (see [[getFunction]] for valid values for
   *  %%key%%).
   *
   *  Most developers should prefer the [[parseCallResult]] method instead,
   *  which will automatically detect a ``CALL_EXCEPTION`` and throw the
   *  corresponding error.
   */
  decodeFunctionResult(e, n) {
    if (typeof e == "string") {
      const i = this.getFunction(e);
      S(i, "unknown function", "fragment", e), e = i;
    }
    let r = "invalid length for result data";
    const s = De(n);
    if (s.length % 32 === 0)
      try {
        return x(this, le).decode(e.outputs, s);
      } catch (i) {
        r = "could not decode result data";
      }
    B(!1, r, "BAD_DATA", {
      value: se(s),
      info: { method: e.name, signature: e.format() }
    });
  }
  makeError(e, n) {
    const r = Ye(e, "data"), s = Ln.getBuiltinCallException("call", n, r), i = "execution reverted (unknown custom error)";
    if (s.message.startsWith(i)) {
      const o = se(r.slice(0, 4)), u = this.getError(o);
      if (u)
        try {
          const f = x(this, le).decode(u.inputs, r.slice(4));
          s.revert = {
            name: u.name,
            signature: u.format(),
            args: f
          }, s.reason = s.revert.signature, s.message = `execution reverted: ${s.reason}`;
        } catch (f) {
          s.message = "execution reverted (coult not decode custom error)";
        }
    }
    const a = this.parseTransaction(n);
    return a && (s.invocation = {
      method: a.name,
      signature: a.signature,
      args: a.args
    }), s;
  }
  /**
   *  Encodes the result data (e.g. from an ``eth_call``) for the
   *  specified function (see [[getFunction]] for valid values
   *  for %%fragment%%) with %%values%%.
   *
   *  This is generally not used by most developers, unless trying to mock
   *  a result from a Contract.
   */
  encodeFunctionResult(e, n) {
    if (typeof e == "string") {
      const r = this.getFunction(e);
      S(r, "unknown function", "fragment", e), e = r;
    }
    return se(x(this, le).encode(e.outputs, n || []));
  }
  /*
      spelunk(inputs: Array<ParamType>, values: ReadonlyArray<any>, processfunc: (type: string, value: any) => Promise<any>): Promise<Array<any>> {
          const promises: Array<Promise<>> = [ ];
          const process = function(type: ParamType, value: any): any {
              if (type.baseType === "array") {
                  return descend(type.child
              }
              if (type. === "address") {
              }
          };
  
          const descend = function (inputs: Array<ParamType>, values: ReadonlyArray<any>) {
              if (inputs.length !== values.length) { throw new Error("length mismatch"); }
              
          };
  
          const result: Array<any> = [ ];
          values.forEach((value, index) => {
              if (value == null) {
                  topics.push(null);
              } else if (param.baseType === "array" || param.baseType === "tuple") {
                  logger.throwArgumentError("filtering with tuples or arrays not supported", ("contract." + param.name), value);
              } else if (Array.isArray(value)) {
                  topics.push(value.map((value) => encodeTopic(param, value)));
              } else {
                  topics.push(encodeTopic(param, value));
              }
          });
      }
  */
  // Create the filter for the event with search criteria (e.g. for eth_filterLog)
  encodeFilterTopics(e, n) {
    if (typeof e == "string") {
      const i = this.getEvent(e);
      S(i, "unknown event", "eventFragment", e), e = i;
    }
    B(n.length <= e.inputs.length, `too many arguments for ${e.format()}`, "UNEXPECTED_ARGUMENT", { count: n.length, expectedCount: e.inputs.length });
    const r = [];
    e.anonymous || r.push(e.topicHash);
    const s = (i, a) => i.type === "string" ? nn(a) : i.type === "bytes" ? it(se(a)) : (i.type === "bool" && typeof a == "boolean" ? a = a ? "0x01" : "0x00" : i.type.match(/^u?int/) ? a = is(a) : i.type.match(/^bytes/) ? a = _b(a, 32) : i.type === "address" && x(this, le).encode(["address"], [a]), Ob(se(a), 32));
    for (n.forEach((i, a) => {
      const o = e.inputs[a];
      if (!o.indexed) {
        S(i == null, "cannot filter non-indexed parameters; must be null", "contract." + o.name, i);
        return;
      }
      i == null ? r.push(null) : o.baseType === "array" || o.baseType === "tuple" ? S(!1, "filtering with tuples or arrays not supported", "contract." + o.name, i) : Array.isArray(i) ? r.push(i.map((u) => s(o, u))) : r.push(s(o, i));
    }); r.length && r[r.length - 1] === null; )
      r.pop();
    return r;
  }
  encodeEventLog(e, n) {
    if (typeof e == "string") {
      const a = this.getEvent(e);
      S(a, "unknown event", "eventFragment", e), e = a;
    }
    const r = [], s = [], i = [];
    return e.anonymous || r.push(e.topicHash), S(n.length === e.inputs.length, "event arguments/values mismatch", "values", n), e.inputs.forEach((a, o) => {
      const u = n[o];
      if (a.indexed)
        if (a.type === "string")
          r.push(nn(u));
        else if (a.type === "bytes")
          r.push(it(u));
        else {
          if (a.baseType === "tuple" || a.baseType === "array")
            throw new Error("not implemented");
          r.push(x(this, le).encode([a.type], [u]));
        }
      else
        s.push(a), i.push(u);
    }), {
      data: x(this, le).encode(s, i),
      topics: r
    };
  }
  // Decode a filter for the event and the search criteria
  decodeEventLog(e, n, r) {
    if (typeof e == "string") {
      const N = this.getEvent(e);
      S(N, "unknown event", "eventFragment", e), e = N;
    }
    if (r != null && !e.anonymous) {
      const N = e.topicHash;
      S(Je(r[0], 32) && r[0].toLowerCase() === N, "fragment/topic mismatch", "topics[0]", r[0]), r = r.slice(1);
    }
    const s = [], i = [], a = [];
    e.inputs.forEach((N, k) => {
      N.indexed ? N.type === "string" || N.type === "bytes" || N.baseType === "tuple" || N.baseType === "array" ? (s.push(ce.from({ type: "bytes32", name: N.name })), a.push(!0)) : (s.push(N), a.push(!1)) : (i.push(N), a.push(!1));
    });
    const o = r != null ? x(this, le).decode(s, It(r)) : null, u = x(this, le).decode(i, n, !0), f = [], m = [];
    let v = 0, A = 0;
    return e.inputs.forEach((N, k) => {
      let C = null;
      if (N.indexed)
        if (o == null)
          C = new Ni(null);
        else if (a[k])
          C = new Ni(o[A++]);
        else
          try {
            C = o[A++];
          } catch (L) {
            C = L;
          }
      else
        try {
          C = u[v++];
        } catch (L) {
          C = L;
        }
      f.push(C), m.push(N.name || null);
    }), Dt.fromItems(f, m);
  }
  /**
   *  Parses a transaction, finding the matching function and extracts
   *  the parameter values along with other useful function details.
   *
   *  If the matching function cannot be found, return null.
   */
  parseTransaction(e) {
    const n = Ye(e.data, "tx.data"), r = ot(e.value != null ? e.value : 0, "tx.value"), s = this.getFunction(se(n.slice(0, 4)));
    if (!s)
      return null;
    const i = x(this, le).decode(s.inputs, n.slice(4));
    return new Hv(s, s.selector, i, r);
  }
  parseCallResult(e) {
    throw new Error("@TODO");
  }
  /**
   *  Parses a receipt log, finding the matching event and extracts
   *  the parameter values along with other useful event details.
   *
   *  If the matching event cannot be found, returns null.
   */
  parseLog(e) {
    const n = this.getEvent(e.topics[0]);
    return !n || n.anonymous ? null : new Vv(n, n.topicHash, this.decodeEventLog(n, e.data, e.topics));
  }
  /**
   *  Parses a revert data, finding the matching error and extracts
   *  the parameter values along with other useful error details.
   *
   *  If the matching error cannot be found, returns null.
   */
  parseError(e) {
    const n = se(e), r = this.getError(Ot(n, 0, 4));
    if (!r)
      return null;
    const s = x(this, le).decode(r.inputs, Ot(n, 4));
    return new jv(r, r.selector, s);
  }
  /**
   *  Creates a new [[Interface]] from the ABI %%value%%.
   *
   *  The %%value%% may be provided as an existing [[Interface]] object,
   *  a JSON-encoded ABI or any Human-Readable ABI format.
   */
  static from(e) {
    return e instanceof ht ? e : typeof e == "string" ? new ht(JSON.parse(e)) : typeof e.formatJson == "function" ? new ht(e.formatJson()) : typeof e.format == "function" ? new ht(e.format("json")) : new ht(e);
  }
};
Re = new WeakMap(), Ue = new WeakMap(), Le = new WeakMap(), le = new WeakMap(), Ut = new WeakSet(), Sn = function(e, n, r) {
  if (Je(e)) {
    const i = e.toLowerCase();
    for (const a of x(this, Le).values())
      if (i === a.selector)
        return a;
    return null;
  }
  if (e.indexOf("(") === -1) {
    const i = [];
    for (const [a, o] of x(this, Le))
      a.split(
        "("
        /* fix:) */
      )[0] === e && i.push(o);
    if (n) {
      const a = n.length > 0 ? n[n.length - 1] : null;
      let o = n.length, u = !0;
      fe.isTyped(a) && a.type === "overrides" && (u = !1, o--);
      for (let f = i.length - 1; f >= 0; f--) {
        const m = i[f].inputs.length;
        m !== o && (!u || m !== o - 1) && i.splice(f, 1);
      }
      for (let f = i.length - 1; f >= 0; f--) {
        const m = i[f].inputs;
        for (let v = 0; v < n.length; v++)
          if (fe.isTyped(n[v])) {
            if (v >= m.length) {
              if (n[v].type === "overrides")
                continue;
              i.splice(f, 1);
              break;
            }
            if (n[v].type !== m[v].baseType) {
              i.splice(f, 1);
              break;
            }
          }
      }
    }
    if (i.length === 1 && n && n.length !== i[0].inputs.length) {
      const a = n[n.length - 1];
      (a == null || Array.isArray(a) || typeof a != "object") && i.splice(0, 1);
    }
    if (i.length === 0)
      return null;
    if (i.length > 1 && r) {
      const a = i.map((o) => JSON.stringify(o.format())).join(", ");
      S(!1, `ambiguous function description (i.e. matches ${a})`, "key", e);
    }
    return i[0];
  }
  const s = x(this, Le).get(Fe.from(e).format());
  return s || null;
}, Lt = new WeakSet(), Nn = function(e, n, r) {
  if (Je(e)) {
    const i = e.toLowerCase();
    for (const a of x(this, Ue).values())
      if (i === a.topicHash)
        return a;
    return null;
  }
  if (e.indexOf("(") === -1) {
    const i = [];
    for (const [a, o] of x(this, Ue))
      a.split(
        "("
        /* fix:) */
      )[0] === e && i.push(o);
    if (n) {
      for (let a = i.length - 1; a >= 0; a--)
        i[a].inputs.length < n.length && i.splice(a, 1);
      for (let a = i.length - 1; a >= 0; a--) {
        const o = i[a].inputs;
        for (let u = 0; u < n.length; u++)
          if (fe.isTyped(n[u]) && n[u].type !== o[u].baseType) {
            i.splice(a, 1);
            break;
          }
      }
    }
    if (i.length === 0)
      return null;
    if (i.length > 1 && r) {
      const a = i.map((o) => JSON.stringify(o.format())).join(", ");
      S(!1, `ambiguous event description (i.e. matches ${a})`, "key", e);
    }
    return i[0];
  }
  const s = x(this, Ue).get(Be.from(e).format());
  return s || null;
};
let Ir = ht;
const Ja = BigInt(0);
function xe(t) {
  return t == null ? null : t.toString();
}
function Kv(t) {
  const e = {};
  t.to && (e.to = t.to), t.from && (e.from = t.from), t.data && (e.data = se(t.data));
  const n = "chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);
  for (const s of n)
    !(s in t) || t[s] == null || (e[s] = ot(t[s], `request.${s}`));
  const r = "type,nonce".split(/,/);
  for (const s of r)
    !(s in t) || t[s] == null || (e[s] = Qe(t[s], `request.${s}`));
  return t.accessList && (e.accessList = _v(t.accessList)), "blockTag" in t && (e.blockTag = t.blockTag), "enableCcipRead" in t && (e.enableCcipRead = !!t.enableCcipRead), "customData" in t && (e.customData = t.customData), "blobVersionedHashes" in t && t.blobVersionedHashes && (e.blobVersionedHashes = t.blobVersionedHashes.slice()), "kzg" in t && (e.kzg = t.kzg), "blobs" in t && t.blobs && (e.blobs = t.blobs.map((s) => Ab(s) ? se(s) : Object.assign({}, s))), e;
}
class er {
  /**
   *  @_ignore:
   */
  constructor(e, n) {
    /**
     *  The provider connected to the log used to fetch additional details
     *  if necessary.
     */
    T(this, "provider");
    /**
     *  The transaction hash of the transaction this log occurred in. Use the
     *  [[Log-getTransaction]] to get the [[TransactionResponse]].
     */
    T(this, "transactionHash");
    /**
     *  The block hash of the block this log occurred in. Use the
     *  [[Log-getBlock]] to get the [[Block]].
     */
    T(this, "blockHash");
    /**
     *  The block number of the block this log occurred in. It is preferred
     *  to use the [[Block-hash]] when fetching the related [[Block]],
     *  since in the case of an orphaned block, the block at that height may
     *  have changed.
     */
    T(this, "blockNumber");
    /**
     *  If the **Log** represents a block that was removed due to an orphaned
     *  block, this will be true.
     *
     *  This can only happen within an orphan event listener.
     */
    T(this, "removed");
    /**
     *  The address of the contract that emitted this log.
     */
    T(this, "address");
    /**
     *  The data included in this log when it was emitted.
     */
    T(this, "data");
    /**
     *  The indexed topics included in this log when it was emitted.
     *
     *  All topics are included in the bloom filters, so they can be
     *  efficiently filtered using the [[Provider-getLogs]] method.
     */
    T(this, "topics");
    /**
     *  The index within the block this log occurred at. This is generally
     *  not useful to developers, but can be used with the various roots
     *  to proof inclusion within a block.
     */
    T(this, "index");
    /**
     *  The index within the transaction of this log.
     */
    T(this, "transactionIndex");
    this.provider = n;
    const r = Object.freeze(e.topics.slice());
    M(this, {
      transactionHash: e.transactionHash,
      blockHash: e.blockHash,
      blockNumber: e.blockNumber,
      removed: e.removed,
      address: e.address,
      data: e.data,
      topics: r,
      index: e.index,
      transactionIndex: e.transactionIndex
    });
  }
  /**
   *  Returns a JSON-compatible object.
   */
  toJSON() {
    const { address: e, blockHash: n, blockNumber: r, data: s, index: i, removed: a, topics: o, transactionHash: u, transactionIndex: f } = this;
    return {
      _type: "log",
      address: e,
      blockHash: n,
      blockNumber: r,
      data: s,
      index: i,
      removed: a,
      topics: o,
      transactionHash: u,
      transactionIndex: f
    };
  }
  /**
   *  Returns the block that this log occurred in.
   */
  async getBlock() {
    const e = await this.provider.getBlock(this.blockHash);
    return B(!!e, "failed to find transaction", "UNKNOWN_ERROR", {}), e;
  }
  /**
   *  Returns the transaction that this log occurred in.
   */
  async getTransaction() {
    const e = await this.provider.getTransaction(this.transactionHash);
    return B(!!e, "failed to find transaction", "UNKNOWN_ERROR", {}), e;
  }
  /**
   *  Returns the transaction receipt fot the transaction that this
   *  log occurred in.
   */
  async getTransactionReceipt() {
    const e = await this.provider.getTransactionReceipt(this.transactionHash);
    return B(!!e, "failed to find transaction receipt", "UNKNOWN_ERROR", {}), e;
  }
  /**
   *  @_ignore:
   */
  removedEvent() {
    return Wv(this);
  }
}
var on;
class zv {
  /**
   *  @_ignore:
   */
  constructor(e, n) {
    /**
     *  The provider connected to the log used to fetch additional details
     *  if necessary.
     */
    T(this, "provider");
    /**
     *  The address the transaction was sent to.
     */
    T(this, "to");
    /**
     *  The sender of the transaction.
     */
    T(this, "from");
    /**
     *  The address of the contract if the transaction was directly
     *  responsible for deploying one.
     *
     *  This is non-null **only** if the ``to`` is empty and the ``data``
     *  was successfully executed as initcode.
     */
    T(this, "contractAddress");
    /**
     *  The transaction hash.
     */
    T(this, "hash");
    /**
     *  The index of this transaction within the block transactions.
     */
    T(this, "index");
    /**
     *  The block hash of the [[Block]] this transaction was included in.
     */
    T(this, "blockHash");
    /**
     *  The block number of the [[Block]] this transaction was included in.
     */
    T(this, "blockNumber");
    /**
     *  The bloom filter bytes that represent all logs that occurred within
     *  this transaction. This is generally not useful for most developers,
     *  but can be used to validate the included logs.
     */
    T(this, "logsBloom");
    /**
     *  The actual amount of gas used by this transaction.
     *
     *  When creating a transaction, the amount of gas that will be used can
     *  only be approximated, but the sender must pay the gas fee for the
     *  entire gas limit. After the transaction, the difference is refunded.
     */
    T(this, "gasUsed");
    /**
     *  The gas used for BLObs. See [[link-eip-4844]].
     */
    T(this, "blobGasUsed");
    /**
     *  The amount of gas used by all transactions within the block for this
     *  and all transactions with a lower ``index``.
     *
     *  This is generally not useful for developers but can be used to
     *  validate certain aspects of execution.
     */
    T(this, "cumulativeGasUsed");
    /**
     *  The actual gas price used during execution.
     *
     *  Due to the complexity of [[link-eip-1559]] this value can only
     *  be caluclated after the transaction has been mined, snce the base
     *  fee is protocol-enforced.
     */
    T(this, "gasPrice");
    /**
     *  The price paid per BLOB in gas. See [[link-eip-4844]].
     */
    T(this, "blobGasPrice");
    /**
     *  The [[link-eip-2718]] transaction type.
     */
    T(this, "type");
    //readonly byzantium!: boolean;
    /**
     *  The status of this transaction, indicating success (i.e. ``1``) or
     *  a revert (i.e. ``0``).
     *
     *  This is available in post-byzantium blocks, but some backends may
     *  backfill this value.
     */
    T(this, "status");
    /**
     *  The root hash of this transaction.
     *
     *  This is no present and was only included in pre-byzantium blocks, but
     *  could be used to validate certain parts of the receipt.
     */
    T(this, "root");
    j(this, on, void 0);
    V(this, on, Object.freeze(e.logs.map((s) => new er(s, n))));
    let r = Ja;
    e.effectiveGasPrice != null ? r = e.effectiveGasPrice : e.gasPrice != null && (r = e.gasPrice), M(this, {
      provider: n,
      to: e.to,
      from: e.from,
      contractAddress: e.contractAddress,
      hash: e.hash,
      index: e.index,
      blockHash: e.blockHash,
      blockNumber: e.blockNumber,
      logsBloom: e.logsBloom,
      gasUsed: e.gasUsed,
      cumulativeGasUsed: e.cumulativeGasUsed,
      blobGasUsed: e.blobGasUsed,
      gasPrice: r,
      blobGasPrice: e.blobGasPrice,
      type: e.type,
      //byzantium: tx.byzantium,
      status: e.status,
      root: e.root
    });
  }
  /**
   *  The logs for this transaction.
   */
  get logs() {
    return x(this, on);
  }
  /**
   *  Returns a JSON-compatible representation.
   */
  toJSON() {
    const {
      to: e,
      from: n,
      contractAddress: r,
      hash: s,
      index: i,
      blockHash: a,
      blockNumber: o,
      logsBloom: u,
      logs: f,
      //byzantium, 
      status: m,
      root: v
    } = this;
    return {
      _type: "TransactionReceipt",
      blockHash: a,
      blockNumber: o,
      //byzantium, 
      contractAddress: r,
      cumulativeGasUsed: xe(this.cumulativeGasUsed),
      from: n,
      gasPrice: xe(this.gasPrice),
      blobGasUsed: xe(this.blobGasUsed),
      blobGasPrice: xe(this.blobGasPrice),
      gasUsed: xe(this.gasUsed),
      hash: s,
      index: i,
      logs: f,
      logsBloom: u,
      root: v,
      status: m,
      to: e
    };
  }
  /**
   *  @_ignore:
   */
  get length() {
    return this.logs.length;
  }
  [Symbol.iterator]() {
    let e = 0;
    return {
      next: () => e < this.length ? { value: this.logs[e++], done: !1 } : { value: void 0, done: !0 }
    };
  }
  /**
   *  The total fee for this transaction, in wei.
   */
  get fee() {
    return this.gasUsed * this.gasPrice;
  }
  /**
   *  Resolves to the block this transaction occurred in.
   */
  async getBlock() {
    const e = await this.provider.getBlock(this.blockHash);
    if (e == null)
      throw new Error("TODO");
    return e;
  }
  /**
   *  Resolves to the transaction this transaction occurred in.
   */
  async getTransaction() {
    const e = await this.provider.getTransaction(this.hash);
    if (e == null)
      throw new Error("TODO");
    return e;
  }
  /**
   *  Resolves to the return value of the execution of this transaction.
   *
   *  Support for this feature is limited, as it requires an archive node
   *  with the ``debug_`` or ``trace_`` API enabled.
   */
  async getResult() {
    return await this.provider.getTransactionResult(this.hash);
  }
  /**
   *  Resolves to the number of confirmations this transaction has.
   */
  async confirmations() {
    return await this.provider.getBlockNumber() - this.blockNumber + 1;
  }
  /**
   *  @_ignore:
   */
  removedEvent() {
    return qa(this);
  }
  /**
   *  @_ignore:
   */
  reorderedEvent(e) {
    return B(!e || e.isMined(), "unmined 'other' transction cannot be orphaned", "UNSUPPORTED_OPERATION", { operation: "reorderedEvent(other)" }), Xa(this, e);
  }
}
on = new WeakMap();
var st;
const hs = class hs {
  /**
   *  @_ignore:
   */
  constructor(e, n) {
    /**
     *  The provider this is connected to, which will influence how its
     *  methods will resolve its async inspection methods.
     */
    T(this, "provider");
    /**
     *  The block number of the block that this transaction was included in.
     *
     *  This is ``null`` for pending transactions.
     */
    T(this, "blockNumber");
    /**
     *  The blockHash of the block that this transaction was included in.
     *
     *  This is ``null`` for pending transactions.
     */
    T(this, "blockHash");
    /**
     *  The index within the block that this transaction resides at.
     */
    T(this, "index");
    /**
     *  The transaction hash.
     */
    T(this, "hash");
    /**
     *  The [[link-eip-2718]] transaction envelope type. This is
     *  ``0`` for legacy transactions types.
     */
    T(this, "type");
    /**
     *  The receiver of this transaction.
     *
     *  If ``null``, then the transaction is an initcode transaction.
     *  This means the result of executing the [[data]] will be deployed
     *  as a new contract on chain (assuming it does not revert) and the
     *  address may be computed using [[getCreateAddress]].
     */
    T(this, "to");
    /**
     *  The sender of this transaction. It is implicitly computed
     *  from the transaction pre-image hash (as the digest) and the
     *  [[signature]] using ecrecover.
     */
    T(this, "from");
    /**
     *  The nonce, which is used to prevent replay attacks and offer
     *  a method to ensure transactions from a given sender are explicitly
     *  ordered.
     *
     *  When sending a transaction, this must be equal to the number of
     *  transactions ever sent by [[from]].
     */
    T(this, "nonce");
    /**
     *  The maximum units of gas this transaction can consume. If execution
     *  exceeds this, the entries transaction is reverted and the sender
     *  is charged for the full amount, despite not state changes being made.
     */
    T(this, "gasLimit");
    /**
     *  The gas price can have various values, depending on the network.
     *
     *  In modern networks, for transactions that are included this is
     *  the //effective gas price// (the fee per gas that was actually
     *  charged), while for transactions that have not been included yet
     *  is the [[maxFeePerGas]].
     *
     *  For legacy transactions, or transactions on legacy networks, this
     *  is the fee that will be charged per unit of gas the transaction
     *  consumes.
     */
    T(this, "gasPrice");
    /**
     *  The maximum priority fee (per unit of gas) to allow a
     *  validator to charge the sender. This is inclusive of the
     *  [[maxFeeFeePerGas]].
     */
    T(this, "maxPriorityFeePerGas");
    /**
     *  The maximum fee (per unit of gas) to allow this transaction
     *  to charge the sender.
     */
    T(this, "maxFeePerGas");
    /**
     *  The [[link-eip-4844]] max fee per BLOb gas.
     */
    T(this, "maxFeePerBlobGas");
    /**
     *  The data.
     */
    T(this, "data");
    /**
     *  The value, in wei. Use [[formatEther]] to format this value
     *  as ether.
     */
    T(this, "value");
    /**
     *  The chain ID.
     */
    T(this, "chainId");
    /**
     *  The signature.
     */
    T(this, "signature");
    /**
     *  The [[link-eip-2930]] access list for transaction types that
     *  support it, otherwise ``null``.
     */
    T(this, "accessList");
    /**
     *  The [[link-eip-4844]] BLOb versioned hashes.
     */
    T(this, "blobVersionedHashes");
    j(this, st, void 0);
    this.provider = n, this.blockNumber = e.blockNumber != null ? e.blockNumber : null, this.blockHash = e.blockHash != null ? e.blockHash : null, this.hash = e.hash, this.index = e.index, this.type = e.type, this.from = e.from, this.to = e.to || null, this.gasLimit = e.gasLimit, this.nonce = e.nonce, this.data = e.data, this.value = e.value, this.gasPrice = e.gasPrice, this.maxPriorityFeePerGas = e.maxPriorityFeePerGas != null ? e.maxPriorityFeePerGas : null, this.maxFeePerGas = e.maxFeePerGas != null ? e.maxFeePerGas : null, this.maxFeePerBlobGas = e.maxFeePerBlobGas != null ? e.maxFeePerBlobGas : null, this.chainId = e.chainId, this.signature = e.signature, this.accessList = e.accessList != null ? e.accessList : null, this.blobVersionedHashes = e.blobVersionedHashes != null ? e.blobVersionedHashes : null, V(this, st, -1);
  }
  /**
   *  Returns a JSON-compatible representation of this transaction.
   */
  toJSON() {
    const { blockNumber: e, blockHash: n, index: r, hash: s, type: i, to: a, from: o, nonce: u, data: f, signature: m, accessList: v, blobVersionedHashes: A } = this;
    return {
      _type: "TransactionResponse",
      accessList: v,
      blockNumber: e,
      blockHash: n,
      blobVersionedHashes: A,
      chainId: xe(this.chainId),
      data: f,
      from: o,
      gasLimit: xe(this.gasLimit),
      gasPrice: xe(this.gasPrice),
      hash: s,
      maxFeePerGas: xe(this.maxFeePerGas),
      maxPriorityFeePerGas: xe(this.maxPriorityFeePerGas),
      maxFeePerBlobGas: xe(this.maxFeePerBlobGas),
      nonce: u,
      signature: m,
      to: a,
      index: r,
      type: i,
      value: xe(this.value)
    };
  }
  /**
   *  Resolves to the Block that this transaction was included in.
   *
   *  This will return null if the transaction has not been included yet.
   */
  async getBlock() {
    let e = this.blockNumber;
    if (e == null) {
      const r = await this.getTransaction();
      r && (e = r.blockNumber);
    }
    if (e == null)
      return null;
    const n = this.provider.getBlock(e);
    if (n == null)
      throw new Error("TODO");
    return n;
  }
  /**
   *  Resolves to this transaction being re-requested from the
   *  provider. This can be used if you have an unmined transaction
   *  and wish to get an up-to-date populated instance.
   */
  async getTransaction() {
    return this.provider.getTransaction(this.hash);
  }
  /**
   *  Resolve to the number of confirmations this transaction has.
   */
  async confirmations() {
    if (this.blockNumber == null) {
      const { tx: n, blockNumber: r } = await Tr({
        tx: this.getTransaction(),
        blockNumber: this.provider.getBlockNumber()
      });
      return n == null || n.blockNumber == null ? 0 : r - n.blockNumber + 1;
    }
    return await this.provider.getBlockNumber() - this.blockNumber + 1;
  }
  /**
   *  Resolves once this transaction has been mined and has
   *  %%confirms%% blocks including it (default: ``1``) with an
   *  optional %%timeout%%.
   *
   *  This can resolve to ``null`` only if %%confirms%% is ``0``
   *  and the transaction has not been mined, otherwise this will
   *  wait until enough confirmations have completed.
   */
  async wait(e, n) {
    const r = e == null ? 1 : e, s = n == null ? 0 : n;
    let i = x(this, st), a = -1, o = i === -1;
    const u = async () => {
      if (o)
        return null;
      const { blockNumber: A, nonce: N } = await Tr({
        blockNumber: this.provider.getBlockNumber(),
        nonce: this.provider.getTransactionCount(this.from)
      });
      if (N < this.nonce) {
        i = A;
        return;
      }
      if (o)
        return null;
      const k = await this.getTransaction();
      if (!(k && k.blockNumber != null))
        for (a === -1 && (a = i - 3, a < x(this, st) && (a = x(this, st))); a <= A; ) {
          if (o)
            return null;
          const C = await this.provider.getBlock(a, !0);
          if (C == null)
            return;
          for (const L of C)
            if (L === this.hash)
              return;
          for (let L = 0; L < C.length; L++) {
            const R = await C.getTransaction(L);
            if (R.from === this.from && R.nonce === this.nonce) {
              if (o)
                return null;
              const O = await this.provider.getTransactionReceipt(R.hash);
              if (O == null || A - O.blockNumber + 1 < r)
                return;
              let te = "replaced";
              R.data === this.data && R.to === this.to && R.value === this.value ? te = "repriced" : R.data === "0x" && R.from === R.to && R.value === Ja && (te = "cancelled"), B(!1, "transaction was replaced", "TRANSACTION_REPLACED", {
                cancelled: te === "replaced" || te === "cancelled",
                reason: te,
                replacement: R.replaceableTransaction(i),
                hash: R.hash,
                receipt: O
              });
            }
          }
          a++;
        }
    }, f = (A) => {
      if (A == null || A.status !== 0)
        return A;
      B(!1, "transaction execution reverted", "CALL_EXCEPTION", {
        action: "sendTransaction",
        data: null,
        reason: null,
        invocation: null,
        revert: null,
        transaction: {
          to: A.to,
          from: A.from,
          data: ""
          // @TODO: in v7, split out sendTransaction properties
        },
        receipt: A
      });
    }, m = await this.provider.getTransactionReceipt(this.hash);
    if (r === 0)
      return f(m);
    if (m) {
      if (await m.confirmations() >= r)
        return f(m);
    } else if (await u(), r === 0)
      return null;
    return await new Promise((A, N) => {
      const k = [], C = () => {
        k.forEach((R) => R());
      };
      if (k.push(() => {
        o = !0;
      }), s > 0) {
        const R = setTimeout(() => {
          C(), N(en("wait for transaction timeout", "TIMEOUT"));
        }, s);
        k.push(() => {
          clearTimeout(R);
        });
      }
      const L = async (R) => {
        if (await R.confirmations() >= r) {
          C();
          try {
            A(f(R));
          } catch (O) {
            N(O);
          }
        }
      };
      if (k.push(() => {
        this.provider.off(this.hash, L);
      }), this.provider.on(this.hash, L), i >= 0) {
        const R = async () => {
          try {
            await u();
          } catch (O) {
            if (Ft(O, "TRANSACTION_REPLACED")) {
              C(), N(O);
              return;
            }
          }
          o || this.provider.once("block", R);
        };
        k.push(() => {
          this.provider.off("block", R);
        }), this.provider.once("block", R);
      }
    });
  }
  /**
   *  Returns ``true`` if this transaction has been included.
   *
   *  This is effective only as of the time the TransactionResponse
   *  was instantiated. To get up-to-date information, use
   *  [[getTransaction]].
   *
   *  This provides a Type Guard that this transaction will have
   *  non-null property values for properties that are null for
   *  unmined transactions.
   */
  isMined() {
    return this.blockHash != null;
  }
  /**
   *  Returns true if the transaction is a legacy (i.e. ``type == 0``)
   *  transaction.
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isLegacy() {
    return this.type === 0;
  }
  /**
   *  Returns true if the transaction is a Berlin (i.e. ``type == 1``)
   *  transaction. See [[link-eip-2070]].
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isBerlin() {
    return this.type === 1;
  }
  /**
   *  Returns true if the transaction is a London (i.e. ``type == 2``)
   *  transaction. See [[link-eip-1559]].
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isLondon() {
    return this.type === 2;
  }
  /**
   *  Returns true if hte transaction is a Cancun (i.e. ``type == 3``)
   *  transaction. See [[link-eip-4844]].
   */
  isCancun() {
    return this.type === 3;
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that evict this transaction.
   */
  removedEvent() {
    return B(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), qa(this);
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that re-order this event against %%other%%.
   */
  reorderedEvent(e) {
    return B(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), B(!e || e.isMined(), "unmined 'other' transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), Xa(this, e);
  }
  /**
   *  Returns a new TransactionResponse instance which has the ability to
   *  detect (and throw an error) if the transaction is replaced, which
   *  will begin scanning at %%startBlock%%.
   *
   *  This should generally not be used by developers and is intended
   *  primarily for internal use. Setting an incorrect %%startBlock%% can
   *  have devastating performance consequences if used incorrectly.
   */
  replaceableTransaction(e) {
    S(Number.isInteger(e) && e >= 0, "invalid startBlock", "startBlock", e);
    const n = new hs(this, this.provider);
    return V(n, st, e), n;
  }
};
st = new WeakMap();
let Pr = hs;
function Xa(t, e) {
  return { orphan: "reorder-transaction", tx: t, other: e };
}
function qa(t) {
  return { orphan: "drop-transaction", tx: t };
}
function Wv(t) {
  return { orphan: "drop-log", log: {
    transactionHash: t.transactionHash,
    blockHash: t.blockHash,
    blockNumber: t.blockNumber,
    address: t.address,
    data: t.data,
    topics: Object.freeze(t.topics.slice()),
    index: t.index
  } };
}
class cs extends er {
  /**
   * @_ignore:
   */
  constructor(n, r, s) {
    super(n, n.provider);
    /**
     *  The Contract Interface.
     */
    T(this, "interface");
    /**
     *  The matching event.
     */
    T(this, "fragment");
    /**
     *  The parsed arguments passed to the event by ``emit``.
     */
    T(this, "args");
    const i = r.decodeEventLog(s, n.data, n.topics);
    M(this, { args: i, fragment: s, interface: r });
  }
  /**
   *  The name of the event.
   */
  get eventName() {
    return this.fragment.name;
  }
  /**
   *  The signature of the event.
   */
  get eventSignature() {
    return this.fragment.format();
  }
}
class Ya extends er {
  /**
   * @_ignore:
   */
  constructor(n, r) {
    super(n, n.provider);
    /**
     *  The error encounted when trying to decode the log.
     */
    T(this, "error");
    M(this, { error: r });
  }
}
var Bt;
class Jv extends zv {
  /**
   *  @_ignore:
   */
  constructor(n, r, s) {
    super(s, r);
    j(this, Bt, void 0);
    V(this, Bt, n);
  }
  /**
   *  The parsed logs for any [[Log]] which has a matching event in the
   *  Contract ABI.
   */
  get logs() {
    return super.logs.map((n) => {
      const r = n.topics.length ? x(this, Bt).getEvent(n.topics[0]) : null;
      if (r)
        try {
          return new cs(n, x(this, Bt), r);
        } catch (s) {
          return new Ya(n, s);
        }
      return n;
    });
  }
}
Bt = new WeakMap();
var cn;
class us extends Pr {
  /**
   *  @_ignore:
   */
  constructor(n, r, s) {
    super(s, r);
    j(this, cn, void 0);
    V(this, cn, n);
  }
  /**
   *  Resolves once this transaction has been mined and has
   *  %%confirms%% blocks including it (default: ``1``) with an
   *  optional %%timeout%%.
   *
   *  This can resolve to ``null`` only if %%confirms%% is ``0``
   *  and the transaction has not been mined, otherwise this will
   *  wait until enough confirmations have completed.
   */
  async wait(n, r) {
    const s = await super.wait(n, r);
    return s == null ? null : new Jv(x(this, cn), this.provider, s);
  }
}
cn = new WeakMap();
class Za extends Pb {
  /**
   *  @_event:
   */
  constructor(n, r, s, i) {
    super(n, r, s);
    /**
     *  The log with no matching events.
     */
    T(this, "log");
    M(this, { log: i });
  }
  /**
   *  Resolves to the block the event occured in.
   */
  async getBlock() {
    return await this.log.getBlock();
  }
  /**
   *  Resolves to the transaction the event occured in.
   */
  async getTransaction() {
    return await this.log.getTransaction();
  }
  /**
   *  Resolves to the transaction receipt the event occured in.
   */
  async getTransactionReceipt() {
    return await this.log.getTransactionReceipt();
  }
}
class Xv extends Za {
  /**
   *  @_ignore:
   */
  constructor(e, n, r, s, i) {
    super(e, n, r, new cs(i, e.interface, s));
    const a = e.interface.decodeEventLog(s, this.log.data, this.log.topics);
    M(this, { args: a, fragment: s });
  }
  /**
   *  The event name.
   */
  get eventName() {
    return this.fragment.name;
  }
  /**
   *  The event signature.
   */
  get eventSignature() {
    return this.fragment.format();
  }
}
const Ci = BigInt(0);
function Qa(t) {
  return t && typeof t.call == "function";
}
function eo(t) {
  return t && typeof t.estimateGas == "function";
}
function tr(t) {
  return t && typeof t.resolveName == "function";
}
function to(t) {
  return t && typeof t.sendTransaction == "function";
}
function no(t) {
  if (t != null) {
    if (tr(t))
      return t;
    if (t.provider)
      return t.provider;
  }
}
var un;
class qv {
  constructor(e, n, r) {
    j(this, un, void 0);
    T(this, "fragment");
    if (M(this, { fragment: n }), n.inputs.length < r.length)
      throw new Error("too many arguments");
    const s = Tt(e.runner, "resolveName"), i = tr(s) ? s : null;
    V(this, un, async function() {
      const a = await Promise.all(n.inputs.map((o, u) => r[u] == null ? null : o.walkAsync(r[u], (m, v) => m === "address" ? Array.isArray(v) ? Promise.all(v.map((A) => tn(A, i))) : tn(v, i) : v)));
      return e.interface.encodeFilterTopics(n, a);
    }());
  }
  getTopicFilter() {
    return x(this, un);
  }
}
un = new WeakMap();
function Tt(t, e) {
  return t == null ? null : typeof t[e] == "function" ? t : t.provider && typeof t.provider[e] == "function" ? t.provider : null;
}
function dt(t) {
  return t == null ? null : t.provider || null;
}
async function ro(t, e) {
  const n = fe.dereference(t, "overrides");
  S(typeof n == "object", "invalid overrides parameter", "overrides", t);
  const r = Kv(n);
  return S(r.to == null || (e || []).indexOf("to") >= 0, "cannot override to", "overrides.to", r.to), S(r.data == null || (e || []).indexOf("data") >= 0, "cannot override data", "overrides.data", r.data), r.from && (r.from = r.from), r;
}
async function Yv(t, e, n) {
  const r = Tt(t, "resolveName"), s = tr(r) ? r : null;
  return await Promise.all(e.map((i, a) => i.walkAsync(n[a], (o, u) => (u = fe.dereference(u, o), o === "address" ? tn(u, s) : u))));
}
function Zv(t) {
  const e = async function(a) {
    const o = await ro(a, ["data"]);
    o.to = await t.getAddress(), o.from && (o.from = await tn(o.from, no(t.runner)));
    const u = t.interface, f = ot(o.value || Ci, "overrides.value") === Ci, m = (o.data || "0x") === "0x";
    u.fallback && !u.fallback.payable && u.receive && !m && !f && S(!1, "cannot send data to receive or send value to non-payable fallback", "overrides", a), S(u.fallback || m, "cannot send data to receive-only contract", "overrides.data", o.data);
    const v = u.receive || u.fallback && u.fallback.payable;
    return S(v || f, "cannot send value to non-payable fallback", "overrides.value", o.value), S(u.fallback || m, "cannot send data to receive-only contract", "overrides.data", o.data), o;
  }, n = async function(a) {
    const o = Tt(t.runner, "call");
    B(Qa(o), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const u = await e(a);
    try {
      return await o.call(u);
    } catch (f) {
      throw va(f) && f.data ? t.interface.makeError(f.data, u) : f;
    }
  }, r = async function(a) {
    const o = t.runner;
    B(to(o), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const u = await o.sendTransaction(await e(a)), f = dt(t.runner);
    return new us(t.interface, f, u);
  }, s = async function(a) {
    const o = Tt(t.runner, "estimateGas");
    return B(eo(o), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await o.estimateGas(await e(a));
  }, i = async (a) => await r(a);
  return M(i, {
    _contract: t,
    estimateGas: s,
    populateTransaction: e,
    send: r,
    staticCall: n
  }), i;
}
function Qv(t, e) {
  const n = function(...f) {
    const m = t.interface.getFunction(e, f);
    return B(m, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: e, args: f }
    }), m;
  }, r = async function(...f) {
    const m = n(...f);
    let v = {};
    if (m.inputs.length + 1 === f.length && (v = await ro(f.pop()), v.from && (v.from = await tn(v.from, no(t.runner)))), m.inputs.length !== f.length)
      throw new Error("internal error: fragment inputs doesn't match arguments; should not happen");
    const A = await Yv(t.runner, m.inputs, f);
    return Object.assign({}, v, await Tr({
      to: t.getAddress(),
      data: t.interface.encodeFunctionData(m, A)
    }));
  }, s = async function(...f) {
    const m = await o(...f);
    return m.length === 1 ? m[0] : m;
  }, i = async function(...f) {
    const m = t.runner;
    B(to(m), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const v = await m.sendTransaction(await r(...f)), A = dt(t.runner);
    return new us(t.interface, A, v);
  }, a = async function(...f) {
    const m = Tt(t.runner, "estimateGas");
    return B(eo(m), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await m.estimateGas(await r(...f));
  }, o = async function(...f) {
    const m = Tt(t.runner, "call");
    B(Qa(m), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const v = await r(...f);
    let A = "0x";
    try {
      A = await m.call(v);
    } catch (k) {
      throw va(k) && k.data ? t.interface.makeError(k.data, v) : k;
    }
    const N = n(...f);
    return t.interface.decodeFunctionResult(N, A);
  }, u = async (...f) => n(...f).constant ? await s(...f) : await i(...f);
  return M(u, {
    name: t.interface.getFunctionName(e),
    _contract: t,
    _key: e,
    getFragment: n,
    estimateGas: a,
    populateTransaction: r,
    send: i,
    staticCall: s,
    staticCallResult: o
  }), Object.defineProperty(u, "fragment", {
    configurable: !1,
    enumerable: !0,
    get: () => {
      const f = t.interface.getFunction(e);
      return B(f, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: e }
      }), f;
    }
  }), u;
}
function ew(t, e) {
  const n = function(...s) {
    const i = t.interface.getEvent(e, s);
    return B(i, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: e, args: s }
    }), i;
  }, r = function(...s) {
    return new qv(t, n(...s), s);
  };
  return M(r, {
    name: t.interface.getEventName(e),
    _contract: t,
    _key: e,
    getFragment: n
  }), Object.defineProperty(r, "fragment", {
    configurable: !1,
    enumerable: !0,
    get: () => {
      const s = t.interface.getEvent(e);
      return B(s, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: e }
      }), s;
    }
  }), r;
}
const Bn = Symbol.for("_ethersInternal_contract"), so = /* @__PURE__ */ new WeakMap();
function tw(t, e) {
  so.set(t[Bn], e);
}
function ve(t) {
  return so.get(t[Bn]);
}
function nw(t) {
  return t && typeof t == "object" && "getTopicFilter" in t && typeof t.getTopicFilter == "function" && t.fragment;
}
async function ls(t, e) {
  let n, r = null;
  if (Array.isArray(e)) {
    const i = function(a) {
      if (Je(a, 32))
        return a;
      const o = t.interface.getEvent(a);
      return S(o, "unknown fragment", "name", a), o.topicHash;
    };
    n = e.map((a) => a == null ? null : Array.isArray(a) ? a.map(i) : i(a));
  } else
    e === "*" ? n = [null] : typeof e == "string" ? Je(e, 32) ? n = [e] : (r = t.interface.getEvent(e), S(r, "unknown fragment", "event", e), n = [r.topicHash]) : nw(e) ? n = await e.getTopicFilter() : "fragment" in e ? (r = e.fragment, n = [r.topicHash]) : S(!1, "unknown event name", "event", e);
  n = n.map((i) => {
    if (i == null)
      return null;
    if (Array.isArray(i)) {
      const a = Array.from(new Set(i.map((o) => o.toLowerCase())).values());
      return a.length === 1 ? a[0] : (a.sort(), a);
    }
    return i.toLowerCase();
  });
  const s = n.map((i) => i == null ? "null" : Array.isArray(i) ? i.join("|") : i).join("&");
  return { fragment: r, tag: s, topics: n };
}
async function Zt(t, e) {
  const { subs: n } = ve(t);
  return n.get((await ls(t, e)).tag) || null;
}
async function ki(t, e, n) {
  const r = dt(t.runner);
  B(r, "contract runner does not support subscribing", "UNSUPPORTED_OPERATION", { operation: e });
  const { fragment: s, tag: i, topics: a } = await ls(t, n), { addr: o, subs: u } = ve(t);
  let f = u.get(i);
  if (!f) {
    const v = { address: o || t, topics: a }, A = (L) => {
      let R = s;
      if (R == null)
        try {
          R = t.interface.getEvent(L.topics[0]);
        } catch (O) {
        }
      if (R) {
        const O = R, te = s ? t.interface.decodeEventLog(s, L.data, L.topics) : [];
        kr(t, n, te, (ae) => new Xv(t, ae, n, O, L));
      } else
        kr(t, n, [], (O) => new Za(t, O, n, L));
    };
    let N = [];
    f = { tag: i, listeners: [], start: () => {
      N.length || N.push(r.on(v, A));
    }, stop: async () => {
      if (N.length == 0)
        return;
      let L = N;
      N = [], await Promise.all(L), r.off(v, A);
    } }, u.set(i, f);
  }
  return f;
}
let Cr = Promise.resolve();
async function rw(t, e, n, r) {
  await Cr;
  const s = await Zt(t, e);
  if (!s)
    return !1;
  const i = s.listeners.length;
  return s.listeners = s.listeners.filter(({ listener: a, once: o }) => {
    const u = Array.from(n);
    r && u.push(r(o ? null : a));
    try {
      a.call(t, ...u);
    } catch (f) {
    }
    return !o;
  }), s.listeners.length === 0 && (s.stop(), ve(t).subs.delete(s.tag)), i > 0;
}
async function kr(t, e, n, r) {
  try {
    await Cr;
  } catch (i) {
  }
  const s = rw(t, e, n, r);
  return Cr = s, await s;
}
const $n = ["then"];
var Ew;
const Qt = class Qt {
  /**
   *  Creates a new contract connected to %%target%% with the %%abi%% and
   *  optionally connected to a %%runner%% to perform operations on behalf
   *  of.
   */
  constructor(e, n, r, s) {
    /**
     *  The target to connect to.
     *
     *  This can be an address, ENS name or any [[Addressable]], such as
     *  another contract. To get the resovled address, use the ``getAddress``
     *  method.
     */
    T(this, "target");
    /**
     *  The contract Interface.
     */
    T(this, "interface");
    /**
     *  The connected runner. This is generally a [[Provider]] or a
     *  [[Signer]], which dictates what operations are supported.
     *
     *  For example, a **Contract** connected to a [[Provider]] may
     *  only execute read-only operations.
     */
    T(this, "runner");
    /**
     *  All the Events available on this contract.
     */
    T(this, "filters");
    /**
     *  @_ignore:
     */
    T(this, Ew);
    /**
     *  The fallback or receive function if any.
     */
    T(this, "fallback");
    S(typeof e == "string" || La(e), "invalid value for Contract target", "target", e), r == null && (r = null);
    const i = Ir.from(n);
    M(this, { target: e, runner: r, interface: i }), Object.defineProperty(this, Bn, { value: {} });
    let a, o = null, u = null;
    if (s) {
      const v = dt(r);
      u = new us(this.interface, v, s);
    }
    let f = /* @__PURE__ */ new Map();
    if (typeof e == "string")
      if (Je(e))
        o = e, a = Promise.resolve(e);
      else {
        const v = Tt(r, "resolveName");
        if (!tr(v))
          throw en("contract runner does not support name resolution", "UNSUPPORTED_OPERATION", {
            operation: "resolveName"
          });
        a = v.resolveName(e).then((A) => {
          if (A == null)
            throw en("an ENS name used for a contract target must be correctly configured", "UNCONFIGURED_NAME", {
              value: e
            });
          return ve(this).addr = A, A;
        });
      }
    else
      a = e.getAddress().then((v) => {
        if (v == null)
          throw new Error("TODO");
        return ve(this).addr = v, v;
      });
    tw(this, { addrPromise: a, addr: o, deployTx: u, subs: f });
    const m = new Proxy({}, {
      get: (v, A, N) => {
        if (typeof A == "symbol" || $n.indexOf(A) >= 0)
          return Reflect.get(v, A, N);
        try {
          return this.getEvent(A);
        } catch (k) {
          if (!Ft(k, "INVALID_ARGUMENT") || k.argument !== "key")
            throw k;
        }
      },
      has: (v, A) => $n.indexOf(A) >= 0 ? Reflect.has(v, A) : Reflect.has(v, A) || this.interface.hasEvent(String(A))
    });
    return M(this, { filters: m }), M(this, {
      fallback: i.receive || i.fallback ? Zv(this) : null
    }), new Proxy(this, {
      get: (v, A, N) => {
        if (typeof A == "symbol" || A in v || $n.indexOf(A) >= 0)
          return Reflect.get(v, A, N);
        try {
          return v.getFunction(A);
        } catch (k) {
          if (!Ft(k, "INVALID_ARGUMENT") || k.argument !== "key")
            throw k;
        }
      },
      has: (v, A) => typeof A == "symbol" || A in v || $n.indexOf(A) >= 0 ? Reflect.has(v, A) : v.interface.hasFunction(A)
    });
  }
  /**
   *  Return a new Contract instance with the same target and ABI, but
   *  a different %%runner%%.
   */
  connect(e) {
    return new Qt(this.target, this.interface, e);
  }
  /**
   *  Return a new Contract instance with the same ABI and runner, but
   *  a different %%target%%.
   */
  attach(e) {
    return new Qt(e, this.interface, this.runner);
  }
  /**
   *  Return the resolved address of this Contract.
   */
  async getAddress() {
    return await ve(this).addrPromise;
  }
  /**
   *  Return the deployed bytecode or null if no bytecode is found.
   */
  async getDeployedCode() {
    const e = dt(this.runner);
    B(e, "runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "getDeployedCode" });
    const n = await e.getCode(await this.getAddress());
    return n === "0x" ? null : n;
  }
  /**
   *  Resolve to this Contract once the bytecode has been deployed, or
   *  resolve immediately if already deployed.
   */
  async waitForDeployment() {
    const e = this.deploymentTransaction();
    if (e)
      return await e.wait(), this;
    if (await this.getDeployedCode() != null)
      return this;
    const r = dt(this.runner);
    return B(r != null, "contract runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "waitForDeployment" }), new Promise((s, i) => {
      const a = async () => {
        try {
          if (await this.getDeployedCode() != null)
            return s(this);
          r.once("block", a);
        } catch (o) {
          i(o);
        }
      };
      a();
    });
  }
  /**
   *  Return the transaction used to deploy this contract.
   *
   *  This is only available if this instance was returned from a
   *  [[ContractFactory]].
   */
  deploymentTransaction() {
    return ve(this).deployTx;
  }
  /**
   *  Return the function for a given name. This is useful when a contract
   *  method name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getFunction(e) {
    return typeof e != "string" && (e = e.format()), Qv(this, e);
  }
  /**
   *  Return the event for a given name. This is useful when a contract
   *  event name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getEvent(e) {
    return typeof e != "string" && (e = e.format()), ew(this, e);
  }
  /**
   *  @_ignore:
   */
  async queryTransaction(e) {
    throw new Error("@TODO");
  }
  /*
      // @TODO: this is a non-backwards compatible change, but will be added
      //        in v7 and in a potential SmartContract class in an upcoming
      //        v6 release
      async getTransactionReceipt(hash: string): Promise<null | ContractTransactionReceipt> {
          const provider = getProvider(this.runner);
          assert(provider, "contract runner does not have a provider",
              "UNSUPPORTED_OPERATION", { operation: "queryTransaction" });
  
          const receipt = await provider.getTransactionReceipt(hash);
          if (receipt == null) { return null; }
  
          return new ContractTransactionReceipt(this.interface, provider, receipt);
      }
      */
  /**
   *  Provide historic access to event data for %%event%% in the range
   *  %%fromBlock%% (default: ``0``) to %%toBlock%% (default: ``"latest"``)
   *  inclusive.
   */
  async queryFilter(e, n, r) {
    n == null && (n = 0), r == null && (r = "latest");
    const { addr: s, addrPromise: i } = ve(this), a = s || await i, { fragment: o, topics: u } = await ls(this, e), f = { address: a, topics: u, fromBlock: n, toBlock: r }, m = dt(this.runner);
    return B(m, "contract runner does not have a provider", "UNSUPPORTED_OPERATION", { operation: "queryFilter" }), (await m.getLogs(f)).map((v) => {
      let A = o;
      if (A == null)
        try {
          A = this.interface.getEvent(v.topics[0]);
        } catch (N) {
        }
      if (A)
        try {
          return new cs(v, this.interface, A);
        } catch (N) {
          return new Ya(v, N);
        }
      return new er(v, m);
    });
  }
  /**
   *  Add an event %%listener%% for the %%event%%.
   */
  async on(e, n) {
    const r = await ki(this, "on", e);
    return r.listeners.push({ listener: n, once: !1 }), r.start(), this;
  }
  /**
   *  Add an event %%listener%% for the %%event%%, but remove the listener
   *  after it is fired once.
   */
  async once(e, n) {
    const r = await ki(this, "once", e);
    return r.listeners.push({ listener: n, once: !0 }), r.start(), this;
  }
  /**
   *  Emit an %%event%% calling all listeners with %%args%%.
   *
   *  Resolves to ``true`` if any listeners were called.
   */
  async emit(e, ...n) {
    return await kr(this, e, n, null);
  }
  /**
   *  Resolves to the number of listeners of %%event%% or the total number
   *  of listeners if unspecified.
   */
  async listenerCount(e) {
    if (e) {
      const s = await Zt(this, e);
      return s ? s.listeners.length : 0;
    }
    const { subs: n } = ve(this);
    let r = 0;
    for (const { listeners: s } of n.values())
      r += s.length;
    return r;
  }
  /**
   *  Resolves to the listeners subscribed to %%event%% or all listeners
   *  if unspecified.
   */
  async listeners(e) {
    if (e) {
      const s = await Zt(this, e);
      return s ? s.listeners.map(({ listener: i }) => i) : [];
    }
    const { subs: n } = ve(this);
    let r = [];
    for (const { listeners: s } of n.values())
      r = r.concat(s.map(({ listener: i }) => i));
    return r;
  }
  /**
   *  Remove the %%listener%% from the listeners for %%event%% or remove
   *  all listeners if unspecified.
   */
  async off(e, n) {
    const r = await Zt(this, e);
    if (!r)
      return this;
    if (n) {
      const s = r.listeners.map(({ listener: i }) => i).indexOf(n);
      s >= 0 && r.listeners.splice(s, 1);
    }
    return (n == null || r.listeners.length === 0) && (r.stop(), ve(this).subs.delete(r.tag)), this;
  }
  /**
   *  Remove all the listeners for %%event%% or remove all listeners if
   *  unspecified.
   */
  async removeAllListeners(e) {
    if (e) {
      const n = await Zt(this, e);
      if (!n)
        return this;
      n.stop(), ve(this).subs.delete(n.tag);
    } else {
      const { subs: n } = ve(this);
      for (const { tag: r, stop: s } of n.values())
        s(), n.delete(r);
    }
    return this;
  }
  /**
   *  Alias for [on].
   */
  async addListener(e, n) {
    return await this.on(e, n);
  }
  /**
   *  Alias for [off].
   */
  async removeListener(e, n) {
    return await this.off(e, n);
  }
  /**
   *  Create a new Class for the %%abi%%.
   */
  static buildClass(e) {
    class n extends Qt {
      constructor(s, i = null) {
        super(s, e, i);
      }
    }
    return n;
  }
  /**
   *  Create a new BaseContract with a specified Interface.
   */
  static from(e, n, r) {
    return r == null && (r = null), new this(e, n, r);
  }
};
Ew = Bn;
let Rr = Qt;
function sw() {
  return Rr;
}
class nr extends sw() {
}
const iw = [
  {
    constant: !1,
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: !0,
    stateMutability: "payable",
    type: "function"
  }
];
function aw({
  from: t,
  to: e,
  chainId: n,
  tokenId: r,
  tokenContract: s
}) {
  const a = new nr(s, iw).interface.encodeFunctionData("safeTransferFrom", [
    t,
    e,
    r
  ]);
  return {
    from: t,
    to: s,
    data: a,
    chainId: n
  };
}
const ow = [
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
function cw({
  from: t,
  to: e,
  amount: n,
  chainId: r,
  tokenId: s,
  tokenContract: i
}) {
  const a = new nr(i, ow), o = [t, e, s, n, "0x"], u = a.interface.encodeFunctionData(
    "safeTransferFrom",
    o
  );
  return {
    from: t,
    to: i,
    data: u,
    chainId: r
  };
}
const uw = [
  {
    constant: !1,
    inputs: [
      { name: "to", type: "address" },
      { name: "punkIndex", type: "uint256" }
    ],
    name: "transferPunk",
    outputs: [],
    payable: !1,
    type: "function"
  }
];
function lw({
  from: t,
  to: e,
  chainId: n,
  tokenId: r,
  tokenContract: s
}) {
  const a = new nr(s, uw).interface.encodeFunctionData("transferPunk", [
    e,
    r
  ]);
  return {
    from: t,
    to: s,
    data: a,
    chainId: n
  };
}
function fw({
  from: t,
  to: e,
  nft: n,
  chainId: r,
  amount: s
}) {
  const { contract_address: i, token_id: a } = n;
  if (n.contract_standard === "ERC721")
    return aw({
      tokenId: a,
      tokenContract: i,
      from: t,
      to: e,
      chainId: r
    });
  if (n.contract_standard === "CRYPTOPUNKS")
    return lw({
      tokenId: a,
      tokenContract: i,
      from: t,
      to: e,
      chainId: r
    });
  if (n.contract_standard === "ERC1155") {
    if (!s)
      throw new Error("ERC-1155 transaction must provide amount");
    return cw({
      tokenId: a,
      tokenContract: i,
      from: t,
      to: e,
      amount: s,
      chainId: r
    });
  } else
    throw new Error(`Unknown nft interface: ${n.contract_standard}`);
}
function io(t, e) {
  if (t === !1 || t == null)
    throw typeof e == "function" ? e() : new Error(e);
}
const ao = {
  Mainnet: "0x1"
};
function hw(t) {
  return is(t).replace(/^(0x0)(\w+)/, "0x$2");
}
function pw(t) {
  return hw(t);
}
const dw = [
  {
    constant: !0,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: !1,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: !0,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: !1,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: !1,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: !1,
    stateMutability: "nonpayable",
    type: "function"
  }
];
function gw({
  tokenInterface: t,
  from: e,
  to: n,
  value: r,
  chainId: s,
  inputToken: i
}) {
  const a = s || ao.Mainnet, o = pw(r);
  if (t === "native")
    return {
      from: e,
      to: n,
      value: o,
      chainId: a,
      data: "0x"
    };
  if (t === "erc20") {
    io(i, "inputToken value is required for erc-20 tokens");
    const f = new nr(i, dw).interface.encodeFunctionData("transfer", [
      n,
      o
    ]);
    return {
      from: e,
      to: i,
      data: f,
      chainId: a
    };
  } else
    throw new Error("Unexpected token interface");
}
function yw(t, {
  from: e,
  to: n,
  value: r,
  chainId: s,
  inputToken: i
}) {
  const a = s || ao.Mainnet, u = t.isNativeAddress(i, a) ? "native" : "erc20";
  return gw({
    tokenInterface: u,
    value: r,
    chainId: a,
    from: e,
    to: n,
    inputToken: i
  });
}
function mw({
  chainName: t,
  amount: e,
  asset: n,
  from: r,
  to: s,
  networks: i
}) {
  const a = Kn(t), o = i.getChainId(a), u = mb(
    e,
    bb({ asset: n, chain: a })
  ).toFixed(), f = vb({ asset: n, chain: a });
  if (f === void 0)
    throw new Error("Token implementation is unknown in selected chain");
  if (!o)
    throw new Error(`Unable to find chainId for ${t}`);
  const m = yw(i, {
    from: r,
    to: s,
    inputToken: f,
    value: u,
    chainId: o
  });
  return {
    amount: u,
    receiver: s,
    transaction: m,
    asset: n
  };
}
function bw({
  chainName: t,
  nftAmount: e,
  nftItem: n,
  from: r,
  to: s,
  networks: i
}) {
  const a = Kn(t), o = i.getChainId(a);
  if (!o)
    throw new Error(`Unable to find chainId for ${t}`);
  const u = fw({
    from: r,
    to: s,
    nft: n,
    amount: e,
    chainId: o
  });
  return {
    amount: e,
    receiver: s,
    transaction: u,
    asset: n
  };
}
class Ur extends We {
  constructor(n, r, {
    getNetworks: s,
    DEFAULT_CONFIGURATION: i
  }) {
    super({ ...n, ...r });
    T(this, "defaults");
    T(this, "userValues");
    T(this, "configuration");
    T(this, "getNetworks");
    T(this, "handleChange", (n, r) => {
      this.userValues.setState((s) => ({ ...s, [n]: r }));
    });
    this.defaults = new We(n), this.userValues = new We(r), this.getNetworks = s, this.configuration = new We(i), this.defaults.on("change", (a) => {
      this.internalSetState({ ...a, ...this.userValues.getState() });
    }), this.userValues.on("change", (a) => {
      this.internalSetState({ ...this.defaults.getState(), ...a });
    });
  }
  internalSetState(n) {
    super.setState(n);
  }
  setDefault(n, r) {
    this.defaults.setState((s) => s[n] === r ? s : { ...s, [n]: r });
  }
  setState() {
    throw new Error("restricted");
  }
  async createSendTransaction({
    from: n,
    to: r,
    tokenValue: s,
    asset: i,
    tokenChain: a
  }) {
    const o = await this.getNetworks(), u = mw({
      asset: i,
      from: n,
      to: r,
      amount: s,
      networks: o,
      chainName: a
    }), { transaction: f } = u, { tokenGas: m } = this.getState();
    return m && (f.gas = m), u;
  }
  async createSendNFTTransaction({
    from: n,
    to: r,
    nftAmount: s,
    nftItem: i,
    nftChain: a
  }) {
    const o = await this.getNetworks(), u = bw({
      nftItem: i,
      nftAmount: s,
      from: n,
      to: r,
      networks: o,
      chainName: a
    }), { transaction: f } = u, { nftGas: m } = this.getState();
    return m && (f.gas = m), u;
  }
}
T(Ur, "defaultState", { type: "token", nftAmount: "1" });
function Nw({
  address: t,
  positions: e,
  currencyCode: n,
  getNetworks: r,
  DEFAULT_CONFIGURATION: s,
  client: i
}) {
  var X;
  const a = _e(() => e ? ya(e) || An.Ethereum : null, [e]), [o, u] = rs(
    _e(
      () => [
        "to",
        "addressInputValue",
        "nftAmount",
        "nftFilterChain",
        "tokenChain",
        "tokenValue",
        "type",
        "nftId",
        "nftContractAddress",
        "nftChain",
        "tokenAssetCode"
      ],
      []
    )
  ), [f] = Br(() => {
    const Q = Object.assign(
      { ...Ur.defaultState },
      a ? { tokenChain: a } : null
    );
    return new Ur(Q, o, {
      // getNetworks: () => networksStore.load(),
      getNetworks: r,
      DEFAULT_CONFIGURATION: s
    });
  });
  pt(() => f.userValues.on("change", (Q) => {
    u(() => Q);
  }), [f.userValues, u]);
  const { tokenChain: m, tokenAssetCode: v, nftId: A, nftChain: N, nftContractAddress: k } = gr(f, [
    "tokenChain",
    "tokenAssetCode",
    "nftId",
    "nftChain",
    "nftContractAddress"
  ]);
  pt(() => {
    a && f.setDefault("tokenChain", a);
  }, [a, f]), pt(() => {
    f.setDefault("from", t);
  }, [t, f]), Object.assign(window, { sendFormStore: f });
  const C = _e(() => e ? Un(
    e.filter(
      (Q) => Q.type === "asset" && Q.chain === m
    )
  ) : null, [e, m]), L = (X = C == null ? void 0 : C[0]) == null ? void 0 : X.asset.asset_code;
  pt(() => {
    L && f.setDefault("tokenAssetCode", L);
  }, [L, f]);
  const { value: R, isLoading: O } = En(
    {
      asset_codes: [v].filter(Tn),
      currency: n
    },
    { client: i, keepStaleData: !0, enabled: !!v }
  ), te = _e(() => (C == null ? void 0 : C.find(
    (Q) => Q.asset.asset_code === v
  )) || (v && m && (R != null && R[v]) ? new yr({
    asset: R[v],
    chain: Kn(m)
  }) : null), [C, v, m, R]), { value: ae, isLoading: ne } = lo(
    {
      address: t,
      chain: N,
      contract_address: k,
      token_id: A,
      currency: n
    },
    {
      client: i,
      enabled: !!(t && N && k && A)
    }
  );
  return {
    store: f,
    handleChange: f.handleChange,
    tokenItemQuery: { data: te, isLoading: O },
    nftItemQuery: { data: ae, isLoading: ne },
    tokenItem: te,
    nftItem: ae,
    availablePositions: C
  };
}
const vw = "eth", ww = 1e3 * 60 * 60 * 24;
class Lr extends We {
  constructor({
    defaultState: n,
    userState: r,
    DEFAULT_CONFIGURATION: s
  }) {
    super({ ...n, ...r });
    T(this, "defaults");
    T(this, "userValues");
    T(this, "configuration");
    T(this, "handleChange", (n, r) => {
      this.userValues.setState((s) => ({ ...s, [n]: r }));
    });
    T(this, "handleAmountChange", (n, r) => {
      this.userValues.setState((s) => ({
        ...s,
        [n === "spend" ? "spendInput" : "receiveInput"]: r,
        primaryInput: n
      }));
    });
    T(this, "reverseTokens", () => {
      const { receiveTokenInput: n, spendTokenInput: r } = this.getState();
      this.userValues.setState((s) => {
        const i = {
          ...s,
          primaryInput: "spend"
          // spendInput: receiveInput,
        };
        return n && (i.spendTokenInput = n), r && (i.receiveTokenInput = r), i;
      });
    });
    T(this, "handleFormTypeChange", (n) => {
      n === "sell" && this.userValues.setState((r) => ({
        formTypeInput: n,
        spendInput: r.receiveInput || void 0,
        receiveInput: void 0,
        primaryInput: "spend"
      })), n === "buy" && this.userValues.setState((r) => ({
        formTypeInput: n,
        receiveInput: r.spendInput || void 0,
        spendInput: void 0,
        primaryInput: "receive"
      }));
    });
    this.defaults = new We(n), this.userValues = new We(r), this.configuration = new We(s), this.defaults.on("change", (i) => {
      this.internalSetState({ ...i, ...this.userValues.getState() });
    }), this.userValues.on("change", (i) => {
      this.internalSetState({ ...this.defaults.getState(), ...i });
    });
  }
  internalSetState(n) {
    super.setState(n);
  }
  setDefault(n, r) {
    this.defaults.setState((s) => s[n] === r ? s : { ...s, [n]: r });
  }
  setDefaults(n) {
    this.defaults.setState((s) => {
      let i = !1;
      for (const a in n) {
        const o = a;
        if (n[o] !== s[o]) {
          i = !0;
          break;
        }
      }
      return i ? { ...s, ...n } : s;
    });
    const r = this.userValues.getState();
    n.receiveTokenInput === r.spendTokenInput && !r.receiveTokenInput ? this.userValues.setState((s) => kn(s, "spendTokenInput")) : n.spendTokenInput === r.receiveTokenInput && !r.spendTokenInput && this.userValues.setState((s) => kn(s, "receiveTokenInput"));
  }
  handleTokenChange(n, r) {
    const { spendTokenInput: s, receiveTokenInput: i } = this.getState();
    n === "spendTokenInput" && r === i || n === "receiveTokenInput" && r === s ? this.reverseTokens() : this.handleChange(n, r);
  }
  setState() {
    throw new Error("restricted");
  }
}
T(Lr, "defaultState", { formTypeInput: "exchange" });
function $w({
  formTypeInput: t,
  chainInput: e,
  asset_code: n,
  nativeAssetCode: r,
  positions: s,
  popularTokens: i
}) {
  var u, f;
  const a = (u = s == null ? void 0 : s.filter((m) => m.type === "asset")) != null ? u : null, o = (f = i == null ? void 0 : i.find((m) => m !== r)) != null ? f : vw;
  if (t === "sell")
    return io(n, 'asset_code is required for "sell" form'), {
      primaryInput: "spend",
      spendTokenInput: n,
      receiveTokenInput: n === r ? o : r
    };
  if (t === "buy") {
    const v = Un(a).find(
      (N) => N.chain === e && N.asset.asset_code !== n
    ), A = n === o ? r : o;
    return {
      primaryInput: "spend",
      spendTokenInput: (v == null ? void 0 : v.asset.asset_code) || A,
      receiveTokenInput: n != null ? n : void 0
    };
  } else if (t === "exchange") {
    const v = Un(a).find(
      (N) => N.chain === e
    ), A = (v == null ? void 0 : v.asset.asset_code) || r;
    return {
      primaryInput: "spend",
      spendTokenInput: A,
      receiveTokenInput: A === r ? o : r
    };
  }
  return null;
}
function Iw({
  asset_code: t,
  positions: e,
  getNativeAssetId: n,
  currency: r,
  client: s,
  supportedChains: i,
  DEFAULT_CONFIGURATION: a,
  getPopularTokens: o
}) {
  var p, g, $, b, _, U;
  const u = t ? "buy" : "exchange", f = _e(
    // Set can't compare Chain correctly if they are originated from different sources
    // for example: wab app's Chain and current library's Chain
    () => new Set(i.map((I) => I.toString())),
    [i]
  ), m = En(
    { asset_codes: [t].filter(Tn), currency: r },
    { keepStaleData: !0, enabled: !!t, client: s }
  ), v = t && (g = (p = m.value) == null ? void 0 : p[t]) != null ? g : null, A = _e(() => {
    const I = e ? ya(e, t != null ? t : void 0) : null;
    if (I)
      return I;
    if (v != null && v.implementations && !(An.Ethereum in v.implementations)) {
      if (!f.size)
        return null;
      const D = Object.keys(
        v.implementations
      ).find((z) => f.has(z));
      if (D)
        return D;
    }
    return An.Ethereum;
  }, [
    v == null ? void 0 : v.implementations,
    t,
    e,
    f
  ]), [N, k] = rs(
    _e(
      () => [
        "chainInput",
        "formTypeInput",
        "primaryInput",
        "spendInput",
        "receiveInput",
        "spendTokenInput",
        "receiveTokenInput"
      ],
      []
    )
  ), [C] = Br(() => {
    const I = Object.assign(
      {
        ...Lr.defaultState,
        formTypeInput: u
      },
      // eslint-disable-line no-undef
      A ? {
        chainInput: A,
        receiveTokenInput: u === "buy" && t ? t : void 0
      } : null
    );
    return new Lr({
      defaultState: I,
      userState: N,
      DEFAULT_CONFIGURATION: a
    });
  });
  pt(() => C.userValues.on("change", (I) => {
    const D = I.primaryInput === "receive" ? "spendInput" : "receiveInput", z = kn(I, D);
    k(() => z);
  }), [C.userValues, k]), pt(() => {
    A && C.setDefault("chainInput", A);
  }, [A, C]);
  const { formTypeInput: L, chainInput: R } = gr(C, [
    "formTypeInput",
    "chainInput"
  ]), O = Kn(R || An.Ethereum), { data: te } = gs({
    queryKey: ["getNativeAssetId", O],
    queryFn: () => n(O),
    staleTime: 1 / 0,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore this is deprecated in v5, but is still supported in v4
    // which is used by the extension, and its useful
    // Discussion: https://discord.com/channels/719702312431386674/1169234879909732483/1176952441963565066
    suspense: !1,
    keepPreviousData: !0
  }), ae = gs({
    queryKey: ["getPopularTokens", O],
    queryFn: () => o(O),
    staleTime: ww,
    retry: !1,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore this is deprecated in v5, but is still supported in v4
    // which is used by the extension, and its useful
    // Discussion: https://discord.com/channels/719702312431386674/1169234879909732483/1176952441963565066
    suspense: !1,
    keepPreviousData: !0
  });
  uo(() => {
    const I = $w({
      formTypeInput: L,
      asset_code: t,
      chainInput: R,
      nativeAssetCode: te || void 0,
      positions: e,
      popularTokens: ae.data
    });
    I && C.setDefaults(I);
  }, [
    C,
    L,
    t,
    R,
    te,
    e,
    ae.data
  ]);
  const { spendTokenInput: ne, receiveTokenInput: X } = gr(
    C,
    ["spendTokenInput", "receiveTokenInput"]
  ), Q = En(
    { asset_codes: [ne].filter(Tn), currency: r },
    { keepStaleData: !0, client: s, enabled: !!ne }
  ), c = En(
    { asset_codes: [X].filter(Tn), currency: r },
    { keepStaleData: !0, client: s, enabled: !!X }
  ), l = ne && (b = ($ = Q.value) == null ? void 0 : $[ne]) != null ? b : null, h = X && (U = (_ = c.value) == null ? void 0 : _[X]) != null ? U : null, w = _e(() => Un(
    (e != null ? e : []).filter(
      (I) => I.type === "asset" && I.chain === O.toString()
    )
  ), [O, e]), d = _e(() => {
    const I = {};
    for (const D of w)
      I[D.asset.asset_code] = D;
    return I;
  }, [w]), y = _e(() => ne ? d[ne] ? d[ne] : l ? new yr({ asset: l, chain: O }) : null : null, [d, l, ne, O]), E = _e(() => X ? d[X] ? d[X] : h ? new yr({ asset: h, chain: O }) : null : null, [d, h, X, O]);
  return {
    store: C,
    handleChange: C.handleChange,
    spendAsset: l,
    spendAssetQuery: {
      data: l,
      isLoading: Q.isLoading || ae.isFetching
    },
    receiveAsset: h,
    receiveAssetQuery: {
      data: h,
      isLoading: c.isLoading || ae.isFetching
    },
    spendPosition: y,
    receivePosition: E,
    availablePositions: w
  };
}
export {
  vw as ETH,
  yr as EmptyAddressPosition,
  An as NetworkId,
  Ur as SendFormStore,
  Lr as SwapFormStore,
  fw as createSendNFTTransaction,
  gw as createSendNativeOrContractTransaction,
  ya as getChainWithMostAssetValue,
  Un as sortPositionsByValue,
  Sw as useFormState,
  rs as useSearchParamsState,
  Nw as useSendForm,
  Iw as useSwapForm
};
