/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.28.1(5871d139726f045842cd7dcb06c5465ca4eeaf1d)
 * Released under the MIT license
 * https://github.com/microsoft/vscode/blob/main/LICENSE.txt
 *-----------------------------------------------------------*/ (function () {
  var z = [
      "require",
      "exports",
      "vs/base/common/platform",
      "vs/editor/common/core/position",
      "vs/base/common/errors",
      "vs/base/common/strings",
      "vs/editor/common/core/range",
      "vs/base/common/lifecycle",
      "vs/base/common/stopwatch",
      "vs/base/common/event",
      "vs/base/common/diff/diff",
      "vs/base/common/types",
      "vs/base/common/uint",
      "vs/base/common/uri",
      "vs/base/common/diff/diffChange",
      "vs/base/common/functional",
      "vs/base/common/iterator",
      "vs/base/common/keyCodes",
      "vs/base/common/linkedList",
      "vs/base/common/process",
      "vs/base/common/path",
      "vs/base/common/cancellation",
      "vs/base/common/hash",
      "vs/editor/common/core/characterClassifier",
      "vs/editor/common/core/selection",
      "vs/editor/common/core/token",
      "vs/editor/common/diff/diffComputer",
      "vs/editor/common/model/wordHelper",
      "vs/editor/common/modes/linkComputer",
      "vs/editor/common/modes/supports/inplaceReplaceSupport",
      "vs/editor/common/standalone/standaloneEnums",
      "vs/editor/common/standalone/standaloneBase",
      "vs/editor/common/viewModel/prefixSumComputer",
      "vs/editor/common/model/mirrorTextModel",
      "vs/base/common/worker/simpleWorker",
      "vs/editor/common/services/editorSimpleWorker",
    ],
    V = function (I) {
      for (var t = [], E = 0, y = I.length; E < y; E++) t[E] = z[I[E]];
      return t;
    },
    he = this,
    de = typeof global == "object" ? global : {},
    X;
  (function (I) {
    I.global = he;
    var t = (function () {
      function E() {
        (this._detected = !1),
          (this._isWindows = !1),
          (this._isNode = !1),
          (this._isElectronRenderer = !1),
          (this._isWebWorker = !1);
      }
      return (
        Object.defineProperty(E.prototype, "isWindows", {
          get: function () {
            return this._detect(), this._isWindows;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(E.prototype, "isNode", {
          get: function () {
            return this._detect(), this._isNode;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(E.prototype, "isElectronRenderer", {
          get: function () {
            return this._detect(), this._isElectronRenderer;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(E.prototype, "isWebWorker", {
          get: function () {
            return this._detect(), this._isWebWorker;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (E.prototype._detect = function () {
          this._detected ||
            ((this._detected = !0),
            (this._isWindows = E._isWindows()),
            (this._isNode = typeof module != "undefined" && !!module.exports),
            (this._isElectronRenderer =
              typeof process != "undefined" &&
              typeof process.versions != "undefined" &&
              typeof process.versions.electron != "undefined" &&
              process.type === "renderer"),
            (this._isWebWorker = typeof I.global.importScripts == "function"));
        }),
        (E._isWindows = function () {
          return typeof navigator != "undefined" &&
            navigator.userAgent &&
            navigator.userAgent.indexOf("Windows") >= 0
            ? !0
            : typeof process != "undefined"
            ? process.platform === "win32"
            : !1;
        }),
        E
      );
    })();
    I.Environment = t;
  })(X || (X = {}));
  var X;
  (function (I) {
    var t = (function () {
      function p(s, h, a) {
        (this.type = s), (this.detail = h), (this.timestamp = a);
      }
      return p;
    })();
    I.LoaderEvent = t;
    var E = (function () {
      function p(s) {
        this._events = [new t(1, "", s)];
      }
      return (
        (p.prototype.record = function (s, h) {
          this._events.push(
            new t(s, h, I.Utilities.getHighPerformanceTimestamp())
          );
        }),
        (p.prototype.getEvents = function () {
          return this._events;
        }),
        p
      );
    })();
    I.LoaderEventRecorder = E;
    var y = (function () {
      function p() {}
      return (
        (p.prototype.record = function (s, h) {}),
        (p.prototype.getEvents = function () {
          return [];
        }),
        (p.INSTANCE = new p()),
        p
      );
    })();
    I.NullLoaderEventRecorder = y;
  })(X || (X = {}));
  var X;
  (function (I) {
    var t = (function () {
      function E() {}
      return (
        (E.fileUriToFilePath = function (y, p) {
          if (((p = decodeURI(p).replace(/%23/g, "#")), y)) {
            if (/^file:\/\/\//.test(p)) return p.substr(8);
            if (/^file:\/\//.test(p)) return p.substr(5);
          } else if (/^file:\/\//.test(p)) return p.substr(7);
          return p;
        }),
        (E.startsWith = function (y, p) {
          return y.length >= p.length && y.substr(0, p.length) === p;
        }),
        (E.endsWith = function (y, p) {
          return y.length >= p.length && y.substr(y.length - p.length) === p;
        }),
        (E.containsQueryString = function (y) {
          return /^[^\#]*\?/gi.test(y);
        }),
        (E.isAbsolutePath = function (y) {
          return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(y);
        }),
        (E.forEachProperty = function (y, p) {
          if (y) {
            var s = void 0;
            for (s in y) y.hasOwnProperty(s) && p(s, y[s]);
          }
        }),
        (E.isEmpty = function (y) {
          var p = !0;
          return (
            E.forEachProperty(y, function () {
              p = !1;
            }),
            p
          );
        }),
        (E.recursiveClone = function (y) {
          if (
            !y ||
            typeof y != "object" ||
            y instanceof RegExp ||
            (!Array.isArray(y) && Object.getPrototypeOf(y) !== Object.prototype)
          )
            return y;
          var p = Array.isArray(y) ? [] : {};
          return (
            E.forEachProperty(y, function (s, h) {
              h && typeof h == "object"
                ? (p[s] = E.recursiveClone(h))
                : (p[s] = h);
            }),
            p
          );
        }),
        (E.generateAnonymousModule = function () {
          return "===anonymous" + E.NEXT_ANONYMOUS_ID++ + "===";
        }),
        (E.isAnonymousModule = function (y) {
          return E.startsWith(y, "===anonymous");
        }),
        (E.getHighPerformanceTimestamp = function () {
          return (
            this.PERFORMANCE_NOW_PROBED ||
              ((this.PERFORMANCE_NOW_PROBED = !0),
              (this.HAS_PERFORMANCE_NOW =
                I.global.performance &&
                typeof I.global.performance.now == "function")),
            this.HAS_PERFORMANCE_NOW ? I.global.performance.now() : Date.now()
          );
        }),
        (E.NEXT_ANONYMOUS_ID = 1),
        (E.PERFORMANCE_NOW_PROBED = !1),
        (E.HAS_PERFORMANCE_NOW = !1),
        E
      );
    })();
    I.Utilities = t;
  })(X || (X = {}));
  var X;
  (function (I) {
    function t(p) {
      if (p instanceof Error) return p;
      var s = new Error(p.message || String(p) || "Unknown Error");
      return p.stack && (s.stack = p.stack), s;
    }
    I.ensureError = t;
    var E = (function () {
      function p() {}
      return (
        (p.validateConfigurationOptions = function (s) {
          function h(l) {
            if (l.phase === "loading") {
              console.error('Loading "' + l.moduleId + '" failed'),
                console.error(l),
                console.error("Here are the modules that depend on it:"),
                console.error(l.neededBy);
              return;
            }
            if (l.phase === "factory") {
              console.error(
                'The factory method of "' +
                  l.moduleId +
                  '" has thrown an exception'
              ),
                console.error(l);
              return;
            }
          }
          if (
            ((s = s || {}),
            typeof s.baseUrl != "string" && (s.baseUrl = ""),
            typeof s.isBuild != "boolean" && (s.isBuild = !1),
            typeof s.paths != "object" && (s.paths = {}),
            typeof s.config != "object" && (s.config = {}),
            typeof s.catchError == "undefined" && (s.catchError = !1),
            typeof s.recordStats == "undefined" && (s.recordStats = !1),
            typeof s.urlArgs != "string" && (s.urlArgs = ""),
            typeof s.onError != "function" && (s.onError = h),
            Array.isArray(s.ignoreDuplicateModules) ||
              (s.ignoreDuplicateModules = []),
            s.baseUrl.length > 0 &&
              (I.Utilities.endsWith(s.baseUrl, "/") || (s.baseUrl += "/")),
            typeof s.cspNonce != "string" && (s.cspNonce = ""),
            typeof s.preferScriptTags == "undefined" &&
              (s.preferScriptTags = !1),
            Array.isArray(s.nodeModules) || (s.nodeModules = []),
            s.nodeCachedData &&
              typeof s.nodeCachedData == "object" &&
              (typeof s.nodeCachedData.seed != "string" &&
                (s.nodeCachedData.seed = "seed"),
              (typeof s.nodeCachedData.writeDelay != "number" ||
                s.nodeCachedData.writeDelay < 0) &&
                (s.nodeCachedData.writeDelay = 1e3 * 7),
              !s.nodeCachedData.path ||
                typeof s.nodeCachedData.path != "string"))
          ) {
            var a = t(
              new Error("INVALID cached data configuration, 'path' MUST be set")
            );
            (a.phase = "configuration"),
              s.onError(a),
              (s.nodeCachedData = void 0);
          }
          return s;
        }),
        (p.mergeConfigurationOptions = function (s, h) {
          s === void 0 && (s = null), h === void 0 && (h = null);
          var a = I.Utilities.recursiveClone(h || {});
          return (
            I.Utilities.forEachProperty(s, function (l, f) {
              l === "ignoreDuplicateModules" &&
              typeof a.ignoreDuplicateModules != "undefined"
                ? (a.ignoreDuplicateModules =
                    a.ignoreDuplicateModules.concat(f))
                : l === "paths" && typeof a.paths != "undefined"
                ? I.Utilities.forEachProperty(f, function (S, c) {
                    return (a.paths[S] = c);
                  })
                : l === "config" && typeof a.config != "undefined"
                ? I.Utilities.forEachProperty(f, function (S, c) {
                    return (a.config[S] = c);
                  })
                : (a[l] = I.Utilities.recursiveClone(f));
            }),
            p.validateConfigurationOptions(a)
          );
        }),
        p
      );
    })();
    I.ConfigurationOptionsUtil = E;
    var y = (function () {
      function p(s, h) {
        if (
          ((this._env = s),
          (this.options = E.mergeConfigurationOptions(h)),
          this._createIgnoreDuplicateModulesMap(),
          this._createNodeModulesMap(),
          this._createSortedPathsRules(),
          this.options.baseUrl === "")
        ) {
          if (
            this.options.nodeRequire &&
            this.options.nodeRequire.main &&
            this.options.nodeRequire.main.filename &&
            this._env.isNode
          ) {
            var a = this.options.nodeRequire.main.filename,
              l = Math.max(a.lastIndexOf("/"), a.lastIndexOf("\\"));
            this.options.baseUrl = a.substring(0, l + 1);
          }
          if (this.options.nodeMain && this._env.isNode) {
            var a = this.options.nodeMain,
              l = Math.max(a.lastIndexOf("/"), a.lastIndexOf("\\"));
            this.options.baseUrl = a.substring(0, l + 1);
          }
        }
      }
      return (
        (p.prototype._createIgnoreDuplicateModulesMap = function () {
          this.ignoreDuplicateModulesMap = {};
          for (var s = 0; s < this.options.ignoreDuplicateModules.length; s++)
            this.ignoreDuplicateModulesMap[
              this.options.ignoreDuplicateModules[s]
            ] = !0;
        }),
        (p.prototype._createNodeModulesMap = function () {
          this.nodeModulesMap = Object.create(null);
          for (var s = 0, h = this.options.nodeModules; s < h.length; s++) {
            var a = h[s];
            this.nodeModulesMap[a] = !0;
          }
        }),
        (p.prototype._createSortedPathsRules = function () {
          var s = this;
          (this.sortedPathsRules = []),
            I.Utilities.forEachProperty(this.options.paths, function (h, a) {
              Array.isArray(a)
                ? s.sortedPathsRules.push({ from: h, to: a })
                : s.sortedPathsRules.push({ from: h, to: [a] });
            }),
            this.sortedPathsRules.sort(function (h, a) {
              return a.from.length - h.from.length;
            });
        }),
        (p.prototype.cloneAndMerge = function (s) {
          return new p(this._env, E.mergeConfigurationOptions(s, this.options));
        }),
        (p.prototype.getOptionsLiteral = function () {
          return this.options;
        }),
        (p.prototype._applyPaths = function (s) {
          for (var h, a = 0, l = this.sortedPathsRules.length; a < l; a++)
            if (
              ((h = this.sortedPathsRules[a]),
              I.Utilities.startsWith(s, h.from))
            ) {
              for (var f = [], S = 0, c = h.to.length; S < c; S++)
                f.push(h.to[S] + s.substr(h.from.length));
              return f;
            }
          return [s];
        }),
        (p.prototype._addUrlArgsToUrl = function (s) {
          return I.Utilities.containsQueryString(s)
            ? s + "&" + this.options.urlArgs
            : s + "?" + this.options.urlArgs;
        }),
        (p.prototype._addUrlArgsIfNecessaryToUrl = function (s) {
          return this.options.urlArgs ? this._addUrlArgsToUrl(s) : s;
        }),
        (p.prototype._addUrlArgsIfNecessaryToUrls = function (s) {
          if (this.options.urlArgs)
            for (var h = 0, a = s.length; h < a; h++)
              s[h] = this._addUrlArgsToUrl(s[h]);
          return s;
        }),
        (p.prototype.moduleIdToPaths = function (s) {
          var h =
            this.nodeModulesMap[s] === !0 ||
            (this.options.amdModulesPattern instanceof RegExp &&
              !this.options.amdModulesPattern.test(s));
          if (h) return this.isBuild() ? ["empty:"] : ["node|" + s];
          var a = s,
            l;
          if (
            !I.Utilities.endsWith(a, ".js") &&
            !I.Utilities.isAbsolutePath(a)
          ) {
            l = this._applyPaths(a);
            for (var f = 0, S = l.length; f < S; f++)
              (this.isBuild() && l[f] === "empty:") ||
                (I.Utilities.isAbsolutePath(l[f]) ||
                  (l[f] = this.options.baseUrl + l[f]),
                !I.Utilities.endsWith(l[f], ".js") &&
                  !I.Utilities.containsQueryString(l[f]) &&
                  (l[f] = l[f] + ".js"));
          } else
            !I.Utilities.endsWith(a, ".js") &&
              !I.Utilities.containsQueryString(a) &&
              (a = a + ".js"),
              (l = [a]);
          return this._addUrlArgsIfNecessaryToUrls(l);
        }),
        (p.prototype.requireToUrl = function (s) {
          var h = s;
          return (
            I.Utilities.isAbsolutePath(h) ||
              ((h = this._applyPaths(h)[0]),
              I.Utilities.isAbsolutePath(h) || (h = this.options.baseUrl + h)),
            this._addUrlArgsIfNecessaryToUrl(h)
          );
        }),
        (p.prototype.isBuild = function () {
          return this.options.isBuild;
        }),
        (p.prototype.isDuplicateMessageIgnoredFor = function (s) {
          return this.ignoreDuplicateModulesMap.hasOwnProperty(s);
        }),
        (p.prototype.getConfigForModule = function (s) {
          if (this.options.config) return this.options.config[s];
        }),
        (p.prototype.shouldCatchError = function () {
          return this.options.catchError;
        }),
        (p.prototype.shouldRecordStats = function () {
          return this.options.recordStats;
        }),
        (p.prototype.onError = function (s) {
          this.options.onError(s);
        }),
        p
      );
    })();
    I.Configuration = y;
  })(X || (X = {}));
  var X;
  (function (I) {
    var t = (function () {
        function a(l) {
          (this._env = l),
            (this._scriptLoader = null),
            (this._callbackMap = {});
        }
        return (
          (a.prototype.load = function (l, f, S, c) {
            var g = this;
            if (!this._scriptLoader)
              if (this._env.isWebWorker) this._scriptLoader = new y();
              else if (this._env.isElectronRenderer) {
                var d = l.getConfig().getOptionsLiteral().preferScriptTags;
                d
                  ? (this._scriptLoader = new E())
                  : (this._scriptLoader = new p(this._env));
              } else
                this._env.isNode
                  ? (this._scriptLoader = new p(this._env))
                  : (this._scriptLoader = new E());
            var v = { callback: S, errorback: c };
            if (this._callbackMap.hasOwnProperty(f)) {
              this._callbackMap[f].push(v);
              return;
            }
            (this._callbackMap[f] = [v]),
              this._scriptLoader.load(
                l,
                f,
                function () {
                  return g.triggerCallback(f);
                },
                function (i) {
                  return g.triggerErrorback(f, i);
                }
              );
          }),
          (a.prototype.triggerCallback = function (l) {
            var f = this._callbackMap[l];
            delete this._callbackMap[l];
            for (var S = 0; S < f.length; S++) f[S].callback();
          }),
          (a.prototype.triggerErrorback = function (l, f) {
            var S = this._callbackMap[l];
            delete this._callbackMap[l];
            for (var c = 0; c < S.length; c++) S[c].errorback(f);
          }),
          a
        );
      })(),
      E = (function () {
        function a() {}
        return (
          (a.prototype.attachListeners = function (l, f, S) {
            var c = function () {
                l.removeEventListener("load", g),
                  l.removeEventListener("error", d);
              },
              g = function (v) {
                c(), f();
              },
              d = function (v) {
                c(), S(v);
              };
            l.addEventListener("load", g), l.addEventListener("error", d);
          }),
          (a.prototype.load = function (l, f, S, c) {
            if (/^node\|/.test(f)) {
              var g = l.getConfig().getOptionsLiteral(),
                d = s(l.getRecorder(), g.nodeRequire || I.global.nodeRequire),
                v = f.split("|"),
                i = null;
              try {
                i = d(v[1]);
              } catch (n) {
                c(n);
                return;
              }
              l.enqueueDefineAnonymousModule([], function () {
                return i;
              }),
                S();
            } else {
              var o = document.createElement("script");
              o.setAttribute("async", "async"),
                o.setAttribute("type", "text/javascript"),
                this.attachListeners(o, S, c);
              var _ = l.getConfig().getOptionsLiteral().trustedTypesPolicy;
              _ && (f = _.createScriptURL(f)), o.setAttribute("src", f);
              var L = l.getConfig().getOptionsLiteral().cspNonce;
              L && o.setAttribute("nonce", L),
                document.getElementsByTagName("head")[0].appendChild(o);
            }
          }),
          a
        );
      })(),
      y = (function () {
        function a() {}
        return (
          (a.prototype.load = function (l, f, S, c) {
            var g = l.getConfig().getOptionsLiteral().trustedTypesPolicy,
              d =
                /^((http:)|(https:)|(file:))/.test(f) &&
                f.substring(0, self.origin.length) !== self.origin;
            if (!d) {
              fetch(f)
                .then(function (v) {
                  if (v.status !== 200) throw new Error(v.statusText);
                  return v.text();
                })
                .then(function (v) {
                  v =
                    v +
                    `
//# sourceURL=` +
                    f;
                  var i = g
                    ? self.eval(g.createScript("", v))
                    : new Function(v);
                  i.call(self), S();
                })
                .then(void 0, c);
              return;
            }
            try {
              g && (f = g.createScriptURL(f)), importScripts(f), S();
            } catch (v) {
              c(v);
            }
          }),
          a
        );
      })(),
      p = (function () {
        function a(l) {
          (this._env = l),
            (this._didInitialize = !1),
            (this._didPatchNodeRequire = !1);
        }
        return (
          (a.prototype._init = function (l) {
            this._didInitialize ||
              ((this._didInitialize = !0),
              (this._fs = l("fs")),
              (this._vm = l("vm")),
              (this._path = l("path")),
              (this._crypto = l("crypto")));
          }),
          (a.prototype._initNodeRequire = function (l, f) {
            var S = f.getConfig().getOptionsLiteral().nodeCachedData;
            if (!S || this._didPatchNodeRequire) return;
            this._didPatchNodeRequire = !0;
            var c = this,
              g = l("module");
            function d(v) {
              var i = v.constructor,
                o = function (L) {
                  try {
                    return v.require(L);
                  } finally {
                  }
                };
              return (
                (o.resolve = function (L, n) {
                  return i._resolveFilename(L, v, !1, n);
                }),
                (o.resolve.paths = function (L) {
                  return i._resolveLookupPaths(L, v);
                }),
                (o.main = process.mainModule),
                (o.extensions = i._extensions),
                (o.cache = i._cache),
                o
              );
            }
            g.prototype._compile = function (v, i) {
              var o = g.wrap(v.replace(/^#!.*/, "")),
                _ = f.getRecorder(),
                L = c._getCachedDataPath(S, i),
                n = { filename: i },
                r;
              try {
                var u = c._fs.readFileSync(L);
                (r = u.slice(0, 16)),
                  (n.cachedData = u.slice(16)),
                  _.record(60, L);
              } catch (P) {
                _.record(61, L);
              }
              var m = new c._vm.Script(o, n),
                C = m.runInThisContext(n),
                b = c._path.dirname(i),
                N = d(this),
                w = [this.exports, N, this, i, b, process, de, Buffer],
                M = C.apply(this.exports, w);
              return (
                c._handleCachedData(m, o, L, !n.cachedData, f),
                c._verifyCachedData(m, o, L, r, f),
                M
              );
            };
          }),
          (a.prototype.load = function (l, f, S, c) {
            var g = this,
              d = l.getConfig().getOptionsLiteral(),
              v = s(l.getRecorder(), d.nodeRequire || I.global.nodeRequire),
              i =
                d.nodeInstrumenter ||
                function (C) {
                  return C;
                };
            this._init(v), this._initNodeRequire(v, l);
            var o = l.getRecorder();
            if (/^node\|/.test(f)) {
              var _ = f.split("|"),
                L = null;
              try {
                L = v(_[1]);
              } catch (C) {
                c(C);
                return;
              }
              l.enqueueDefineAnonymousModule([], function () {
                return L;
              }),
                S();
            } else {
              f = I.Utilities.fileUriToFilePath(this._env.isWindows, f);
              var n = this._path.normalize(f),
                r = this._getElectronRendererScriptPathOrUri(n),
                u = Boolean(d.nodeCachedData),
                m = u ? this._getCachedDataPath(d.nodeCachedData, f) : void 0;
              this._readSourceAndCachedData(n, m, o, function (C, b, N, w) {
                if (C) {
                  c(C);
                  return;
                }
                var M;
                b.charCodeAt(0) === a._BOM
                  ? (M = a._PREFIX + b.substring(1) + a._SUFFIX)
                  : (M = a._PREFIX + b + a._SUFFIX),
                  (M = i(M, n));
                var P = { filename: r, cachedData: N },
                  U = g._createAndEvalScript(l, M, P, S, c);
                g._handleCachedData(U, M, m, u && !N, l),
                  g._verifyCachedData(U, M, m, w, l);
              });
            }
          }),
          (a.prototype._createAndEvalScript = function (l, f, S, c, g) {
            var d = l.getRecorder();
            d.record(31, S.filename);
            var v = new this._vm.Script(f, S),
              i = v.runInThisContext(S),
              o = l.getGlobalAMDDefineFunc(),
              _ = !1,
              L = function () {
                return (_ = !0), o.apply(null, arguments);
              };
            return (
              (L.amd = o.amd),
              i.call(
                I.global,
                l.getGlobalAMDRequireFunc(),
                L,
                S.filename,
                this._path.dirname(S.filename)
              ),
              d.record(32, S.filename),
              _
                ? c()
                : g(
                    new Error(
                      "Didn't receive define call in " + S.filename + "!"
                    )
                  ),
              v
            );
          }),
          (a.prototype._getElectronRendererScriptPathOrUri = function (l) {
            if (!this._env.isElectronRenderer) return l;
            var f = l.match(/^([a-z])\:(.*)/i);
            return f
              ? "file:///" +
                  (f[1].toUpperCase() + ":" + f[2]).replace(/\\/g, "/")
              : "file://" + l;
          }),
          (a.prototype._getCachedDataPath = function (l, f) {
            var S = this._crypto
                .createHash("md5")
                .update(f, "utf8")
                .update(l.seed, "utf8")
                .update(process.arch, "")
                .digest("hex"),
              c = this._path.basename(f).replace(/\.js$/, "");
            return this._path.join(l.path, c + "-" + S + ".code");
          }),
          (a.prototype._handleCachedData = function (l, f, S, c, g) {
            var d = this;
            l.cachedDataRejected
              ? this._fs.unlink(S, function (v) {
                  g.getRecorder().record(62, S),
                    d._createAndWriteCachedData(l, f, S, g),
                    v && g.getConfig().onError(v);
                })
              : c && this._createAndWriteCachedData(l, f, S, g);
          }),
          (a.prototype._createAndWriteCachedData = function (l, f, S, c) {
            var g = this,
              d = Math.ceil(
                c.getConfig().getOptionsLiteral().nodeCachedData.writeDelay *
                  (1 + Math.random())
              ),
              v = -1,
              i = 0,
              o = void 0,
              _ = function () {
                setTimeout(function () {
                  o ||
                    (o = g._crypto
                      .createHash("md5")
                      .update(f, "utf8")
                      .digest());
                  var L = l.createCachedData();
                  if (!(L.length === 0 || L.length === v || i >= 5)) {
                    if (L.length < v) {
                      _();
                      return;
                    }
                    (v = L.length),
                      g._fs.writeFile(S, Buffer.concat([o, L]), function (n) {
                        n && c.getConfig().onError(n),
                          c.getRecorder().record(63, S),
                          _();
                      });
                  }
                }, d * Math.pow(4, i++));
              };
            _();
          }),
          (a.prototype._readSourceAndCachedData = function (l, f, S, c) {
            if (!f) this._fs.readFile(l, { encoding: "utf8" }, c);
            else {
              var g = void 0,
                d = void 0,
                v = void 0,
                i = 2,
                o = function (_) {
                  _ ? c(_) : --i == 0 && c(void 0, g, d, v);
                };
              this._fs.readFile(l, { encoding: "utf8" }, function (_, L) {
                (g = L), o(_);
              }),
                this._fs.readFile(f, function (_, L) {
                  !_ && L && L.length > 0
                    ? ((v = L.slice(0, 16)), (d = L.slice(16)), S.record(60, f))
                    : S.record(61, f),
                    o();
                });
            }
          }),
          (a.prototype._verifyCachedData = function (l, f, S, c, g) {
            var d = this;
            !c ||
              l.cachedDataRejected ||
              setTimeout(function () {
                var v = d._crypto.createHash("md5").update(f, "utf8").digest();
                c.equals(v) ||
                  (g
                    .getConfig()
                    .onError(
                      new Error(
                        "FAILED TO VERIFY CACHED DATA, deleting stale '" +
                          S +
                          "' now, but a RESTART IS REQUIRED"
                      )
                    ),
                  d._fs.unlink(S, function (i) {
                    i && g.getConfig().onError(i);
                  }));
              }, Math.ceil(5e3 * (1 + Math.random())));
          }),
          (a._BOM = 65279),
          (a._PREFIX = "(function (require, define, __filename, __dirname) { "),
          (a._SUFFIX = `
});`),
          a
        );
      })();
    function s(a, l) {
      if (l.__$__isRecorded) return l;
      var f = function (c) {
        a.record(33, c);
        try {
          return l(c);
        } finally {
          a.record(34, c);
        }
      };
      return (f.__$__isRecorded = !0), f;
    }
    I.ensureRecordedNodeRequire = s;
    function h(a) {
      return new t(a);
    }
    I.createScriptLoader = h;
  })(X || (X = {}));
  var X;
  (function (I) {
    var t = (function () {
      function a(l) {
        var f = l.lastIndexOf("/");
        f !== -1
          ? (this.fromModulePath = l.substr(0, f + 1))
          : (this.fromModulePath = "");
      }
      return (
        (a._normalizeModuleId = function (l) {
          var f = l,
            S;
          for (S = /\/\.\//; S.test(f); ) f = f.replace(S, "/");
          for (
            f = f.replace(/^\.\//g, ""),
              S =
                /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
            S.test(f);

          )
            f = f.replace(S, "/");
          return (
            (f = f.replace(
              /^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//,
              ""
            )),
            f
          );
        }),
        (a.prototype.resolveModule = function (l) {
          var f = l;
          return (
            I.Utilities.isAbsolutePath(f) ||
              ((I.Utilities.startsWith(f, "./") ||
                I.Utilities.startsWith(f, "../")) &&
                (f = a._normalizeModuleId(this.fromModulePath + f))),
            f
          );
        }),
        (a.ROOT = new a("")),
        a
      );
    })();
    I.ModuleIdResolver = t;
    var E = (function () {
      function a(l, f, S, c, g, d) {
        (this.id = l),
          (this.strId = f),
          (this.dependencies = S),
          (this._callback = c),
          (this._errorback = g),
          (this.moduleIdResolver = d),
          (this.exports = {}),
          (this.error = null),
          (this.exportsPassedIn = !1),
          (this.unresolvedDependenciesCount = this.dependencies.length),
          (this._isComplete = !1);
      }
      return (
        (a._safeInvokeFunction = function (l, f) {
          try {
            return { returnedValue: l.apply(I.global, f), producedError: null };
          } catch (S) {
            return { returnedValue: null, producedError: S };
          }
        }),
        (a._invokeFactory = function (l, f, S, c) {
          return l.isBuild() && !I.Utilities.isAnonymousModule(f)
            ? { returnedValue: null, producedError: null }
            : l.shouldCatchError()
            ? this._safeInvokeFunction(S, c)
            : { returnedValue: S.apply(I.global, c), producedError: null };
        }),
        (a.prototype.complete = function (l, f, S) {
          this._isComplete = !0;
          var c = null;
          if (this._callback)
            if (typeof this._callback == "function") {
              l.record(21, this.strId);
              var g = a._invokeFactory(f, this.strId, this._callback, S);
              (c = g.producedError),
                l.record(22, this.strId),
                !c &&
                  typeof g.returnedValue != "undefined" &&
                  (!this.exportsPassedIn ||
                    I.Utilities.isEmpty(this.exports)) &&
                  (this.exports = g.returnedValue);
            } else this.exports = this._callback;
          if (c) {
            var d = I.ensureError(c);
            (d.phase = "factory"),
              (d.moduleId = this.strId),
              (this.error = d),
              f.onError(d);
          }
          (this.dependencies = null),
            (this._callback = null),
            (this._errorback = null),
            (this.moduleIdResolver = null);
        }),
        (a.prototype.onDependencyError = function (l) {
          return (
            (this._isComplete = !0),
            (this.error = l),
            this._errorback ? (this._errorback(l), !0) : !1
          );
        }),
        (a.prototype.isComplete = function () {
          return this._isComplete;
        }),
        a
      );
    })();
    I.Module = E;
    var y = (function () {
        function a() {
          (this._nextId = 0),
            (this._strModuleIdToIntModuleId = new Map()),
            (this._intModuleIdToStrModuleId = []),
            this.getModuleId("exports"),
            this.getModuleId("module"),
            this.getModuleId("require");
        }
        return (
          (a.prototype.getMaxModuleId = function () {
            return this._nextId;
          }),
          (a.prototype.getModuleId = function (l) {
            var f = this._strModuleIdToIntModuleId.get(l);
            return (
              typeof f == "undefined" &&
                ((f = this._nextId++),
                this._strModuleIdToIntModuleId.set(l, f),
                (this._intModuleIdToStrModuleId[f] = l)),
              f
            );
          }),
          (a.prototype.getStrModuleId = function (l) {
            return this._intModuleIdToStrModuleId[l];
          }),
          a
        );
      })(),
      p = (function () {
        function a(l) {
          this.id = l;
        }
        return (
          (a.EXPORTS = new a(0)),
          (a.MODULE = new a(1)),
          (a.REQUIRE = new a(2)),
          a
        );
      })();
    I.RegularDependency = p;
    var s = (function () {
      function a(l, f, S) {
        (this.id = l), (this.pluginId = f), (this.pluginParam = S);
      }
      return a;
    })();
    I.PluginDependency = s;
    var h = (function () {
      function a(l, f, S, c, g) {
        g === void 0 && (g = 0),
          (this._env = l),
          (this._scriptLoader = f),
          (this._loaderAvailableTimestamp = g),
          (this._defineFunc = S),
          (this._requireFunc = c),
          (this._moduleIdProvider = new y()),
          (this._config = new I.Configuration(this._env)),
          (this._hasDependencyCycle = !1),
          (this._modules2 = []),
          (this._knownModules2 = []),
          (this._inverseDependencies2 = []),
          (this._inversePluginDependencies2 = new Map()),
          (this._currentAnonymousDefineCall = null),
          (this._recorder = null),
          (this._buildInfoPath = []),
          (this._buildInfoDefineStack = []),
          (this._buildInfoDependencies = []);
      }
      return (
        (a.prototype.reset = function () {
          return new a(
            this._env,
            this._scriptLoader,
            this._defineFunc,
            this._requireFunc,
            this._loaderAvailableTimestamp
          );
        }),
        (a.prototype.getGlobalAMDDefineFunc = function () {
          return this._defineFunc;
        }),
        (a.prototype.getGlobalAMDRequireFunc = function () {
          return this._requireFunc;
        }),
        (a._findRelevantLocationInStack = function (l, f) {
          for (
            var S = function (r) {
                return r.replace(/\\/g, "/");
              },
              c = S(l),
              g = f.split(/\n/),
              d = 0;
            d < g.length;
            d++
          ) {
            var v = g[d].match(/(.*):(\d+):(\d+)\)?$/);
            if (v) {
              var i = v[1],
                o = v[2],
                _ = v[3],
                L = Math.max(i.lastIndexOf(" ") + 1, i.lastIndexOf("(") + 1);
              if (((i = i.substr(L)), (i = S(i)), i === c)) {
                var n = { line: parseInt(o, 10), col: parseInt(_, 10) };
                return (
                  n.line === 1 &&
                    (n.col -=
                      "(function (require, define, __filename, __dirname) { ".length),
                  n
                );
              }
            }
          }
          throw new Error(
            "Could not correlate define call site for needle " + l
          );
        }),
        (a.prototype.getBuildInfo = function () {
          if (!this._config.isBuild()) return null;
          for (
            var l = [], f = 0, S = 0, c = this._modules2.length;
            S < c;
            S++
          ) {
            var g = this._modules2[S];
            if (!!g) {
              var d = this._buildInfoPath[g.id] || null,
                v = this._buildInfoDefineStack[g.id] || null,
                i = this._buildInfoDependencies[g.id];
              l[f++] = {
                id: g.strId,
                path: d,
                defineLocation:
                  d && v ? a._findRelevantLocationInStack(d, v) : null,
                dependencies: i,
                shim: null,
                exports: g.exports,
              };
            }
          }
          return l;
        }),
        (a.prototype.getRecorder = function () {
          return (
            this._recorder ||
              (this._config.shouldRecordStats()
                ? (this._recorder = new I.LoaderEventRecorder(
                    this._loaderAvailableTimestamp
                  ))
                : (this._recorder = I.NullLoaderEventRecorder.INSTANCE)),
            this._recorder
          );
        }),
        (a.prototype.getLoaderEvents = function () {
          return this.getRecorder().getEvents();
        }),
        (a.prototype.enqueueDefineAnonymousModule = function (l, f) {
          if (this._currentAnonymousDefineCall !== null)
            throw new Error(
              "Can only have one anonymous define call per script file"
            );
          var S = null;
          this._config.isBuild() &&
            (S = new Error("StackLocation").stack || null),
            (this._currentAnonymousDefineCall = {
              stack: S,
              dependencies: l,
              callback: f,
            });
        }),
        (a.prototype.defineModule = function (l, f, S, c, g, d) {
          var v = this;
          d === void 0 && (d = new t(l));
          var i = this._moduleIdProvider.getModuleId(l);
          if (this._modules2[i]) {
            this._config.isDuplicateMessageIgnoredFor(l) ||
              console.warn("Duplicate definition of module '" + l + "'");
            return;
          }
          var o = new E(i, l, this._normalizeDependencies(f, d), S, c, d);
          (this._modules2[i] = o),
            this._config.isBuild() &&
              ((this._buildInfoDefineStack[i] = g),
              (this._buildInfoDependencies[i] = (o.dependencies || []).map(
                function (_) {
                  return v._moduleIdProvider.getStrModuleId(_.id);
                }
              ))),
            this._resolve(o);
        }),
        (a.prototype._normalizeDependency = function (l, f) {
          if (l === "exports") return p.EXPORTS;
          if (l === "module") return p.MODULE;
          if (l === "require") return p.REQUIRE;
          var S = l.indexOf("!");
          if (S >= 0) {
            var c = f.resolveModule(l.substr(0, S)),
              g = f.resolveModule(l.substr(S + 1)),
              d = this._moduleIdProvider.getModuleId(c + "!" + g),
              v = this._moduleIdProvider.getModuleId(c);
            return new s(d, v, g);
          }
          return new p(this._moduleIdProvider.getModuleId(f.resolveModule(l)));
        }),
        (a.prototype._normalizeDependencies = function (l, f) {
          for (var S = [], c = 0, g = 0, d = l.length; g < d; g++)
            S[c++] = this._normalizeDependency(l[g], f);
          return S;
        }),
        (a.prototype._relativeRequire = function (l, f, S, c) {
          if (typeof f == "string") return this.synchronousRequire(f, l);
          this.defineModule(
            I.Utilities.generateAnonymousModule(),
            f,
            S,
            c,
            null,
            l
          );
        }),
        (a.prototype.synchronousRequire = function (l, f) {
          f === void 0 && (f = new t(l));
          var S = this._normalizeDependency(l, f),
            c = this._modules2[S.id];
          if (!c)
            throw new Error(
              "Check dependency list! Synchronous require cannot resolve module '" +
                l +
                "'. This is the first mention of this module!"
            );
          if (!c.isComplete())
            throw new Error(
              "Check dependency list! Synchronous require cannot resolve module '" +
                l +
                "'. This module has not been resolved completely yet."
            );
          if (c.error) throw c.error;
          return c.exports;
        }),
        (a.prototype.configure = function (l, f) {
          var S = this._config.shouldRecordStats();
          f
            ? (this._config = new I.Configuration(this._env, l))
            : (this._config = this._config.cloneAndMerge(l)),
            this._config.shouldRecordStats() && !S && (this._recorder = null);
        }),
        (a.prototype.getConfig = function () {
          return this._config;
        }),
        (a.prototype._onLoad = function (l) {
          if (this._currentAnonymousDefineCall !== null) {
            var f = this._currentAnonymousDefineCall;
            (this._currentAnonymousDefineCall = null),
              this.defineModule(
                this._moduleIdProvider.getStrModuleId(l),
                f.dependencies,
                f.callback,
                null,
                f.stack
              );
          }
        }),
        (a.prototype._createLoadError = function (l, f) {
          var S = this,
            c = this._moduleIdProvider.getStrModuleId(l),
            g = (this._inverseDependencies2[l] || []).map(function (v) {
              return S._moduleIdProvider.getStrModuleId(v);
            }),
            d = I.ensureError(f);
          return (d.phase = "loading"), (d.moduleId = c), (d.neededBy = g), d;
        }),
        (a.prototype._onLoadError = function (l, f) {
          var S = this._createLoadError(l, f);
          this._modules2[l] ||
            (this._modules2[l] = new E(
              l,
              this._moduleIdProvider.getStrModuleId(l),
              [],
              function () {},
              function () {},
              null
            ));
          for (
            var c = [], g = 0, d = this._moduleIdProvider.getMaxModuleId();
            g < d;
            g++
          )
            c[g] = !1;
          var v = !1,
            i = [];
          for (i.push(l), c[l] = !0; i.length > 0; ) {
            var o = i.shift(),
              _ = this._modules2[o];
            _ && (v = _.onDependencyError(S) || v);
            var L = this._inverseDependencies2[o];
            if (L)
              for (var g = 0, d = L.length; g < d; g++) {
                var n = L[g];
                c[n] || (i.push(n), (c[n] = !0));
              }
          }
          v || this._config.onError(S);
        }),
        (a.prototype._hasDependencyPath = function (l, f) {
          var S = this._modules2[l];
          if (!S) return !1;
          for (
            var c = [], g = 0, d = this._moduleIdProvider.getMaxModuleId();
            g < d;
            g++
          )
            c[g] = !1;
          var v = [];
          for (v.push(S), c[l] = !0; v.length > 0; ) {
            var i = v.shift(),
              o = i.dependencies;
            if (o)
              for (var g = 0, d = o.length; g < d; g++) {
                var _ = o[g];
                if (_.id === f) return !0;
                var L = this._modules2[_.id];
                L && !c[_.id] && ((c[_.id] = !0), v.push(L));
              }
          }
          return !1;
        }),
        (a.prototype._findCyclePath = function (l, f, S) {
          if (l === f || S === 50) return [l];
          var c = this._modules2[l];
          if (!c) return null;
          var g = c.dependencies;
          if (g)
            for (var d = 0, v = g.length; d < v; d++) {
              var i = this._findCyclePath(g[d].id, f, S + 1);
              if (i !== null) return i.push(l), i;
            }
          return null;
        }),
        (a.prototype._createRequire = function (l) {
          var f = this,
            S = function (c, g, d) {
              return f._relativeRequire(l, c, g, d);
            };
          return (
            (S.toUrl = function (c) {
              return f._config.requireToUrl(l.resolveModule(c));
            }),
            (S.getStats = function () {
              return f.getLoaderEvents();
            }),
            (S.hasDependencyCycle = function () {
              return f._hasDependencyCycle;
            }),
            (S.config = function (c, g) {
              g === void 0 && (g = !1), f.configure(c, g);
            }),
            (S.__$__nodeRequire = I.global.nodeRequire),
            S
          );
        }),
        (a.prototype._loadModule = function (l) {
          var f = this;
          if (!(this._modules2[l] || this._knownModules2[l])) {
            this._knownModules2[l] = !0;
            var S = this._moduleIdProvider.getStrModuleId(l),
              c = this._config.moduleIdToPaths(S),
              g = /^@[^\/]+\/[^\/]+$/;
            this._env.isNode &&
              (S.indexOf("/") === -1 || g.test(S)) &&
              c.push("node|" + S);
            var d = -1,
              v = function (i) {
                if ((d++, d >= c.length)) f._onLoadError(l, i);
                else {
                  var o = c[d],
                    _ = f.getRecorder();
                  if (f._config.isBuild() && o === "empty:") {
                    (f._buildInfoPath[l] = o),
                      f.defineModule(
                        f._moduleIdProvider.getStrModuleId(l),
                        [],
                        null,
                        null,
                        null
                      ),
                      f._onLoad(l);
                    return;
                  }
                  _.record(10, o),
                    f._scriptLoader.load(
                      f,
                      o,
                      function () {
                        f._config.isBuild() && (f._buildInfoPath[l] = o),
                          _.record(11, o),
                          f._onLoad(l);
                      },
                      function (L) {
                        _.record(12, o), v(L);
                      }
                    );
                }
              };
            v(null);
          }
        }),
        (a.prototype._loadPluginDependency = function (l, f) {
          var S = this;
          if (!(this._modules2[f.id] || this._knownModules2[f.id])) {
            this._knownModules2[f.id] = !0;
            var c = function (g) {
              S.defineModule(
                S._moduleIdProvider.getStrModuleId(f.id),
                [],
                g,
                null,
                null
              );
            };
            (c.error = function (g) {
              S._config.onError(S._createLoadError(f.id, g));
            }),
              l.load(
                f.pluginParam,
                this._createRequire(t.ROOT),
                c,
                this._config.getOptionsLiteral()
              );
          }
        }),
        (a.prototype._resolve = function (l) {
          var f = this,
            S = l.dependencies;
          if (S)
            for (var c = 0, g = S.length; c < g; c++) {
              var d = S[c];
              if (d === p.EXPORTS) {
                (l.exportsPassedIn = !0), l.unresolvedDependenciesCount--;
                continue;
              }
              if (d === p.MODULE) {
                l.unresolvedDependenciesCount--;
                continue;
              }
              if (d === p.REQUIRE) {
                l.unresolvedDependenciesCount--;
                continue;
              }
              var v = this._modules2[d.id];
              if (v && v.isComplete()) {
                if (v.error) {
                  l.onDependencyError(v.error);
                  return;
                }
                l.unresolvedDependenciesCount--;
                continue;
              }
              if (this._hasDependencyPath(d.id, l.id)) {
                (this._hasDependencyCycle = !0),
                  console.warn(
                    "There is a dependency cycle between '" +
                      this._moduleIdProvider.getStrModuleId(d.id) +
                      "' and '" +
                      this._moduleIdProvider.getStrModuleId(l.id) +
                      "'. The cyclic path follows:"
                  );
                var i = this._findCyclePath(d.id, l.id, 0) || [];
                i.reverse(),
                  i.push(d.id),
                  console.warn(
                    i.map(function (L) {
                      return f._moduleIdProvider.getStrModuleId(L);
                    }).join(` => 
`)
                  ),
                  l.unresolvedDependenciesCount--;
                continue;
              }
              if (
                ((this._inverseDependencies2[d.id] =
                  this._inverseDependencies2[d.id] || []),
                this._inverseDependencies2[d.id].push(l.id),
                d instanceof s)
              ) {
                var o = this._modules2[d.pluginId];
                if (o && o.isComplete()) {
                  this._loadPluginDependency(o.exports, d);
                  continue;
                }
                var _ = this._inversePluginDependencies2.get(d.pluginId);
                _ ||
                  ((_ = []),
                  this._inversePluginDependencies2.set(d.pluginId, _)),
                  _.push(d),
                  this._loadModule(d.pluginId);
                continue;
              }
              this._loadModule(d.id);
            }
          l.unresolvedDependenciesCount === 0 && this._onModuleComplete(l);
        }),
        (a.prototype._onModuleComplete = function (l) {
          var f = this,
            S = this.getRecorder();
          if (!l.isComplete()) {
            var c = l.dependencies,
              g = [];
            if (c)
              for (var d = 0, v = c.length; d < v; d++) {
                var i = c[d];
                if (i === p.EXPORTS) {
                  g[d] = l.exports;
                  continue;
                }
                if (i === p.MODULE) {
                  g[d] = {
                    id: l.strId,
                    config: function () {
                      return f._config.getConfigForModule(l.strId);
                    },
                  };
                  continue;
                }
                if (i === p.REQUIRE) {
                  g[d] = this._createRequire(l.moduleIdResolver);
                  continue;
                }
                var o = this._modules2[i.id];
                if (o) {
                  g[d] = o.exports;
                  continue;
                }
                g[d] = null;
              }
            l.complete(S, this._config, g);
            var _ = this._inverseDependencies2[l.id];
            if (((this._inverseDependencies2[l.id] = null), _))
              for (var d = 0, v = _.length; d < v; d++) {
                var L = _[d],
                  n = this._modules2[L];
                n.unresolvedDependenciesCount--,
                  n.unresolvedDependenciesCount === 0 &&
                    this._onModuleComplete(n);
              }
            var r = this._inversePluginDependencies2.get(l.id);
            if (r) {
              this._inversePluginDependencies2.delete(l.id);
              for (var d = 0, v = r.length; d < v; d++)
                this._loadPluginDependency(l.exports, r[d]);
            }
          }
        }),
        a
      );
    })();
    I.ModuleManager = h;
  })(X || (X = {}));
  var $, X;
  (function (I) {
    var t = new I.Environment(),
      E = null,
      y = function (a, l, f) {
        typeof a != "string" && ((f = l), (l = a), (a = null)),
          (typeof l != "object" || !Array.isArray(l)) && ((f = l), (l = null)),
          l || (l = ["require", "exports", "module"]),
          a
            ? E.defineModule(a, l, f, null, null)
            : E.enqueueDefineAnonymousModule(l, f);
      };
    y.amd = { jQuery: !0 };
    var p = function (a, l) {
        l === void 0 && (l = !1), E.configure(a, l);
      },
      s = function () {
        if (arguments.length === 1) {
          if (arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
            p(arguments[0]);
            return;
          }
          if (typeof arguments[0] == "string")
            return E.synchronousRequire(arguments[0]);
        }
        if (
          (arguments.length === 2 || arguments.length === 3) &&
          Array.isArray(arguments[0])
        ) {
          E.defineModule(
            I.Utilities.generateAnonymousModule(),
            arguments[0],
            arguments[1],
            arguments[2],
            null
          );
          return;
        }
        throw new Error("Unrecognized require call");
      };
    (s.config = p),
      (s.getConfig = function () {
        return E.getConfig().getOptionsLiteral();
      }),
      (s.reset = function () {
        E = E.reset();
      }),
      (s.getBuildInfo = function () {
        return E.getBuildInfo();
      }),
      (s.getStats = function () {
        return E.getLoaderEvents();
      }),
      (s.define = function () {
        return y.apply(null, arguments);
      });
    function h() {
      if (
        typeof I.global.require != "undefined" ||
        typeof require != "undefined"
      ) {
        var a = I.global.require || require;
        if (typeof a == "function" && typeof a.resolve == "function") {
          var l = I.ensureRecordedNodeRequire(E.getRecorder(), a);
          (I.global.nodeRequire = l),
            (s.nodeRequire = l),
            (s.__$__nodeRequire = l);
        }
      }
      t.isNode && !t.isElectronRenderer
        ? ((module.exports = s), (require = s))
        : (t.isElectronRenderer || (I.global.define = y),
          (I.global.require = s));
    }
    (I.init = h),
      (typeof I.global.define != "function" || !I.global.define.amd) &&
        ((E = new I.ModuleManager(
          t,
          I.createScriptLoader(t),
          y,
          s,
          I.Utilities.getHighPerformanceTimestamp()
        )),
        typeof I.global.require != "undefined" &&
          typeof I.global.require != "function" &&
          s.config(I.global.require),
        ($ = function () {
          return y.apply(null, arguments);
        }),
        ($.amd = y.amd),
        typeof doNotInitLoader == "undefined" && h());
  })(X || (X = {})),
    $(z[14], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DiffChange = void 0);
      class E {
        constructor(p, s, h, a) {
          (this.originalStart = p),
            (this.originalLength = s),
            (this.modifiedStart = h),
            (this.modifiedLength = a);
        }
        getOriginalEnd() {
          return this.originalStart + this.originalLength;
        }
        getModifiedEnd() {
          return this.modifiedStart + this.modifiedLength;
        }
      }
      t.DiffChange = E;
    }),
    $(z[4], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.NotSupportedError =
          t.illegalState =
          t.illegalArgument =
          t.canceled =
          t.isPromiseCanceledError =
          t.transformErrorForSerialization =
          t.onUnexpectedExternalError =
          t.onUnexpectedError =
          t.errorHandler =
          t.ErrorHandler =
            void 0);
      class E {
        constructor() {
          (this.listeners = []),
            (this.unexpectedErrorHandler = function (d) {
              setTimeout(() => {
                throw d.stack
                  ? new Error(
                      d.message +
                        `

` +
                        d.stack
                    )
                  : d;
              }, 0);
            });
        }
        emit(d) {
          this.listeners.forEach((v) => {
            v(d);
          });
        }
        onUnexpectedError(d) {
          this.unexpectedErrorHandler(d), this.emit(d);
        }
        onUnexpectedExternalError(d) {
          this.unexpectedErrorHandler(d);
        }
      }
      (t.ErrorHandler = E), (t.errorHandler = new E());
      function y(g) {
        a(g) || t.errorHandler.onUnexpectedError(g);
      }
      t.onUnexpectedError = y;
      function p(g) {
        a(g) || t.errorHandler.onUnexpectedExternalError(g);
      }
      t.onUnexpectedExternalError = p;
      function s(g) {
        if (g instanceof Error) {
          let { name: d, message: v } = g;
          const i = g.stacktrace || g.stack;
          return { $isError: !0, name: d, message: v, stack: i };
        }
        return g;
      }
      t.transformErrorForSerialization = s;
      const h = "Canceled";
      function a(g) {
        return g instanceof Error && g.name === h && g.message === h;
      }
      t.isPromiseCanceledError = a;
      function l() {
        const g = new Error(h);
        return (g.name = g.message), g;
      }
      t.canceled = l;
      function f(g) {
        return g
          ? new Error(`Illegal argument: ${g}`)
          : new Error("Illegal argument");
      }
      t.illegalArgument = f;
      function S(g) {
        return g
          ? new Error(`Illegal state: ${g}`)
          : new Error("Illegal state");
      }
      t.illegalState = S;
      class c extends Error {
        constructor(d) {
          super("NotSupported");
          d && (this.message = d);
        }
      }
      t.NotSupportedError = c;
    }),
    $(z[15], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }), (t.once = void 0);
      function E(y) {
        const p = this;
        let s = !1,
          h;
        return function () {
          return s || ((s = !0), (h = y.apply(p, arguments))), h;
        };
      }
      t.once = E;
    }),
    $(z[16], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Iterable = void 0);
      var E;
      (function (y) {
        function p(u) {
          return (
            u && typeof u == "object" && typeof u[Symbol.iterator] == "function"
          );
        }
        y.is = p;
        const s = Object.freeze([]);
        function h() {
          return s;
        }
        y.empty = h;
        function* a(u) {
          yield u;
        }
        y.single = a;
        function l(u) {
          return u || s;
        }
        y.from = l;
        function f(u) {
          return !u || u[Symbol.iterator]().next().done === !0;
        }
        y.isEmpty = f;
        function S(u) {
          return u[Symbol.iterator]().next().value;
        }
        y.first = S;
        function c(u, m) {
          for (const C of u) if (m(C)) return !0;
          return !1;
        }
        y.some = c;
        function g(u, m) {
          for (const C of u) if (m(C)) return C;
        }
        y.find = g;
        function* d(u, m) {
          for (const C of u) m(C) && (yield C);
        }
        y.filter = d;
        function* v(u, m) {
          let C = 0;
          for (const b of u) yield m(b, C++);
        }
        y.map = v;
        function* i(...u) {
          for (const m of u) for (const C of m) yield C;
        }
        y.concat = i;
        function* o(u) {
          for (const m of u) for (const C of m) yield C;
        }
        y.concatNested = o;
        function _(u, m, C) {
          let b = C;
          for (const N of u) b = m(b, N);
          return b;
        }
        y.reduce = _;
        function* L(u, m, C = u.length) {
          for (
            m < 0 && (m += u.length),
              C < 0 ? (C += u.length) : C > u.length && (C = u.length);
            m < C;
            m++
          )
            yield u[m];
        }
        y.slice = L;
        function n(u, m = Number.POSITIVE_INFINITY) {
          const C = [];
          if (m === 0) return [C, u];
          const b = u[Symbol.iterator]();
          for (let N = 0; N < m; N++) {
            const w = b.next();
            if (w.done) return [C, y.empty()];
            C.push(w.value);
          }
          return [
            C,
            {
              [Symbol.iterator]() {
                return b;
              },
            },
          ];
        }
        y.consume = n;
        function r(u, m, C = (b, N) => b === N) {
          const b = u[Symbol.iterator](),
            N = m[Symbol.iterator]();
          for (;;) {
            const w = b.next(),
              M = N.next();
            if (w.done !== M.done) return !1;
            if (w.done) return !0;
            if (!C(w.value, M.value)) return !1;
          }
        }
        y.equals = r;
      })((E = t.Iterable || (t.Iterable = {})));
    }),
    $(z[17], V([0, 1, 4]), function (I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ResolvedKeybinding =
          t.ResolvedKeybindingPart =
          t.ChordKeybinding =
          t.SimpleKeybinding =
          t.createSimpleKeybinding =
          t.createKeybinding =
          t.KeyChord =
          t.KeyCodeUtils =
            void 0);
      class y {
        constructor() {
          (this._keyCodeToStr = []), (this._strToKeyCode = Object.create(null));
        }
        define(o, _) {
          (this._keyCodeToStr[o] = _),
            (this._strToKeyCode[_.toLowerCase()] = o);
        }
        keyCodeToStr(o) {
          return this._keyCodeToStr[o];
        }
        strToKeyCode(o) {
          return this._strToKeyCode[o.toLowerCase()] || 0;
        }
      }
      const p = new y(),
        s = new y(),
        h = new y();
      (function () {
        function i(o, _, L = _, n = L) {
          p.define(o, _), s.define(o, L), h.define(o, n);
        }
        i(0, "unknown"),
          i(1, "Backspace"),
          i(2, "Tab"),
          i(3, "Enter"),
          i(4, "Shift"),
          i(5, "Ctrl"),
          i(6, "Alt"),
          i(7, "PauseBreak"),
          i(8, "CapsLock"),
          i(9, "Escape"),
          i(10, "Space"),
          i(11, "PageUp"),
          i(12, "PageDown"),
          i(13, "End"),
          i(14, "Home"),
          i(15, "LeftArrow", "Left"),
          i(16, "UpArrow", "Up"),
          i(17, "RightArrow", "Right"),
          i(18, "DownArrow", "Down"),
          i(19, "Insert"),
          i(20, "Delete"),
          i(21, "0"),
          i(22, "1"),
          i(23, "2"),
          i(24, "3"),
          i(25, "4"),
          i(26, "5"),
          i(27, "6"),
          i(28, "7"),
          i(29, "8"),
          i(30, "9"),
          i(31, "A"),
          i(32, "B"),
          i(33, "C"),
          i(34, "D"),
          i(35, "E"),
          i(36, "F"),
          i(37, "G"),
          i(38, "H"),
          i(39, "I"),
          i(40, "J"),
          i(41, "K"),
          i(42, "L"),
          i(43, "M"),
          i(44, "N"),
          i(45, "O"),
          i(46, "P"),
          i(47, "Q"),
          i(48, "R"),
          i(49, "S"),
          i(50, "T"),
          i(51, "U"),
          i(52, "V"),
          i(53, "W"),
          i(54, "X"),
          i(55, "Y"),
          i(56, "Z"),
          i(57, "Meta"),
          i(58, "ContextMenu"),
          i(59, "F1"),
          i(60, "F2"),
          i(61, "F3"),
          i(62, "F4"),
          i(63, "F5"),
          i(64, "F6"),
          i(65, "F7"),
          i(66, "F8"),
          i(67, "F9"),
          i(68, "F10"),
          i(69, "F11"),
          i(70, "F12"),
          i(71, "F13"),
          i(72, "F14"),
          i(73, "F15"),
          i(74, "F16"),
          i(75, "F17"),
          i(76, "F18"),
          i(77, "F19"),
          i(78, "NumLock"),
          i(79, "ScrollLock"),
          i(80, ";", ";", "OEM_1"),
          i(81, "=", "=", "OEM_PLUS"),
          i(82, ",", ",", "OEM_COMMA"),
          i(83, "-", "-", "OEM_MINUS"),
          i(84, ".", ".", "OEM_PERIOD"),
          i(85, "/", "/", "OEM_2"),
          i(86, "`", "`", "OEM_3"),
          i(110, "ABNT_C1"),
          i(111, "ABNT_C2"),
          i(87, "[", "[", "OEM_4"),
          i(88, "\\", "\\", "OEM_5"),
          i(89, "]", "]", "OEM_6"),
          i(90, "'", "'", "OEM_7"),
          i(91, "OEM_8"),
          i(92, "OEM_102"),
          i(93, "NumPad0"),
          i(94, "NumPad1"),
          i(95, "NumPad2"),
          i(96, "NumPad3"),
          i(97, "NumPad4"),
          i(98, "NumPad5"),
          i(99, "NumPad6"),
          i(100, "NumPad7"),
          i(101, "NumPad8"),
          i(102, "NumPad9"),
          i(103, "NumPad_Multiply"),
          i(104, "NumPad_Add"),
          i(105, "NumPad_Separator"),
          i(106, "NumPad_Subtract"),
          i(107, "NumPad_Decimal"),
          i(108, "NumPad_Divide");
      })();
      var a;
      (function (i) {
        function o(u) {
          return p.keyCodeToStr(u);
        }
        i.toString = o;
        function _(u) {
          return p.strToKeyCode(u);
        }
        i.fromString = _;
        function L(u) {
          return s.keyCodeToStr(u);
        }
        i.toUserSettingsUS = L;
        function n(u) {
          return h.keyCodeToStr(u);
        }
        i.toUserSettingsGeneral = n;
        function r(u) {
          return s.strToKeyCode(u) || h.strToKeyCode(u);
        }
        i.fromUserSettings = r;
      })((a = t.KeyCodeUtils || (t.KeyCodeUtils = {})));
      function l(i, o) {
        const _ = ((o & 65535) << 16) >>> 0;
        return (i | _) >>> 0;
      }
      t.KeyChord = l;
      function f(i, o) {
        if (i === 0) return null;
        const _ = (i & 65535) >>> 0,
          L = (i & 4294901760) >>> 16;
        return L !== 0 ? new g([S(_, o), S(L, o)]) : new g([S(_, o)]);
      }
      t.createKeybinding = f;
      function S(i, o) {
        const _ = !!(i & 2048),
          L = !!(i & 256),
          n = o === 2 ? L : _,
          r = !!(i & 1024),
          u = !!(i & 512),
          m = o === 2 ? _ : L,
          C = i & 255;
        return new c(n, r, u, m, C);
      }
      t.createSimpleKeybinding = S;
      class c {
        constructor(o, _, L, n, r) {
          (this.ctrlKey = o),
            (this.shiftKey = _),
            (this.altKey = L),
            (this.metaKey = n),
            (this.keyCode = r);
        }
        equals(o) {
          return (
            this.ctrlKey === o.ctrlKey &&
            this.shiftKey === o.shiftKey &&
            this.altKey === o.altKey &&
            this.metaKey === o.metaKey &&
            this.keyCode === o.keyCode
          );
        }
        isModifierKey() {
          return (
            this.keyCode === 0 ||
            this.keyCode === 5 ||
            this.keyCode === 57 ||
            this.keyCode === 6 ||
            this.keyCode === 4
          );
        }
        toChord() {
          return new g([this]);
        }
        isDuplicateModifierCase() {
          return (
            (this.ctrlKey && this.keyCode === 5) ||
            (this.shiftKey && this.keyCode === 4) ||
            (this.altKey && this.keyCode === 6) ||
            (this.metaKey && this.keyCode === 57)
          );
        }
      }
      t.SimpleKeybinding = c;
      class g {
        constructor(o) {
          if (o.length === 0) throw (0, E.illegalArgument)("parts");
          this.parts = o;
        }
      }
      t.ChordKeybinding = g;
      class d {
        constructor(o, _, L, n, r, u) {
          (this.ctrlKey = o),
            (this.shiftKey = _),
            (this.altKey = L),
            (this.metaKey = n),
            (this.keyLabel = r),
            (this.keyAriaLabel = u);
        }
      }
      t.ResolvedKeybindingPart = d;
      class v {}
      t.ResolvedKeybinding = v;
    }),
    $(z[7], V([0, 1, 15, 16]), function (I, t, E, y) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ImmortalReference =
          t.MutableDisposable =
          t.Disposable =
          t.DisposableStore =
          t.toDisposable =
          t.combinedDisposable =
          t.dispose =
          t.isDisposable =
          t.MultiDisposeError =
          t.markAsSingleton =
          t.setDisposableTracker =
            void 0);
      const p = !1;
      let s = null;
      function h(u) {
        s = u;
      }
      if (((t.setDisposableTracker = h), p)) {
        const u = "__is_disposable_tracked__";
        h(
          new (class {
            trackDisposable(m) {
              const C = new Error("Potentially leaked disposable").stack;
              setTimeout(() => {
                m[u] || console.log(C);
              }, 3e3);
            }
            setParent(m, C) {
              if (m && m !== L.None)
                try {
                  m[u] = !0;
                } catch (b) {}
            }
            markAsDisposed(m) {
              if (m && m !== L.None)
                try {
                  m[u] = !0;
                } catch (C) {}
            }
            markAsSingleton(m) {}
          })()
        );
      }
      function a(u) {
        return s == null || s.trackDisposable(u), u;
      }
      function l(u) {
        s == null || s.markAsDisposed(u);
      }
      function f(u, m) {
        s == null || s.setParent(u, m);
      }
      function S(u, m) {
        if (!!s) for (const C of u) s.setParent(C, m);
      }
      function c(u) {
        return s == null || s.markAsSingleton(u), u;
      }
      t.markAsSingleton = c;
      class g extends Error {
        constructor(m) {
          super(
            `Encountered errors while disposing of store. Errors: [${m.join(
              ", "
            )}]`
          );
          this.errors = m;
        }
      }
      t.MultiDisposeError = g;
      function d(u) {
        return typeof u.dispose == "function" && u.dispose.length === 0;
      }
      t.isDisposable = d;
      function v(u) {
        if (y.Iterable.is(u)) {
          let m = [];
          for (const C of u)
            if (C)
              try {
                C.dispose();
              } catch (b) {
                m.push(b);
              }
          if (m.length === 1) throw m[0];
          if (m.length > 1) throw new g(m);
          return Array.isArray(u) ? [] : u;
        } else if (u) return u.dispose(), u;
      }
      t.dispose = v;
      function i(...u) {
        const m = o(() => v(u));
        return S(u, m), m;
      }
      t.combinedDisposable = i;
      function o(u) {
        const m = a({
          dispose: (0, E.once)(() => {
            l(m), u();
          }),
        });
        return m;
      }
      t.toDisposable = o;
      class _ {
        constructor() {
          (this._toDispose = new Set()), (this._isDisposed = !1), a(this);
        }
        dispose() {
          this._isDisposed || (l(this), (this._isDisposed = !0), this.clear());
        }
        clear() {
          try {
            v(this._toDispose.values());
          } finally {
            this._toDispose.clear();
          }
        }
        add(m) {
          if (!m) return m;
          if (m === this)
            throw new Error("Cannot register a disposable on itself!");
          return (
            f(m, this),
            this._isDisposed
              ? _.DISABLE_DISPOSED_WARNING ||
                console.warn(
                  new Error(
                    "Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!"
                  ).stack
                )
              : this._toDispose.add(m),
            m
          );
        }
      }
      (t.DisposableStore = _), (_.DISABLE_DISPOSED_WARNING = !1);
      class L {
        constructor() {
          (this._store = new _()), a(this), f(this._store, this);
        }
        dispose() {
          l(this), this._store.dispose();
        }
        _register(m) {
          if (m === this)
            throw new Error("Cannot register a disposable on itself!");
          return this._store.add(m);
        }
      }
      (t.Disposable = L), (L.None = Object.freeze({ dispose() {} }));
      class n {
        constructor() {
          (this._isDisposed = !1), a(this);
        }
        get value() {
          return this._isDisposed ? void 0 : this._value;
        }
        set value(m) {
          var C;
          this._isDisposed ||
            m === this._value ||
            ((C = this._value) === null || C === void 0 || C.dispose(),
            m && f(m, this),
            (this._value = m));
        }
        clear() {
          this.value = void 0;
        }
        dispose() {
          var m;
          (this._isDisposed = !0),
            l(this),
            (m = this._value) === null || m === void 0 || m.dispose(),
            (this._value = void 0);
        }
        clearAndLeak() {
          const m = this._value;
          return (this._value = void 0), m && f(m, null), m;
        }
      }
      t.MutableDisposable = n;
      class r {
        constructor(m) {
          this.object = m;
        }
        dispose() {}
      }
      t.ImmortalReference = r;
    }),
    $(z[18], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LinkedList = void 0);
      class E {
        constructor(s) {
          (this.element = s),
            (this.next = E.Undefined),
            (this.prev = E.Undefined);
        }
      }
      E.Undefined = new E(void 0);
      class y {
        constructor() {
          (this._first = E.Undefined),
            (this._last = E.Undefined),
            (this._size = 0);
        }
        get size() {
          return this._size;
        }
        isEmpty() {
          return this._first === E.Undefined;
        }
        clear() {
          let s = this._first;
          for (; s !== E.Undefined; ) {
            const h = s.next;
            (s.prev = E.Undefined), (s.next = E.Undefined), (s = h);
          }
          (this._first = E.Undefined),
            (this._last = E.Undefined),
            (this._size = 0);
        }
        unshift(s) {
          return this._insert(s, !1);
        }
        push(s) {
          return this._insert(s, !0);
        }
        _insert(s, h) {
          const a = new E(s);
          if (this._first === E.Undefined) (this._first = a), (this._last = a);
          else if (h) {
            const f = this._last;
            (this._last = a), (a.prev = f), (f.next = a);
          } else {
            const f = this._first;
            (this._first = a), (a.next = f), (f.prev = a);
          }
          this._size += 1;
          let l = !1;
          return () => {
            l || ((l = !0), this._remove(a));
          };
        }
        shift() {
          if (this._first !== E.Undefined) {
            const s = this._first.element;
            return this._remove(this._first), s;
          }
        }
        pop() {
          if (this._last !== E.Undefined) {
            const s = this._last.element;
            return this._remove(this._last), s;
          }
        }
        _remove(s) {
          if (s.prev !== E.Undefined && s.next !== E.Undefined) {
            const h = s.prev;
            (h.next = s.next), (s.next.prev = h);
          } else s.prev === E.Undefined && s.next === E.Undefined ? ((this._first = E.Undefined), (this._last = E.Undefined)) : s.next === E.Undefined ? ((this._last = this._last.prev), (this._last.next = E.Undefined)) : s.prev === E.Undefined && ((this._first = this._first.next), (this._first.prev = E.Undefined));
          this._size -= 1;
        }
        *[Symbol.iterator]() {
          let s = this._first;
          for (; s !== E.Undefined; ) yield s.element, (s = s.next);
        }
      }
      t.LinkedList = y;
    }),
    $(z[2], V([0, 1]), function (I, t) {
      "use strict";
      var E;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.isLittleEndian =
          t.OS =
          t.setImmediate =
          t.userAgent =
          t.isIOS =
          t.isWeb =
          t.isNative =
          t.isLinux =
          t.isMacintosh =
          t.isWindows =
          t.globals =
            void 0);
      const y = "en";
      let p = !1,
        s = !1,
        h = !1,
        a = !1,
        l = !1,
        f = !1,
        S = !1,
        c,
        g = y,
        d,
        v;
      t.globals =
        typeof self == "object"
          ? self
          : typeof global == "object"
          ? global
          : {};
      let i;
      typeof t.globals.vscode != "undefined" &&
      typeof t.globals.vscode.process != "undefined"
        ? (i = t.globals.vscode.process)
        : typeof process != "undefined" && (i = process);
      const o =
        typeof ((E = i == null ? void 0 : i.versions) === null || E === void 0
          ? void 0
          : E.electron) == "string" && i.type === "renderer";
      if (typeof navigator == "object" && !o)
        (v = navigator.userAgent),
          (p = v.indexOf("Windows") >= 0),
          (s = v.indexOf("Macintosh") >= 0),
          (S =
            (v.indexOf("Macintosh") >= 0 ||
              v.indexOf("iPad") >= 0 ||
              v.indexOf("iPhone") >= 0) &&
            !!navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 0),
          (h = v.indexOf("Linux") >= 0),
          (f = !0),
          (c = navigator.language),
          (g = c);
      else if (typeof i == "object") {
        (p = i.platform === "win32"),
          (s = i.platform === "darwin"),
          (h = i.platform === "linux"),
          (a = h && !!i.env.SNAP && !!i.env.SNAP_REVISION),
          (c = y),
          (g = y);
        const u = i.env.VSCODE_NLS_CONFIG;
        if (u)
          try {
            const m = JSON.parse(u),
              C = m.availableLanguages["*"];
            (c = m.locale), (g = C || y), (d = m._translationsConfigFile);
          } catch (m) {}
        l = !0;
      } else console.error("Unable to resolve platform.");
      let _ = 0;
      s ? (_ = 1) : p ? (_ = 3) : h && (_ = 2),
        (t.isWindows = p),
        (t.isMacintosh = s),
        (t.isLinux = h),
        (t.isNative = l),
        (t.isWeb = f),
        (t.isIOS = S),
        (t.userAgent = v),
        (t.setImmediate = (function () {
          if (t.globals.setImmediate)
            return t.globals.setImmediate.bind(t.globals);
          if (
            typeof t.globals.postMessage == "function" &&
            !t.globals.importScripts
          ) {
            let C = [];
            t.globals.addEventListener("message", (N) => {
              if (N.data && N.data.vscodeSetImmediateId)
                for (let w = 0, M = C.length; w < M; w++) {
                  const P = C[w];
                  if (P.id === N.data.vscodeSetImmediateId) {
                    C.splice(w, 1), P.callback();
                    return;
                  }
                }
            });
            let b = 0;
            return (N) => {
              const w = ++b;
              C.push({ id: w, callback: N }),
                t.globals.postMessage({ vscodeSetImmediateId: w }, "*");
            };
          }
          if (typeof (i == null ? void 0 : i.nextTick) == "function")
            return i.nextTick.bind(i);
          const m = Promise.resolve();
          return (C) => m.then(C);
        })()),
        (t.OS = s || S ? 2 : p ? 1 : 3);
      let L = !0,
        n = !1;
      function r() {
        if (!n) {
          n = !0;
          const u = new Uint8Array(2);
          (u[0] = 1),
            (u[1] = 2),
            (L = new Uint16Array(u.buffer)[0] === (2 << 8) + 1);
        }
        return L;
      }
      t.isLittleEndian = r;
    }),
    $(z[19], V([0, 1, 2]), function (I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.platform = t.env = t.cwd = void 0);
      let y;
      if (
        typeof E.globals.vscode != "undefined" &&
        typeof E.globals.vscode.process != "undefined"
      ) {
        const p = E.globals.vscode.process;
        y = {
          get platform() {
            return p.platform;
          },
          get arch() {
            return p.arch;
          },
          get env() {
            return p.env;
          },
          cwd() {
            return p.cwd();
          },
          nextTick(s) {
            return (0, E.setImmediate)(s);
          },
        };
      } else
        typeof process != "undefined"
          ? (y = {
              get platform() {
                return process.platform;
              },
              get arch() {
                return process.arch;
              },
              get env() {
                return process.env;
              },
              cwd() {
                return process.env.VSCODE_CWD || process.cwd();
              },
              nextTick(p) {
                return process.nextTick(p);
              },
            })
          : (y = {
              get platform() {
                return E.isWindows
                  ? "win32"
                  : E.isMacintosh
                  ? "darwin"
                  : "linux";
              },
              get arch() {},
              nextTick(p) {
                return (0, E.setImmediate)(p);
              },
              get env() {
                return {};
              },
              cwd() {
                return "/";
              },
            });
      (t.cwd = y.cwd), (t.env = y.env), (t.platform = y.platform);
    }),
    $(z[20], V([0, 1, 19]), function (I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.sep =
          t.extname =
          t.basename =
          t.dirname =
          t.relative =
          t.resolve =
          t.normalize =
          t.posix =
          t.win32 =
            void 0);
      const y = 65,
        p = 97,
        s = 90,
        h = 122,
        a = 46,
        l = 47,
        f = 92,
        S = 58,
        c = 63;
      class g extends Error {
        constructor(r, u, m) {
          let C;
          typeof u == "string" && u.indexOf("not ") === 0
            ? ((C = "must not be"), (u = u.replace(/^not /, "")))
            : (C = "must be");
          const b = r.indexOf(".") !== -1 ? "property" : "argument";
          let N = `The "${r}" ${b} ${C} of type ${u}`;
          (N += `. Received type ${typeof m}`),
            super(N),
            (this.code = "ERR_INVALID_ARG_TYPE");
        }
      }
      function d(n, r) {
        if (typeof n != "string") throw new g(r, "string", n);
      }
      function v(n) {
        return n === l || n === f;
      }
      function i(n) {
        return n === l;
      }
      function o(n) {
        return (n >= y && n <= s) || (n >= p && n <= h);
      }
      function _(n, r, u, m) {
        let C = "",
          b = 0,
          N = -1,
          w = 0,
          M = 0;
        for (let P = 0; P <= n.length; ++P) {
          if (P < n.length) M = n.charCodeAt(P);
          else {
            if (m(M)) break;
            M = l;
          }
          if (m(M)) {
            if (!(N === P - 1 || w === 1))
              if (w === 2) {
                if (
                  C.length < 2 ||
                  b !== 2 ||
                  C.charCodeAt(C.length - 1) !== a ||
                  C.charCodeAt(C.length - 2) !== a
                ) {
                  if (C.length > 2) {
                    const U = C.lastIndexOf(u);
                    U === -1
                      ? ((C = ""), (b = 0))
                      : ((C = C.slice(0, U)),
                        (b = C.length - 1 - C.lastIndexOf(u))),
                      (N = P),
                      (w = 0);
                    continue;
                  } else if (C.length !== 0) {
                    (C = ""), (b = 0), (N = P), (w = 0);
                    continue;
                  }
                }
                r && ((C += C.length > 0 ? `${u}..` : ".."), (b = 2));
              } else
                C.length > 0
                  ? (C += `${u}${n.slice(N + 1, P)}`)
                  : (C = n.slice(N + 1, P)),
                  (b = P - N - 1);
            (N = P), (w = 0);
          } else M === a && w !== -1 ? ++w : (w = -1);
        }
        return C;
      }
      function L(n, r) {
        if (r === null || typeof r != "object")
          throw new g("pathObject", "Object", r);
        const u = r.dir || r.root,
          m = r.base || `${r.name || ""}${r.ext || ""}`;
        return u ? (u === r.root ? `${u}${m}` : `${u}${n}${m}`) : m;
      }
      (t.win32 = {
        resolve(...n) {
          let r = "",
            u = "",
            m = !1;
          for (let C = n.length - 1; C >= -1; C--) {
            let b;
            if (C >= 0) {
              if (((b = n[C]), d(b, "path"), b.length === 0)) continue;
            } else
              r.length === 0
                ? (b = E.cwd())
                : ((b = E.env[`=${r}`] || E.cwd()),
                  (b === void 0 ||
                    (b.slice(0, 2).toLowerCase() !== r.toLowerCase() &&
                      b.charCodeAt(2) === f)) &&
                    (b = `${r}\\`));
            const N = b.length;
            let w = 0,
              M = "",
              P = !1;
            const U = b.charCodeAt(0);
            if (N === 1) v(U) && ((w = 1), (P = !0));
            else if (v(U))
              if (((P = !0), v(b.charCodeAt(1)))) {
                let R = 2,
                  W = R;
                for (; R < N && !v(b.charCodeAt(R)); ) R++;
                if (R < N && R !== W) {
                  const Y = b.slice(W, R);
                  for (W = R; R < N && v(b.charCodeAt(R)); ) R++;
                  if (R < N && R !== W) {
                    for (W = R; R < N && !v(b.charCodeAt(R)); ) R++;
                    (R === N || R !== W) &&
                      ((M = `\\\\${Y}\\${b.slice(W, R)}`), (w = R));
                  }
                }
              } else w = 1;
            else
              o(U) &&
                b.charCodeAt(1) === S &&
                ((M = b.slice(0, 2)),
                (w = 2),
                N > 2 && v(b.charCodeAt(2)) && ((P = !0), (w = 3)));
            if (M.length > 0)
              if (r.length > 0) {
                if (M.toLowerCase() !== r.toLowerCase()) continue;
              } else r = M;
            if (m) {
              if (r.length > 0) break;
            } else if (
              ((u = `${b.slice(w)}\\${u}`), (m = P), P && r.length > 0)
            )
              break;
          }
          return (u = _(u, !m, "\\", v)), m ? `${r}\\${u}` : `${r}${u}` || ".";
        },
        normalize(n) {
          d(n, "path");
          const r = n.length;
          if (r === 0) return ".";
          let u = 0,
            m,
            C = !1;
          const b = n.charCodeAt(0);
          if (r === 1) return i(b) ? "\\" : n;
          if (v(b))
            if (((C = !0), v(n.charCodeAt(1)))) {
              let w = 2,
                M = w;
              for (; w < r && !v(n.charCodeAt(w)); ) w++;
              if (w < r && w !== M) {
                const P = n.slice(M, w);
                for (M = w; w < r && v(n.charCodeAt(w)); ) w++;
                if (w < r && w !== M) {
                  for (M = w; w < r && !v(n.charCodeAt(w)); ) w++;
                  if (w === r) return `\\\\${P}\\${n.slice(M)}\\`;
                  w !== M && ((m = `\\\\${P}\\${n.slice(M, w)}`), (u = w));
                }
              }
            } else u = 1;
          else
            o(b) &&
              n.charCodeAt(1) === S &&
              ((m = n.slice(0, 2)),
              (u = 2),
              r > 2 && v(n.charCodeAt(2)) && ((C = !0), (u = 3)));
          let N = u < r ? _(n.slice(u), !C, "\\", v) : "";
          return (
            N.length === 0 && !C && (N = "."),
            N.length > 0 && v(n.charCodeAt(r - 1)) && (N += "\\"),
            m === void 0 ? (C ? `\\${N}` : N) : C ? `${m}\\${N}` : `${m}${N}`
          );
        },
        isAbsolute(n) {
          d(n, "path");
          const r = n.length;
          if (r === 0) return !1;
          const u = n.charCodeAt(0);
          return (
            v(u) ||
            (r > 2 && o(u) && n.charCodeAt(1) === S && v(n.charCodeAt(2)))
          );
        },
        join(...n) {
          if (n.length === 0) return ".";
          let r, u;
          for (let b = 0; b < n.length; ++b) {
            const N = n[b];
            d(N, "path"),
              N.length > 0 && (r === void 0 ? (r = u = N) : (r += `\\${N}`));
          }
          if (r === void 0) return ".";
          let m = !0,
            C = 0;
          if (typeof u == "string" && v(u.charCodeAt(0))) {
            ++C;
            const b = u.length;
            b > 1 &&
              v(u.charCodeAt(1)) &&
              (++C, b > 2 && (v(u.charCodeAt(2)) ? ++C : (m = !1)));
          }
          if (m) {
            for (; C < r.length && v(r.charCodeAt(C)); ) C++;
            C >= 2 && (r = `\\${r.slice(C)}`);
          }
          return t.win32.normalize(r);
        },
        relative(n, r) {
          if ((d(n, "from"), d(r, "to"), n === r)) return "";
          const u = t.win32.resolve(n),
            m = t.win32.resolve(r);
          if (
            u === m ||
            ((n = u.toLowerCase()), (r = m.toLowerCase()), n === r)
          )
            return "";
          let C = 0;
          for (; C < n.length && n.charCodeAt(C) === f; ) C++;
          let b = n.length;
          for (; b - 1 > C && n.charCodeAt(b - 1) === f; ) b--;
          const N = b - C;
          let w = 0;
          for (; w < r.length && r.charCodeAt(w) === f; ) w++;
          let M = r.length;
          for (; M - 1 > w && r.charCodeAt(M - 1) === f; ) M--;
          const P = M - w,
            U = N < P ? N : P;
          let R = -1,
            W = 0;
          for (; W < U; W++) {
            const k = n.charCodeAt(C + W);
            if (k !== r.charCodeAt(w + W)) break;
            k === f && (R = W);
          }
          if (W !== U) {
            if (R === -1) return m;
          } else {
            if (P > U) {
              if (r.charCodeAt(w + W) === f) return m.slice(w + W + 1);
              if (W === 2) return m.slice(w + W);
            }
            N > U && (n.charCodeAt(C + W) === f ? (R = W) : W === 2 && (R = 3)),
              R === -1 && (R = 0);
          }
          let Y = "";
          for (W = C + R + 1; W <= b; ++W)
            (W === b || n.charCodeAt(W) === f) &&
              (Y += Y.length === 0 ? ".." : "\\..");
          return (
            (w += R),
            Y.length > 0
              ? `${Y}${m.slice(w, M)}`
              : (m.charCodeAt(w) === f && ++w, m.slice(w, M))
          );
        },
        toNamespacedPath(n) {
          if (typeof n != "string") return n;
          if (n.length === 0) return "";
          const r = t.win32.resolve(n);
          if (r.length <= 2) return n;
          if (r.charCodeAt(0) === f) {
            if (r.charCodeAt(1) === f) {
              const u = r.charCodeAt(2);
              if (u !== c && u !== a) return `\\\\?\\UNC\\${r.slice(2)}`;
            }
          } else if (
            o(r.charCodeAt(0)) &&
            r.charCodeAt(1) === S &&
            r.charCodeAt(2) === f
          )
            return `\\\\?\\${r}`;
          return n;
        },
        dirname(n) {
          d(n, "path");
          const r = n.length;
          if (r === 0) return ".";
          let u = -1,
            m = 0;
          const C = n.charCodeAt(0);
          if (r === 1) return v(C) ? n : ".";
          if (v(C)) {
            if (((u = m = 1), v(n.charCodeAt(1)))) {
              let w = 2,
                M = w;
              for (; w < r && !v(n.charCodeAt(w)); ) w++;
              if (w < r && w !== M) {
                for (M = w; w < r && v(n.charCodeAt(w)); ) w++;
                if (w < r && w !== M) {
                  for (M = w; w < r && !v(n.charCodeAt(w)); ) w++;
                  if (w === r) return n;
                  w !== M && (u = m = w + 1);
                }
              }
            }
          } else
            o(C) &&
              n.charCodeAt(1) === S &&
              ((u = r > 2 && v(n.charCodeAt(2)) ? 3 : 2), (m = u));
          let b = -1,
            N = !0;
          for (let w = r - 1; w >= m; --w)
            if (v(n.charCodeAt(w))) {
              if (!N) {
                b = w;
                break;
              }
            } else N = !1;
          if (b === -1) {
            if (u === -1) return ".";
            b = u;
          }
          return n.slice(0, b);
        },
        basename(n, r) {
          r !== void 0 && d(r, "ext"), d(n, "path");
          let u = 0,
            m = -1,
            C = !0,
            b;
          if (
            (n.length >= 2 &&
              o(n.charCodeAt(0)) &&
              n.charCodeAt(1) === S &&
              (u = 2),
            r !== void 0 && r.length > 0 && r.length <= n.length)
          ) {
            if (r === n) return "";
            let N = r.length - 1,
              w = -1;
            for (b = n.length - 1; b >= u; --b) {
              const M = n.charCodeAt(b);
              if (v(M)) {
                if (!C) {
                  u = b + 1;
                  break;
                }
              } else
                w === -1 && ((C = !1), (w = b + 1)),
                  N >= 0 &&
                    (M === r.charCodeAt(N)
                      ? --N == -1 && (m = b)
                      : ((N = -1), (m = w)));
            }
            return (
              u === m ? (m = w) : m === -1 && (m = n.length), n.slice(u, m)
            );
          }
          for (b = n.length - 1; b >= u; --b)
            if (v(n.charCodeAt(b))) {
              if (!C) {
                u = b + 1;
                break;
              }
            } else m === -1 && ((C = !1), (m = b + 1));
          return m === -1 ? "" : n.slice(u, m);
        },
        extname(n) {
          d(n, "path");
          let r = 0,
            u = -1,
            m = 0,
            C = -1,
            b = !0,
            N = 0;
          n.length >= 2 &&
            n.charCodeAt(1) === S &&
            o(n.charCodeAt(0)) &&
            (r = m = 2);
          for (let w = n.length - 1; w >= r; --w) {
            const M = n.charCodeAt(w);
            if (v(M)) {
              if (!b) {
                m = w + 1;
                break;
              }
              continue;
            }
            C === -1 && ((b = !1), (C = w + 1)),
              M === a
                ? u === -1
                  ? (u = w)
                  : N !== 1 && (N = 1)
                : u !== -1 && (N = -1);
          }
          return u === -1 ||
            C === -1 ||
            N === 0 ||
            (N === 1 && u === C - 1 && u === m + 1)
            ? ""
            : n.slice(u, C);
        },
        format: L.bind(null, "\\"),
        parse(n) {
          d(n, "path");
          const r = { root: "", dir: "", base: "", ext: "", name: "" };
          if (n.length === 0) return r;
          const u = n.length;
          let m = 0,
            C = n.charCodeAt(0);
          if (u === 1)
            return v(C)
              ? ((r.root = r.dir = n), r)
              : ((r.base = r.name = n), r);
          if (v(C)) {
            if (((m = 1), v(n.charCodeAt(1)))) {
              let R = 2,
                W = R;
              for (; R < u && !v(n.charCodeAt(R)); ) R++;
              if (R < u && R !== W) {
                for (W = R; R < u && v(n.charCodeAt(R)); ) R++;
                if (R < u && R !== W) {
                  for (W = R; R < u && !v(n.charCodeAt(R)); ) R++;
                  R === u ? (m = R) : R !== W && (m = R + 1);
                }
              }
            }
          } else if (o(C) && n.charCodeAt(1) === S) {
            if (u <= 2) return (r.root = r.dir = n), r;
            if (((m = 2), v(n.charCodeAt(2)))) {
              if (u === 3) return (r.root = r.dir = n), r;
              m = 3;
            }
          }
          m > 0 && (r.root = n.slice(0, m));
          let b = -1,
            N = m,
            w = -1,
            M = !0,
            P = n.length - 1,
            U = 0;
          for (; P >= m; --P) {
            if (((C = n.charCodeAt(P)), v(C))) {
              if (!M) {
                N = P + 1;
                break;
              }
              continue;
            }
            w === -1 && ((M = !1), (w = P + 1)),
              C === a
                ? b === -1
                  ? (b = P)
                  : U !== 1 && (U = 1)
                : b !== -1 && (U = -1);
          }
          return (
            w !== -1 &&
              (b === -1 || U === 0 || (U === 1 && b === w - 1 && b === N + 1)
                ? (r.base = r.name = n.slice(N, w))
                : ((r.name = n.slice(N, b)),
                  (r.base = n.slice(N, w)),
                  (r.ext = n.slice(b, w)))),
            N > 0 && N !== m ? (r.dir = n.slice(0, N - 1)) : (r.dir = r.root),
            r
          );
        },
        sep: "\\",
        delimiter: ";",
        win32: null,
        posix: null,
      }),
        (t.posix = {
          resolve(...n) {
            let r = "",
              u = !1;
            for (let m = n.length - 1; m >= -1 && !u; m--) {
              const C = m >= 0 ? n[m] : E.cwd();
              d(C, "path"),
                C.length !== 0 &&
                  ((r = `${C}/${r}`), (u = C.charCodeAt(0) === l));
            }
            return (r = _(r, !u, "/", i)), u ? `/${r}` : r.length > 0 ? r : ".";
          },
          normalize(n) {
            if ((d(n, "path"), n.length === 0)) return ".";
            const r = n.charCodeAt(0) === l,
              u = n.charCodeAt(n.length - 1) === l;
            return (
              (n = _(n, !r, "/", i)),
              n.length === 0
                ? r
                  ? "/"
                  : u
                  ? "./"
                  : "."
                : (u && (n += "/"), r ? `/${n}` : n)
            );
          },
          isAbsolute(n) {
            return d(n, "path"), n.length > 0 && n.charCodeAt(0) === l;
          },
          join(...n) {
            if (n.length === 0) return ".";
            let r;
            for (let u = 0; u < n.length; ++u) {
              const m = n[u];
              d(m, "path"),
                m.length > 0 && (r === void 0 ? (r = m) : (r += `/${m}`));
            }
            return r === void 0 ? "." : t.posix.normalize(r);
          },
          relative(n, r) {
            if (
              (d(n, "from"),
              d(r, "to"),
              n === r ||
                ((n = t.posix.resolve(n)), (r = t.posix.resolve(r)), n === r))
            )
              return "";
            const u = 1,
              m = n.length,
              C = m - u,
              b = 1,
              N = r.length - b,
              w = C < N ? C : N;
            let M = -1,
              P = 0;
            for (; P < w; P++) {
              const R = n.charCodeAt(u + P);
              if (R !== r.charCodeAt(b + P)) break;
              R === l && (M = P);
            }
            if (P === w)
              if (N > w) {
                if (r.charCodeAt(b + P) === l) return r.slice(b + P + 1);
                if (P === 0) return r.slice(b + P);
              } else
                C > w &&
                  (n.charCodeAt(u + P) === l ? (M = P) : P === 0 && (M = 0));
            let U = "";
            for (P = u + M + 1; P <= m; ++P)
              (P === m || n.charCodeAt(P) === l) &&
                (U += U.length === 0 ? ".." : "/..");
            return `${U}${r.slice(b + M)}`;
          },
          toNamespacedPath(n) {
            return n;
          },
          dirname(n) {
            if ((d(n, "path"), n.length === 0)) return ".";
            const r = n.charCodeAt(0) === l;
            let u = -1,
              m = !0;
            for (let C = n.length - 1; C >= 1; --C)
              if (n.charCodeAt(C) === l) {
                if (!m) {
                  u = C;
                  break;
                }
              } else m = !1;
            return u === -1
              ? r
                ? "/"
                : "."
              : r && u === 1
              ? "//"
              : n.slice(0, u);
          },
          basename(n, r) {
            r !== void 0 && d(r, "ext"), d(n, "path");
            let u = 0,
              m = -1,
              C = !0,
              b;
            if (r !== void 0 && r.length > 0 && r.length <= n.length) {
              if (r === n) return "";
              let N = r.length - 1,
                w = -1;
              for (b = n.length - 1; b >= 0; --b) {
                const M = n.charCodeAt(b);
                if (M === l) {
                  if (!C) {
                    u = b + 1;
                    break;
                  }
                } else
                  w === -1 && ((C = !1), (w = b + 1)),
                    N >= 0 &&
                      (M === r.charCodeAt(N)
                        ? --N == -1 && (m = b)
                        : ((N = -1), (m = w)));
              }
              return (
                u === m ? (m = w) : m === -1 && (m = n.length), n.slice(u, m)
              );
            }
            for (b = n.length - 1; b >= 0; --b)
              if (n.charCodeAt(b) === l) {
                if (!C) {
                  u = b + 1;
                  break;
                }
              } else m === -1 && ((C = !1), (m = b + 1));
            return m === -1 ? "" : n.slice(u, m);
          },
          extname(n) {
            d(n, "path");
            let r = -1,
              u = 0,
              m = -1,
              C = !0,
              b = 0;
            for (let N = n.length - 1; N >= 0; --N) {
              const w = n.charCodeAt(N);
              if (w === l) {
                if (!C) {
                  u = N + 1;
                  break;
                }
                continue;
              }
              m === -1 && ((C = !1), (m = N + 1)),
                w === a
                  ? r === -1
                    ? (r = N)
                    : b !== 1 && (b = 1)
                  : r !== -1 && (b = -1);
            }
            return r === -1 ||
              m === -1 ||
              b === 0 ||
              (b === 1 && r === m - 1 && r === u + 1)
              ? ""
              : n.slice(r, m);
          },
          format: L.bind(null, "/"),
          parse(n) {
            d(n, "path");
            const r = { root: "", dir: "", base: "", ext: "", name: "" };
            if (n.length === 0) return r;
            const u = n.charCodeAt(0) === l;
            let m;
            u ? ((r.root = "/"), (m = 1)) : (m = 0);
            let C = -1,
              b = 0,
              N = -1,
              w = !0,
              M = n.length - 1,
              P = 0;
            for (; M >= m; --M) {
              const U = n.charCodeAt(M);
              if (U === l) {
                if (!w) {
                  b = M + 1;
                  break;
                }
                continue;
              }
              N === -1 && ((w = !1), (N = M + 1)),
                U === a
                  ? C === -1
                    ? (C = M)
                    : P !== 1 && (P = 1)
                  : C !== -1 && (P = -1);
            }
            if (N !== -1) {
              const U = b === 0 && u ? 1 : b;
              C === -1 || P === 0 || (P === 1 && C === N - 1 && C === b + 1)
                ? (r.base = r.name = n.slice(U, N))
                : ((r.name = n.slice(U, C)),
                  (r.base = n.slice(U, N)),
                  (r.ext = n.slice(C, N)));
            }
            return b > 0 ? (r.dir = n.slice(0, b - 1)) : u && (r.dir = "/"), r;
          },
          sep: "/",
          delimiter: ":",
          win32: null,
          posix: null,
        }),
        (t.posix.win32 = t.win32.win32 = t.win32),
        (t.posix.posix = t.win32.posix = t.posix),
        (t.normalize =
          E.platform === "win32" ? t.win32.normalize : t.posix.normalize),
        (t.resolve =
          E.platform === "win32" ? t.win32.resolve : t.posix.resolve),
        (t.relative =
          E.platform === "win32" ? t.win32.relative : t.posix.relative),
        (t.dirname =
          E.platform === "win32" ? t.win32.dirname : t.posix.dirname),
        (t.basename =
          E.platform === "win32" ? t.win32.basename : t.posix.basename),
        (t.extname =
          E.platform === "win32" ? t.win32.extname : t.posix.extname),
        (t.sep = E.platform === "win32" ? t.win32.sep : t.posix.sep);
    }),
    $(z[8], V([0, 1, 2]), function (I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.StopWatch = void 0);
      const y =
        E.globals.performance && typeof E.globals.performance.now == "function";
      class p {
        constructor(h) {
          (this._highResolution = y && h),
            (this._startTime = this._now()),
            (this._stopTime = -1);
        }
        static create(h = !0) {
          return new p(h);
        }
        stop() {
          this._stopTime = this._now();
        }
        elapsed() {
          return this._stopTime !== -1
            ? this._stopTime - this._startTime
            : this._now() - this._startTime;
        }
        _now() {
          return this._highResolution
            ? E.globals.performance.now()
            : Date.now();
        }
      }
      t.StopWatch = p;
    }),
    $(z[9], V([0, 1, 4, 7, 18, 8]), function (I, t, E, y, p, s) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Relay =
          t.EventBufferer =
          t.DebounceEmitter =
          t.PauseableEmitter =
          t.Emitter =
          t.Event =
            void 0);
      var h;
      (function (i) {
        i.None = () => y.Disposable.None;
        function o(k) {
          return (F, B = null, H) => {
            let e = !1,
              q;
            return (
              (q = k(
                (G) => {
                  if (!e) return q ? q.dispose() : (e = !0), F.call(B, G);
                },
                null,
                H
              )),
              e && q.dispose(),
              q
            );
          };
        }
        i.once = o;
        function _(k, F) {
          return C((B, H = null, e) => k((q) => B.call(H, F(q)), null, e));
        }
        i.map = _;
        function L(k, F) {
          return C((B, H = null, e) =>
            k(
              (q) => {
                F(q), B.call(H, q);
              },
              null,
              e
            )
          );
        }
        i.forEach = L;
        function n(k, F) {
          return C((B, H = null, e) => k((q) => F(q) && B.call(H, q), null, e));
        }
        i.filter = n;
        function r(k) {
          return k;
        }
        i.signal = r;
        function u(...k) {
          return (F, B = null, H) =>
            (0, y.combinedDisposable)(
              ...k.map((e) => e((q) => F.call(B, q), null, H))
            );
        }
        i.any = u;
        function m(k, F, B) {
          let H = B;
          return _(k, (e) => ((H = F(H, e)), H));
        }
        i.reduce = m;
        function C(k) {
          let F;
          const B = new S({
            onFirstListenerAdd() {
              F = k(B.fire, B);
            },
            onLastListenerRemove() {
              F.dispose();
            },
          });
          return B.event;
        }
        function b(k, F, B = 100, H = !1, e) {
          let q,
            G,
            Z,
            ie = 0;
          const re = new S({
            leakWarningThreshold: e,
            onFirstListenerAdd() {
              q = k((le) => {
                ie++,
                  (G = F(G, le)),
                  H && !Z && (re.fire(G), (G = void 0)),
                  clearTimeout(Z),
                  (Z = setTimeout(() => {
                    const ue = G;
                    (G = void 0),
                      (Z = void 0),
                      (!H || ie > 1) && re.fire(ue),
                      (ie = 0);
                  }, B));
              });
            },
            onLastListenerRemove() {
              q.dispose();
            },
          });
          return re.event;
        }
        i.debounce = b;
        function N(k, F = (B, H) => B === H) {
          let B = !0,
            H;
          return n(k, (e) => {
            const q = B || !F(e, H);
            return (B = !1), (H = e), q;
          });
        }
        i.latch = N;
        function w(k, F) {
          return [i.filter(k, F), i.filter(k, (B) => !F(B))];
        }
        i.split = w;
        function M(k, F = !1, B = []) {
          let H = B.slice(),
            e = k((Z) => {
              H ? H.push(Z) : G.fire(Z);
            });
          const q = () => {
              H && H.forEach((Z) => G.fire(Z)), (H = null);
            },
            G = new S({
              onFirstListenerAdd() {
                e || (e = k((Z) => G.fire(Z)));
              },
              onFirstListenerDidAdd() {
                H && (F ? setTimeout(q) : q());
              },
              onLastListenerRemove() {
                e && e.dispose(), (e = null);
              },
            });
          return G.event;
        }
        i.buffer = M;
        class P {
          constructor(F) {
            this.event = F;
          }
          map(F) {
            return new P(_(this.event, F));
          }
          forEach(F) {
            return new P(L(this.event, F));
          }
          filter(F) {
            return new P(n(this.event, F));
          }
          reduce(F, B) {
            return new P(m(this.event, F, B));
          }
          latch() {
            return new P(N(this.event));
          }
          debounce(F, B = 100, H = !1, e) {
            return new P(b(this.event, F, B, H, e));
          }
          on(F, B, H) {
            return this.event(F, B, H);
          }
          once(F, B, H) {
            return o(this.event)(F, B, H);
          }
        }
        function U(k) {
          return new P(k);
        }
        i.chain = U;
        function R(k, F, B = (H) => H) {
          const H = (...Z) => G.fire(B(...Z)),
            e = () => k.on(F, H),
            q = () => k.removeListener(F, H),
            G = new S({ onFirstListenerAdd: e, onLastListenerRemove: q });
          return G.event;
        }
        i.fromNodeEventEmitter = R;
        function W(k, F, B = (H) => H) {
          const H = (...Z) => G.fire(B(...Z)),
            e = () => k.addEventListener(F, H),
            q = () => k.removeEventListener(F, H),
            G = new S({ onFirstListenerAdd: e, onLastListenerRemove: q });
          return G.event;
        }
        i.fromDOMEventEmitter = W;
        function Y(k) {
          return new Promise((F) => o(k)(F));
        }
        i.toPromise = Y;
      })((h = t.Event || (t.Event = {})));
      class a {
        constructor(o) {
          (this._listenerCount = 0),
            (this._invocationCount = 0),
            (this._elapsedOverall = 0),
            (this._name = `${o}_${a._idPool++}`);
        }
        start(o) {
          (this._stopWatch = new s.StopWatch(!0)), (this._listenerCount = o);
        }
        stop() {
          if (this._stopWatch) {
            const o = this._stopWatch.elapsed();
            (this._elapsedOverall += o),
              (this._invocationCount += 1),
              console.info(
                `did FIRE ${this._name}: elapsed_ms: ${o.toFixed(
                  5
                )}, listener: ${
                  this._listenerCount
                } (elapsed_overall: ${this._elapsedOverall.toFixed(
                  2
                )}, invocations: ${this._invocationCount})`
              ),
              (this._stopWatch = void 0);
          }
        }
      }
      a._idPool = 0;
      let l = -1;
      class f {
        constructor(o, _ = Math.random().toString(18).slice(2, 5)) {
          (this.customThreshold = o),
            (this.name = _),
            (this._warnCountdown = 0);
        }
        dispose() {
          this._stacks && this._stacks.clear();
        }
        check(o) {
          let _ = l;
          if (
            (typeof this.customThreshold == "number" &&
              (_ = this.customThreshold),
            _ <= 0 || o < _)
          )
            return;
          this._stacks || (this._stacks = new Map());
          const L = new Error().stack
              .split(
                `
`
              )
              .slice(3).join(`
`),
            n = this._stacks.get(L) || 0;
          if (
            (this._stacks.set(L, n + 1),
            (this._warnCountdown -= 1),
            this._warnCountdown <= 0)
          ) {
            this._warnCountdown = _ * 0.5;
            let r,
              u = 0;
            for (const [m, C] of this._stacks)
              (!r || u < C) && ((r = m), (u = C));
            console.warn(
              `[${this.name}] potential listener LEAK detected, having ${o} listeners already. MOST frequent listener (${u}):`
            ),
              console.warn(r);
          }
          return () => {
            const r = this._stacks.get(L) || 0;
            this._stacks.set(L, r - 1);
          };
        }
      }
      class S {
        constructor(o) {
          var _;
          (this._disposed = !1),
            (this._options = o),
            (this._leakageMon =
              l > 0
                ? new f(this._options && this._options.leakWarningThreshold)
                : void 0),
            (this._perfMon = (
              (_ = this._options) === null || _ === void 0
                ? void 0
                : _._profName
            )
              ? new a(this._options._profName)
              : void 0);
        }
        get event() {
          return (
            this._event ||
              (this._event = (o, _, L) => {
                var n;
                this._listeners || (this._listeners = new p.LinkedList());
                const r = this._listeners.isEmpty();
                r &&
                  this._options &&
                  this._options.onFirstListenerAdd &&
                  this._options.onFirstListenerAdd(this);
                const u = this._listeners.push(_ ? [o, _] : o);
                r &&
                  this._options &&
                  this._options.onFirstListenerDidAdd &&
                  this._options.onFirstListenerDidAdd(this),
                  this._options &&
                    this._options.onListenerDidAdd &&
                    this._options.onListenerDidAdd(this, o, _);
                const m =
                    (n = this._leakageMon) === null || n === void 0
                      ? void 0
                      : n.check(this._listeners.size),
                  C = (0, y.toDisposable)(() => {
                    m && m(),
                      this._disposed ||
                        (u(),
                        this._options &&
                          this._options.onLastListenerRemove &&
                          ((this._listeners && !this._listeners.isEmpty()) ||
                            this._options.onLastListenerRemove(this)));
                  });
                return (
                  L instanceof y.DisposableStore
                    ? L.add(C)
                    : Array.isArray(L) && L.push(C),
                  C
                );
              }),
            this._event
          );
        }
        fire(o) {
          var _, L;
          if (this._listeners) {
            this._deliveryQueue || (this._deliveryQueue = new p.LinkedList());
            for (let n of this._listeners) this._deliveryQueue.push([n, o]);
            for (
              (_ = this._perfMon) === null ||
              _ === void 0 ||
              _.start(this._deliveryQueue.size);
              this._deliveryQueue.size > 0;

            ) {
              const [n, r] = this._deliveryQueue.shift();
              try {
                typeof n == "function" ? n.call(void 0, r) : n[0].call(n[1], r);
              } catch (u) {
                (0, E.onUnexpectedError)(u);
              }
            }
            (L = this._perfMon) === null || L === void 0 || L.stop();
          }
        }
        dispose() {
          var o, _, L, n, r;
          this._disposed ||
            ((this._disposed = !0),
            (o = this._listeners) === null || o === void 0 || o.clear(),
            (_ = this._deliveryQueue) === null || _ === void 0 || _.clear(),
            (n =
              (L = this._options) === null || L === void 0
                ? void 0
                : L.onLastListenerRemove) === null ||
              n === void 0 ||
              n.call(L),
            (r = this._leakageMon) === null || r === void 0 || r.dispose());
        }
      }
      t.Emitter = S;
      class c extends S {
        constructor(o) {
          super(o);
          (this._isPaused = 0),
            (this._eventQueue = new p.LinkedList()),
            (this._mergeFn = o == null ? void 0 : o.merge);
        }
        pause() {
          this._isPaused++;
        }
        resume() {
          if (this._isPaused !== 0 && --this._isPaused == 0)
            if (this._mergeFn) {
              const o = Array.from(this._eventQueue);
              this._eventQueue.clear(), super.fire(this._mergeFn(o));
            } else
              for (; !this._isPaused && this._eventQueue.size !== 0; )
                super.fire(this._eventQueue.shift());
        }
        fire(o) {
          this._listeners &&
            (this._isPaused !== 0 ? this._eventQueue.push(o) : super.fire(o));
        }
      }
      t.PauseableEmitter = c;
      class g extends c {
        constructor(o) {
          var _;
          super(o);
          this._delay = (_ = o.delay) !== null && _ !== void 0 ? _ : 100;
        }
        fire(o) {
          this._handle ||
            (this.pause(),
            (this._handle = setTimeout(() => {
              (this._handle = void 0), this.resume();
            }, this._delay))),
            super.fire(o);
        }
      }
      t.DebounceEmitter = g;
      class d {
        constructor() {
          this.buffers = [];
        }
        wrapEvent(o) {
          return (_, L, n) =>
            o(
              (r) => {
                const u = this.buffers[this.buffers.length - 1];
                u ? u.push(() => _.call(L, r)) : _.call(L, r);
              },
              void 0,
              n
            );
        }
        bufferEvents(o) {
          const _ = [];
          this.buffers.push(_);
          const L = o();
          return this.buffers.pop(), _.forEach((n) => n()), L;
        }
      }
      t.EventBufferer = d;
      class v {
        constructor() {
          (this.listening = !1),
            (this.inputEvent = h.None),
            (this.inputEventListener = y.Disposable.None),
            (this.emitter = new S({
              onFirstListenerDidAdd: () => {
                (this.listening = !0),
                  (this.inputEventListener = this.inputEvent(
                    this.emitter.fire,
                    this.emitter
                  ));
              },
              onLastListenerRemove: () => {
                (this.listening = !1), this.inputEventListener.dispose();
              },
            })),
            (this.event = this.emitter.event);
        }
        set input(o) {
          (this.inputEvent = o),
            this.listening &&
              (this.inputEventListener.dispose(),
              (this.inputEventListener = o(this.emitter.fire, this.emitter)));
        }
        dispose() {
          this.inputEventListener.dispose(), this.emitter.dispose();
        }
      }
      t.Relay = v;
    }),
    $(z[21], V([0, 1, 9]), function (I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CancellationTokenSource = t.CancellationToken = void 0);
      const y = Object.freeze(function (a, l) {
        const f = setTimeout(a.bind(l), 0);
        return {
          dispose() {
            clearTimeout(f);
          },
        };
      });
      var p;
      (function (a) {
        function l(f) {
          return f === a.None || f === a.Cancelled || f instanceof s
            ? !0
            : !f || typeof f != "object"
            ? !1
            : typeof f.isCancellationRequested == "boolean" &&
              typeof f.onCancellationRequested == "function";
        }
        (a.isCancellationToken = l),
          (a.None = Object.freeze({
            isCancellationRequested: !1,
            onCancellationRequested: E.Event.None,
          })),
          (a.Cancelled = Object.freeze({
            isCancellationRequested: !0,
            onCancellationRequested: y,
          }));
      })((p = t.CancellationToken || (t.CancellationToken = {})));
      class s {
        constructor() {
          (this._isCancelled = !1), (this._emitter = null);
        }
        cancel() {
          this._isCancelled ||
            ((this._isCancelled = !0),
            this._emitter && (this._emitter.fire(void 0), this.dispose()));
        }
        get isCancellationRequested() {
          return this._isCancelled;
        }
        get onCancellationRequested() {
          return this._isCancelled
            ? y
            : (this._emitter || (this._emitter = new E.Emitter()),
              this._emitter.event);
        }
        dispose() {
          this._emitter && (this._emitter.dispose(), (this._emitter = null));
        }
      }
      class h {
        constructor(l) {
          (this._token = void 0),
            (this._parentListener = void 0),
            (this._parentListener =
              l && l.onCancellationRequested(this.cancel, this));
        }
        get token() {
          return this._token || (this._token = new s()), this._token;
        }
        cancel() {
          this._token
            ? this._token instanceof s && this._token.cancel()
            : (this._token = p.Cancelled);
        }
        dispose(l = !1) {
          l && this.cancel(),
            this._parentListener && this._parentListener.dispose(),
            this._token
              ? this._token instanceof s && this._token.dispose()
              : (this._token = p.None);
        }
      }
      t.CancellationTokenSource = h;
    }),
    $(z[5], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getLeftDeleteOffset =
          t.breakBetweenGraphemeBreakType =
          t.getGraphemeBreakType =
          t.singleLetterHash =
          t.containsUppercaseCharacter =
          t.startsWithUTF8BOM =
          t.UTF8_BOM_CHARACTER =
          t.isEmojiImprecise =
          t.isFullWidthCharacter =
          t.containsFullWidthCharacter =
          t.containsUnusualLineTerminators =
          t.UNUSUAL_LINE_TERMINATORS =
          t.isBasicASCII =
          t.containsEmoji =
          t.containsRTL =
          t.prevCharLength =
          t.nextCharLength =
          t.getNextCodePoint =
          t.computeCodePoint =
          t.isLowSurrogate =
          t.isHighSurrogate =
          t.commonSuffixLength =
          t.commonPrefixLength =
          t.startsWithIgnoreCase =
          t.equalsIgnoreCase =
          t.isUpperAsciiLetter =
          t.isLowerAsciiLetter =
          t.compareSubstringIgnoreCase =
          t.compareIgnoreCase =
          t.compareSubstring =
          t.compare =
          t.lastNonWhitespaceIndex =
          t.getLeadingWhitespace =
          t.firstNonWhitespaceIndex =
          t.splitLines =
          t.regExpFlags =
          t.regExpLeadsToEndlessLoop =
          t.createRegExp =
          t.stripWildcards =
          t.convertSimple2RegExpPattern =
          t.rtrim =
          t.ltrim =
          t.trim =
          t.escapeRegExpCharacters =
          t.escape =
          t.format =
          t.isFalsyOrWhitespace =
            void 0);
      function E(A) {
        return !A || typeof A != "string" ? !0 : A.trim().length === 0;
      }
      t.isFalsyOrWhitespace = E;
      const y = /{(\d+)}/g;
      function p(A, ...D) {
        return D.length === 0
          ? A
          : A.replace(y, function (T, O) {
              const j = parseInt(O, 10);
              return isNaN(j) || j < 0 || j >= D.length ? T : D[j];
            });
      }
      t.format = p;
      function s(A) {
        return A.replace(/[<>&]/g, function (D) {
          switch (D) {
            case "<":
              return "&lt;";
            case ">":
              return "&gt;";
            case "&":
              return "&amp;";
            default:
              return D;
          }
        });
      }
      t.escape = s;
      function h(A) {
        return A.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
      }
      t.escapeRegExpCharacters = h;
      function a(A, D = " ") {
        const T = l(A, D);
        return f(T, D);
      }
      t.trim = a;
      function l(A, D) {
        if (!A || !D) return A;
        const T = D.length;
        if (T === 0 || A.length === 0) return A;
        let O = 0;
        for (; A.indexOf(D, O) === O; ) O = O + T;
        return A.substring(O);
      }
      t.ltrim = l;
      function f(A, D) {
        if (!A || !D) return A;
        const T = D.length,
          O = A.length;
        if (T === 0 || O === 0) return A;
        let j = O,
          Q = -1;
        for (; (Q = A.lastIndexOf(D, j - 1)), !(Q === -1 || Q + T !== j); ) {
          if (Q === 0) return "";
          j = Q;
        }
        return A.substring(0, j);
      }
      t.rtrim = f;
      function S(A) {
        return A.replace(
          /[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g,
          "\\$&"
        ).replace(/[\*]/g, ".*");
      }
      t.convertSimple2RegExpPattern = S;
      function c(A) {
        return A.replace(/\*/g, "");
      }
      t.stripWildcards = c;
      function g(A, D, T = {}) {
        if (!A) throw new Error("Cannot create regex from empty string");
        D || (A = h(A)),
          T.wholeWord &&
            (/\B/.test(A.charAt(0)) || (A = "\\b" + A),
            /\B/.test(A.charAt(A.length - 1)) || (A = A + "\\b"));
        let O = "";
        return (
          T.global && (O += "g"),
          T.matchCase || (O += "i"),
          T.multiline && (O += "m"),
          T.unicode && (O += "u"),
          new RegExp(A, O)
        );
      }
      t.createRegExp = g;
      function d(A) {
        return A.source === "^" ||
          A.source === "^$" ||
          A.source === "$" ||
          A.source === "^\\s*$"
          ? !1
          : !!(A.exec("") && A.lastIndex === 0);
      }
      t.regExpLeadsToEndlessLoop = d;
      function v(A) {
        return (
          (A.global ? "g" : "") +
          (A.ignoreCase ? "i" : "") +
          (A.multiline ? "m" : "") +
          (A.unicode ? "u" : "")
        );
      }
      t.regExpFlags = v;
      function i(A) {
        return A.split(/\r\n|\r|\n/);
      }
      t.splitLines = i;
      function o(A) {
        for (let D = 0, T = A.length; D < T; D++) {
          const O = A.charCodeAt(D);
          if (O !== 32 && O !== 9) return D;
        }
        return -1;
      }
      t.firstNonWhitespaceIndex = o;
      function _(A, D = 0, T = A.length) {
        for (let O = D; O < T; O++) {
          const j = A.charCodeAt(O);
          if (j !== 32 && j !== 9) return A.substring(D, O);
        }
        return A.substring(D, T);
      }
      t.getLeadingWhitespace = _;
      function L(A, D = A.length - 1) {
        for (let T = D; T >= 0; T--) {
          const O = A.charCodeAt(T);
          if (O !== 32 && O !== 9) return T;
        }
        return -1;
      }
      t.lastNonWhitespaceIndex = L;
      function n(A, D) {
        return A < D ? -1 : A > D ? 1 : 0;
      }
      t.compare = n;
      function r(A, D, T = 0, O = A.length, j = 0, Q = D.length) {
        for (; T < O && j < Q; T++, j++) {
          let K = A.charCodeAt(T),
            te = D.charCodeAt(j);
          if (K < te) return -1;
          if (K > te) return 1;
        }
        const J = O - T,
          x = Q - j;
        return J < x ? -1 : J > x ? 1 : 0;
      }
      t.compareSubstring = r;
      function u(A, D) {
        return m(A, D, 0, A.length, 0, D.length);
      }
      t.compareIgnoreCase = u;
      function m(A, D, T = 0, O = A.length, j = 0, Q = D.length) {
        for (; T < O && j < Q; T++, j++) {
          let K = A.charCodeAt(T),
            te = D.charCodeAt(j);
          if (K === te) continue;
          const ae = K - te;
          if (!(ae === 32 && b(te)) && !(ae === -32 && b(K)))
            return C(K) && C(te)
              ? ae
              : r(A.toLowerCase(), D.toLowerCase(), T, O, j, Q);
        }
        const J = O - T,
          x = Q - j;
        return J < x ? -1 : J > x ? 1 : 0;
      }
      t.compareSubstringIgnoreCase = m;
      function C(A) {
        return A >= 97 && A <= 122;
      }
      t.isLowerAsciiLetter = C;
      function b(A) {
        return A >= 65 && A <= 90;
      }
      t.isUpperAsciiLetter = b;
      function N(A) {
        return C(A) || b(A);
      }
      function w(A, D) {
        return A.length === D.length && M(A, D);
      }
      t.equalsIgnoreCase = w;
      function M(A, D, T = A.length) {
        for (let O = 0; O < T; O++) {
          const j = A.charCodeAt(O),
            Q = D.charCodeAt(O);
          if (j !== Q) {
            if (N(j) && N(Q)) {
              const J = Math.abs(j - Q);
              if (J !== 0 && J !== 32) return !1;
            } else if (
              String.fromCharCode(j).toLowerCase() !==
              String.fromCharCode(Q).toLowerCase()
            )
              return !1;
          }
        }
        return !0;
      }
      function P(A, D) {
        const T = D.length;
        return D.length > A.length ? !1 : M(A, D, T);
      }
      t.startsWithIgnoreCase = P;
      function U(A, D) {
        let T,
          O = Math.min(A.length, D.length);
        for (T = 0; T < O; T++)
          if (A.charCodeAt(T) !== D.charCodeAt(T)) return T;
        return O;
      }
      t.commonPrefixLength = U;
      function R(A, D) {
        let T,
          O = Math.min(A.length, D.length);
        const j = A.length - 1,
          Q = D.length - 1;
        for (T = 0; T < O; T++)
          if (A.charCodeAt(j - T) !== D.charCodeAt(Q - T)) return T;
        return O;
      }
      t.commonSuffixLength = R;
      function W(A) {
        return 55296 <= A && A <= 56319;
      }
      t.isHighSurrogate = W;
      function Y(A) {
        return 56320 <= A && A <= 57343;
      }
      t.isLowSurrogate = Y;
      function k(A, D) {
        return ((A - 55296) << 10) + (D - 56320) + 65536;
      }
      t.computeCodePoint = k;
      function F(A, D, T) {
        const O = A.charCodeAt(T);
        if (W(O) && T + 1 < D) {
          const j = A.charCodeAt(T + 1);
          if (Y(j)) return k(O, j);
        }
        return O;
      }
      t.getNextCodePoint = F;
      function B(A, D) {
        const T = A.charCodeAt(D - 1);
        if (Y(T) && D > 1) {
          const O = A.charCodeAt(D - 2);
          if (W(O)) return k(O, T);
        }
        return T;
      }
      function H(A, D) {
        const T = ee.getInstance(),
          O = D,
          j = A.length,
          Q = F(A, j, D);
        D += Q >= 65536 ? 2 : 1;
        let J = T.getGraphemeBreakType(Q);
        for (; D < j; ) {
          const x = F(A, j, D),
            K = T.getGraphemeBreakType(x);
          if (oe(J, K)) break;
          (D += x >= 65536 ? 2 : 1), (J = K);
        }
        return D - O;
      }
      t.nextCharLength = H;
      function e(A, D) {
        const T = ee.getInstance(),
          O = D,
          j = B(A, D);
        D -= j >= 65536 ? 2 : 1;
        let Q = T.getGraphemeBreakType(j);
        for (; D > 0; ) {
          const J = B(A, D),
            x = T.getGraphemeBreakType(J);
          if (oe(x, Q)) break;
          (D -= J >= 65536 ? 2 : 1), (Q = x);
        }
        return O - D;
      }
      t.prevCharLength = e;
      const q =
        /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
      function G(A) {
        return q.test(A);
      }
      t.containsRTL = G;
      const Z =
        /(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD00-\uDDFF\uDE70-\uDED6])/;
      function ie(A) {
        return Z.test(A);
      }
      t.containsEmoji = ie;
      const re = /^[\t\n\r\x20-\x7E]*$/;
      function le(A) {
        return re.test(A);
      }
      (t.isBasicASCII = le), (t.UNUSUAL_LINE_TERMINATORS = /[\u2028\u2029]/);
      function ue(A) {
        return t.UNUSUAL_LINE_TERMINATORS.test(A);
      }
      t.containsUnusualLineTerminators = ue;
      function me(A) {
        for (let D = 0, T = A.length; D < T; D++)
          if (ce(A.charCodeAt(D))) return !0;
        return !1;
      }
      t.containsFullWidthCharacter = me;
      function ce(A) {
        return (
          (A = +A),
          (A >= 11904 && A <= 55215) ||
            (A >= 63744 && A <= 64255) ||
            (A >= 65281 && A <= 65374)
        );
      }
      t.isFullWidthCharacter = ce;
      function fe(A) {
        return (
          (A >= 127462 && A <= 127487) ||
          A === 8986 ||
          A === 8987 ||
          A === 9200 ||
          A === 9203 ||
          (A >= 9728 && A <= 10175) ||
          A === 11088 ||
          A === 11093 ||
          (A >= 127744 && A <= 128591) ||
          (A >= 128640 && A <= 128764) ||
          (A >= 128992 && A <= 129003) ||
          (A >= 129280 && A <= 129535) ||
          (A >= 129648 && A <= 129750)
        );
      }
      (t.isEmojiImprecise = fe),
        (t.UTF8_BOM_CHARACTER = String.fromCharCode(65279));
      function ge(A) {
        return !!(A && A.length > 0 && A.charCodeAt(0) === 65279);
      }
      t.startsWithUTF8BOM = ge;
      function _e(A, D = !1) {
        return A
          ? (D && (A = A.replace(/\\./g, "")), A.toLowerCase() !== A)
          : !1;
      }
      t.containsUppercaseCharacter = _e;
      function ve(A) {
        const D = 90 - 65 + 1;
        return (
          (A = A % (2 * D)),
          A < D ? String.fromCharCode(97 + A) : String.fromCharCode(65 + A - D)
        );
      }
      t.singleLetterHash = ve;
      function Ce(A) {
        return ee.getInstance().getGraphemeBreakType(A);
      }
      t.getGraphemeBreakType = Ce;
      function oe(A, D) {
        return A === 0
          ? D !== 5 && D !== 7
          : A === 2 && D === 3
          ? !1
          : A === 4 || A === 2 || A === 3 || D === 4 || D === 2 || D === 3
          ? !0
          : !(
              (A === 8 && (D === 8 || D === 9 || D === 11 || D === 12)) ||
              ((A === 11 || A === 9) && (D === 9 || D === 10)) ||
              ((A === 12 || A === 10) && D === 10) ||
              D === 5 ||
              D === 13 ||
              D === 7 ||
              A === 1 ||
              (A === 13 && D === 14) ||
              (A === 6 && D === 6)
            );
      }
      t.breakBetweenGraphemeBreakType = oe;
      class ee {
        constructor() {
          this._data = be();
        }
        static getInstance() {
          return ee._INSTANCE || (ee._INSTANCE = new ee()), ee._INSTANCE;
        }
        getGraphemeBreakType(D) {
          if (D < 32) return D === 10 ? 3 : D === 13 ? 2 : 4;
          if (D < 127) return 0;
          const T = this._data,
            O = T.length / 3;
          let j = 1;
          for (; j <= O; )
            if (D < T[3 * j]) j = 2 * j;
            else if (D > T[3 * j + 1]) j = 2 * j + 1;
            else return T[3 * j + 2];
          return 0;
        }
      }
      ee._INSTANCE = null;
      function be() {
        return JSON.parse(
          "[0,0,0,51592,51592,11,44424,44424,11,72251,72254,5,7150,7150,7,48008,48008,11,55176,55176,11,128420,128420,14,3276,3277,5,9979,9980,14,46216,46216,11,49800,49800,11,53384,53384,11,70726,70726,5,122915,122916,5,129320,129327,14,2558,2558,5,5906,5908,5,9762,9763,14,43360,43388,8,45320,45320,11,47112,47112,11,48904,48904,11,50696,50696,11,52488,52488,11,54280,54280,11,70082,70083,1,71350,71350,7,73111,73111,5,127892,127893,14,128726,128727,14,129473,129474,14,2027,2035,5,2901,2902,5,3784,3789,5,6754,6754,5,8418,8420,5,9877,9877,14,11088,11088,14,44008,44008,5,44872,44872,11,45768,45768,11,46664,46664,11,47560,47560,11,48456,48456,11,49352,49352,11,50248,50248,11,51144,51144,11,52040,52040,11,52936,52936,11,53832,53832,11,54728,54728,11,69811,69814,5,70459,70460,5,71096,71099,7,71998,71998,5,72874,72880,5,119149,119149,7,127374,127374,14,128335,128335,14,128482,128482,14,128765,128767,14,129399,129400,14,129680,129685,14,1476,1477,5,2377,2380,7,2759,2760,5,3137,3140,7,3458,3459,7,4153,4154,5,6432,6434,5,6978,6978,5,7675,7679,5,9723,9726,14,9823,9823,14,9919,9923,14,10035,10036,14,42736,42737,5,43596,43596,5,44200,44200,11,44648,44648,11,45096,45096,11,45544,45544,11,45992,45992,11,46440,46440,11,46888,46888,11,47336,47336,11,47784,47784,11,48232,48232,11,48680,48680,11,49128,49128,11,49576,49576,11,50024,50024,11,50472,50472,11,50920,50920,11,51368,51368,11,51816,51816,11,52264,52264,11,52712,52712,11,53160,53160,11,53608,53608,11,54056,54056,11,54504,54504,11,54952,54952,11,68108,68111,5,69933,69940,5,70197,70197,7,70498,70499,7,70845,70845,5,71229,71229,5,71727,71735,5,72154,72155,5,72344,72345,5,73023,73029,5,94095,94098,5,121403,121452,5,126981,127182,14,127538,127546,14,127990,127990,14,128391,128391,14,128445,128449,14,128500,128505,14,128752,128752,14,129160,129167,14,129356,129356,14,129432,129442,14,129648,129651,14,129751,131069,14,173,173,4,1757,1757,1,2274,2274,1,2494,2494,5,2641,2641,5,2876,2876,5,3014,3016,7,3262,3262,7,3393,3396,5,3570,3571,7,3968,3972,5,4228,4228,7,6086,6086,5,6679,6680,5,6912,6915,5,7080,7081,5,7380,7392,5,8252,8252,14,9096,9096,14,9748,9749,14,9784,9786,14,9833,9850,14,9890,9894,14,9938,9938,14,9999,9999,14,10085,10087,14,12349,12349,14,43136,43137,7,43454,43456,7,43755,43755,7,44088,44088,11,44312,44312,11,44536,44536,11,44760,44760,11,44984,44984,11,45208,45208,11,45432,45432,11,45656,45656,11,45880,45880,11,46104,46104,11,46328,46328,11,46552,46552,11,46776,46776,11,47000,47000,11,47224,47224,11,47448,47448,11,47672,47672,11,47896,47896,11,48120,48120,11,48344,48344,11,48568,48568,11,48792,48792,11,49016,49016,11,49240,49240,11,49464,49464,11,49688,49688,11,49912,49912,11,50136,50136,11,50360,50360,11,50584,50584,11,50808,50808,11,51032,51032,11,51256,51256,11,51480,51480,11,51704,51704,11,51928,51928,11,52152,52152,11,52376,52376,11,52600,52600,11,52824,52824,11,53048,53048,11,53272,53272,11,53496,53496,11,53720,53720,11,53944,53944,11,54168,54168,11,54392,54392,11,54616,54616,11,54840,54840,11,55064,55064,11,65438,65439,5,69633,69633,5,69837,69837,1,70018,70018,7,70188,70190,7,70368,70370,7,70465,70468,7,70712,70719,5,70835,70840,5,70850,70851,5,71132,71133,5,71340,71340,7,71458,71461,5,71985,71989,7,72002,72002,7,72193,72202,5,72281,72283,5,72766,72766,7,72885,72886,5,73104,73105,5,92912,92916,5,113824,113827,4,119173,119179,5,121505,121519,5,125136,125142,5,127279,127279,14,127489,127490,14,127570,127743,14,127900,127901,14,128254,128254,14,128369,128370,14,128400,128400,14,128425,128432,14,128468,128475,14,128489,128494,14,128715,128720,14,128745,128745,14,128759,128760,14,129004,129023,14,129296,129304,14,129340,129342,14,129388,129392,14,129404,129407,14,129454,129455,14,129485,129487,14,129659,129663,14,129719,129727,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2363,2363,7,2402,2403,5,2507,2508,7,2622,2624,7,2691,2691,7,2786,2787,5,2881,2884,5,3006,3006,5,3072,3072,5,3170,3171,5,3267,3268,7,3330,3331,7,3406,3406,1,3538,3540,5,3655,3662,5,3897,3897,5,4038,4038,5,4184,4185,5,4352,4447,8,6068,6069,5,6155,6157,5,6448,6449,7,6742,6742,5,6783,6783,5,6966,6970,5,7042,7042,7,7143,7143,7,7212,7219,5,7412,7412,5,8206,8207,4,8294,8303,4,8596,8601,14,9410,9410,14,9742,9742,14,9757,9757,14,9770,9770,14,9794,9794,14,9828,9828,14,9855,9855,14,9882,9882,14,9900,9903,14,9929,9933,14,9963,9967,14,9987,9988,14,10006,10006,14,10062,10062,14,10175,10175,14,11744,11775,5,42607,42607,5,43043,43044,7,43263,43263,5,43444,43445,7,43569,43570,5,43698,43700,5,43766,43766,5,44032,44032,11,44144,44144,11,44256,44256,11,44368,44368,11,44480,44480,11,44592,44592,11,44704,44704,11,44816,44816,11,44928,44928,11,45040,45040,11,45152,45152,11,45264,45264,11,45376,45376,11,45488,45488,11,45600,45600,11,45712,45712,11,45824,45824,11,45936,45936,11,46048,46048,11,46160,46160,11,46272,46272,11,46384,46384,11,46496,46496,11,46608,46608,11,46720,46720,11,46832,46832,11,46944,46944,11,47056,47056,11,47168,47168,11,47280,47280,11,47392,47392,11,47504,47504,11,47616,47616,11,47728,47728,11,47840,47840,11,47952,47952,11,48064,48064,11,48176,48176,11,48288,48288,11,48400,48400,11,48512,48512,11,48624,48624,11,48736,48736,11,48848,48848,11,48960,48960,11,49072,49072,11,49184,49184,11,49296,49296,11,49408,49408,11,49520,49520,11,49632,49632,11,49744,49744,11,49856,49856,11,49968,49968,11,50080,50080,11,50192,50192,11,50304,50304,11,50416,50416,11,50528,50528,11,50640,50640,11,50752,50752,11,50864,50864,11,50976,50976,11,51088,51088,11,51200,51200,11,51312,51312,11,51424,51424,11,51536,51536,11,51648,51648,11,51760,51760,11,51872,51872,11,51984,51984,11,52096,52096,11,52208,52208,11,52320,52320,11,52432,52432,11,52544,52544,11,52656,52656,11,52768,52768,11,52880,52880,11,52992,52992,11,53104,53104,11,53216,53216,11,53328,53328,11,53440,53440,11,53552,53552,11,53664,53664,11,53776,53776,11,53888,53888,11,54000,54000,11,54112,54112,11,54224,54224,11,54336,54336,11,54448,54448,11,54560,54560,11,54672,54672,11,54784,54784,11,54896,54896,11,55008,55008,11,55120,55120,11,64286,64286,5,66272,66272,5,68900,68903,5,69762,69762,7,69817,69818,5,69927,69931,5,70003,70003,5,70070,70078,5,70094,70094,7,70194,70195,7,70206,70206,5,70400,70401,5,70463,70463,7,70475,70477,7,70512,70516,5,70722,70724,5,70832,70832,5,70842,70842,5,70847,70848,5,71088,71089,7,71102,71102,7,71219,71226,5,71231,71232,5,71342,71343,7,71453,71455,5,71463,71467,5,71737,71738,5,71995,71996,5,72000,72000,7,72145,72147,7,72160,72160,5,72249,72249,7,72273,72278,5,72330,72342,5,72752,72758,5,72850,72871,5,72882,72883,5,73018,73018,5,73031,73031,5,73109,73109,5,73461,73462,7,94031,94031,5,94192,94193,7,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,126976,126979,14,127184,127231,14,127344,127345,14,127405,127461,14,127514,127514,14,127561,127567,14,127778,127779,14,127896,127896,14,127985,127986,14,127995,127999,5,128326,128328,14,128360,128366,14,128378,128378,14,128394,128397,14,128405,128406,14,128422,128423,14,128435,128443,14,128453,128464,14,128479,128480,14,128484,128487,14,128496,128498,14,128640,128709,14,128723,128724,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129096,129103,14,129292,129292,14,129311,129311,14,129329,129330,14,129344,129349,14,129360,129374,14,129394,129394,14,129402,129402,14,129413,129425,14,129445,129450,14,129466,129471,14,129483,129483,14,129511,129535,14,129653,129655,14,129667,129670,14,129705,129711,14,129731,129743,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2307,2307,7,2366,2368,7,2382,2383,7,2434,2435,7,2497,2500,5,2519,2519,5,2563,2563,7,2631,2632,5,2677,2677,5,2750,2752,7,2763,2764,7,2817,2817,5,2879,2879,5,2891,2892,7,2914,2915,5,3008,3008,5,3021,3021,5,3076,3076,5,3146,3149,5,3202,3203,7,3264,3265,7,3271,3272,7,3298,3299,5,3390,3390,5,3402,3404,7,3426,3427,5,3535,3535,5,3544,3550,7,3635,3635,7,3763,3763,7,3893,3893,5,3953,3966,5,3981,3991,5,4145,4145,7,4157,4158,5,4209,4212,5,4237,4237,5,4520,4607,10,5970,5971,5,6071,6077,5,6089,6099,5,6277,6278,5,6439,6440,5,6451,6456,7,6683,6683,5,6744,6750,5,6765,6770,7,6846,6846,5,6964,6964,5,6972,6972,5,7019,7027,5,7074,7077,5,7083,7085,5,7146,7148,7,7154,7155,7,7222,7223,5,7394,7400,5,7416,7417,5,8204,8204,5,8233,8233,4,8288,8292,4,8413,8416,5,8482,8482,14,8986,8987,14,9193,9203,14,9654,9654,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9775,14,9792,9792,14,9800,9811,14,9825,9826,14,9831,9831,14,9852,9853,14,9872,9873,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9936,9936,14,9941,9960,14,9974,9974,14,9982,9985,14,9992,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10145,10145,14,11013,11015,14,11503,11505,5,12334,12335,5,12951,12951,14,42612,42621,5,43014,43014,5,43047,43047,7,43204,43205,5,43335,43345,5,43395,43395,7,43450,43451,7,43561,43566,5,43573,43574,5,43644,43644,5,43710,43711,5,43758,43759,7,44005,44005,5,44012,44012,7,44060,44060,11,44116,44116,11,44172,44172,11,44228,44228,11,44284,44284,11,44340,44340,11,44396,44396,11,44452,44452,11,44508,44508,11,44564,44564,11,44620,44620,11,44676,44676,11,44732,44732,11,44788,44788,11,44844,44844,11,44900,44900,11,44956,44956,11,45012,45012,11,45068,45068,11,45124,45124,11,45180,45180,11,45236,45236,11,45292,45292,11,45348,45348,11,45404,45404,11,45460,45460,11,45516,45516,11,45572,45572,11,45628,45628,11,45684,45684,11,45740,45740,11,45796,45796,11,45852,45852,11,45908,45908,11,45964,45964,11,46020,46020,11,46076,46076,11,46132,46132,11,46188,46188,11,46244,46244,11,46300,46300,11,46356,46356,11,46412,46412,11,46468,46468,11,46524,46524,11,46580,46580,11,46636,46636,11,46692,46692,11,46748,46748,11,46804,46804,11,46860,46860,11,46916,46916,11,46972,46972,11,47028,47028,11,47084,47084,11,47140,47140,11,47196,47196,11,47252,47252,11,47308,47308,11,47364,47364,11,47420,47420,11,47476,47476,11,47532,47532,11,47588,47588,11,47644,47644,11,47700,47700,11,47756,47756,11,47812,47812,11,47868,47868,11,47924,47924,11,47980,47980,11,48036,48036,11,48092,48092,11,48148,48148,11,48204,48204,11,48260,48260,11,48316,48316,11,48372,48372,11,48428,48428,11,48484,48484,11,48540,48540,11,48596,48596,11,48652,48652,11,48708,48708,11,48764,48764,11,48820,48820,11,48876,48876,11,48932,48932,11,48988,48988,11,49044,49044,11,49100,49100,11,49156,49156,11,49212,49212,11,49268,49268,11,49324,49324,11,49380,49380,11,49436,49436,11,49492,49492,11,49548,49548,11,49604,49604,11,49660,49660,11,49716,49716,11,49772,49772,11,49828,49828,11,49884,49884,11,49940,49940,11,49996,49996,11,50052,50052,11,50108,50108,11,50164,50164,11,50220,50220,11,50276,50276,11,50332,50332,11,50388,50388,11,50444,50444,11,50500,50500,11,50556,50556,11,50612,50612,11,50668,50668,11,50724,50724,11,50780,50780,11,50836,50836,11,50892,50892,11,50948,50948,11,51004,51004,11,51060,51060,11,51116,51116,11,51172,51172,11,51228,51228,11,51284,51284,11,51340,51340,11,51396,51396,11,51452,51452,11,51508,51508,11,51564,51564,11,51620,51620,11,51676,51676,11,51732,51732,11,51788,51788,11,51844,51844,11,51900,51900,11,51956,51956,11,52012,52012,11,52068,52068,11,52124,52124,11,52180,52180,11,52236,52236,11,52292,52292,11,52348,52348,11,52404,52404,11,52460,52460,11,52516,52516,11,52572,52572,11,52628,52628,11,52684,52684,11,52740,52740,11,52796,52796,11,52852,52852,11,52908,52908,11,52964,52964,11,53020,53020,11,53076,53076,11,53132,53132,11,53188,53188,11,53244,53244,11,53300,53300,11,53356,53356,11,53412,53412,11,53468,53468,11,53524,53524,11,53580,53580,11,53636,53636,11,53692,53692,11,53748,53748,11,53804,53804,11,53860,53860,11,53916,53916,11,53972,53972,11,54028,54028,11,54084,54084,11,54140,54140,11,54196,54196,11,54252,54252,11,54308,54308,11,54364,54364,11,54420,54420,11,54476,54476,11,54532,54532,11,54588,54588,11,54644,54644,11,54700,54700,11,54756,54756,11,54812,54812,11,54868,54868,11,54924,54924,11,54980,54980,11,55036,55036,11,55092,55092,11,55148,55148,11,55216,55238,9,65056,65071,5,65529,65531,4,68097,68099,5,68159,68159,5,69446,69456,5,69688,69702,5,69808,69810,7,69815,69816,7,69821,69821,1,69888,69890,5,69932,69932,7,69957,69958,7,70016,70017,5,70067,70069,7,70079,70080,7,70089,70092,5,70095,70095,5,70191,70193,5,70196,70196,5,70198,70199,5,70367,70367,5,70371,70378,5,70402,70403,7,70462,70462,5,70464,70464,5,70471,70472,7,70487,70487,5,70502,70508,5,70709,70711,7,70720,70721,7,70725,70725,7,70750,70750,5,70833,70834,7,70841,70841,7,70843,70844,7,70846,70846,7,70849,70849,7,71087,71087,5,71090,71093,5,71100,71101,5,71103,71104,5,71216,71218,7,71227,71228,7,71230,71230,7,71339,71339,5,71341,71341,5,71344,71349,5,71351,71351,5,71456,71457,7,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123628,123631,5,125252,125258,5,126980,126980,14,127183,127183,14,127245,127247,14,127340,127343,14,127358,127359,14,127377,127386,14,127462,127487,6,127491,127503,14,127535,127535,14,127548,127551,14,127568,127569,14,127744,127777,14,127780,127891,14,127894,127895,14,127897,127899,14,127902,127984,14,127987,127989,14,127991,127994,14,128000,128253,14,128255,128317,14,128329,128334,14,128336,128359,14,128367,128368,14,128371,128377,14,128379,128390,14,128392,128393,14,128398,128399,14,128401,128404,14,128407,128419,14,128421,128421,14,128424,128424,14,128433,128434,14,128444,128444,14,128450,128452,14,128465,128467,14,128476,128478,14,128481,128481,14,128483,128483,14,128488,128488,14,128495,128495,14,128499,128499,14,128506,128591,14,128710,128714,14,128721,128722,14,128725,128725,14,128728,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129664,129666,14,129671,129679,14,129686,129704,14,129712,129718,14,129728,129730,14,129744,129750,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2259,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3134,3136,5,3142,3144,5,3157,3158,5,3201,3201,5,3260,3260,5,3263,3263,5,3266,3266,5,3270,3270,5,3274,3275,7,3285,3286,5,3328,3329,5,3387,3388,5,3391,3392,7,3398,3400,7,3405,3405,5,3415,3415,5,3457,3457,5,3530,3530,5,3536,3537,7,3542,3542,5,3551,3551,5,3633,3633,5,3636,3642,5,3761,3761,5,3764,3772,5,3864,3865,5,3895,3895,5,3902,3903,7,3967,3967,7,3974,3975,5,3993,4028,5,4141,4144,5,4146,4151,5,4155,4156,7,4182,4183,7,4190,4192,5,4226,4226,5,4229,4230,5,4253,4253,5,4448,4519,9,4957,4959,5,5938,5940,5,6002,6003,5,6070,6070,7,6078,6085,7,6087,6088,7,6109,6109,5,6158,6158,4,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6848,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7673,5,8203,8203,4,8205,8205,13,8232,8232,4,8234,8238,4,8265,8265,14,8293,8293,4,8400,8412,5,8417,8417,5,8421,8432,5,8505,8505,14,8617,8618,14,9000,9000,14,9167,9167,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9776,9783,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9935,14,9937,9937,14,9939,9940,14,9961,9962,14,9968,9973,14,9975,9978,14,9981,9981,14,9986,9986,14,9989,9989,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10084,14,10133,10135,14,10160,10160,14,10548,10549,14,11035,11036,14,11093,11093,14,11647,11647,5,12330,12333,5,12336,12336,14,12441,12442,5,12953,12953,14,42608,42610,5,42654,42655,5,43010,43010,5,43019,43019,5,43045,43046,5,43052,43052,5,43188,43203,7,43232,43249,5,43302,43309,5,43346,43347,7,43392,43394,5,43443,43443,5,43446,43449,5,43452,43453,5,43493,43493,5,43567,43568,7,43571,43572,7,43587,43587,5,43597,43597,7,43696,43696,5,43703,43704,5,43713,43713,5,43756,43757,5,43765,43765,7,44003,44004,7,44006,44007,7,44009,44010,7,44013,44013,5,44033,44059,12,44061,44087,12,44089,44115,12,44117,44143,12,44145,44171,12,44173,44199,12,44201,44227,12,44229,44255,12,44257,44283,12,44285,44311,12,44313,44339,12,44341,44367,12,44369,44395,12,44397,44423,12,44425,44451,12,44453,44479,12,44481,44507,12,44509,44535,12,44537,44563,12,44565,44591,12,44593,44619,12,44621,44647,12,44649,44675,12,44677,44703,12,44705,44731,12,44733,44759,12,44761,44787,12,44789,44815,12,44817,44843,12,44845,44871,12,44873,44899,12,44901,44927,12,44929,44955,12,44957,44983,12,44985,45011,12,45013,45039,12,45041,45067,12,45069,45095,12,45097,45123,12,45125,45151,12,45153,45179,12,45181,45207,12,45209,45235,12,45237,45263,12,45265,45291,12,45293,45319,12,45321,45347,12,45349,45375,12,45377,45403,12,45405,45431,12,45433,45459,12,45461,45487,12,45489,45515,12,45517,45543,12,45545,45571,12,45573,45599,12,45601,45627,12,45629,45655,12,45657,45683,12,45685,45711,12,45713,45739,12,45741,45767,12,45769,45795,12,45797,45823,12,45825,45851,12,45853,45879,12,45881,45907,12,45909,45935,12,45937,45963,12,45965,45991,12,45993,46019,12,46021,46047,12,46049,46075,12,46077,46103,12,46105,46131,12,46133,46159,12,46161,46187,12,46189,46215,12,46217,46243,12,46245,46271,12,46273,46299,12,46301,46327,12,46329,46355,12,46357,46383,12,46385,46411,12,46413,46439,12,46441,46467,12,46469,46495,12,46497,46523,12,46525,46551,12,46553,46579,12,46581,46607,12,46609,46635,12,46637,46663,12,46665,46691,12,46693,46719,12,46721,46747,12,46749,46775,12,46777,46803,12,46805,46831,12,46833,46859,12,46861,46887,12,46889,46915,12,46917,46943,12,46945,46971,12,46973,46999,12,47001,47027,12,47029,47055,12,47057,47083,12,47085,47111,12,47113,47139,12,47141,47167,12,47169,47195,12,47197,47223,12,47225,47251,12,47253,47279,12,47281,47307,12,47309,47335,12,47337,47363,12,47365,47391,12,47393,47419,12,47421,47447,12,47449,47475,12,47477,47503,12,47505,47531,12,47533,47559,12,47561,47587,12,47589,47615,12,47617,47643,12,47645,47671,12,47673,47699,12,47701,47727,12,47729,47755,12,47757,47783,12,47785,47811,12,47813,47839,12,47841,47867,12,47869,47895,12,47897,47923,12,47925,47951,12,47953,47979,12,47981,48007,12,48009,48035,12,48037,48063,12,48065,48091,12,48093,48119,12,48121,48147,12,48149,48175,12,48177,48203,12,48205,48231,12,48233,48259,12,48261,48287,12,48289,48315,12,48317,48343,12,48345,48371,12,48373,48399,12,48401,48427,12,48429,48455,12,48457,48483,12,48485,48511,12,48513,48539,12,48541,48567,12,48569,48595,12,48597,48623,12,48625,48651,12,48653,48679,12,48681,48707,12,48709,48735,12,48737,48763,12,48765,48791,12,48793,48819,12,48821,48847,12,48849,48875,12,48877,48903,12,48905,48931,12,48933,48959,12,48961,48987,12,48989,49015,12,49017,49043,12,49045,49071,12,49073,49099,12,49101,49127,12,49129,49155,12,49157,49183,12,49185,49211,12,49213,49239,12,49241,49267,12,49269,49295,12,49297,49323,12,49325,49351,12,49353,49379,12,49381,49407,12,49409,49435,12,49437,49463,12,49465,49491,12,49493,49519,12,49521,49547,12,49549,49575,12,49577,49603,12,49605,49631,12,49633,49659,12,49661,49687,12,49689,49715,12,49717,49743,12,49745,49771,12,49773,49799,12,49801,49827,12,49829,49855,12,49857,49883,12,49885,49911,12,49913,49939,12,49941,49967,12,49969,49995,12,49997,50023,12,50025,50051,12,50053,50079,12,50081,50107,12,50109,50135,12,50137,50163,12,50165,50191,12,50193,50219,12,50221,50247,12,50249,50275,12,50277,50303,12,50305,50331,12,50333,50359,12,50361,50387,12,50389,50415,12,50417,50443,12,50445,50471,12,50473,50499,12,50501,50527,12,50529,50555,12,50557,50583,12,50585,50611,12,50613,50639,12,50641,50667,12,50669,50695,12,50697,50723,12,50725,50751,12,50753,50779,12,50781,50807,12,50809,50835,12,50837,50863,12,50865,50891,12,50893,50919,12,50921,50947,12,50949,50975,12,50977,51003,12,51005,51031,12,51033,51059,12,51061,51087,12,51089,51115,12,51117,51143,12,51145,51171,12,51173,51199,12,51201,51227,12,51229,51255,12,51257,51283,12,51285,51311,12,51313,51339,12,51341,51367,12,51369,51395,12,51397,51423,12,51425,51451,12,51453,51479,12,51481,51507,12,51509,51535,12,51537,51563,12,51565,51591,12,51593,51619,12,51621,51647,12,51649,51675,12,51677,51703,12,51705,51731,12,51733,51759,12,51761,51787,12,51789,51815,12,51817,51843,12,51845,51871,12,51873,51899,12,51901,51927,12,51929,51955,12,51957,51983,12,51985,52011,12,52013,52039,12,52041,52067,12,52069,52095,12,52097,52123,12,52125,52151,12,52153,52179,12,52181,52207,12,52209,52235,12,52237,52263,12,52265,52291,12,52293,52319,12,52321,52347,12,52349,52375,12,52377,52403,12,52405,52431,12,52433,52459,12,52461,52487,12,52489,52515,12,52517,52543,12,52545,52571,12,52573,52599,12,52601,52627,12,52629,52655,12,52657,52683,12,52685,52711,12,52713,52739,12,52741,52767,12,52769,52795,12,52797,52823,12,52825,52851,12,52853,52879,12,52881,52907,12,52909,52935,12,52937,52963,12,52965,52991,12,52993,53019,12,53021,53047,12,53049,53075,12,53077,53103,12,53105,53131,12,53133,53159,12,53161,53187,12,53189,53215,12,53217,53243,12,53245,53271,12,53273,53299,12,53301,53327,12,53329,53355,12,53357,53383,12,53385,53411,12,53413,53439,12,53441,53467,12,53469,53495,12,53497,53523,12,53525,53551,12,53553,53579,12,53581,53607,12,53609,53635,12,53637,53663,12,53665,53691,12,53693,53719,12,53721,53747,12,53749,53775,12,53777,53803,12,53805,53831,12,53833,53859,12,53861,53887,12,53889,53915,12,53917,53943,12,53945,53971,12,53973,53999,12,54001,54027,12,54029,54055,12,54057,54083,12,54085,54111,12,54113,54139,12,54141,54167,12,54169,54195,12,54197,54223,12,54225,54251,12,54253,54279,12,54281,54307,12,54309,54335,12,54337,54363,12,54365,54391,12,54393,54419,12,54421,54447,12,54449,54475,12,54477,54503,12,54505,54531,12,54533,54559,12,54561,54587,12,54589,54615,12,54617,54643,12,54645,54671,12,54673,54699,12,54701,54727,12,54729,54755,12,54757,54783,12,54785,54811,12,54813,54839,12,54841,54867,12,54869,54895,12,54897,54923,12,54925,54951,12,54953,54979,12,54981,55007,12,55009,55035,12,55037,55063,12,55065,55091,12,55093,55119,12,55121,55147,12,55149,55175,12,55177,55203,12,55243,55291,10,65024,65039,5,65279,65279,4,65520,65528,4,66045,66045,5,66422,66426,5,68101,68102,5,68152,68154,5,68325,68326,5,69291,69292,5,69632,69632,7,69634,69634,7,69759,69761,5]"
        );
      }
      function Se(A, D) {
        if (A === 0) return 0;
        const T = Le(A, D);
        if (T !== void 0) return T;
        const O = B(D, A);
        return (A -= se(O)), A;
      }
      t.getLeftDeleteOffset = Se;
      function Le(A, D) {
        let T = B(D, A);
        for (A -= se(T); Ne(T) || T === 65039 || T === 8419; ) {
          if (A === 0) return;
          (T = B(D, A)), (A -= se(T));
        }
        if (!!fe(T)) {
          if (A >= 0) {
            const O = B(D, A);
            O === 8205 && (A -= se(O));
          }
          return A;
        }
      }
      function se(A) {
        return A >= 65536 ? 2 : 1;
      }
      function Ne(A) {
        return 127995 <= A && A <= 127999;
      }
    }),
    $(z[22], V([0, 1, 5]), function (I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.StringSHA1 =
          t.toHexString =
          t.stringHash =
          t.doHash =
          t.hash =
            void 0);
      function y(i) {
        return p(i, 0);
      }
      t.hash = y;
      function p(i, o) {
        switch (typeof i) {
          case "object":
            return i === null
              ? s(349, o)
              : Array.isArray(i)
              ? l(i, o)
              : f(i, o);
          case "string":
            return a(i, o);
          case "boolean":
            return h(i, o);
          case "number":
            return s(i, o);
          case "undefined":
            return s(937, o);
          default:
            return s(617, o);
        }
      }
      t.doHash = p;
      function s(i, o) {
        return ((o << 5) - o + i) | 0;
      }
      function h(i, o) {
        return s(i ? 433 : 863, o);
      }
      function a(i, o) {
        o = s(149417, o);
        for (let _ = 0, L = i.length; _ < L; _++) o = s(i.charCodeAt(_), o);
        return o;
      }
      t.stringHash = a;
      function l(i, o) {
        return (o = s(104579, o)), i.reduce((_, L) => p(L, _), o);
      }
      function f(i, o) {
        return (
          (o = s(181387, o)),
          Object.keys(i)
            .sort()
            .reduce((_, L) => ((_ = a(L, _)), p(i[L], _)), o)
        );
      }
      function S(i, o, _ = 32) {
        const L = _ - o,
          n = ~((1 << L) - 1);
        return ((i << o) | ((n & i) >>> L)) >>> 0;
      }
      function c(i, o = 0, _ = i.byteLength, L = 0) {
        for (let n = 0; n < _; n++) i[o + n] = L;
      }
      function g(i, o, _ = "0") {
        for (; i.length < o; ) i = _ + i;
        return i;
      }
      function d(i, o = 32) {
        return i instanceof ArrayBuffer
          ? Array.from(new Uint8Array(i))
              .map((_) => _.toString(16).padStart(2, "0"))
              .join("")
          : g((i >>> 0).toString(16), o / 4);
      }
      t.toHexString = d;
      class v {
        constructor() {
          (this._h0 = 1732584193),
            (this._h1 = 4023233417),
            (this._h2 = 2562383102),
            (this._h3 = 271733878),
            (this._h4 = 3285377520),
            (this._buff = new Uint8Array(64 + 3)),
            (this._buffDV = new DataView(this._buff.buffer)),
            (this._buffLen = 0),
            (this._totalLen = 0),
            (this._leftoverHighSurrogate = 0),
            (this._finished = !1);
        }
        update(o) {
          const _ = o.length;
          if (_ === 0) return;
          const L = this._buff;
          let n = this._buffLen,
            r = this._leftoverHighSurrogate,
            u,
            m;
          for (
            r !== 0
              ? ((u = r), (m = -1), (r = 0))
              : ((u = o.charCodeAt(0)), (m = 0));
            ;

          ) {
            let C = u;
            if (E.isHighSurrogate(u))
              if (m + 1 < _) {
                const b = o.charCodeAt(m + 1);
                E.isLowSurrogate(b)
                  ? (m++, (C = E.computeCodePoint(u, b)))
                  : (C = 65533);
              } else {
                r = u;
                break;
              }
            else E.isLowSurrogate(u) && (C = 65533);
            if (((n = this._push(L, n, C)), m++, m < _)) u = o.charCodeAt(m);
            else break;
          }
          (this._buffLen = n), (this._leftoverHighSurrogate = r);
        }
        _push(o, _, L) {
          return (
            L < 128
              ? (o[_++] = L)
              : L < 2048
              ? ((o[_++] = 192 | ((L & 1984) >>> 6)),
                (o[_++] = 128 | ((L & 63) >>> 0)))
              : L < 65536
              ? ((o[_++] = 224 | ((L & 61440) >>> 12)),
                (o[_++] = 128 | ((L & 4032) >>> 6)),
                (o[_++] = 128 | ((L & 63) >>> 0)))
              : ((o[_++] = 240 | ((L & 1835008) >>> 18)),
                (o[_++] = 128 | ((L & 258048) >>> 12)),
                (o[_++] = 128 | ((L & 4032) >>> 6)),
                (o[_++] = 128 | ((L & 63) >>> 0))),
            _ >= 64 &&
              (this._step(),
              (_ -= 64),
              (this._totalLen += 64),
              (o[0] = o[64 + 0]),
              (o[1] = o[64 + 1]),
              (o[2] = o[64 + 2])),
            _
          );
        }
        digest() {
          return (
            this._finished ||
              ((this._finished = !0),
              this._leftoverHighSurrogate &&
                ((this._leftoverHighSurrogate = 0),
                (this._buffLen = this._push(this._buff, this._buffLen, 65533))),
              (this._totalLen += this._buffLen),
              this._wrapUp()),
            d(this._h0) + d(this._h1) + d(this._h2) + d(this._h3) + d(this._h4)
          );
        }
        _wrapUp() {
          (this._buff[this._buffLen++] = 128),
            c(this._buff, this._buffLen),
            this._buffLen > 56 && (this._step(), c(this._buff));
          const o = 8 * this._totalLen;
          this._buffDV.setUint32(56, Math.floor(o / 4294967296), !1),
            this._buffDV.setUint32(60, o % 4294967296, !1),
            this._step();
        }
        _step() {
          const o = v._bigBlock32,
            _ = this._buffDV;
          for (let w = 0; w < 64; w += 4)
            o.setUint32(w, _.getUint32(w, !1), !1);
          for (let w = 64; w < 320; w += 4)
            o.setUint32(
              w,
              S(
                o.getUint32(w - 12, !1) ^
                  o.getUint32(w - 32, !1) ^
                  o.getUint32(w - 56, !1) ^
                  o.getUint32(w - 64, !1),
                1
              ),
              !1
            );
          let L = this._h0,
            n = this._h1,
            r = this._h2,
            u = this._h3,
            m = this._h4,
            C,
            b,
            N;
          for (let w = 0; w < 80; w++)
            w < 20
              ? ((C = (n & r) | (~n & u)), (b = 1518500249))
              : w < 40
              ? ((C = n ^ r ^ u), (b = 1859775393))
              : w < 60
              ? ((C = (n & r) | (n & u) | (r & u)), (b = 2400959708))
              : ((C = n ^ r ^ u), (b = 3395469782)),
              (N = (S(L, 5) + C + m + b + o.getUint32(w * 4, !1)) & 4294967295),
              (m = u),
              (u = r),
              (r = S(n, 30)),
              (n = L),
              (L = N);
          (this._h0 = (this._h0 + L) & 4294967295),
            (this._h1 = (this._h1 + n) & 4294967295),
            (this._h2 = (this._h2 + r) & 4294967295),
            (this._h3 = (this._h3 + u) & 4294967295),
            (this._h4 = (this._h4 + m) & 4294967295);
        }
      }
      (t.StringSHA1 = v), (v._bigBlock32 = new DataView(new ArrayBuffer(320)));
    }),
    $(z[10], V([0, 1, 14, 22]), function (I, t, E, y) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LcsDiff =
          t.MyArray =
          t.Debug =
          t.stringDiff =
          t.StringDiffSequence =
            void 0);
      class p {
        constructor(c) {
          this.source = c;
        }
        getElements() {
          const c = this.source,
            g = new Int32Array(c.length);
          for (let d = 0, v = c.length; d < v; d++) g[d] = c.charCodeAt(d);
          return g;
        }
      }
      t.StringDiffSequence = p;
      function s(S, c, g) {
        return new f(new p(S), new p(c)).ComputeDiff(g).changes;
      }
      t.stringDiff = s;
      class h {
        static Assert(c, g) {
          if (!c) throw new Error(g);
        }
      }
      t.Debug = h;
      class a {
        static Copy(c, g, d, v, i) {
          for (let o = 0; o < i; o++) d[v + o] = c[g + o];
        }
        static Copy2(c, g, d, v, i) {
          for (let o = 0; o < i; o++) d[v + o] = c[g + o];
        }
      }
      t.MyArray = a;
      class l {
        constructor() {
          (this.m_changes = []),
            (this.m_originalStart = 1073741824),
            (this.m_modifiedStart = 1073741824),
            (this.m_originalCount = 0),
            (this.m_modifiedCount = 0);
        }
        MarkNextChange() {
          (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
            this.m_changes.push(
              new E.DiffChange(
                this.m_originalStart,
                this.m_originalCount,
                this.m_modifiedStart,
                this.m_modifiedCount
              )
            ),
            (this.m_originalCount = 0),
            (this.m_modifiedCount = 0),
            (this.m_originalStart = 1073741824),
            (this.m_modifiedStart = 1073741824);
        }
        AddOriginalElement(c, g) {
          (this.m_originalStart = Math.min(this.m_originalStart, c)),
            (this.m_modifiedStart = Math.min(this.m_modifiedStart, g)),
            this.m_originalCount++;
        }
        AddModifiedElement(c, g) {
          (this.m_originalStart = Math.min(this.m_originalStart, c)),
            (this.m_modifiedStart = Math.min(this.m_modifiedStart, g)),
            this.m_modifiedCount++;
        }
        getChanges() {
          return (
            (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
              this.MarkNextChange(),
            this.m_changes
          );
        }
        getReverseChanges() {
          return (
            (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
              this.MarkNextChange(),
            this.m_changes.reverse(),
            this.m_changes
          );
        }
      }
      class f {
        constructor(c, g, d = null) {
          (this.ContinueProcessingPredicate = d),
            (this._originalSequence = c),
            (this._modifiedSequence = g);
          const [v, i, o] = f._getElements(c),
            [_, L, n] = f._getElements(g);
          (this._hasStrings = o && n),
            (this._originalStringElements = v),
            (this._originalElementsOrHash = i),
            (this._modifiedStringElements = _),
            (this._modifiedElementsOrHash = L),
            (this.m_forwardHistory = []),
            (this.m_reverseHistory = []);
        }
        static _isStringArray(c) {
          return c.length > 0 && typeof c[0] == "string";
        }
        static _getElements(c) {
          const g = c.getElements();
          if (f._isStringArray(g)) {
            const d = new Int32Array(g.length);
            for (let v = 0, i = g.length; v < i; v++)
              d[v] = (0, y.stringHash)(g[v], 0);
            return [g, d, !0];
          }
          return g instanceof Int32Array
            ? [[], g, !1]
            : [[], new Int32Array(g), !1];
        }
        ElementsAreEqual(c, g) {
          return this._originalElementsOrHash[c] !==
            this._modifiedElementsOrHash[g]
            ? !1
            : this._hasStrings
            ? this._originalStringElements[c] ===
              this._modifiedStringElements[g]
            : !0;
        }
        ElementsAreStrictEqual(c, g) {
          if (!this.ElementsAreEqual(c, g)) return !1;
          const d = f._getStrictElement(this._originalSequence, c),
            v = f._getStrictElement(this._modifiedSequence, g);
          return d === v;
        }
        static _getStrictElement(c, g) {
          return typeof c.getStrictElement == "function"
            ? c.getStrictElement(g)
            : null;
        }
        OriginalElementsAreEqual(c, g) {
          return this._originalElementsOrHash[c] !==
            this._originalElementsOrHash[g]
            ? !1
            : this._hasStrings
            ? this._originalStringElements[c] ===
              this._originalStringElements[g]
            : !0;
        }
        ModifiedElementsAreEqual(c, g) {
          return this._modifiedElementsOrHash[c] !==
            this._modifiedElementsOrHash[g]
            ? !1
            : this._hasStrings
            ? this._modifiedStringElements[c] ===
              this._modifiedStringElements[g]
            : !0;
        }
        ComputeDiff(c) {
          return this._ComputeDiff(
            0,
            this._originalElementsOrHash.length - 1,
            0,
            this._modifiedElementsOrHash.length - 1,
            c
          );
        }
        _ComputeDiff(c, g, d, v, i) {
          const o = [!1];
          let _ = this.ComputeDiffRecursive(c, g, d, v, o);
          return (
            i && (_ = this.PrettifyChanges(_)), { quitEarly: o[0], changes: _ }
          );
        }
        ComputeDiffRecursive(c, g, d, v, i) {
          for (i[0] = !1; c <= g && d <= v && this.ElementsAreEqual(c, d); )
            c++, d++;
          for (; g >= c && v >= d && this.ElementsAreEqual(g, v); ) g--, v--;
          if (c > g || d > v) {
            let u;
            return (
              d <= v
                ? (h.Assert(
                    c === g + 1,
                    "originalStart should only be one more than originalEnd"
                  ),
                  (u = [new E.DiffChange(c, 0, d, v - d + 1)]))
                : c <= g
                ? (h.Assert(
                    d === v + 1,
                    "modifiedStart should only be one more than modifiedEnd"
                  ),
                  (u = [new E.DiffChange(c, g - c + 1, d, 0)]))
                : (h.Assert(
                    c === g + 1,
                    "originalStart should only be one more than originalEnd"
                  ),
                  h.Assert(
                    d === v + 1,
                    "modifiedStart should only be one more than modifiedEnd"
                  ),
                  (u = [])),
              u
            );
          }
          const o = [0],
            _ = [0],
            L = this.ComputeRecursionPoint(c, g, d, v, o, _, i),
            n = o[0],
            r = _[0];
          if (L !== null) return L;
          if (!i[0]) {
            const u = this.ComputeDiffRecursive(c, n, d, r, i);
            let m = [];
            return (
              i[0]
                ? (m = [
                    new E.DiffChange(
                      n + 1,
                      g - (n + 1) + 1,
                      r + 1,
                      v - (r + 1) + 1
                    ),
                  ])
                : (m = this.ComputeDiffRecursive(n + 1, g, r + 1, v, i)),
              this.ConcatenateChanges(u, m)
            );
          }
          return [new E.DiffChange(c, g - c + 1, d, v - d + 1)];
        }
        WALKTRACE(c, g, d, v, i, o, _, L, n, r, u, m, C, b, N, w, M, P) {
          let U = null,
            R = null,
            W = new l(),
            Y = g,
            k = d,
            F = C[0] - w[0] - v,
            B = -1073741824,
            H = this.m_forwardHistory.length - 1;
          do {
            const e = F + c;
            e === Y || (e < k && n[e - 1] < n[e + 1])
              ? ((u = n[e + 1]),
                (b = u - F - v),
                u < B && W.MarkNextChange(),
                (B = u),
                W.AddModifiedElement(u + 1, b),
                (F = e + 1 - c))
              : ((u = n[e - 1] + 1),
                (b = u - F - v),
                u < B && W.MarkNextChange(),
                (B = u - 1),
                W.AddOriginalElement(u, b + 1),
                (F = e - 1 - c)),
              H >= 0 &&
                ((n = this.m_forwardHistory[H]),
                (c = n[0]),
                (Y = 1),
                (k = n.length - 1));
          } while (--H >= -1);
          if (((U = W.getReverseChanges()), P[0])) {
            let e = C[0] + 1,
              q = w[0] + 1;
            if (U !== null && U.length > 0) {
              const G = U[U.length - 1];
              (e = Math.max(e, G.getOriginalEnd())),
                (q = Math.max(q, G.getModifiedEnd()));
            }
            R = [new E.DiffChange(e, m - e + 1, q, N - q + 1)];
          } else {
            (W = new l()),
              (Y = o),
              (k = _),
              (F = C[0] - w[0] - L),
              (B = 1073741824),
              (H = M
                ? this.m_reverseHistory.length - 1
                : this.m_reverseHistory.length - 2);
            do {
              const e = F + i;
              e === Y || (e < k && r[e - 1] >= r[e + 1])
                ? ((u = r[e + 1] - 1),
                  (b = u - F - L),
                  u > B && W.MarkNextChange(),
                  (B = u + 1),
                  W.AddOriginalElement(u + 1, b + 1),
                  (F = e + 1 - i))
                : ((u = r[e - 1]),
                  (b = u - F - L),
                  u > B && W.MarkNextChange(),
                  (B = u),
                  W.AddModifiedElement(u + 1, b + 1),
                  (F = e - 1 - i)),
                H >= 0 &&
                  ((r = this.m_reverseHistory[H]),
                  (i = r[0]),
                  (Y = 1),
                  (k = r.length - 1));
            } while (--H >= -1);
            R = W.getChanges();
          }
          return this.ConcatenateChanges(U, R);
        }
        ComputeRecursionPoint(c, g, d, v, i, o, _) {
          let L = 0,
            n = 0,
            r = 0,
            u = 0,
            m = 0,
            C = 0;
          c--,
            d--,
            (i[0] = 0),
            (o[0] = 0),
            (this.m_forwardHistory = []),
            (this.m_reverseHistory = []);
          const b = g - c + (v - d),
            N = b + 1,
            w = new Int32Array(N),
            M = new Int32Array(N),
            P = v - d,
            U = g - c,
            R = c - d,
            W = g - v,
            k = (U - P) % 2 == 0;
          (w[P] = c), (M[U] = g), (_[0] = !1);
          for (let F = 1; F <= b / 2 + 1; F++) {
            let B = 0,
              H = 0;
            (r = this.ClipDiagonalBound(P - F, F, P, N)),
              (u = this.ClipDiagonalBound(P + F, F, P, N));
            for (let q = r; q <= u; q += 2) {
              q === r || (q < u && w[q - 1] < w[q + 1])
                ? (L = w[q + 1])
                : (L = w[q - 1] + 1),
                (n = L - (q - P) - R);
              const G = L;
              for (; L < g && n < v && this.ElementsAreEqual(L + 1, n + 1); )
                L++, n++;
              if (
                ((w[q] = L),
                L + n > B + H && ((B = L), (H = n)),
                !k && Math.abs(q - U) <= F - 1 && L >= M[q])
              )
                return (
                  (i[0] = L),
                  (o[0] = n),
                  G <= M[q] && 1447 > 0 && F <= 1447 + 1
                    ? this.WALKTRACE(
                        P,
                        r,
                        u,
                        R,
                        U,
                        m,
                        C,
                        W,
                        w,
                        M,
                        L,
                        g,
                        i,
                        n,
                        v,
                        o,
                        k,
                        _
                      )
                    : null
                );
            }
            const e = (B - c + (H - d) - F) / 2;
            if (
              this.ContinueProcessingPredicate !== null &&
              !this.ContinueProcessingPredicate(B, e)
            )
              return (
                (_[0] = !0),
                (i[0] = B),
                (o[0] = H),
                e > 0 && 1447 > 0 && F <= 1447 + 1
                  ? this.WALKTRACE(
                      P,
                      r,
                      u,
                      R,
                      U,
                      m,
                      C,
                      W,
                      w,
                      M,
                      L,
                      g,
                      i,
                      n,
                      v,
                      o,
                      k,
                      _
                    )
                  : (c++, d++, [new E.DiffChange(c, g - c + 1, d, v - d + 1)])
              );
            (m = this.ClipDiagonalBound(U - F, F, U, N)),
              (C = this.ClipDiagonalBound(U + F, F, U, N));
            for (let q = m; q <= C; q += 2) {
              q === m || (q < C && M[q - 1] >= M[q + 1])
                ? (L = M[q + 1] - 1)
                : (L = M[q - 1]),
                (n = L - (q - U) - W);
              const G = L;
              for (; L > c && n > d && this.ElementsAreEqual(L, n); ) L--, n--;
              if (((M[q] = L), k && Math.abs(q - P) <= F && L <= w[q]))
                return (
                  (i[0] = L),
                  (o[0] = n),
                  G >= w[q] && 1447 > 0 && F <= 1447 + 1
                    ? this.WALKTRACE(
                        P,
                        r,
                        u,
                        R,
                        U,
                        m,
                        C,
                        W,
                        w,
                        M,
                        L,
                        g,
                        i,
                        n,
                        v,
                        o,
                        k,
                        _
                      )
                    : null
                );
            }
            if (F <= 1447) {
              let q = new Int32Array(u - r + 2);
              (q[0] = P - r + 1),
                a.Copy2(w, r, q, 1, u - r + 1),
                this.m_forwardHistory.push(q),
                (q = new Int32Array(C - m + 2)),
                (q[0] = U - m + 1),
                a.Copy2(M, m, q, 1, C - m + 1),
                this.m_reverseHistory.push(q);
            }
          }
          return this.WALKTRACE(
            P,
            r,
            u,
            R,
            U,
            m,
            C,
            W,
            w,
            M,
            L,
            g,
            i,
            n,
            v,
            o,
            k,
            _
          );
        }
        PrettifyChanges(c) {
          for (let g = 0; g < c.length; g++) {
            const d = c[g],
              v =
                g < c.length - 1
                  ? c[g + 1].originalStart
                  : this._originalElementsOrHash.length,
              i =
                g < c.length - 1
                  ? c[g + 1].modifiedStart
                  : this._modifiedElementsOrHash.length,
              o = d.originalLength > 0,
              _ = d.modifiedLength > 0;
            for (
              ;
              d.originalStart + d.originalLength < v &&
              d.modifiedStart + d.modifiedLength < i &&
              (!o ||
                this.OriginalElementsAreEqual(
                  d.originalStart,
                  d.originalStart + d.originalLength
                )) &&
              (!_ ||
                this.ModifiedElementsAreEqual(
                  d.modifiedStart,
                  d.modifiedStart + d.modifiedLength
                ));

            ) {
              const n = this.ElementsAreStrictEqual(
                d.originalStart,
                d.modifiedStart
              );
              if (
                this.ElementsAreStrictEqual(
                  d.originalStart + d.originalLength,
                  d.modifiedStart + d.modifiedLength
                ) &&
                !n
              )
                break;
              d.originalStart++, d.modifiedStart++;
            }
            let L = [null];
            if (g < c.length - 1 && this.ChangesOverlap(c[g], c[g + 1], L)) {
              (c[g] = L[0]), c.splice(g + 1, 1), g--;
              continue;
            }
          }
          for (let g = c.length - 1; g >= 0; g--) {
            const d = c[g];
            let v = 0,
              i = 0;
            if (g > 0) {
              const u = c[g - 1];
              (v = u.originalStart + u.originalLength),
                (i = u.modifiedStart + u.modifiedLength);
            }
            const o = d.originalLength > 0,
              _ = d.modifiedLength > 0;
            let L = 0,
              n = this._boundaryScore(
                d.originalStart,
                d.originalLength,
                d.modifiedStart,
                d.modifiedLength
              );
            for (let u = 1; ; u++) {
              const m = d.originalStart - u,
                C = d.modifiedStart - u;
              if (
                m < v ||
                C < i ||
                (o &&
                  !this.OriginalElementsAreEqual(m, m + d.originalLength)) ||
                (_ && !this.ModifiedElementsAreEqual(C, C + d.modifiedLength))
              )
                break;
              const N =
                (m === v && C === i ? 5 : 0) +
                this._boundaryScore(m, d.originalLength, C, d.modifiedLength);
              N > n && ((n = N), (L = u));
            }
            (d.originalStart -= L), (d.modifiedStart -= L);
            const r = [null];
            if (g > 0 && this.ChangesOverlap(c[g - 1], c[g], r)) {
              (c[g - 1] = r[0]), c.splice(g, 1), g++;
              continue;
            }
          }
          if (this._hasStrings)
            for (let g = 1, d = c.length; g < d; g++) {
              const v = c[g - 1],
                i = c[g],
                o = i.originalStart - v.originalStart - v.originalLength,
                _ = v.originalStart,
                L = i.originalStart + i.originalLength,
                n = L - _,
                r = v.modifiedStart,
                u = i.modifiedStart + i.modifiedLength,
                m = u - r;
              if (o < 5 && n < 20 && m < 20) {
                const C = this._findBetterContiguousSequence(_, n, r, m, o);
                if (C) {
                  const [b, N] = C;
                  (b !== v.originalStart + v.originalLength ||
                    N !== v.modifiedStart + v.modifiedLength) &&
                    ((v.originalLength = b - v.originalStart),
                    (v.modifiedLength = N - v.modifiedStart),
                    (i.originalStart = b + o),
                    (i.modifiedStart = N + o),
                    (i.originalLength = L - i.originalStart),
                    (i.modifiedLength = u - i.modifiedStart));
                }
              }
            }
          return c;
        }
        _findBetterContiguousSequence(c, g, d, v, i) {
          if (g < i || v < i) return null;
          const o = c + g - i + 1,
            _ = d + v - i + 1;
          let L = 0,
            n = 0,
            r = 0;
          for (let u = c; u < o; u++)
            for (let m = d; m < _; m++) {
              const C = this._contiguousSequenceScore(u, m, i);
              C > 0 && C > L && ((L = C), (n = u), (r = m));
            }
          return L > 0 ? [n, r] : null;
        }
        _contiguousSequenceScore(c, g, d) {
          let v = 0;
          for (let i = 0; i < d; i++) {
            if (!this.ElementsAreEqual(c + i, g + i)) return 0;
            v += this._originalStringElements[c + i].length;
          }
          return v;
        }
        _OriginalIsBoundary(c) {
          return c <= 0 || c >= this._originalElementsOrHash.length - 1
            ? !0
            : this._hasStrings && /^\s*$/.test(this._originalStringElements[c]);
        }
        _OriginalRegionIsBoundary(c, g) {
          if (this._OriginalIsBoundary(c) || this._OriginalIsBoundary(c - 1))
            return !0;
          if (g > 0) {
            const d = c + g;
            if (this._OriginalIsBoundary(d - 1) || this._OriginalIsBoundary(d))
              return !0;
          }
          return !1;
        }
        _ModifiedIsBoundary(c) {
          return c <= 0 || c >= this._modifiedElementsOrHash.length - 1
            ? !0
            : this._hasStrings && /^\s*$/.test(this._modifiedStringElements[c]);
        }
        _ModifiedRegionIsBoundary(c, g) {
          if (this._ModifiedIsBoundary(c) || this._ModifiedIsBoundary(c - 1))
            return !0;
          if (g > 0) {
            const d = c + g;
            if (this._ModifiedIsBoundary(d - 1) || this._ModifiedIsBoundary(d))
              return !0;
          }
          return !1;
        }
        _boundaryScore(c, g, d, v) {
          const i = this._OriginalRegionIsBoundary(c, g) ? 1 : 0,
            o = this._ModifiedRegionIsBoundary(d, v) ? 1 : 0;
          return i + o;
        }
        ConcatenateChanges(c, g) {
          let d = [];
          if (c.length === 0 || g.length === 0) return g.length > 0 ? g : c;
          if (this.ChangesOverlap(c[c.length - 1], g[0], d)) {
            const v = new Array(c.length + g.length - 1);
            return (
              a.Copy(c, 0, v, 0, c.length - 1),
              (v[c.length - 1] = d[0]),
              a.Copy(g, 1, v, c.length, g.length - 1),
              v
            );
          } else {
            const v = new Array(c.length + g.length);
            return (
              a.Copy(c, 0, v, 0, c.length),
              a.Copy(g, 0, v, c.length, g.length),
              v
            );
          }
        }
        ChangesOverlap(c, g, d) {
          if (
            (h.Assert(
              c.originalStart <= g.originalStart,
              "Left change is not less than or equal to right change"
            ),
            h.Assert(
              c.modifiedStart <= g.modifiedStart,
              "Left change is not less than or equal to right change"
            ),
            c.originalStart + c.originalLength >= g.originalStart ||
              c.modifiedStart + c.modifiedLength >= g.modifiedStart)
          ) {
            const v = c.originalStart;
            let i = c.originalLength;
            const o = c.modifiedStart;
            let _ = c.modifiedLength;
            return (
              c.originalStart + c.originalLength >= g.originalStart &&
                (i = g.originalStart + g.originalLength - c.originalStart),
              c.modifiedStart + c.modifiedLength >= g.modifiedStart &&
                (_ = g.modifiedStart + g.modifiedLength - c.modifiedStart),
              (d[0] = new E.DiffChange(v, i, o, _)),
              !0
            );
          } else return (d[0] = null), !1;
        }
        ClipDiagonalBound(c, g, d, v) {
          if (c >= 0 && c < v) return c;
          const i = d,
            o = v - d - 1,
            _ = g % 2 == 0;
          if (c < 0) {
            const L = i % 2 == 0;
            return _ === L ? 0 : 1;
          } else {
            const L = o % 2 == 0;
            return _ === L ? v - 1 : v - 2;
          }
        }
      }
      t.LcsDiff = f;
    }),
    $(z[11], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.assertNever =
          t.withNullAsUndefined =
          t.createProxyObject =
          t.getAllMethodNames =
          t.getAllPropertyNames =
          t.validateConstraint =
          t.validateConstraints =
          t.isFunction =
          t.assertIsDefined =
          t.assertType =
          t.isUndefinedOrNull =
          t.isUndefined =
          t.isBoolean =
          t.isNumber =
          t.isObject =
          t.isString =
          t.isArray =
            void 0);
      function E(n) {
        return Array.isArray(n);
      }
      t.isArray = E;
      function y(n) {
        return typeof n == "string";
      }
      t.isString = y;
      function p(n) {
        return (
          typeof n == "object" &&
          n !== null &&
          !Array.isArray(n) &&
          !(n instanceof RegExp) &&
          !(n instanceof Date)
        );
      }
      t.isObject = p;
      function s(n) {
        return typeof n == "number" && !isNaN(n);
      }
      t.isNumber = s;
      function h(n) {
        return n === !0 || n === !1;
      }
      t.isBoolean = h;
      function a(n) {
        return typeof n == "undefined";
      }
      t.isUndefined = a;
      function l(n) {
        return a(n) || n === null;
      }
      t.isUndefinedOrNull = l;
      function f(n, r) {
        if (!n)
          throw new Error(
            r ? `Unexpected type, expected '${r}'` : "Unexpected type"
          );
      }
      t.assertType = f;
      function S(n) {
        if (l(n))
          throw new Error("Assertion Failed: argument is undefined or null");
        return n;
      }
      t.assertIsDefined = S;
      function c(n) {
        return typeof n == "function";
      }
      t.isFunction = c;
      function g(n, r) {
        const u = Math.min(n.length, r.length);
        for (let m = 0; m < u; m++) d(n[m], r[m]);
      }
      t.validateConstraints = g;
      function d(n, r) {
        if (y(r)) {
          if (typeof n !== r)
            throw new Error(`argument does not match constraint: typeof ${r}`);
        } else if (c(r)) {
          try {
            if (n instanceof r) return;
          } catch (u) {}
          if (
            (!l(n) && n.constructor === r) ||
            (r.length === 1 && r.call(void 0, n) === !0)
          )
            return;
          throw new Error(
            "argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true"
          );
        }
      }
      t.validateConstraint = d;
      function v(n) {
        let r = [],
          u = Object.getPrototypeOf(n);
        for (; Object.prototype !== u; )
          (r = r.concat(Object.getOwnPropertyNames(u))),
            (u = Object.getPrototypeOf(u));
        return r;
      }
      t.getAllPropertyNames = v;
      function i(n) {
        const r = [];
        for (const u of v(n)) typeof n[u] == "function" && r.push(u);
        return r;
      }
      t.getAllMethodNames = i;
      function o(n, r) {
        const u = (C) =>
          function () {
            const b = Array.prototype.slice.call(arguments, 0);
            return r(C, b);
          };
        let m = {};
        for (const C of n) m[C] = u(C);
        return m;
      }
      t.createProxyObject = o;
      function _(n) {
        return n === null ? void 0 : n;
      }
      t.withNullAsUndefined = _;
      function L(n, r = "Unreachable") {
        throw new Error(r);
      }
      t.assertNever = L;
    }),
    $(z[12], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.toUint32 = t.toUint8 = void 0);
      function E(p) {
        return p < 0 ? 0 : p > 255 ? 255 : p | 0;
      }
      t.toUint8 = E;
      function y(p) {
        return p < 0 ? 0 : p > 4294967295 ? 4294967295 : p | 0;
      }
      t.toUint32 = y;
    }),
    $(z[13], V([0, 1, 20, 2]), function (I, t, E, y) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.uriToFsPath = t.URI = void 0);
      const p = /^\w[\w\d+.-]*$/,
        s = /^\//,
        h = /^\/\//;
      function a(b, N) {
        if (!b.scheme && N)
          throw new Error(
            `[UriError]: Scheme is missing: {scheme: "", authority: "${b.authority}", path: "${b.path}", query: "${b.query}", fragment: "${b.fragment}"}`
          );
        if (b.scheme && !p.test(b.scheme))
          throw new Error("[UriError]: Scheme contains illegal characters.");
        if (b.path) {
          if (b.authority) {
            if (!s.test(b.path))
              throw new Error(
                '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
              );
          } else if (h.test(b.path))
            throw new Error(
              '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
            );
        }
      }
      function l(b, N) {
        return !b && !N ? "file" : b;
      }
      function f(b, N) {
        switch (b) {
          case "https":
          case "http":
          case "file":
            N ? N[0] !== c && (N = c + N) : (N = c);
            break;
        }
        return N;
      }
      const S = "",
        c = "/",
        g = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
      class d {
        constructor(N, w, M, P, U, R = !1) {
          typeof N == "object"
            ? ((this.scheme = N.scheme || S),
              (this.authority = N.authority || S),
              (this.path = N.path || S),
              (this.query = N.query || S),
              (this.fragment = N.fragment || S))
            : ((this.scheme = l(N, R)),
              (this.authority = w || S),
              (this.path = f(this.scheme, M || S)),
              (this.query = P || S),
              (this.fragment = U || S),
              a(this, R));
        }
        static isUri(N) {
          return N instanceof d
            ? !0
            : N
            ? typeof N.authority == "string" &&
              typeof N.fragment == "string" &&
              typeof N.path == "string" &&
              typeof N.query == "string" &&
              typeof N.scheme == "string" &&
              typeof N.fsPath == "string" &&
              typeof N.with == "function" &&
              typeof N.toString == "function"
            : !1;
        }
        get fsPath() {
          return n(this, !1);
        }
        with(N) {
          if (!N) return this;
          let { scheme: w, authority: M, path: P, query: U, fragment: R } = N;
          return (
            w === void 0 ? (w = this.scheme) : w === null && (w = S),
            M === void 0 ? (M = this.authority) : M === null && (M = S),
            P === void 0 ? (P = this.path) : P === null && (P = S),
            U === void 0 ? (U = this.query) : U === null && (U = S),
            R === void 0 ? (R = this.fragment) : R === null && (R = S),
            w === this.scheme &&
            M === this.authority &&
            P === this.path &&
            U === this.query &&
            R === this.fragment
              ? this
              : new i(w, M, P, U, R)
          );
        }
        static parse(N, w = !1) {
          const M = g.exec(N);
          return M
            ? new i(
                M[2] || S,
                C(M[4] || S),
                C(M[5] || S),
                C(M[7] || S),
                C(M[9] || S),
                w
              )
            : new i(S, S, S, S, S);
        }
        static file(N) {
          let w = S;
          if (
            (y.isWindows && (N = N.replace(/\\/g, c)), N[0] === c && N[1] === c)
          ) {
            const M = N.indexOf(c, 2);
            M === -1
              ? ((w = N.substring(2)), (N = c))
              : ((w = N.substring(2, M)), (N = N.substring(M) || c));
          }
          return new i("file", w, N, S, S);
        }
        static from(N) {
          const w = new i(N.scheme, N.authority, N.path, N.query, N.fragment);
          return a(w, !0), w;
        }
        static joinPath(N, ...w) {
          if (!N.path)
            throw new Error(
              "[UriError]: cannot call joinPath on URI without path"
            );
          let M;
          return (
            y.isWindows && N.scheme === "file"
              ? (M = d.file(E.win32.join(n(N, !0), ...w)).path)
              : (M = E.posix.join(N.path, ...w)),
            N.with({ path: M })
          );
        }
        toString(N = !1) {
          return r(this, N);
        }
        toJSON() {
          return this;
        }
        static revive(N) {
          if (N) {
            if (N instanceof d) return N;
            {
              const w = new i(N);
              return (
                (w._formatted = N.external),
                (w._fsPath = N._sep === v ? N.fsPath : null),
                w
              );
            }
          } else return N;
        }
      }
      t.URI = d;
      const v = y.isWindows ? 1 : void 0;
      class i extends d {
        constructor() {
          super(...arguments);
          (this._formatted = null), (this._fsPath = null);
        }
        get fsPath() {
          return this._fsPath || (this._fsPath = n(this, !1)), this._fsPath;
        }
        toString(N = !1) {
          return N
            ? r(this, !0)
            : (this._formatted || (this._formatted = r(this, !1)),
              this._formatted);
        }
        toJSON() {
          const N = { $mid: 1 };
          return (
            this._fsPath && ((N.fsPath = this._fsPath), (N._sep = v)),
            this._formatted && (N.external = this._formatted),
            this.path && (N.path = this.path),
            this.scheme && (N.scheme = this.scheme),
            this.authority && (N.authority = this.authority),
            this.query && (N.query = this.query),
            this.fragment && (N.fragment = this.fragment),
            N
          );
        }
      }
      const o = {
        [58]: "%3A",
        [47]: "%2F",
        [63]: "%3F",
        [35]: "%23",
        [91]: "%5B",
        [93]: "%5D",
        [64]: "%40",
        [33]: "%21",
        [36]: "%24",
        [38]: "%26",
        [39]: "%27",
        [40]: "%28",
        [41]: "%29",
        [42]: "%2A",
        [43]: "%2B",
        [44]: "%2C",
        [59]: "%3B",
        [61]: "%3D",
        [32]: "%20",
      };
      function _(b, N) {
        let w,
          M = -1;
        for (let P = 0; P < b.length; P++) {
          const U = b.charCodeAt(P);
          if (
            (U >= 97 && U <= 122) ||
            (U >= 65 && U <= 90) ||
            (U >= 48 && U <= 57) ||
            U === 45 ||
            U === 46 ||
            U === 95 ||
            U === 126 ||
            (N && U === 47)
          )
            M !== -1 &&
              ((w += encodeURIComponent(b.substring(M, P))), (M = -1)),
              w !== void 0 && (w += b.charAt(P));
          else {
            w === void 0 && (w = b.substr(0, P));
            const R = o[U];
            R !== void 0
              ? (M !== -1 &&
                  ((w += encodeURIComponent(b.substring(M, P))), (M = -1)),
                (w += R))
              : M === -1 && (M = P);
          }
        }
        return (
          M !== -1 && (w += encodeURIComponent(b.substring(M))),
          w !== void 0 ? w : b
        );
      }
      function L(b) {
        let N;
        for (let w = 0; w < b.length; w++) {
          const M = b.charCodeAt(w);
          M === 35 || M === 63
            ? (N === void 0 && (N = b.substr(0, w)), (N += o[M]))
            : N !== void 0 && (N += b[w]);
        }
        return N !== void 0 ? N : b;
      }
      function n(b, N) {
        let w;
        return (
          b.authority && b.path.length > 1 && b.scheme === "file"
            ? (w = `//${b.authority}${b.path}`)
            : b.path.charCodeAt(0) === 47 &&
              ((b.path.charCodeAt(1) >= 65 && b.path.charCodeAt(1) <= 90) ||
                (b.path.charCodeAt(1) >= 97 && b.path.charCodeAt(1) <= 122)) &&
              b.path.charCodeAt(2) === 58
            ? N
              ? (w = b.path.substr(1))
              : (w = b.path[1].toLowerCase() + b.path.substr(2))
            : (w = b.path),
          y.isWindows && (w = w.replace(/\//g, "\\")),
          w
        );
      }
      t.uriToFsPath = n;
      function r(b, N) {
        const w = N ? L : _;
        let M = "",
          { scheme: P, authority: U, path: R, query: W, fragment: Y } = b;
        if (
          (P && ((M += P), (M += ":")),
          (U || P === "file") && ((M += c), (M += c)),
          U)
        ) {
          let k = U.indexOf("@");
          if (k !== -1) {
            const F = U.substr(0, k);
            (U = U.substr(k + 1)),
              (k = F.indexOf(":")),
              k === -1
                ? (M += w(F, !1))
                : ((M += w(F.substr(0, k), !1)),
                  (M += ":"),
                  (M += w(F.substr(k + 1), !1))),
              (M += "@");
          }
          (U = U.toLowerCase()),
            (k = U.indexOf(":")),
            k === -1
              ? (M += w(U, !1))
              : ((M += w(U.substr(0, k), !1)), (M += U.substr(k)));
        }
        if (R) {
          if (
            R.length >= 3 &&
            R.charCodeAt(0) === 47 &&
            R.charCodeAt(2) === 58
          ) {
            const k = R.charCodeAt(1);
            k >= 65 &&
              k <= 90 &&
              (R = `/${String.fromCharCode(k + 32)}:${R.substr(3)}`);
          } else if (R.length >= 2 && R.charCodeAt(1) === 58) {
            const k = R.charCodeAt(0);
            k >= 65 &&
              k <= 90 &&
              (R = `${String.fromCharCode(k + 32)}:${R.substr(2)}`);
          }
          M += w(R, !0);
        }
        return (
          W && ((M += "?"), (M += w(W, !1))),
          Y && ((M += "#"), (M += N ? Y : _(Y, !1))),
          M
        );
      }
      function u(b) {
        try {
          return decodeURIComponent(b);
        } catch (N) {
          return b.length > 3 ? b.substr(0, 3) + u(b.substr(3)) : b;
        }
      }
      const m = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
      function C(b) {
        return b.match(m) ? b.replace(m, (N) => u(N)) : b;
      }
    }),
    $(z[34], V([0, 1, 4, 7, 2, 11]), function (I, t, E, y, p, s) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.create =
          t.SimpleWorkerServer =
          t.SimpleWorkerClient =
          t.logOnceWebWorkerWarning =
            void 0);
      const h = "$initialize";
      let a = !1;
      function l(d) {
        !p.isWeb ||
          (a ||
            ((a = !0),
            console.warn(
              "Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/microsoft/monaco-editor#faq"
            )),
          console.warn(d.message));
      }
      t.logOnceWebWorkerWarning = l;
      class f {
        constructor(v) {
          (this._workerId = -1),
            (this._handler = v),
            (this._lastSentReq = 0),
            (this._pendingReplies = Object.create(null));
        }
        setWorkerId(v) {
          this._workerId = v;
        }
        sendMessage(v, i) {
          let o = String(++this._lastSentReq);
          return new Promise((_, L) => {
            (this._pendingReplies[o] = { resolve: _, reject: L }),
              this._send({
                vsWorker: this._workerId,
                req: o,
                method: v,
                args: i,
              });
          });
        }
        handleMessage(v) {
          !v ||
            !v.vsWorker ||
            (this._workerId !== -1 && v.vsWorker !== this._workerId) ||
            this._handleMessage(v);
        }
        _handleMessage(v) {
          if (v.seq) {
            let L = v;
            if (!this._pendingReplies[L.seq]) {
              console.warn("Got reply to unknown seq");
              return;
            }
            let n = this._pendingReplies[L.seq];
            if ((delete this._pendingReplies[L.seq], L.err)) {
              let r = L.err;
              L.err.$isError &&
                ((r = new Error()),
                (r.name = L.err.name),
                (r.message = L.err.message),
                (r.stack = L.err.stack)),
                n.reject(r);
              return;
            }
            n.resolve(L.res);
            return;
          }
          let i = v,
            o = i.req;
          this._handler.handleMessage(i.method, i.args).then(
            (L) => {
              this._send({
                vsWorker: this._workerId,
                seq: o,
                res: L,
                err: void 0,
              });
            },
            (L) => {
              L.detail instanceof Error &&
                (L.detail = (0, E.transformErrorForSerialization)(L.detail)),
                this._send({
                  vsWorker: this._workerId,
                  seq: o,
                  res: void 0,
                  err: (0, E.transformErrorForSerialization)(L),
                });
            }
          );
        }
        _send(v) {
          let i = [];
          if (v.req) {
            const o = v;
            for (let _ = 0; _ < o.args.length; _++)
              o.args[_] instanceof ArrayBuffer && i.push(o.args[_]);
          } else {
            const o = v;
            o.res instanceof ArrayBuffer && i.push(o.res);
          }
          this._handler.sendMessage(v, i);
        }
      }
      class S extends y.Disposable {
        constructor(v, i, o) {
          super();
          let _ = null;
          (this._worker = this._register(
            v.create(
              "vs/base/common/worker/simpleWorker",
              (u) => {
                this._protocol.handleMessage(u);
              },
              (u) => {
                _ && _(u);
              }
            )
          )),
            (this._protocol = new f({
              sendMessage: (u, m) => {
                this._worker.postMessage(u, m);
              },
              handleMessage: (u, m) => {
                if (typeof o[u] != "function")
                  return Promise.reject(
                    new Error("Missing method " + u + " on main thread host.")
                  );
                try {
                  return Promise.resolve(o[u].apply(o, m));
                } catch (C) {
                  return Promise.reject(C);
                }
              },
            })),
            this._protocol.setWorkerId(this._worker.getId());
          let L = null;
          typeof self.require != "undefined" &&
          typeof self.require.getConfig == "function"
            ? (L = self.require.getConfig())
            : typeof self.requirejs != "undefined" &&
              (L = self.requirejs.s.contexts._.config);
          const n = s.getAllMethodNames(o);
          this._onModuleLoaded = this._protocol.sendMessage(h, [
            this._worker.getId(),
            JSON.parse(JSON.stringify(L)),
            i,
            n,
          ]);
          const r = (u, m) => this._request(u, m);
          this._lazyProxy = new Promise((u, m) => {
            (_ = m),
              this._onModuleLoaded.then(
                (C) => {
                  u(s.createProxyObject(C, r));
                },
                (C) => {
                  m(C), this._onError("Worker failed to load " + i, C);
                }
              );
          });
        }
        getProxyObject() {
          return this._lazyProxy;
        }
        _request(v, i) {
          return new Promise((o, _) => {
            this._onModuleLoaded.then(() => {
              this._protocol.sendMessage(v, i).then(o, _);
            }, _);
          });
        }
        _onError(v, i) {
          console.error(v), console.info(i);
        }
      }
      t.SimpleWorkerClient = S;
      class c {
        constructor(v, i) {
          (this._requestHandlerFactory = i),
            (this._requestHandler = null),
            (this._protocol = new f({
              sendMessage: (o, _) => {
                v(o, _);
              },
              handleMessage: (o, _) => this._handleMessage(o, _),
            }));
        }
        onmessage(v) {
          this._protocol.handleMessage(v);
        }
        _handleMessage(v, i) {
          if (v === h) return this.initialize(i[0], i[1], i[2], i[3]);
          if (
            !this._requestHandler ||
            typeof this._requestHandler[v] != "function"
          )
            return Promise.reject(
              new Error("Missing requestHandler or method: " + v)
            );
          try {
            return Promise.resolve(
              this._requestHandler[v].apply(this._requestHandler, i)
            );
          } catch (o) {
            return Promise.reject(o);
          }
        }
        initialize(v, i, o, _) {
          this._protocol.setWorkerId(v);
          const L = (r, u) => this._protocol.sendMessage(r, u),
            n = s.createProxyObject(_, L);
          return this._requestHandlerFactory
            ? ((this._requestHandler = this._requestHandlerFactory(n)),
              Promise.resolve(s.getAllMethodNames(this._requestHandler)))
            : (i &&
                (typeof i.baseUrl != "undefined" && delete i.baseUrl,
                typeof i.paths != "undefined" &&
                  typeof i.paths.vs != "undefined" &&
                  delete i.paths.vs,
                typeof i.trustedTypesPolicy !== void 0 &&
                  delete i.trustedTypesPolicy,
                (i.catchError = !0),
                self.require.config(i)),
              new Promise((r, u) => {
                self.require(
                  [o],
                  (m) => {
                    if (
                      ((this._requestHandler = m.create(n)),
                      !this._requestHandler)
                    ) {
                      u(new Error("No RequestHandler!"));
                      return;
                    }
                    r(s.getAllMethodNames(this._requestHandler));
                  },
                  u
                );
              }));
        }
      }
      t.SimpleWorkerServer = c;
      function g(d) {
        return new c(d, null);
      }
      t.create = g;
    }),
    $(z[23], V([0, 1, 12]), function (I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CharacterSet = t.CharacterClassifier = void 0);
      class y {
        constructor(h) {
          let a = (0, E.toUint8)(h);
          (this._defaultValue = a),
            (this._asciiMap = y._createAsciiMap(a)),
            (this._map = new Map());
        }
        static _createAsciiMap(h) {
          let a = new Uint8Array(256);
          for (let l = 0; l < 256; l++) a[l] = h;
          return a;
        }
        set(h, a) {
          let l = (0, E.toUint8)(a);
          h >= 0 && h < 256 ? (this._asciiMap[h] = l) : this._map.set(h, l);
        }
        get(h) {
          return h >= 0 && h < 256
            ? this._asciiMap[h]
            : this._map.get(h) || this._defaultValue;
        }
      }
      t.CharacterClassifier = y;
      class p {
        constructor() {
          this._actual = new y(0);
        }
        add(h) {
          this._actual.set(h, 1);
        }
        has(h) {
          return this._actual.get(h) === 1;
        }
      }
      t.CharacterSet = p;
    }),
    $(z[3], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Position = void 0);
      class E {
        constructor(p, s) {
          (this.lineNumber = p), (this.column = s);
        }
        with(p = this.lineNumber, s = this.column) {
          return p === this.lineNumber && s === this.column
            ? this
            : new E(p, s);
        }
        delta(p = 0, s = 0) {
          return this.with(this.lineNumber + p, this.column + s);
        }
        equals(p) {
          return E.equals(this, p);
        }
        static equals(p, s) {
          return !p && !s
            ? !0
            : !!p &&
                !!s &&
                p.lineNumber === s.lineNumber &&
                p.column === s.column;
        }
        isBefore(p) {
          return E.isBefore(this, p);
        }
        static isBefore(p, s) {
          return p.lineNumber < s.lineNumber
            ? !0
            : s.lineNumber < p.lineNumber
            ? !1
            : p.column < s.column;
        }
        isBeforeOrEqual(p) {
          return E.isBeforeOrEqual(this, p);
        }
        static isBeforeOrEqual(p, s) {
          return p.lineNumber < s.lineNumber
            ? !0
            : s.lineNumber < p.lineNumber
            ? !1
            : p.column <= s.column;
        }
        static compare(p, s) {
          let h = p.lineNumber | 0,
            a = s.lineNumber | 0;
          if (h === a) {
            let l = p.column | 0,
              f = s.column | 0;
            return l - f;
          }
          return h - a;
        }
        clone() {
          return new E(this.lineNumber, this.column);
        }
        toString() {
          return "(" + this.lineNumber + "," + this.column + ")";
        }
        static lift(p) {
          return new E(p.lineNumber, p.column);
        }
        static isIPosition(p) {
          return (
            p && typeof p.lineNumber == "number" && typeof p.column == "number"
          );
        }
      }
      t.Position = E;
    }),
    $(z[6], V([0, 1, 3]), function (I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }), (t.Range = void 0);
      class y {
        constructor(s, h, a, l) {
          s > a || (s === a && h > l)
            ? ((this.startLineNumber = a),
              (this.startColumn = l),
              (this.endLineNumber = s),
              (this.endColumn = h))
            : ((this.startLineNumber = s),
              (this.startColumn = h),
              (this.endLineNumber = a),
              (this.endColumn = l));
        }
        isEmpty() {
          return y.isEmpty(this);
        }
        static isEmpty(s) {
          return (
            s.startLineNumber === s.endLineNumber &&
            s.startColumn === s.endColumn
          );
        }
        containsPosition(s) {
          return y.containsPosition(this, s);
        }
        static containsPosition(s, h) {
          return !(
            h.lineNumber < s.startLineNumber ||
            h.lineNumber > s.endLineNumber ||
            (h.lineNumber === s.startLineNumber && h.column < s.startColumn) ||
            (h.lineNumber === s.endLineNumber && h.column > s.endColumn)
          );
        }
        containsRange(s) {
          return y.containsRange(this, s);
        }
        static containsRange(s, h) {
          return !(
            h.startLineNumber < s.startLineNumber ||
            h.endLineNumber < s.startLineNumber ||
            h.startLineNumber > s.endLineNumber ||
            h.endLineNumber > s.endLineNumber ||
            (h.startLineNumber === s.startLineNumber &&
              h.startColumn < s.startColumn) ||
            (h.endLineNumber === s.endLineNumber && h.endColumn > s.endColumn)
          );
        }
        strictContainsRange(s) {
          return y.strictContainsRange(this, s);
        }
        static strictContainsRange(s, h) {
          return !(
            h.startLineNumber < s.startLineNumber ||
            h.endLineNumber < s.startLineNumber ||
            h.startLineNumber > s.endLineNumber ||
            h.endLineNumber > s.endLineNumber ||
            (h.startLineNumber === s.startLineNumber &&
              h.startColumn <= s.startColumn) ||
            (h.endLineNumber === s.endLineNumber && h.endColumn >= s.endColumn)
          );
        }
        plusRange(s) {
          return y.plusRange(this, s);
        }
        static plusRange(s, h) {
          let a, l, f, S;
          return (
            h.startLineNumber < s.startLineNumber
              ? ((a = h.startLineNumber), (l = h.startColumn))
              : h.startLineNumber === s.startLineNumber
              ? ((a = h.startLineNumber),
                (l = Math.min(h.startColumn, s.startColumn)))
              : ((a = s.startLineNumber), (l = s.startColumn)),
            h.endLineNumber > s.endLineNumber
              ? ((f = h.endLineNumber), (S = h.endColumn))
              : h.endLineNumber === s.endLineNumber
              ? ((f = h.endLineNumber),
                (S = Math.max(h.endColumn, s.endColumn)))
              : ((f = s.endLineNumber), (S = s.endColumn)),
            new y(a, l, f, S)
          );
        }
        intersectRanges(s) {
          return y.intersectRanges(this, s);
        }
        static intersectRanges(s, h) {
          let a = s.startLineNumber,
            l = s.startColumn,
            f = s.endLineNumber,
            S = s.endColumn,
            c = h.startLineNumber,
            g = h.startColumn,
            d = h.endLineNumber,
            v = h.endColumn;
          return (
            a < c ? ((a = c), (l = g)) : a === c && (l = Math.max(l, g)),
            f > d ? ((f = d), (S = v)) : f === d && (S = Math.min(S, v)),
            a > f || (a === f && l > S) ? null : new y(a, l, f, S)
          );
        }
        equalsRange(s) {
          return y.equalsRange(this, s);
        }
        static equalsRange(s, h) {
          return (
            !!s &&
            !!h &&
            s.startLineNumber === h.startLineNumber &&
            s.startColumn === h.startColumn &&
            s.endLineNumber === h.endLineNumber &&
            s.endColumn === h.endColumn
          );
        }
        getEndPosition() {
          return y.getEndPosition(this);
        }
        static getEndPosition(s) {
          return new E.Position(s.endLineNumber, s.endColumn);
        }
        getStartPosition() {
          return y.getStartPosition(this);
        }
        static getStartPosition(s) {
          return new E.Position(s.startLineNumber, s.startColumn);
        }
        toString() {
          return (
            "[" +
            this.startLineNumber +
            "," +
            this.startColumn +
            " -> " +
            this.endLineNumber +
            "," +
            this.endColumn +
            "]"
          );
        }
        setEndPosition(s, h) {
          return new y(this.startLineNumber, this.startColumn, s, h);
        }
        setStartPosition(s, h) {
          return new y(s, h, this.endLineNumber, this.endColumn);
        }
        collapseToStart() {
          return y.collapseToStart(this);
        }
        static collapseToStart(s) {
          return new y(
            s.startLineNumber,
            s.startColumn,
            s.startLineNumber,
            s.startColumn
          );
        }
        static fromPositions(s, h = s) {
          return new y(s.lineNumber, s.column, h.lineNumber, h.column);
        }
        static lift(s) {
          return s
            ? new y(
                s.startLineNumber,
                s.startColumn,
                s.endLineNumber,
                s.endColumn
              )
            : null;
        }
        static isIRange(s) {
          return (
            s &&
            typeof s.startLineNumber == "number" &&
            typeof s.startColumn == "number" &&
            typeof s.endLineNumber == "number" &&
            typeof s.endColumn == "number"
          );
        }
        static areIntersectingOrTouching(s, h) {
          return !(
            s.endLineNumber < h.startLineNumber ||
            (s.endLineNumber === h.startLineNumber &&
              s.endColumn < h.startColumn) ||
            h.endLineNumber < s.startLineNumber ||
            (h.endLineNumber === s.startLineNumber &&
              h.endColumn < s.startColumn)
          );
        }
        static areIntersecting(s, h) {
          return !(
            s.endLineNumber < h.startLineNumber ||
            (s.endLineNumber === h.startLineNumber &&
              s.endColumn <= h.startColumn) ||
            h.endLineNumber < s.startLineNumber ||
            (h.endLineNumber === s.startLineNumber &&
              h.endColumn <= s.startColumn)
          );
        }
        static compareRangesUsingStarts(s, h) {
          if (s && h) {
            const f = s.startLineNumber | 0,
              S = h.startLineNumber | 0;
            if (f === S) {
              const c = s.startColumn | 0,
                g = h.startColumn | 0;
              if (c === g) {
                const d = s.endLineNumber | 0,
                  v = h.endLineNumber | 0;
                if (d === v) {
                  const i = s.endColumn | 0,
                    o = h.endColumn | 0;
                  return i - o;
                }
                return d - v;
              }
              return c - g;
            }
            return f - S;
          }
          return (s ? 1 : 0) - (h ? 1 : 0);
        }
        static compareRangesUsingEnds(s, h) {
          return s.endLineNumber === h.endLineNumber
            ? s.endColumn === h.endColumn
              ? s.startLineNumber === h.startLineNumber
                ? s.startColumn - h.startColumn
                : s.startLineNumber - h.startLineNumber
              : s.endColumn - h.endColumn
            : s.endLineNumber - h.endLineNumber;
        }
        static spansMultipleLines(s) {
          return s.endLineNumber > s.startLineNumber;
        }
      }
      t.Range = y;
    }),
    $(z[24], V([0, 1, 3, 6]), function (I, t, E, y) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Selection = void 0);
      class p extends y.Range {
        constructor(h, a, l, f) {
          super(h, a, l, f);
          (this.selectionStartLineNumber = h),
            (this.selectionStartColumn = a),
            (this.positionLineNumber = l),
            (this.positionColumn = f);
        }
        toString() {
          return (
            "[" +
            this.selectionStartLineNumber +
            "," +
            this.selectionStartColumn +
            " -> " +
            this.positionLineNumber +
            "," +
            this.positionColumn +
            "]"
          );
        }
        equalsSelection(h) {
          return p.selectionsEqual(this, h);
        }
        static selectionsEqual(h, a) {
          return (
            h.selectionStartLineNumber === a.selectionStartLineNumber &&
            h.selectionStartColumn === a.selectionStartColumn &&
            h.positionLineNumber === a.positionLineNumber &&
            h.positionColumn === a.positionColumn
          );
        }
        getDirection() {
          return this.selectionStartLineNumber === this.startLineNumber &&
            this.selectionStartColumn === this.startColumn
            ? 0
            : 1;
        }
        setEndPosition(h, a) {
          return this.getDirection() === 0
            ? new p(this.startLineNumber, this.startColumn, h, a)
            : new p(h, a, this.startLineNumber, this.startColumn);
        }
        getPosition() {
          return new E.Position(this.positionLineNumber, this.positionColumn);
        }
        setStartPosition(h, a) {
          return this.getDirection() === 0
            ? new p(h, a, this.endLineNumber, this.endColumn)
            : new p(this.endLineNumber, this.endColumn, h, a);
        }
        static fromPositions(h, a = h) {
          return new p(h.lineNumber, h.column, a.lineNumber, a.column);
        }
        static liftSelection(h) {
          return new p(
            h.selectionStartLineNumber,
            h.selectionStartColumn,
            h.positionLineNumber,
            h.positionColumn
          );
        }
        static selectionsArrEqual(h, a) {
          if ((h && !a) || (!h && a)) return !1;
          if (!h && !a) return !0;
          if (h.length !== a.length) return !1;
          for (let l = 0, f = h.length; l < f; l++)
            if (!this.selectionsEqual(h[l], a[l])) return !1;
          return !0;
        }
        static isISelection(h) {
          return (
            h &&
            typeof h.selectionStartLineNumber == "number" &&
            typeof h.selectionStartColumn == "number" &&
            typeof h.positionLineNumber == "number" &&
            typeof h.positionColumn == "number"
          );
        }
        static createWithDirection(h, a, l, f, S) {
          return S === 0 ? new p(h, a, l, f) : new p(l, f, h, a);
        }
      }
      t.Selection = p;
    }),
    $(z[25], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.TokenizationResult2 = t.TokenizationResult = t.Token = void 0);
      class E {
        constructor(h, a, l) {
          (this._tokenBrand = void 0),
            (this.offset = h | 0),
            (this.type = a),
            (this.language = l);
        }
        toString() {
          return "(" + this.offset + ", " + this.type + ")";
        }
      }
      t.Token = E;
      class y {
        constructor(h, a) {
          (this._tokenizationResultBrand = void 0),
            (this.tokens = h),
            (this.endState = a);
        }
      }
      t.TokenizationResult = y;
      class p {
        constructor(h, a) {
          (this._tokenizationResult2Brand = void 0),
            (this.tokens = h),
            (this.endState = a);
        }
      }
      t.TokenizationResult2 = p;
    }),
    $(z[26], V([0, 1, 10, 5]), function (I, t, E, y) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DiffComputer = void 0);
      const p = 3;
      function s(i, o, _, L) {
        return new E.LcsDiff(i, o, _).ComputeDiff(L);
      }
      class h {
        constructor(o) {
          const _ = [],
            L = [];
          for (let n = 0, r = o.length; n < r; n++)
            (_[n] = g(o[n], 1)), (L[n] = d(o[n], 1));
          (this.lines = o), (this._startColumns = _), (this._endColumns = L);
        }
        getElements() {
          const o = [];
          for (let _ = 0, L = this.lines.length; _ < L; _++)
            o[_] = this.lines[_].substring(
              this._startColumns[_] - 1,
              this._endColumns[_] - 1
            );
          return o;
        }
        getStrictElement(o) {
          return this.lines[o];
        }
        getStartLineNumber(o) {
          return o + 1;
        }
        getEndLineNumber(o) {
          return o + 1;
        }
        createCharSequence(o, _, L) {
          const n = [],
            r = [],
            u = [];
          let m = 0;
          for (let C = _; C <= L; C++) {
            const b = this.lines[C],
              N = o ? this._startColumns[C] : 1,
              w = o ? this._endColumns[C] : b.length + 1;
            for (let M = N; M < w; M++)
              (n[m] = b.charCodeAt(M - 1)), (r[m] = C + 1), (u[m] = M), m++;
          }
          return new a(n, r, u);
        }
      }
      class a {
        constructor(o, _, L) {
          (this._charCodes = o), (this._lineNumbers = _), (this._columns = L);
        }
        getElements() {
          return this._charCodes;
        }
        getStartLineNumber(o) {
          return this._lineNumbers[o];
        }
        getStartColumn(o) {
          return this._columns[o];
        }
        getEndLineNumber(o) {
          return this._lineNumbers[o];
        }
        getEndColumn(o) {
          return this._columns[o] + 1;
        }
      }
      class l {
        constructor(o, _, L, n, r, u, m, C) {
          (this.originalStartLineNumber = o),
            (this.originalStartColumn = _),
            (this.originalEndLineNumber = L),
            (this.originalEndColumn = n),
            (this.modifiedStartLineNumber = r),
            (this.modifiedStartColumn = u),
            (this.modifiedEndLineNumber = m),
            (this.modifiedEndColumn = C);
        }
        static createFromDiffChange(o, _, L) {
          let n, r, u, m, C, b, N, w;
          return (
            o.originalLength === 0
              ? ((n = 0), (r = 0), (u = 0), (m = 0))
              : ((n = _.getStartLineNumber(o.originalStart)),
                (r = _.getStartColumn(o.originalStart)),
                (u = _.getEndLineNumber(
                  o.originalStart + o.originalLength - 1
                )),
                (m = _.getEndColumn(o.originalStart + o.originalLength - 1))),
            o.modifiedLength === 0
              ? ((C = 0), (b = 0), (N = 0), (w = 0))
              : ((C = L.getStartLineNumber(o.modifiedStart)),
                (b = L.getStartColumn(o.modifiedStart)),
                (N = L.getEndLineNumber(
                  o.modifiedStart + o.modifiedLength - 1
                )),
                (w = L.getEndColumn(o.modifiedStart + o.modifiedLength - 1))),
            new l(n, r, u, m, C, b, N, w)
          );
        }
      }
      function f(i) {
        if (i.length <= 1) return i;
        const o = [i[0]];
        let _ = o[0];
        for (let L = 1, n = i.length; L < n; L++) {
          const r = i[L],
            u = r.originalStart - (_.originalStart + _.originalLength),
            m = r.modifiedStart - (_.modifiedStart + _.modifiedLength);
          Math.min(u, m) < p
            ? ((_.originalLength =
                r.originalStart + r.originalLength - _.originalStart),
              (_.modifiedLength =
                r.modifiedStart + r.modifiedLength - _.modifiedStart))
            : (o.push(r), (_ = r));
        }
        return o;
      }
      class S {
        constructor(o, _, L, n, r) {
          (this.originalStartLineNumber = o),
            (this.originalEndLineNumber = _),
            (this.modifiedStartLineNumber = L),
            (this.modifiedEndLineNumber = n),
            (this.charChanges = r);
        }
        static createFromDiffResult(o, _, L, n, r, u, m) {
          let C, b, N, w, M;
          if (
            (_.originalLength === 0
              ? ((C = L.getStartLineNumber(_.originalStart) - 1), (b = 0))
              : ((C = L.getStartLineNumber(_.originalStart)),
                (b = L.getEndLineNumber(
                  _.originalStart + _.originalLength - 1
                ))),
            _.modifiedLength === 0
              ? ((N = n.getStartLineNumber(_.modifiedStart) - 1), (w = 0))
              : ((N = n.getStartLineNumber(_.modifiedStart)),
                (w = n.getEndLineNumber(
                  _.modifiedStart + _.modifiedLength - 1
                ))),
            u &&
              _.originalLength > 0 &&
              _.originalLength < 20 &&
              _.modifiedLength > 0 &&
              _.modifiedLength < 20 &&
              r())
          ) {
            const P = L.createCharSequence(
                o,
                _.originalStart,
                _.originalStart + _.originalLength - 1
              ),
              U = n.createCharSequence(
                o,
                _.modifiedStart,
                _.modifiedStart + _.modifiedLength - 1
              );
            let R = s(P, U, r, !0).changes;
            m && (R = f(R)), (M = []);
            for (let W = 0, Y = R.length; W < Y; W++)
              M.push(l.createFromDiffChange(R[W], P, U));
          }
          return new S(C, b, N, w, M);
        }
      }
      class c {
        constructor(o, _, L) {
          (this.shouldComputeCharChanges = L.shouldComputeCharChanges),
            (this.shouldPostProcessCharChanges =
              L.shouldPostProcessCharChanges),
            (this.shouldIgnoreTrimWhitespace = L.shouldIgnoreTrimWhitespace),
            (this.shouldMakePrettyDiff = L.shouldMakePrettyDiff),
            (this.originalLines = o),
            (this.modifiedLines = _),
            (this.original = new h(o)),
            (this.modified = new h(_)),
            (this.continueLineDiff = v(L.maxComputationTime)),
            (this.continueCharDiff = v(
              L.maxComputationTime === 0
                ? 0
                : Math.min(L.maxComputationTime, 5e3)
            ));
        }
        computeDiff() {
          if (
            this.original.lines.length === 1 &&
            this.original.lines[0].length === 0
          )
            return this.modified.lines.length === 1 &&
              this.modified.lines[0].length === 0
              ? { quitEarly: !1, changes: [] }
              : {
                  quitEarly: !1,
                  changes: [
                    {
                      originalStartLineNumber: 1,
                      originalEndLineNumber: 1,
                      modifiedStartLineNumber: 1,
                      modifiedEndLineNumber: this.modified.lines.length,
                      charChanges: [
                        {
                          modifiedEndColumn: 0,
                          modifiedEndLineNumber: 0,
                          modifiedStartColumn: 0,
                          modifiedStartLineNumber: 0,
                          originalEndColumn: 0,
                          originalEndLineNumber: 0,
                          originalStartColumn: 0,
                          originalStartLineNumber: 0,
                        },
                      ],
                    },
                  ],
                };
          if (
            this.modified.lines.length === 1 &&
            this.modified.lines[0].length === 0
          )
            return {
              quitEarly: !1,
              changes: [
                {
                  originalStartLineNumber: 1,
                  originalEndLineNumber: this.original.lines.length,
                  modifiedStartLineNumber: 1,
                  modifiedEndLineNumber: 1,
                  charChanges: [
                    {
                      modifiedEndColumn: 0,
                      modifiedEndLineNumber: 0,
                      modifiedStartColumn: 0,
                      modifiedStartLineNumber: 0,
                      originalEndColumn: 0,
                      originalEndLineNumber: 0,
                      originalStartColumn: 0,
                      originalStartLineNumber: 0,
                    },
                  ],
                },
              ],
            };
          const o = s(
              this.original,
              this.modified,
              this.continueLineDiff,
              this.shouldMakePrettyDiff
            ),
            _ = o.changes,
            L = o.quitEarly;
          if (this.shouldIgnoreTrimWhitespace) {
            const m = [];
            for (let C = 0, b = _.length; C < b; C++)
              m.push(
                S.createFromDiffResult(
                  this.shouldIgnoreTrimWhitespace,
                  _[C],
                  this.original,
                  this.modified,
                  this.continueCharDiff,
                  this.shouldComputeCharChanges,
                  this.shouldPostProcessCharChanges
                )
              );
            return { quitEarly: L, changes: m };
          }
          const n = [];
          let r = 0,
            u = 0;
          for (let m = -1, C = _.length; m < C; m++) {
            const b = m + 1 < C ? _[m + 1] : null,
              N = b ? b.originalStart : this.originalLines.length,
              w = b ? b.modifiedStart : this.modifiedLines.length;
            for (; r < N && u < w; ) {
              const M = this.originalLines[r],
                P = this.modifiedLines[u];
              if (M !== P) {
                {
                  let U = g(M, 1),
                    R = g(P, 1);
                  for (; U > 1 && R > 1; ) {
                    const W = M.charCodeAt(U - 2),
                      Y = P.charCodeAt(R - 2);
                    if (W !== Y) break;
                    U--, R--;
                  }
                  (U > 1 || R > 1) &&
                    this._pushTrimWhitespaceCharChange(
                      n,
                      r + 1,
                      1,
                      U,
                      u + 1,
                      1,
                      R
                    );
                }
                {
                  let U = d(M, 1),
                    R = d(P, 1);
                  const W = M.length + 1,
                    Y = P.length + 1;
                  for (; U < W && R < Y; ) {
                    const k = M.charCodeAt(U - 1),
                      F = M.charCodeAt(R - 1);
                    if (k !== F) break;
                    U++, R++;
                  }
                  (U < W || R < Y) &&
                    this._pushTrimWhitespaceCharChange(
                      n,
                      r + 1,
                      U,
                      W,
                      u + 1,
                      R,
                      Y
                    );
                }
              }
              r++, u++;
            }
            b &&
              (n.push(
                S.createFromDiffResult(
                  this.shouldIgnoreTrimWhitespace,
                  b,
                  this.original,
                  this.modified,
                  this.continueCharDiff,
                  this.shouldComputeCharChanges,
                  this.shouldPostProcessCharChanges
                )
              ),
              (r += b.originalLength),
              (u += b.modifiedLength));
          }
          return { quitEarly: L, changes: n };
        }
        _pushTrimWhitespaceCharChange(o, _, L, n, r, u, m) {
          if (this._mergeTrimWhitespaceCharChange(o, _, L, n, r, u, m)) return;
          let C;
          this.shouldComputeCharChanges &&
            (C = [new l(_, L, _, n, r, u, r, m)]),
            o.push(new S(_, _, r, r, C));
        }
        _mergeTrimWhitespaceCharChange(o, _, L, n, r, u, m) {
          const C = o.length;
          if (C === 0) return !1;
          const b = o[C - 1];
          return b.originalEndLineNumber === 0 || b.modifiedEndLineNumber === 0
            ? !1
            : b.originalEndLineNumber + 1 === _ &&
              b.modifiedEndLineNumber + 1 === r
            ? ((b.originalEndLineNumber = _),
              (b.modifiedEndLineNumber = r),
              this.shouldComputeCharChanges &&
                b.charChanges &&
                b.charChanges.push(new l(_, L, _, n, r, u, r, m)),
              !0)
            : !1;
        }
      }
      t.DiffComputer = c;
      function g(i, o) {
        const _ = y.firstNonWhitespaceIndex(i);
        return _ === -1 ? o : _ + 1;
      }
      function d(i, o) {
        const _ = y.lastNonWhitespaceIndex(i);
        return _ === -1 ? o : _ + 2;
      }
      function v(i) {
        if (i === 0) return () => !0;
        const o = Date.now();
        return () => Date.now() - o < i;
      }
    }),
    $(z[27], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getWordAtText =
          t.ensureValidWordDefinition =
          t.DEFAULT_WORD_REGEXP =
          t.USUAL_WORD_SEPARATORS =
            void 0),
        (t.USUAL_WORD_SEPARATORS = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?");
      function E(a = "") {
        let l = "(-?\\d*\\.\\d\\w*)|([^";
        for (const f of t.USUAL_WORD_SEPARATORS)
          a.indexOf(f) >= 0 || (l += "\\" + f);
        return (l += "\\s]+)"), new RegExp(l, "g");
      }
      t.DEFAULT_WORD_REGEXP = E();
      function y(a) {
        let l = t.DEFAULT_WORD_REGEXP;
        if (a && a instanceof RegExp)
          if (a.global) l = a;
          else {
            let f = "g";
            a.ignoreCase && (f += "i"),
              a.multiline && (f += "m"),
              a.unicode && (f += "u"),
              (l = new RegExp(a.source, f));
          }
        return (l.lastIndex = 0), l;
      }
      t.ensureValidWordDefinition = y;
      const p = { maxLen: 1e3, windowSize: 15, timeBudget: 150 };
      function s(a, l, f, S, c = p) {
        if (f.length > c.maxLen) {
          let o = a - c.maxLen / 2;
          return (
            o < 0 ? (o = 0) : (S += o),
            (f = f.substring(o, a + c.maxLen / 2)),
            s(a, l, f, S, c)
          );
        }
        const g = Date.now(),
          d = a - 1 - S;
        let v = -1,
          i = null;
        for (let o = 1; !(Date.now() - g >= c.timeBudget); o++) {
          const _ = d - c.windowSize * o;
          l.lastIndex = Math.max(0, _);
          const L = h(l, f, d, v);
          if ((!L && i) || ((i = L), _ <= 0)) break;
          v = _;
        }
        if (i) {
          let o = {
            word: i[0],
            startColumn: S + 1 + i.index,
            endColumn: S + 1 + i.index + i[0].length,
          };
          return (l.lastIndex = 0), o;
        }
        return null;
      }
      t.getWordAtText = s;
      function h(a, l, f, S) {
        let c;
        for (; (c = a.exec(l)); ) {
          const g = c.index || 0;
          if (g <= f && a.lastIndex >= f) return c;
          if (S > 0 && g > S) return null;
        }
        return null;
      }
    }),
    $(z[28], V([0, 1, 23]), function (I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.computeLinks =
          t.LinkComputer =
          t.StateMachine =
          t.Uint8Matrix =
            void 0);
      class y {
        constructor(g, d, v) {
          const i = new Uint8Array(g * d);
          for (let o = 0, _ = g * d; o < _; o++) i[o] = v;
          (this._data = i), (this.rows = g), (this.cols = d);
        }
        get(g, d) {
          return this._data[g * this.cols + d];
        }
        set(g, d, v) {
          this._data[g * this.cols + d] = v;
        }
      }
      t.Uint8Matrix = y;
      class p {
        constructor(g) {
          let d = 0,
            v = 0;
          for (let o = 0, _ = g.length; o < _; o++) {
            let [L, n, r] = g[o];
            n > d && (d = n), L > v && (v = L), r > v && (v = r);
          }
          d++, v++;
          let i = new y(v, d, 0);
          for (let o = 0, _ = g.length; o < _; o++) {
            let [L, n, r] = g[o];
            i.set(L, n, r);
          }
          (this._states = i), (this._maxCharCode = d);
        }
        nextState(g, d) {
          return d < 0 || d >= this._maxCharCode ? 0 : this._states.get(g, d);
        }
      }
      t.StateMachine = p;
      let s = null;
      function h() {
        return (
          s === null &&
            (s = new p([
              [1, 104, 2],
              [1, 72, 2],
              [1, 102, 6],
              [1, 70, 6],
              [2, 116, 3],
              [2, 84, 3],
              [3, 116, 4],
              [3, 84, 4],
              [4, 112, 5],
              [4, 80, 5],
              [5, 115, 9],
              [5, 83, 9],
              [5, 58, 10],
              [6, 105, 7],
              [6, 73, 7],
              [7, 108, 8],
              [7, 76, 8],
              [8, 101, 9],
              [8, 69, 9],
              [9, 58, 10],
              [10, 47, 11],
              [11, 47, 12],
            ])),
          s
        );
      }
      let a = null;
      function l() {
        if (a === null) {
          a = new E.CharacterClassifier(0);
          const c = ` 	<>'"\u3001\u3002\uFF61\uFF64\uFF0C\uFF0E\uFF1A\uFF1B\u2018\u3008\u300C\u300E\u3014\uFF08\uFF3B\uFF5B\uFF62\uFF63\uFF5D\uFF3D\uFF09\u3015\u300F\u300D\u3009\u2019\uFF40\uFF5E\u2026`;
          for (let d = 0; d < c.length; d++) a.set(c.charCodeAt(d), 1);
          const g = ".,;";
          for (let d = 0; d < g.length; d++) a.set(g.charCodeAt(d), 2);
        }
        return a;
      }
      class f {
        static _createLink(g, d, v, i, o) {
          let _ = o - 1;
          do {
            const L = d.charCodeAt(_);
            if (g.get(L) !== 2) break;
            _--;
          } while (_ > i);
          if (i > 0) {
            const L = d.charCodeAt(i - 1),
              n = d.charCodeAt(_);
            ((L === 40 && n === 41) ||
              (L === 91 && n === 93) ||
              (L === 123 && n === 125)) &&
              _--;
          }
          return {
            range: {
              startLineNumber: v,
              startColumn: i + 1,
              endLineNumber: v,
              endColumn: _ + 2,
            },
            url: d.substring(i, _ + 1),
          };
        }
        static computeLinks(g, d = h()) {
          const v = l();
          let i = [];
          for (let o = 1, _ = g.getLineCount(); o <= _; o++) {
            const L = g.getLineContent(o),
              n = L.length;
            let r = 0,
              u = 0,
              m = 0,
              C = 1,
              b = !1,
              N = !1,
              w = !1,
              M = !1;
            for (; r < n; ) {
              let P = !1;
              const U = L.charCodeAt(r);
              if (C === 13) {
                let R;
                switch (U) {
                  case 40:
                    (b = !0), (R = 0);
                    break;
                  case 41:
                    R = b ? 0 : 1;
                    break;
                  case 91:
                    (w = !0), (N = !0), (R = 0);
                    break;
                  case 93:
                    (w = !1), (R = N ? 0 : 1);
                    break;
                  case 123:
                    (M = !0), (R = 0);
                    break;
                  case 125:
                    R = M ? 0 : 1;
                    break;
                  case 39:
                    R = m === 34 || m === 96 ? 0 : 1;
                    break;
                  case 34:
                    R = m === 39 || m === 96 ? 0 : 1;
                    break;
                  case 96:
                    R = m === 39 || m === 34 ? 0 : 1;
                    break;
                  case 42:
                    R = m === 42 ? 1 : 0;
                    break;
                  case 124:
                    R = m === 124 ? 1 : 0;
                    break;
                  case 32:
                    R = w ? 0 : 1;
                    break;
                  default:
                    R = v.get(U);
                }
                R === 1 && (i.push(f._createLink(v, L, o, u, r)), (P = !0));
              } else if (C === 12) {
                let R;
                U === 91 ? ((N = !0), (R = 0)) : (R = v.get(U)),
                  R === 1 ? (P = !0) : (C = 13);
              } else (C = d.nextState(C, U)), C === 0 && (P = !0);
              P &&
                ((C = 1), (b = !1), (N = !1), (M = !1), (u = r + 1), (m = U)),
                r++;
            }
            C === 13 && i.push(f._createLink(v, L, o, u, n));
          }
          return i;
        }
      }
      t.LinkComputer = f;
      function S(c) {
        return !c ||
          typeof c.getLineCount != "function" ||
          typeof c.getLineContent != "function"
          ? []
          : f.computeLinks(c);
      }
      t.computeLinks = S;
    }),
    $(z[29], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BasicInplaceReplace = void 0);
      class E {
        constructor() {
          this._defaultValueSet = [
            ["true", "false"],
            ["True", "False"],
            [
              "Private",
              "Public",
              "Friend",
              "ReadOnly",
              "Partial",
              "Protected",
              "WriteOnly",
            ],
            ["public", "protected", "private"],
          ];
        }
        navigateValueSet(p, s, h, a, l) {
          if (p && s) {
            let f = this.doNavigateValueSet(s, l);
            if (f) return { range: p, value: f };
          }
          if (h && a) {
            let f = this.doNavigateValueSet(a, l);
            if (f) return { range: h, value: f };
          }
          return null;
        }
        doNavigateValueSet(p, s) {
          let h = this.numberReplace(p, s);
          return h !== null ? h : this.textReplace(p, s);
        }
        numberReplace(p, s) {
          let h = Math.pow(10, p.length - (p.lastIndexOf(".") + 1)),
            a = Number(p),
            l = parseFloat(p);
          return !isNaN(a) && !isNaN(l) && a === l
            ? a === 0 && !s
              ? null
              : ((a = Math.floor(a * h)), (a += s ? h : -h), String(a / h))
            : null;
        }
        textReplace(p, s) {
          return this.valueSetsReplace(this._defaultValueSet, p, s);
        }
        valueSetsReplace(p, s, h) {
          let a = null;
          for (let l = 0, f = p.length; a === null && l < f; l++)
            a = this.valueSetReplace(p[l], s, h);
          return a;
        }
        valueSetReplace(p, s, h) {
          let a = p.indexOf(s);
          return a >= 0
            ? ((a += h ? 1 : -1),
              a < 0 ? (a = p.length - 1) : (a %= p.length),
              p[a])
            : null;
        }
      }
      (t.BasicInplaceReplace = E), (E.INSTANCE = new E());
    }),
    $(z[30], V([0, 1]), function (I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WrappingIndent =
          t.TrackedRangeStickiness =
          t.TextEditorCursorStyle =
          t.TextEditorCursorBlinkingStyle =
          t.SymbolTag =
          t.SymbolKind =
          t.SignatureHelpTriggerKind =
          t.SelectionDirection =
          t.ScrollbarVisibility =
          t.ScrollType =
          t.RenderMinimap =
          t.RenderLineNumbersType =
          t.OverviewRulerLane =
          t.OverlayWidgetPositionPreference =
          t.MouseTargetType =
          t.MinimapPosition =
          t.MarkerTag =
          t.MarkerSeverity =
          t.KeyCode =
          t.InlineCompletionTriggerKind =
          t.InlayHintKind =
          t.IndentAction =
          t.EndOfLineSequence =
          t.EndOfLinePreference =
          t.EditorOption =
          t.EditorAutoIndentStrategy =
          t.DocumentHighlightKind =
          t.DefaultEndOfLine =
          t.CursorChangeReason =
          t.ContentWidgetPositionPreference =
          t.CompletionTriggerKind =
          t.CompletionItemTag =
          t.CompletionItemKind =
          t.CompletionItemInsertTextRule =
          t.AccessibilitySupport =
            void 0);
      var E;
      (function (e) {
        (e[(e.Unknown = 0)] = "Unknown"),
          (e[(e.Disabled = 1)] = "Disabled"),
          (e[(e.Enabled = 2)] = "Enabled");
      })((E = t.AccessibilitySupport || (t.AccessibilitySupport = {})));
      var y;
      (function (e) {
        (e[(e.KeepWhitespace = 1)] = "KeepWhitespace"),
          (e[(e.InsertAsSnippet = 4)] = "InsertAsSnippet");
      })(
        (y =
          t.CompletionItemInsertTextRule ||
          (t.CompletionItemInsertTextRule = {}))
      );
      var p;
      (function (e) {
        (e[(e.Method = 0)] = "Method"),
          (e[(e.Function = 1)] = "Function"),
          (e[(e.Constructor = 2)] = "Constructor"),
          (e[(e.Field = 3)] = "Field"),
          (e[(e.Variable = 4)] = "Variable"),
          (e[(e.Class = 5)] = "Class"),
          (e[(e.Struct = 6)] = "Struct"),
          (e[(e.Interface = 7)] = "Interface"),
          (e[(e.Module = 8)] = "Module"),
          (e[(e.Property = 9)] = "Property"),
          (e[(e.Event = 10)] = "Event"),
          (e[(e.Operator = 11)] = "Operator"),
          (e[(e.Unit = 12)] = "Unit"),
          (e[(e.Value = 13)] = "Value"),
          (e[(e.Constant = 14)] = "Constant"),
          (e[(e.Enum = 15)] = "Enum"),
          (e[(e.EnumMember = 16)] = "EnumMember"),
          (e[(e.Keyword = 17)] = "Keyword"),
          (e[(e.Text = 18)] = "Text"),
          (e[(e.Color = 19)] = "Color"),
          (e[(e.File = 20)] = "File"),
          (e[(e.Reference = 21)] = "Reference"),
          (e[(e.Customcolor = 22)] = "Customcolor"),
          (e[(e.Folder = 23)] = "Folder"),
          (e[(e.TypeParameter = 24)] = "TypeParameter"),
          (e[(e.User = 25)] = "User"),
          (e[(e.Issue = 26)] = "Issue"),
          (e[(e.Snippet = 27)] = "Snippet");
      })((p = t.CompletionItemKind || (t.CompletionItemKind = {})));
      var s;
      (function (e) {
        e[(e.Deprecated = 1)] = "Deprecated";
      })((s = t.CompletionItemTag || (t.CompletionItemTag = {})));
      var h;
      (function (e) {
        (e[(e.Invoke = 0)] = "Invoke"),
          (e[(e.TriggerCharacter = 1)] = "TriggerCharacter"),
          (e[(e.TriggerForIncompleteCompletions = 2)] =
            "TriggerForIncompleteCompletions");
      })((h = t.CompletionTriggerKind || (t.CompletionTriggerKind = {})));
      var a;
      (function (e) {
        (e[(e.EXACT = 0)] = "EXACT"),
          (e[(e.ABOVE = 1)] = "ABOVE"),
          (e[(e.BELOW = 2)] = "BELOW");
      })(
        (a =
          t.ContentWidgetPositionPreference ||
          (t.ContentWidgetPositionPreference = {}))
      );
      var l;
      (function (e) {
        (e[(e.NotSet = 0)] = "NotSet"),
          (e[(e.ContentFlush = 1)] = "ContentFlush"),
          (e[(e.RecoverFromMarkers = 2)] = "RecoverFromMarkers"),
          (e[(e.Explicit = 3)] = "Explicit"),
          (e[(e.Paste = 4)] = "Paste"),
          (e[(e.Undo = 5)] = "Undo"),
          (e[(e.Redo = 6)] = "Redo");
      })((l = t.CursorChangeReason || (t.CursorChangeReason = {})));
      var f;
      (function (e) {
        (e[(e.LF = 1)] = "LF"), (e[(e.CRLF = 2)] = "CRLF");
      })((f = t.DefaultEndOfLine || (t.DefaultEndOfLine = {})));
      var S;
      (function (e) {
        (e[(e.Text = 0)] = "Text"),
          (e[(e.Read = 1)] = "Read"),
          (e[(e.Write = 2)] = "Write");
      })((S = t.DocumentHighlightKind || (t.DocumentHighlightKind = {})));
      var c;
      (function (e) {
        (e[(e.None = 0)] = "None"),
          (e[(e.Keep = 1)] = "Keep"),
          (e[(e.Brackets = 2)] = "Brackets"),
          (e[(e.Advanced = 3)] = "Advanced"),
          (e[(e.Full = 4)] = "Full");
      })((c = t.EditorAutoIndentStrategy || (t.EditorAutoIndentStrategy = {})));
      var g;
      (function (e) {
        (e[(e.acceptSuggestionOnCommitCharacter = 0)] =
          "acceptSuggestionOnCommitCharacter"),
          (e[(e.acceptSuggestionOnEnter = 1)] = "acceptSuggestionOnEnter"),
          (e[(e.accessibilitySupport = 2)] = "accessibilitySupport"),
          (e[(e.accessibilityPageSize = 3)] = "accessibilityPageSize"),
          (e[(e.ariaLabel = 4)] = "ariaLabel"),
          (e[(e.autoClosingBrackets = 5)] = "autoClosingBrackets"),
          (e[(e.autoClosingDelete = 6)] = "autoClosingDelete"),
          (e[(e.autoClosingOvertype = 7)] = "autoClosingOvertype"),
          (e[(e.autoClosingQuotes = 8)] = "autoClosingQuotes"),
          (e[(e.autoIndent = 9)] = "autoIndent"),
          (e[(e.automaticLayout = 10)] = "automaticLayout"),
          (e[(e.autoSurround = 11)] = "autoSurround"),
          (e[(e.bracketPairColorization = 12)] = "bracketPairColorization"),
          (e[(e.codeLens = 13)] = "codeLens"),
          (e[(e.codeLensFontFamily = 14)] = "codeLensFontFamily"),
          (e[(e.codeLensFontSize = 15)] = "codeLensFontSize"),
          (e[(e.colorDecorators = 16)] = "colorDecorators"),
          (e[(e.columnSelection = 17)] = "columnSelection"),
          (e[(e.comments = 18)] = "comments"),
          (e[(e.contextmenu = 19)] = "contextmenu"),
          (e[(e.copyWithSyntaxHighlighting = 20)] =
            "copyWithSyntaxHighlighting"),
          (e[(e.cursorBlinking = 21)] = "cursorBlinking"),
          (e[(e.cursorSmoothCaretAnimation = 22)] =
            "cursorSmoothCaretAnimation"),
          (e[(e.cursorStyle = 23)] = "cursorStyle"),
          (e[(e.cursorSurroundingLines = 24)] = "cursorSurroundingLines"),
          (e[(e.cursorSurroundingLinesStyle = 25)] =
            "cursorSurroundingLinesStyle"),
          (e[(e.cursorWidth = 26)] = "cursorWidth"),
          (e[(e.disableLayerHinting = 27)] = "disableLayerHinting"),
          (e[(e.disableMonospaceOptimizations = 28)] =
            "disableMonospaceOptimizations"),
          (e[(e.domReadOnly = 29)] = "domReadOnly"),
          (e[(e.dragAndDrop = 30)] = "dragAndDrop"),
          (e[(e.emptySelectionClipboard = 31)] = "emptySelectionClipboard"),
          (e[(e.extraEditorClassName = 32)] = "extraEditorClassName"),
          (e[(e.fastScrollSensitivity = 33)] = "fastScrollSensitivity"),
          (e[(e.find = 34)] = "find"),
          (e[(e.fixedOverflowWidgets = 35)] = "fixedOverflowWidgets"),
          (e[(e.folding = 36)] = "folding"),
          (e[(e.foldingStrategy = 37)] = "foldingStrategy"),
          (e[(e.foldingHighlight = 38)] = "foldingHighlight"),
          (e[(e.foldingImportsByDefault = 39)] = "foldingImportsByDefault"),
          (e[(e.unfoldOnClickAfterEndOfLine = 40)] =
            "unfoldOnClickAfterEndOfLine"),
          (e[(e.fontFamily = 41)] = "fontFamily"),
          (e[(e.fontInfo = 42)] = "fontInfo"),
          (e[(e.fontLigatures = 43)] = "fontLigatures"),
          (e[(e.fontSize = 44)] = "fontSize"),
          (e[(e.fontWeight = 45)] = "fontWeight"),
          (e[(e.formatOnPaste = 46)] = "formatOnPaste"),
          (e[(e.formatOnType = 47)] = "formatOnType"),
          (e[(e.glyphMargin = 48)] = "glyphMargin"),
          (e[(e.gotoLocation = 49)] = "gotoLocation"),
          (e[(e.hideCursorInOverviewRuler = 50)] = "hideCursorInOverviewRuler"),
          (e[(e.highlightActiveIndentGuide = 51)] =
            "highlightActiveIndentGuide"),
          (e[(e.hover = 52)] = "hover"),
          (e[(e.inDiffEditor = 53)] = "inDiffEditor"),
          (e[(e.inlineSuggest = 54)] = "inlineSuggest"),
          (e[(e.letterSpacing = 55)] = "letterSpacing"),
          (e[(e.lightbulb = 56)] = "lightbulb"),
          (e[(e.lineDecorationsWidth = 57)] = "lineDecorationsWidth"),
          (e[(e.lineHeight = 58)] = "lineHeight"),
          (e[(e.lineNumbers = 59)] = "lineNumbers"),
          (e[(e.lineNumbersMinChars = 60)] = "lineNumbersMinChars"),
          (e[(e.linkedEditing = 61)] = "linkedEditing"),
          (e[(e.links = 62)] = "links"),
          (e[(e.matchBrackets = 63)] = "matchBrackets"),
          (e[(e.minimap = 64)] = "minimap"),
          (e[(e.mouseStyle = 65)] = "mouseStyle"),
          (e[(e.mouseWheelScrollSensitivity = 66)] =
            "mouseWheelScrollSensitivity"),
          (e[(e.mouseWheelZoom = 67)] = "mouseWheelZoom"),
          (e[(e.multiCursorMergeOverlapping = 68)] =
            "multiCursorMergeOverlapping"),
          (e[(e.multiCursorModifier = 69)] = "multiCursorModifier"),
          (e[(e.multiCursorPaste = 70)] = "multiCursorPaste"),
          (e[(e.occurrencesHighlight = 71)] = "occurrencesHighlight"),
          (e[(e.overviewRulerBorder = 72)] = "overviewRulerBorder"),
          (e[(e.overviewRulerLanes = 73)] = "overviewRulerLanes"),
          (e[(e.padding = 74)] = "padding"),
          (e[(e.parameterHints = 75)] = "parameterHints"),
          (e[(e.peekWidgetDefaultFocus = 76)] = "peekWidgetDefaultFocus"),
          (e[(e.definitionLinkOpensInPeek = 77)] = "definitionLinkOpensInPeek"),
          (e[(e.quickSuggestions = 78)] = "quickSuggestions"),
          (e[(e.quickSuggestionsDelay = 79)] = "quickSuggestionsDelay"),
          (e[(e.readOnly = 80)] = "readOnly"),
          (e[(e.renameOnType = 81)] = "renameOnType"),
          (e[(e.renderControlCharacters = 82)] = "renderControlCharacters"),
          (e[(e.renderIndentGuides = 83)] = "renderIndentGuides"),
          (e[(e.renderFinalNewline = 84)] = "renderFinalNewline"),
          (e[(e.renderLineHighlight = 85)] = "renderLineHighlight"),
          (e[(e.renderLineHighlightOnlyWhenFocus = 86)] =
            "renderLineHighlightOnlyWhenFocus"),
          (e[(e.renderValidationDecorations = 87)] =
            "renderValidationDecorations"),
          (e[(e.renderWhitespace = 88)] = "renderWhitespace"),
          (e[(e.revealHorizontalRightPadding = 89)] =
            "revealHorizontalRightPadding"),
          (e[(e.roundedSelection = 90)] = "roundedSelection"),
          (e[(e.rulers = 91)] = "rulers"),
          (e[(e.scrollbar = 92)] = "scrollbar"),
          (e[(e.scrollBeyondLastColumn = 93)] = "scrollBeyondLastColumn"),
          (e[(e.scrollBeyondLastLine = 94)] = "scrollBeyondLastLine"),
          (e[(e.scrollPredominantAxis = 95)] = "scrollPredominantAxis"),
          (e[(e.selectionClipboard = 96)] = "selectionClipboard"),
          (e[(e.selectionHighlight = 97)] = "selectionHighlight"),
          (e[(e.selectOnLineNumbers = 98)] = "selectOnLineNumbers"),
          (e[(e.showFoldingControls = 99)] = "showFoldingControls"),
          (e[(e.showUnused = 100)] = "showUnused"),
          (e[(e.snippetSuggestions = 101)] = "snippetSuggestions"),
          (e[(e.smartSelect = 102)] = "smartSelect"),
          (e[(e.smoothScrolling = 103)] = "smoothScrolling"),
          (e[(e.stickyTabStops = 104)] = "stickyTabStops"),
          (e[(e.stopRenderingLineAfter = 105)] = "stopRenderingLineAfter"),
          (e[(e.suggest = 106)] = "suggest"),
          (e[(e.suggestFontSize = 107)] = "suggestFontSize"),
          (e[(e.suggestLineHeight = 108)] = "suggestLineHeight"),
          (e[(e.suggestOnTriggerCharacters = 109)] =
            "suggestOnTriggerCharacters"),
          (e[(e.suggestSelection = 110)] = "suggestSelection"),
          (e[(e.tabCompletion = 111)] = "tabCompletion"),
          (e[(e.tabIndex = 112)] = "tabIndex"),
          (e[(e.unusualLineTerminators = 113)] = "unusualLineTerminators"),
          (e[(e.useShadowDOM = 114)] = "useShadowDOM"),
          (e[(e.useTabStops = 115)] = "useTabStops"),
          (e[(e.wordSeparators = 116)] = "wordSeparators"),
          (e[(e.wordWrap = 117)] = "wordWrap"),
          (e[(e.wordWrapBreakAfterCharacters = 118)] =
            "wordWrapBreakAfterCharacters"),
          (e[(e.wordWrapBreakBeforeCharacters = 119)] =
            "wordWrapBreakBeforeCharacters"),
          (e[(e.wordWrapColumn = 120)] = "wordWrapColumn"),
          (e[(e.wordWrapOverride1 = 121)] = "wordWrapOverride1"),
          (e[(e.wordWrapOverride2 = 122)] = "wordWrapOverride2"),
          (e[(e.wrappingIndent = 123)] = "wrappingIndent"),
          (e[(e.wrappingStrategy = 124)] = "wrappingStrategy"),
          (e[(e.showDeprecated = 125)] = "showDeprecated"),
          (e[(e.inlayHints = 126)] = "inlayHints"),
          (e[(e.editorClassName = 127)] = "editorClassName"),
          (e[(e.pixelRatio = 128)] = "pixelRatio"),
          (e[(e.tabFocusMode = 129)] = "tabFocusMode"),
          (e[(e.layoutInfo = 130)] = "layoutInfo"),
          (e[(e.wrappingInfo = 131)] = "wrappingInfo");
      })((g = t.EditorOption || (t.EditorOption = {})));
      var d;
      (function (e) {
        (e[(e.TextDefined = 0)] = "TextDefined"),
          (e[(e.LF = 1)] = "LF"),
          (e[(e.CRLF = 2)] = "CRLF");
      })((d = t.EndOfLinePreference || (t.EndOfLinePreference = {})));
      var v;
      (function (e) {
        (e[(e.LF = 0)] = "LF"), (e[(e.CRLF = 1)] = "CRLF");
      })((v = t.EndOfLineSequence || (t.EndOfLineSequence = {})));
      var i;
      (function (e) {
        (e[(e.None = 0)] = "None"),
          (e[(e.Indent = 1)] = "Indent"),
          (e[(e.IndentOutdent = 2)] = "IndentOutdent"),
          (e[(e.Outdent = 3)] = "Outdent");
      })((i = t.IndentAction || (t.IndentAction = {})));
      var o;
      (function (e) {
        (e[(e.Other = 0)] = "Other"),
          (e[(e.Type = 1)] = "Type"),
          (e[(e.Parameter = 2)] = "Parameter");
      })((o = t.InlayHintKind || (t.InlayHintKind = {})));
      var _;
      (function (e) {
        (e[(e.Automatic = 0)] = "Automatic"),
          (e[(e.Explicit = 1)] = "Explicit");
      })(
        (_ =
          t.InlineCompletionTriggerKind || (t.InlineCompletionTriggerKind = {}))
      );
      var L;
      (function (e) {
        (e[(e.DependsOnKbLayout = -1)] = "DependsOnKbLayout"),
          (e[(e.Unknown = 0)] = "Unknown"),
          (e[(e.Backspace = 1)] = "Backspace"),
          (e[(e.Tab = 2)] = "Tab"),
          (e[(e.Enter = 3)] = "Enter"),
          (e[(e.Shift = 4)] = "Shift"),
          (e[(e.Ctrl = 5)] = "Ctrl"),
          (e[(e.Alt = 6)] = "Alt"),
          (e[(e.PauseBreak = 7)] = "PauseBreak"),
          (e[(e.CapsLock = 8)] = "CapsLock"),
          (e[(e.Escape = 9)] = "Escape"),
          (e[(e.Space = 10)] = "Space"),
          (e[(e.PageUp = 11)] = "PageUp"),
          (e[(e.PageDown = 12)] = "PageDown"),
          (e[(e.End = 13)] = "End"),
          (e[(e.Home = 14)] = "Home"),
          (e[(e.LeftArrow = 15)] = "LeftArrow"),
          (e[(e.UpArrow = 16)] = "UpArrow"),
          (e[(e.RightArrow = 17)] = "RightArrow"),
          (e[(e.DownArrow = 18)] = "DownArrow"),
          (e[(e.Insert = 19)] = "Insert"),
          (e[(e.Delete = 20)] = "Delete"),
          (e[(e.KEY_0 = 21)] = "KEY_0"),
          (e[(e.KEY_1 = 22)] = "KEY_1"),
          (e[(e.KEY_2 = 23)] = "KEY_2"),
          (e[(e.KEY_3 = 24)] = "KEY_3"),
          (e[(e.KEY_4 = 25)] = "KEY_4"),
          (e[(e.KEY_5 = 26)] = "KEY_5"),
          (e[(e.KEY_6 = 27)] = "KEY_6"),
          (e[(e.KEY_7 = 28)] = "KEY_7"),
          (e[(e.KEY_8 = 29)] = "KEY_8"),
          (e[(e.KEY_9 = 30)] = "KEY_9"),
          (e[(e.KEY_A = 31)] = "KEY_A"),
          (e[(e.KEY_B = 32)] = "KEY_B"),
          (e[(e.KEY_C = 33)] = "KEY_C"),
          (e[(e.KEY_D = 34)] = "KEY_D"),
          (e[(e.KEY_E = 35)] = "KEY_E"),
          (e[(e.KEY_F = 36)] = "KEY_F"),
          (e[(e.KEY_G = 37)] = "KEY_G"),
          (e[(e.KEY_H = 38)] = "KEY_H"),
          (e[(e.KEY_I = 39)] = "KEY_I"),
          (e[(e.KEY_J = 40)] = "KEY_J"),
          (e[(e.KEY_K = 41)] = "KEY_K"),
          (e[(e.KEY_L = 42)] = "KEY_L"),
          (e[(e.KEY_M = 43)] = "KEY_M"),
          (e[(e.KEY_N = 44)] = "KEY_N"),
          (e[(e.KEY_O = 45)] = "KEY_O"),
          (e[(e.KEY_P = 46)] = "KEY_P"),
          (e[(e.KEY_Q = 47)] = "KEY_Q"),
          (e[(e.KEY_R = 48)] = "KEY_R"),
          (e[(e.KEY_S = 49)] = "KEY_S"),
          (e[(e.KEY_T = 50)] = "KEY_T"),
          (e[(e.KEY_U = 51)] = "KEY_U"),
          (e[(e.KEY_V = 52)] = "KEY_V"),
          (e[(e.KEY_W = 53)] = "KEY_W"),
          (e[(e.KEY_X = 54)] = "KEY_X"),
          (e[(e.KEY_Y = 55)] = "KEY_Y"),
          (e[(e.KEY_Z = 56)] = "KEY_Z"),
          (e[(e.Meta = 57)] = "Meta"),
          (e[(e.ContextMenu = 58)] = "ContextMenu"),
          (e[(e.F1 = 59)] = "F1"),
          (e[(e.F2 = 60)] = "F2"),
          (e[(e.F3 = 61)] = "F3"),
          (e[(e.F4 = 62)] = "F4"),
          (e[(e.F5 = 63)] = "F5"),
          (e[(e.F6 = 64)] = "F6"),
          (e[(e.F7 = 65)] = "F7"),
          (e[(e.F8 = 66)] = "F8"),
          (e[(e.F9 = 67)] = "F9"),
          (e[(e.F10 = 68)] = "F10"),
          (e[(e.F11 = 69)] = "F11"),
          (e[(e.F12 = 70)] = "F12"),
          (e[(e.F13 = 71)] = "F13"),
          (e[(e.F14 = 72)] = "F14"),
          (e[(e.F15 = 73)] = "F15"),
          (e[(e.F16 = 74)] = "F16"),
          (e[(e.F17 = 75)] = "F17"),
          (e[(e.F18 = 76)] = "F18"),
          (e[(e.F19 = 77)] = "F19"),
          (e[(e.NumLock = 78)] = "NumLock"),
          (e[(e.ScrollLock = 79)] = "ScrollLock"),
          (e[(e.US_SEMICOLON = 80)] = "US_SEMICOLON"),
          (e[(e.US_EQUAL = 81)] = "US_EQUAL"),
          (e[(e.US_COMMA = 82)] = "US_COMMA"),
          (e[(e.US_MINUS = 83)] = "US_MINUS"),
          (e[(e.US_DOT = 84)] = "US_DOT"),
          (e[(e.US_SLASH = 85)] = "US_SLASH"),
          (e[(e.US_BACKTICK = 86)] = "US_BACKTICK"),
          (e[(e.US_OPEN_SQUARE_BRACKET = 87)] = "US_OPEN_SQUARE_BRACKET"),
          (e[(e.US_BACKSLASH = 88)] = "US_BACKSLASH"),
          (e[(e.US_CLOSE_SQUARE_BRACKET = 89)] = "US_CLOSE_SQUARE_BRACKET"),
          (e[(e.US_QUOTE = 90)] = "US_QUOTE"),
          (e[(e.OEM_8 = 91)] = "OEM_8"),
          (e[(e.OEM_102 = 92)] = "OEM_102"),
          (e[(e.NUMPAD_0 = 93)] = "NUMPAD_0"),
          (e[(e.NUMPAD_1 = 94)] = "NUMPAD_1"),
          (e[(e.NUMPAD_2 = 95)] = "NUMPAD_2"),
          (e[(e.NUMPAD_3 = 96)] = "NUMPAD_3"),
          (e[(e.NUMPAD_4 = 97)] = "NUMPAD_4"),
          (e[(e.NUMPAD_5 = 98)] = "NUMPAD_5"),
          (e[(e.NUMPAD_6 = 99)] = "NUMPAD_6"),
          (e[(e.NUMPAD_7 = 100)] = "NUMPAD_7"),
          (e[(e.NUMPAD_8 = 101)] = "NUMPAD_8"),
          (e[(e.NUMPAD_9 = 102)] = "NUMPAD_9"),
          (e[(e.NUMPAD_MULTIPLY = 103)] = "NUMPAD_MULTIPLY"),
          (e[(e.NUMPAD_ADD = 104)] = "NUMPAD_ADD"),
          (e[(e.NUMPAD_SEPARATOR = 105)] = "NUMPAD_SEPARATOR"),
          (e[(e.NUMPAD_SUBTRACT = 106)] = "NUMPAD_SUBTRACT"),
          (e[(e.NUMPAD_DECIMAL = 107)] = "NUMPAD_DECIMAL"),
          (e[(e.NUMPAD_DIVIDE = 108)] = "NUMPAD_DIVIDE"),
          (e[(e.KEY_IN_COMPOSITION = 109)] = "KEY_IN_COMPOSITION"),
          (e[(e.ABNT_C1 = 110)] = "ABNT_C1"),
          (e[(e.ABNT_C2 = 111)] = "ABNT_C2"),
          (e[(e.MAX_VALUE = 112)] = "MAX_VALUE");
      })((L = t.KeyCode || (t.KeyCode = {})));
      var n;
      (function (e) {
        (e[(e.Hint = 1)] = "Hint"),
          (e[(e.Info = 2)] = "Info"),
          (e[(e.Warning = 4)] = "Warning"),
          (e[(e.Error = 8)] = "Error");
      })((n = t.MarkerSeverity || (t.MarkerSeverity = {})));
      var r;
      (function (e) {
        (e[(e.Unnecessary = 1)] = "Unnecessary"),
          (e[(e.Deprecated = 2)] = "Deprecated");
      })((r = t.MarkerTag || (t.MarkerTag = {})));
      var u;
      (function (e) {
        (e[(e.Inline = 1)] = "Inline"), (e[(e.Gutter = 2)] = "Gutter");
      })((u = t.MinimapPosition || (t.MinimapPosition = {})));
      var m;
      (function (e) {
        (e[(e.UNKNOWN = 0)] = "UNKNOWN"),
          (e[(e.TEXTAREA = 1)] = "TEXTAREA"),
          (e[(e.GUTTER_GLYPH_MARGIN = 2)] = "GUTTER_GLYPH_MARGIN"),
          (e[(e.GUTTER_LINE_NUMBERS = 3)] = "GUTTER_LINE_NUMBERS"),
          (e[(e.GUTTER_LINE_DECORATIONS = 4)] = "GUTTER_LINE_DECORATIONS"),
          (e[(e.GUTTER_VIEW_ZONE = 5)] = "GUTTER_VIEW_ZONE"),
          (e[(e.CONTENT_TEXT = 6)] = "CONTENT_TEXT"),
          (e[(e.CONTENT_EMPTY = 7)] = "CONTENT_EMPTY"),
          (e[(e.CONTENT_VIEW_ZONE = 8)] = "CONTENT_VIEW_ZONE"),
          (e[(e.CONTENT_WIDGET = 9)] = "CONTENT_WIDGET"),
          (e[(e.OVERVIEW_RULER = 10)] = "OVERVIEW_RULER"),
          (e[(e.SCROLLBAR = 11)] = "SCROLLBAR"),
          (e[(e.OVERLAY_WIDGET = 12)] = "OVERLAY_WIDGET"),
          (e[(e.OUTSIDE_EDITOR = 13)] = "OUTSIDE_EDITOR");
      })((m = t.MouseTargetType || (t.MouseTargetType = {})));
      var C;
      (function (e) {
        (e[(e.TOP_RIGHT_CORNER = 0)] = "TOP_RIGHT_CORNER"),
          (e[(e.BOTTOM_RIGHT_CORNER = 1)] = "BOTTOM_RIGHT_CORNER"),
          (e[(e.TOP_CENTER = 2)] = "TOP_CENTER");
      })(
        (C =
          t.OverlayWidgetPositionPreference ||
          (t.OverlayWidgetPositionPreference = {}))
      );
      var b;
      (function (e) {
        (e[(e.Left = 1)] = "Left"),
          (e[(e.Center = 2)] = "Center"),
          (e[(e.Right = 4)] = "Right"),
          (e[(e.Full = 7)] = "Full");
      })((b = t.OverviewRulerLane || (t.OverviewRulerLane = {})));
      var N;
      (function (e) {
        (e[(e.Off = 0)] = "Off"),
          (e[(e.On = 1)] = "On"),
          (e[(e.Relative = 2)] = "Relative"),
          (e[(e.Interval = 3)] = "Interval"),
          (e[(e.Custom = 4)] = "Custom");
      })((N = t.RenderLineNumbersType || (t.RenderLineNumbersType = {})));
      var w;
      (function (e) {
        (e[(e.None = 0)] = "None"),
          (e[(e.Text = 1)] = "Text"),
          (e[(e.Blocks = 2)] = "Blocks");
      })((w = t.RenderMinimap || (t.RenderMinimap = {})));
      var M;
      (function (e) {
        (e[(e.Smooth = 0)] = "Smooth"), (e[(e.Immediate = 1)] = "Immediate");
      })((M = t.ScrollType || (t.ScrollType = {})));
      var P;
      (function (e) {
        (e[(e.Auto = 1)] = "Auto"),
          (e[(e.Hidden = 2)] = "Hidden"),
          (e[(e.Visible = 3)] = "Visible");
      })((P = t.ScrollbarVisibility || (t.ScrollbarVisibility = {})));
      var U;
      (function (e) {
        (e[(e.LTR = 0)] = "LTR"), (e[(e.RTL = 1)] = "RTL");
      })((U = t.SelectionDirection || (t.SelectionDirection = {})));
      var R;
      (function (e) {
        (e[(e.Invoke = 1)] = "Invoke"),
          (e[(e.TriggerCharacter = 2)] = "TriggerCharacter"),
          (e[(e.ContentChange = 3)] = "ContentChange");
      })((R = t.SignatureHelpTriggerKind || (t.SignatureHelpTriggerKind = {})));
      var W;
      (function (e) {
        (e[(e.File = 0)] = "File"),
          (e[(e.Module = 1)] = "Module"),
          (e[(e.Namespace = 2)] = "Namespace"),
          (e[(e.Package = 3)] = "Package"),
          (e[(e.Class = 4)] = "Class"),
          (e[(e.Method = 5)] = "Method"),
          (e[(e.Property = 6)] = "Property"),
          (e[(e.Field = 7)] = "Field"),
          (e[(e.Constructor = 8)] = "Constructor"),
          (e[(e.Enum = 9)] = "Enum"),
          (e[(e.Interface = 10)] = "Interface"),
          (e[(e.Function = 11)] = "Function"),
          (e[(e.Variable = 12)] = "Variable"),
          (e[(e.Constant = 13)] = "Constant"),
          (e[(e.String = 14)] = "String"),
          (e[(e.Number = 15)] = "Number"),
          (e[(e.Boolean = 16)] = "Boolean"),
          (e[(e.Array = 17)] = "Array"),
          (e[(e.Object = 18)] = "Object"),
          (e[(e.Key = 19)] = "Key"),
          (e[(e.Null = 20)] = "Null"),
          (e[(e.EnumMember = 21)] = "EnumMember"),
          (e[(e.Struct = 22)] = "Struct"),
          (e[(e.Event = 23)] = "Event"),
          (e[(e.Operator = 24)] = "Operator"),
          (e[(e.TypeParameter = 25)] = "TypeParameter");
      })((W = t.SymbolKind || (t.SymbolKind = {})));
      var Y;
      (function (e) {
        e[(e.Deprecated = 1)] = "Deprecated";
      })((Y = t.SymbolTag || (t.SymbolTag = {})));
      var k;
      (function (e) {
        (e[(e.Hidden = 0)] = "Hidden"),
          (e[(e.Blink = 1)] = "Blink"),
          (e[(e.Smooth = 2)] = "Smooth"),
          (e[(e.Phase = 3)] = "Phase"),
          (e[(e.Expand = 4)] = "Expand"),
          (e[(e.Solid = 5)] = "Solid");
      })(
        (k =
          t.TextEditorCursorBlinkingStyle ||
          (t.TextEditorCursorBlinkingStyle = {}))
      );
      var F;
      (function (e) {
        (e[(e.Line = 1)] = "Line"),
          (e[(e.Block = 2)] = "Block"),
          (e[(e.Underline = 3)] = "Underline"),
          (e[(e.LineThin = 4)] = "LineThin"),
          (e[(e.BlockOutline = 5)] = "BlockOutline"),
          (e[(e.UnderlineThin = 6)] = "UnderlineThin");
      })((F = t.TextEditorCursorStyle || (t.TextEditorCursorStyle = {})));
      var B;
      (function (e) {
        (e[(e.AlwaysGrowsWhenTypingAtEdges = 0)] =
          "AlwaysGrowsWhenTypingAtEdges"),
          (e[(e.NeverGrowsWhenTypingAtEdges = 1)] =
            "NeverGrowsWhenTypingAtEdges"),
          (e[(e.GrowsOnlyWhenTypingBefore = 2)] = "GrowsOnlyWhenTypingBefore"),
          (e[(e.GrowsOnlyWhenTypingAfter = 3)] = "GrowsOnlyWhenTypingAfter");
      })((B = t.TrackedRangeStickiness || (t.TrackedRangeStickiness = {})));
      var H;
      (function (e) {
        (e[(e.None = 0)] = "None"),
          (e[(e.Same = 1)] = "Same"),
          (e[(e.Indent = 2)] = "Indent"),
          (e[(e.DeepIndent = 3)] = "DeepIndent");
      })((H = t.WrappingIndent || (t.WrappingIndent = {})));
    }),
    $(
      z[31],
      V([0, 1, 21, 9, 17, 13, 3, 6, 24, 25, 30]),
      function (I, t, E, y, p, s, h, a, l, f, S) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.createMonacoBaseAPI = t.KeyMod = void 0);
        class c {
          static chord(v, i) {
            return (0, p.KeyChord)(v, i);
          }
        }
        (t.KeyMod = c),
          (c.CtrlCmd = 2048),
          (c.Shift = 1024),
          (c.Alt = 512),
          (c.WinCtrl = 256);
        function g() {
          return {
            editor: void 0,
            languages: void 0,
            CancellationTokenSource: E.CancellationTokenSource,
            Emitter: y.Emitter,
            KeyCode: S.KeyCode,
            KeyMod: c,
            Position: h.Position,
            Range: a.Range,
            Selection: l.Selection,
            SelectionDirection: S.SelectionDirection,
            MarkerSeverity: S.MarkerSeverity,
            MarkerTag: S.MarkerTag,
            Uri: s.URI,
            Token: f.Token,
          };
        }
        t.createMonacoBaseAPI = g;
      }
    ),
    $(z[32], V([0, 1, 12]), function (I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.PrefixSumComputer = t.PrefixSumIndexOfResult = void 0);
      class y {
        constructor(h, a) {
          (this._prefixSumIndexOfResultBrand = void 0),
            (this.index = h),
            (this.remainder = a);
        }
      }
      t.PrefixSumIndexOfResult = y;
      class p {
        constructor(h) {
          (this.values = h),
            (this.prefixSum = new Uint32Array(h.length)),
            (this.prefixSumValidIndex = new Int32Array(1)),
            (this.prefixSumValidIndex[0] = -1);
        }
        insertValues(h, a) {
          h = (0, E.toUint32)(h);
          const l = this.values,
            f = this.prefixSum,
            S = a.length;
          return S === 0
            ? !1
            : ((this.values = new Uint32Array(l.length + S)),
              this.values.set(l.subarray(0, h), 0),
              this.values.set(l.subarray(h), h + S),
              this.values.set(a, h),
              h - 1 < this.prefixSumValidIndex[0] &&
                (this.prefixSumValidIndex[0] = h - 1),
              (this.prefixSum = new Uint32Array(this.values.length)),
              this.prefixSumValidIndex[0] >= 0 &&
                this.prefixSum.set(
                  f.subarray(0, this.prefixSumValidIndex[0] + 1)
                ),
              !0);
        }
        changeValue(h, a) {
          return (
            (h = (0, E.toUint32)(h)),
            (a = (0, E.toUint32)(a)),
            this.values[h] === a
              ? !1
              : ((this.values[h] = a),
                h - 1 < this.prefixSumValidIndex[0] &&
                  (this.prefixSumValidIndex[0] = h - 1),
                !0)
          );
        }
        removeValues(h, a) {
          (h = (0, E.toUint32)(h)), (a = (0, E.toUint32)(a));
          const l = this.values,
            f = this.prefixSum;
          if (h >= l.length) return !1;
          let S = l.length - h;
          return (
            a >= S && (a = S),
            a === 0
              ? !1
              : ((this.values = new Uint32Array(l.length - a)),
                this.values.set(l.subarray(0, h), 0),
                this.values.set(l.subarray(h + a), h),
                (this.prefixSum = new Uint32Array(this.values.length)),
                h - 1 < this.prefixSumValidIndex[0] &&
                  (this.prefixSumValidIndex[0] = h - 1),
                this.prefixSumValidIndex[0] >= 0 &&
                  this.prefixSum.set(
                    f.subarray(0, this.prefixSumValidIndex[0] + 1)
                  ),
                !0)
          );
        }
        getTotalSum() {
          return this.values.length === 0
            ? 0
            : this._getPrefixSum(this.values.length - 1);
        }
        getPrefixSum(h) {
          return h < 0 ? 0 : ((h = (0, E.toUint32)(h)), this._getPrefixSum(h));
        }
        _getPrefixSum(h) {
          if (h <= this.prefixSumValidIndex[0]) return this.prefixSum[h];
          let a = this.prefixSumValidIndex[0] + 1;
          a === 0 && ((this.prefixSum[0] = this.values[0]), a++),
            h >= this.values.length && (h = this.values.length - 1);
          for (let l = a; l <= h; l++)
            this.prefixSum[l] = this.prefixSum[l - 1] + this.values[l];
          return (
            (this.prefixSumValidIndex[0] = Math.max(
              this.prefixSumValidIndex[0],
              h
            )),
            this.prefixSum[h]
          );
        }
        getIndexOf(h) {
          (h = Math.floor(h)), this.getTotalSum();
          let a = 0,
            l = this.values.length - 1,
            f = 0,
            S = 0,
            c = 0;
          for (; a <= l; )
            if (
              ((f = (a + (l - a) / 2) | 0),
              (S = this.prefixSum[f]),
              (c = S - this.values[f]),
              h < c)
            )
              l = f - 1;
            else if (h >= S) a = f + 1;
            else break;
          return new y(f, h - c);
        }
      }
      t.PrefixSumComputer = p;
    }),
    $(z[33], V([0, 1, 5, 3, 32]), function (I, t, E, y, p) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.MirrorTextModel = void 0);
      class s {
        constructor(a, l, f, S) {
          (this._uri = a),
            (this._lines = l),
            (this._eol = f),
            (this._versionId = S),
            (this._lineStarts = null),
            (this._cachedTextValue = null);
        }
        dispose() {
          this._lines.length = 0;
        }
        get version() {
          return this._versionId;
        }
        getText() {
          return (
            this._cachedTextValue === null &&
              (this._cachedTextValue = this._lines.join(this._eol)),
            this._cachedTextValue
          );
        }
        onEvents(a) {
          a.eol &&
            a.eol !== this._eol &&
            ((this._eol = a.eol), (this._lineStarts = null));
          const l = a.changes;
          for (const f of l)
            this._acceptDeleteRange(f.range),
              this._acceptInsertText(
                new y.Position(f.range.startLineNumber, f.range.startColumn),
                f.text
              );
          (this._versionId = a.versionId), (this._cachedTextValue = null);
        }
        _ensureLineStarts() {
          if (!this._lineStarts) {
            const a = this._eol.length,
              l = this._lines.length,
              f = new Uint32Array(l);
            for (let S = 0; S < l; S++) f[S] = this._lines[S].length + a;
            this._lineStarts = new p.PrefixSumComputer(f);
          }
        }
        _setLineText(a, l) {
          (this._lines[a] = l),
            this._lineStarts &&
              this._lineStarts.changeValue(
                a,
                this._lines[a].length + this._eol.length
              );
        }
        _acceptDeleteRange(a) {
          if (a.startLineNumber === a.endLineNumber) {
            if (a.startColumn === a.endColumn) return;
            this._setLineText(
              a.startLineNumber - 1,
              this._lines[a.startLineNumber - 1].substring(
                0,
                a.startColumn - 1
              ) + this._lines[a.startLineNumber - 1].substring(a.endColumn - 1)
            );
            return;
          }
          this._setLineText(
            a.startLineNumber - 1,
            this._lines[a.startLineNumber - 1].substring(0, a.startColumn - 1) +
              this._lines[a.endLineNumber - 1].substring(a.endColumn - 1)
          ),
            this._lines.splice(
              a.startLineNumber,
              a.endLineNumber - a.startLineNumber
            ),
            this._lineStarts &&
              this._lineStarts.removeValues(
                a.startLineNumber,
                a.endLineNumber - a.startLineNumber
              );
        }
        _acceptInsertText(a, l) {
          if (l.length === 0) return;
          let f = (0, E.splitLines)(l);
          if (f.length === 1) {
            this._setLineText(
              a.lineNumber - 1,
              this._lines[a.lineNumber - 1].substring(0, a.column - 1) +
                f[0] +
                this._lines[a.lineNumber - 1].substring(a.column - 1)
            );
            return;
          }
          (f[f.length - 1] += this._lines[a.lineNumber - 1].substring(
            a.column - 1
          )),
            this._setLineText(
              a.lineNumber - 1,
              this._lines[a.lineNumber - 1].substring(0, a.column - 1) + f[0]
            );
          let S = new Uint32Array(f.length - 1);
          for (let c = 1; c < f.length; c++)
            this._lines.splice(a.lineNumber + c - 1, 0, f[c]),
              (S[c - 1] = f[c].length + this._eol.length);
          this._lineStarts && this._lineStarts.insertValues(a.lineNumber, S);
        }
      }
      t.MirrorTextModel = s;
    });
  var ne =
    (this && this.__awaiter) ||
    function (I, t, E, y) {
      function p(s) {
        return s instanceof E
          ? s
          : new E(function (h) {
              h(s);
            });
      }
      return new (E || (E = Promise))(function (s, h) {
        function a(S) {
          try {
            f(y.next(S));
          } catch (c) {
            h(c);
          }
        }
        function l(S) {
          try {
            f(y.throw(S));
          } catch (c) {
            h(c);
          }
        }
        function f(S) {
          S.done ? s(S.value) : p(S.value).then(a, l);
        }
        f((y = y.apply(I, t || [])).next());
      });
    };
  $(
    z[35],
    V([0, 1, 10, 2, 13, 3, 6, 26, 33, 27, 28, 29, 31, 11, 8]),
    function (I, t, E, y, p, s, h, a, l, f, S, c, g, d, v) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.create = t.EditorSimpleWorker = t.MirrorModel = void 0);
      class i extends l.MirrorTextModel {
        get uri() {
          return this._uri;
        }
        get eol() {
          return this._eol;
        }
        getValue() {
          return this.getText();
        }
        getLinesContent() {
          return this._lines.slice(0);
        }
        getLineCount() {
          return this._lines.length;
        }
        getLineContent(n) {
          return this._lines[n - 1];
        }
        getWordAtPosition(n, r) {
          let u = (0, f.getWordAtText)(
            n.column,
            (0, f.ensureValidWordDefinition)(r),
            this._lines[n.lineNumber - 1],
            0
          );
          return u
            ? new h.Range(
                n.lineNumber,
                u.startColumn,
                n.lineNumber,
                u.endColumn
              )
            : null;
        }
        words(n) {
          const r = this._lines,
            u = this._wordenize.bind(this);
          let m = 0,
            C = "",
            b = 0,
            N = [];
          return {
            *[Symbol.iterator]() {
              for (;;)
                if (b < N.length) {
                  const w = C.substring(N[b].start, N[b].end);
                  (b += 1), yield w;
                } else if (m < r.length)
                  (C = r[m]), (N = u(C, n)), (b = 0), (m += 1);
                else break;
            },
          };
        }
        getLineWords(n, r) {
          let u = this._lines[n - 1],
            m = this._wordenize(u, r),
            C = [];
          for (const b of m)
            C.push({
              word: u.substring(b.start, b.end),
              startColumn: b.start + 1,
              endColumn: b.end + 1,
            });
          return C;
        }
        _wordenize(n, r) {
          const u = [];
          let m;
          for (r.lastIndex = 0; (m = r.exec(n)) && m[0].length !== 0; )
            u.push({ start: m.index, end: m.index + m[0].length });
          return u;
        }
        getValueInRange(n) {
          if (
            ((n = this._validateRange(n)),
            n.startLineNumber === n.endLineNumber)
          )
            return this._lines[n.startLineNumber - 1].substring(
              n.startColumn - 1,
              n.endColumn - 1
            );
          let r = this._eol,
            u = n.startLineNumber - 1,
            m = n.endLineNumber - 1,
            C = [];
          C.push(this._lines[u].substring(n.startColumn - 1));
          for (let b = u + 1; b < m; b++) C.push(this._lines[b]);
          return (
            C.push(this._lines[m].substring(0, n.endColumn - 1)), C.join(r)
          );
        }
        offsetAt(n) {
          return (
            (n = this._validatePosition(n)),
            this._ensureLineStarts(),
            this._lineStarts.getPrefixSum(n.lineNumber - 2) + (n.column - 1)
          );
        }
        positionAt(n) {
          (n = Math.floor(n)), (n = Math.max(0, n)), this._ensureLineStarts();
          let r = this._lineStarts.getIndexOf(n),
            u = this._lines[r.index].length;
          return {
            lineNumber: 1 + r.index,
            column: 1 + Math.min(r.remainder, u),
          };
        }
        _validateRange(n) {
          const r = this._validatePosition({
              lineNumber: n.startLineNumber,
              column: n.startColumn,
            }),
            u = this._validatePosition({
              lineNumber: n.endLineNumber,
              column: n.endColumn,
            });
          return r.lineNumber !== n.startLineNumber ||
            r.column !== n.startColumn ||
            u.lineNumber !== n.endLineNumber ||
            u.column !== n.endColumn
            ? {
                startLineNumber: r.lineNumber,
                startColumn: r.column,
                endLineNumber: u.lineNumber,
                endColumn: u.column,
              }
            : n;
        }
        _validatePosition(n) {
          if (!s.Position.isIPosition(n)) throw new Error("bad position");
          let { lineNumber: r, column: u } = n,
            m = !1;
          if (r < 1) (r = 1), (u = 1), (m = !0);
          else if (r > this._lines.length)
            (r = this._lines.length),
              (u = this._lines[r - 1].length + 1),
              (m = !0);
          else {
            let C = this._lines[r - 1].length + 1;
            u < 1 ? ((u = 1), (m = !0)) : u > C && ((u = C), (m = !0));
          }
          return m ? { lineNumber: r, column: u } : n;
        }
      }
      t.MirrorModel = i;
      class o {
        constructor(n, r) {
          (this._host = n),
            (this._models = Object.create(null)),
            (this._foreignModuleFactory = r),
            (this._foreignModule = null);
        }
        dispose() {
          this._models = Object.create(null);
        }
        _getModel(n) {
          return this._models[n];
        }
        _getModels() {
          let n = [];
          return (
            Object.keys(this._models).forEach((r) => n.push(this._models[r])), n
          );
        }
        acceptNewModel(n) {
          this._models[n.url] = new i(
            p.URI.parse(n.url),
            n.lines,
            n.EOL,
            n.versionId
          );
        }
        acceptModelChanged(n, r) {
          if (!this._models[n]) return;
          this._models[n].onEvents(r);
        }
        acceptRemovedModel(n) {
          !this._models[n] || delete this._models[n];
        }
        computeDiff(n, r, u, m) {
          return ne(this, void 0, void 0, function* () {
            const C = this._getModel(n),
              b = this._getModel(r);
            if (!C || !b) return null;
            const N = C.getLinesContent(),
              w = b.getLinesContent(),
              P = new a.DiffComputer(N, w, {
                shouldComputeCharChanges: !0,
                shouldPostProcessCharChanges: !0,
                shouldIgnoreTrimWhitespace: u,
                shouldMakePrettyDiff: !0,
                maxComputationTime: m,
              }).computeDiff(),
              U = P.changes.length > 0 ? !1 : this._modelsAreIdentical(C, b);
            return { quitEarly: P.quitEarly, identical: U, changes: P.changes };
          });
        }
        _modelsAreIdentical(n, r) {
          const u = n.getLineCount(),
            m = r.getLineCount();
          if (u !== m) return !1;
          for (let C = 1; C <= u; C++) {
            const b = n.getLineContent(C),
              N = r.getLineContent(C);
            if (b !== N) return !1;
          }
          return !0;
        }
        computeMoreMinimalEdits(n, r) {
          return ne(this, void 0, void 0, function* () {
            const u = this._getModel(n);
            if (!u) return r;
            const m = [];
            let C;
            r = r.slice(0).sort((b, N) => {
              if (b.range && N.range)
                return h.Range.compareRangesUsingStarts(b.range, N.range);
              let w = b.range ? 0 : 1,
                M = N.range ? 0 : 1;
              return w - M;
            });
            for (let { range: b, text: N, eol: w } of r) {
              if ((typeof w == "number" && (C = w), h.Range.isEmpty(b) && !N))
                continue;
              const M = u.getValueInRange(b);
              if (((N = N.replace(/\r\n|\n|\r/g, u.eol)), M === N)) continue;
              if (Math.max(N.length, M.length) > o._diffLimit) {
                m.push({ range: b, text: N });
                continue;
              }
              const P = (0, E.stringDiff)(M, N, !1),
                U = u.offsetAt(h.Range.lift(b).getStartPosition());
              for (const R of P) {
                const W = u.positionAt(U + R.originalStart),
                  Y = u.positionAt(U + R.originalStart + R.originalLength),
                  k = {
                    text: N.substr(R.modifiedStart, R.modifiedLength),
                    range: {
                      startLineNumber: W.lineNumber,
                      startColumn: W.column,
                      endLineNumber: Y.lineNumber,
                      endColumn: Y.column,
                    },
                  };
                u.getValueInRange(k.range) !== k.text && m.push(k);
              }
            }
            return (
              typeof C == "number" &&
                m.push({
                  eol: C,
                  text: "",
                  range: {
                    startLineNumber: 0,
                    startColumn: 0,
                    endLineNumber: 0,
                    endColumn: 0,
                  },
                }),
              m
            );
          });
        }
        computeLinks(n) {
          return ne(this, void 0, void 0, function* () {
            let r = this._getModel(n);
            return r ? (0, S.computeLinks)(r) : null;
          });
        }
        textualSuggest(n, r, u, m) {
          return ne(this, void 0, void 0, function* () {
            const C = new v.StopWatch(!0),
              b = new RegExp(u, m),
              N = new Set();
            e: for (let w of n) {
              const M = this._getModel(w);
              if (!!M) {
                for (let P of M.words(b))
                  if (
                    !(P === r || !isNaN(Number(P))) &&
                    (N.add(P), N.size > o._suggestionsLimit)
                  )
                    break e;
              }
            }
            return { words: Array.from(N), duration: C.elapsed() };
          });
        }
        computeWordRanges(n, r, u, m) {
          return ne(this, void 0, void 0, function* () {
            let C = this._getModel(n);
            if (!C) return Object.create(null);
            const b = new RegExp(u, m),
              N = Object.create(null);
            for (let w = r.startLineNumber; w < r.endLineNumber; w++) {
              let M = C.getLineWords(w, b);
              for (const P of M) {
                if (!isNaN(Number(P.word))) continue;
                let U = N[P.word];
                U || ((U = []), (N[P.word] = U)),
                  U.push({
                    startLineNumber: w,
                    startColumn: P.startColumn,
                    endLineNumber: w,
                    endColumn: P.endColumn,
                  });
              }
            }
            return N;
          });
        }
        navigateValueSet(n, r, u, m, C) {
          return ne(this, void 0, void 0, function* () {
            let b = this._getModel(n);
            if (!b) return null;
            let N = new RegExp(m, C);
            r.startColumn === r.endColumn &&
              (r = {
                startLineNumber: r.startLineNumber,
                startColumn: r.startColumn,
                endLineNumber: r.endLineNumber,
                endColumn: r.endColumn + 1,
              });
            let w = b.getValueInRange(r),
              M = b.getWordAtPosition(
                { lineNumber: r.startLineNumber, column: r.startColumn },
                N
              );
            if (!M) return null;
            let P = b.getValueInRange(M);
            return c.BasicInplaceReplace.INSTANCE.navigateValueSet(
              r,
              w,
              M,
              P,
              u
            );
          });
        }
        loadForeignModule(n, r, u) {
          const m = (N, w) => this._host.fhr(N, w);
          let b = {
            host: d.createProxyObject(u, m),
            getMirrorModels: () => this._getModels(),
          };
          return this._foreignModuleFactory
            ? ((this._foreignModule = this._foreignModuleFactory(b, r)),
              Promise.resolve(d.getAllMethodNames(this._foreignModule)))
            : new Promise((N, w) => {
                I(
                  [n],
                  (M) => {
                    (this._foreignModule = M.create(b, r)),
                      N(d.getAllMethodNames(this._foreignModule));
                  },
                  w
                );
              });
        }
        fmr(n, r) {
          if (
            !this._foreignModule ||
            typeof this._foreignModule[n] != "function"
          )
            return Promise.reject(
              new Error("Missing requestHandler or method: " + n)
            );
          try {
            return Promise.resolve(
              this._foreignModule[n].apply(this._foreignModule, r)
            );
          } catch (u) {
            return Promise.reject(u);
          }
        }
      }
      (t.EditorSimpleWorker = o),
        (o._diffLimit = 1e5),
        (o._suggestionsLimit = 1e4);
      function _(L) {
        return new o(L, null);
      }
      (t.create = _),
        typeof importScripts == "function" &&
          (y.globals.monaco = (0, g.createMonacoBaseAPI)());
    }
  ),
    (function () {
      var I, t;
      const E = self.MonacoEnvironment,
        y = E && E.baseUrl ? E.baseUrl : "../../../",
        p =
          typeof ((I = self.trustedTypes) === null || I === void 0
            ? void 0
            : I.createPolicy) == "function"
            ? (t = self.trustedTypes) === null || t === void 0
              ? void 0
              : t.createPolicy("amdLoader", {
                  createScriptURL: (f) => f,
                  createScript: (f, ...S) => {
                    const c = S.slice(0, -1).join(","),
                      g = S.pop().toString();
                    return `(function anonymous(${c}) {
${g}
})`;
                  },
                })
            : void 0;
      function s() {
        return new Promise((f, S) => {
          if (typeof self.define == "function" && self.define.amd) return f();
          const c = y + "vs/loader.js";
          if (
            !(
              /^((http:)|(https:)|(file:))/.test(c) &&
              c.substring(0, self.origin.length) !== self.origin
            )
          ) {
            fetch(c)
              .then((d) => {
                if (d.status !== 200) throw new Error(d.statusText);
                return d.text();
              })
              .then((d) => {
                (d = `${d}
//# sourceURL=${c}`),
                  (p ? self.eval(p.createScript("", d)) : new Function(d)).call(
                    self
                  ),
                  f();
              })
              .then(void 0, S);
            return;
          }
          p ? importScripts(p.createScriptURL(c)) : importScripts(c), f();
        });
      }
      const h = function (f) {
        s().then(() => {
          require.config({ baseUrl: y, catchError: !0, trustedTypesPolicy: p }),
            require([f], function (S) {
              setTimeout(function () {
                let c = S.create((g, d) => {
                  self.postMessage(g, d);
                }, null);
                for (
                  self.onmessage = (g) => c.onmessage(g.data);
                  l.length > 0;

                )
                  self.onmessage(l.shift());
              }, 0);
            });
        });
      };
      let a = !0,
        l = [];
      self.onmessage = (f) => {
        if (!a) {
          l.push(f);
          return;
        }
        (a = !1), h(f.data);
      };
    })();
}.call(this));

//# sourceMappingURL=../../../../min-maps/vs/base/worker/workerMain.js.map
