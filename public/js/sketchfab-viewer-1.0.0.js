! function(t, e) {
    "function" == typeof define && define.amd ? define([], e) : t.Sketchfab = e()
}(this, function() {
    var t, e, i;
    return function(n) {
        function s(t, e) {
            return m.call(t, e)
        }

        function r(t, e) {
            var i, n, s, r, o, u, f, a, c, p, d = e && e.split("/"),
                l = y.map,
                h = l && l["*"] || {};
            if (t && "." === t.charAt(0))
                if (e) {
                    for (d = d.slice(0, d.length - 1), t = d.concat(t.split("/")), a = 0; a < t.length; a += 1)
                        if (p = t[a], "." === p) t.splice(a, 1), a -= 1;
                        else if (".." === p) {
                        if (1 === a && (".." === t[2] || ".." === t[0])) break;
                        a > 0 && (t.splice(a - 1, 2), a -= 2)
                    }
                    t = t.join("/")
                } else 0 === t.indexOf("./") && (t = t.substring(2));
            if ((d || h) && l) {
                for (i = t.split("/"), a = i.length; a > 0; a -= 1) {
                    if (n = i.slice(0, a).join("/"), d)
                        for (c = d.length; c > 0; c -= 1)
                            if (s = l[d.slice(0, c).join("/")], s && (s = s[n])) {
                                r = s, o = a;
                                break
                            }
                    if (r) break;
                    !u && h && h[n] && (u = h[n], f = a)
                }!r && u && (r = u, o = f), r && (i.splice(0, o, r), t = i.join("/"))
            }
            return t
        }

        function o(t, e) {
            return function() {
                return l.apply(n, q.call(arguments, 0).concat([t, e]))
            }
        }

        function u(t) {
            return function(e) {
                return r(e, t)
            }
        }

        function f(t) {
            return function(e) {
                v[t] = e
            }
        }

        function a(t) {
            if (s(g, t)) {
                var e = g[t];
                delete g[t], b[t] = !0, d.apply(n, e)
            }
            if (!s(v, t) && !s(b, t)) throw new Error("No " + t);
            return v[t]
        }

        function c(t) {
            var e, i = t ? t.indexOf("!") : -1;
            return i > -1 && (e = t.substring(0, i), t = t.substring(i + 1, t.length)), [e, t]
        }

        function p(t) {
            return function() {
                return y && y.config && y.config[t] || {}
            }
        }
        var d, l, h, _, v = {},
            g = {},
            y = {},
            b = {},
            m = Object.prototype.hasOwnProperty,
            q = [].slice;
        h = function(t, e) {
            var i, n = c(t),
                s = n[0];
            return t = n[1], s && (s = r(s, e), i = a(s)), s ? t = i && i.normalize ? i.normalize(t, u(e)) : r(t, e) : (t = r(t, e), n = c(t), s = n[0], t = n[1], s && (i = a(s))), {
                f: s ? s + "!" + t : t,
                n: t,
                pr: s,
                p: i
            }
        }, _ = {
            require: function(t) {
                return o(t)
            },
            exports: function(t) {
                var e = v[t];
                return "undefined" != typeof e ? e : v[t] = {}
            },
            module: function(t) {
                return {
                    id: t,
                    uri: "",
                    exports: v[t],
                    config: p(t)
                }
            }
        }, d = function(t, e, i, r) {
            var u, c, p, d, l, y, m = [],
                q = typeof i;
            if (r = r || t, "undefined" === q || "function" === q) {
                for (e = !e.length && i.length ? ["require", "exports", "module"] : e, l = 0; l < e.length; l += 1)
                    if (d = h(e[l], r), c = d.f, "require" === c) m[l] = _.require(t);
                    else if ("exports" === c) m[l] = _.exports(t), y = !0;
                else if ("module" === c) u = m[l] = _.module(t);
                else if (s(v, c) || s(g, c) || s(b, c)) m[l] = a(c);
                else {
                    if (!d.p) throw new Error(t + " missing " + c);
                    d.p.load(d.n, o(r, !0), f(c), {}), m[l] = v[c]
                }
                p = i ? i.apply(v[t], m) : void 0, t && (u && u.exports !== n && u.exports !== v[t] ? v[t] = u.exports : p === n && y || (v[t] = p))
            } else t && (v[t] = i)
        }, t = e = l = function(t, e, i, s, r) {
            return "string" == typeof t ? _[t] ? _[t](e) : a(h(t, e).f) : (t.splice || (y = t, e.splice ? (t = e, e = i, i = null) : t = n), e = e || function() {}, "function" == typeof i && (i = s, s = r), s ? d(n, t, e, i) : setTimeout(function() {
                d(n, t, e, i)
            }, 4), l)
        }, l.config = function(t) {
            return y = t, y.deps && l(y.deps, y.callback), l
        }, t._defined = v, i = function(t, e, i) {
            e.splice || (i = e, e = []), s(v, t) || s(g, t) || (g[t] = [t, e, i])
        }, i.amd = {
            jQuery: !0
        }
    }(), i("../vendors/almond", function() {}), i("apis/viewer/lib/APIClient", [], function() {
        var t = function(t, e) {
                t.forEach(function(t) {
                    this[t] = function() {
                        var i, n = e._requestIdCounter++,
                            s = Array.prototype.slice.call(arguments);
                        if (s.length > 0) {
                            var r = s[s.length - 1];
                            "function" == typeof r && (i = s.pop())
                        }
                        i && (e._pendingRequests[n] = i.bind(this)), e._target.postMessage({
                            type: "api.request",
                            instanceId: e.getIdentifier(),
                            requestId: n,
                            member: t,
                            arguments: s
                        }, "*")
                    }
                }, this), this.addEventListener = function(t, i) {
                    e._eventListeners[t] || (e._eventListeners[t] = []), e._eventListeners[t].push(i)
                }, this.removeEventListener = function(t, i) {
                    if (e._eventListeners[t]) {
                        var n = e._eventListeners[t].indexOf(i); - 1 !== n && e._eventListeners[t].splice(n, 1)
                    }
                }
            },
            e = function(t) {
                this._target = t, this._requestIdCounter = 0, this._pendingRequests = {}, this._eventListeners = {}, this._ready = !1;
                var e = Math.random().toString();
                this._identifier = e.substr(e.indexOf(".") + 1), this.listenServer()
            };
        return e.prototype = {
            getIdentifier: function() {
                return this._identifier
            },
            use: function(e, i) {
                this._version = e;
                var n = function(e, i) {
                        var n = this._requestIdCounter++;
                        this._pendingRequests[n] = function(e, n, s) {
                            e ? i.call(this, e) : i.call(this, null, new t(s, this))
                        }.bind(this), this._target.postMessage({
                            type: "api.initialize",
                            requestId: n,
                            name: e
                        }, "*")
                    }.bind(this),
                    s = function() {
                        n(e, i)
                    }.bind(this);
                this._ready ? s() : this.initAPI = s
            },
            listenServer: function() {
                window.addEventListener("message", function(t) {
                    if (("api.ready" === t.data.type || "api.initialize.result" === t.data.type || "api.request.result" === t.data.type || "api.event" === t.data.type) && t.data.instanceId === this.getIdentifier())
                        if ("api.ready" === t.data.type && (this._ready || (this._ready = !0, this.initAPI && this.initAPI())), "api.event" === t.data.type) {
                            var e = t.data.results[0];
                            this._eventListeners[e] && this._eventListeners[e].forEach(function(t) {
                                t(e)
                            })
                        } else {
                            if (!this._pendingRequests[t.data.requestId]) return;
                            this._pendingRequests[t.data.requestId].apply(null, t.data.results)
                        }
                }.bind(this))
            }
        }, e
    }), i("sketchfab-viewer", ["apis/viewer/lib/APIClient"], function(t) {
        var e = function(t, e) {
            this._target = e, this._version = t || "1.0.0", this._url = "https://sketchfab.com/models/XXXX/embed", this._client = void 0, this._options = void 0
        };
        return e.prototype = {
            getEmbedURL: function(t, e) {
                var i = this._url + "?api_version=" + this._version + "&api_id=" + this._client.getIdentifier() + "&oculus=2";
                return e && Object.keys(e).forEach(function(t) {
                    void 0 !== e[t] && null !== e[t] && "function" != typeof e[t] && (i += "&" + t.toString() + "=" + e[t].toString())
                }), i.replace("XXXX", t)
            },
            init: function(e, i) {
                this._options = i, this._client = new t(this._target.contentWindow), this._target.addEventListener("load", function() {
                    this._client.use(this._version, function(t, e) {
                        if (t) throw t;
                        this.success.call(this, e)
                    }.bind(this))
                }.bind(this), !0), this._target.src = this.getEmbedURL(e, i)
            },
            success: function(t) {
                this._options.success && "function" == typeof this._options.success && this._options.success(t)
            },
            error: function(t) {
                this._options.error && "function" == typeof this._options.error && this._options.error(t)
            }
        }, e
    }), e("sketchfab-viewer")
});