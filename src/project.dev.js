window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  NewScript: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "489db0rnn5D7aYYJeJAf2TB", "NewScript");
    "use strict";
    cc.sys.isBrowser && window.addEventListener("message", function(e) {
      console.log("----cocos---", e.data);
      window.onWebViewCall && window.onWebViewCall(e, e.data);
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        webView: cc.WebView,
        debugText: cc.Label
      },
      start: function start() {
        this.count = 0;
        var scheme = "testkey";
        function jsCallback(target, url) {
          var str = url.replace(scheme + "://", "");
          console.log("jsCallback-------str-------", str);
          window.onWebViewCall(target, url);
        }
        this.webView.setJavascriptInterfaceScheme(scheme);
        this.webView.setOnJSCallback(jsCallback);
        window.onWebViewCall = this.onWebViewCall.bind(this);
      },
      onBtnClick: function onBtnClick() {
        var data = {
          id: 123456
        };
        if (cc.sys.isNative) {
          data = JSON.stringify(data);
          this.webView.evaluateJS("onGetMessage(" + data + ")");
        } else {
          console.log("-----cocos------Browser---------");
          this.webView._impl._iframe.contentWindow.postMessage(data, "*");
        }
      },
      onWebViewCall: function onWebViewCall(e, url) {
        this.debugText.string = url;
      }
    });
    cc._RF.pop();
  }, {} ],
  gameScript: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "57e47l4puBL6ZHgbUZH1r8T", "gameScript");
    "use strict";
    window.addEventListener("message", function(e) {
      console.log("----cocos---", e.data);
      window.onGetMessage && window.onGetMessage(e.data);
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        debugText: cc.Label
      },
      start: function start() {
        this.count = 0;
        window.onGetMessage = this.onGetMessage.bind(this);
      },
      innerBtnClick: function innerBtnClick() {
        console.log("-------web--------onClick-----\x3e>cocos JS-------------", window.isNative);
        window.isNative ? document.location = "testkey://a=1&b=2" : parent.postMessage("------------hello!-----cocos---------", "*");
      },
      onGetMessage: function onGetMessage(string) {
        this.debugText.string = string;
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "NewScript", "gameScript" ]);