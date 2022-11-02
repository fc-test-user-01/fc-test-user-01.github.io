window.__fid=window.__fid||[];
// https://app.mieru-ca.com/faber-extract/heat-map -> 対象のドメインの設定 -> タグ発行 -> __fid.push([ ID ])のIDをコピー -> 下のIDにコピーしたIDを上書き
__fid.push([535598560]);
// 集計対象のパス設定可 (特殊ケースのみ要変更)
var targetPath = location.protocol + "//" + location.host + location.pathname;
// Heatmap集計Javascriptのパス (特殊ケースのみ要変更)
var heatmapJsPath = "/mieruca-hm-fc-custom.js";

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it =
    (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (
    Array.isArray(o) ||
    (it = _unsupportedIterableToArray(o)) ||
    (allowArrayLike && o && typeof o.length === "number")
  ) {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError(
    "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
(function () {
  function mieruca() {
    if (typeof window.__fjsld != "undefined") return;
    window.__fjsld = 1;
    var fjs = {};
    fjs.type = "application/javascript";
    var timestamp = new Date();
    fjs.src = heatmapJsPath + "?nocache=" + timestamp.getTime();
    fetch(fjs.src, {
      headers: {
        "Content-Type": fjs.type
      }
    })
      .then(function (r) {
        return r.text();
      })
      .then(function (t) {
        t = t
          .replace("new MierucaHM", "null")
          .replace(
            "window.__mieruca_heatmap.init()",
            "window.__mieruca_heatmap=null"
          );
        var sTarget = '"use strict";';
        var tArray = t.split(sTarget);
        tArray[1] =
          "" +
          "this.getVariablesFcCustom=()=>{return{e:e, t:t, o:o, i:i}};" +
          tArray[1];
        t = tArray.join(sTarget);
        var tDom = document.querySelector("script");
        var cDom = document.createElement("script");
        cDom.innerText = t;
        tDom.insertAdjacentElement("beforeBegin", cDom);
        var main = {
          open: function open(url) {
            window.__mieruca_heatmap = new MierucaHM();
            var _ = window.__mieruca_heatmap.getVariablesFcCustom();
            _.t.local_url = url;
            window.__mieruca_heatmap.init();
          },
          close: function close() {
            var _ = window.__mieruca_heatmap.getVariablesFcCustom();
            _.o.close();
          },
          reopen: function reopen(url) {
            (function () {
              var _ = window.__mieruca_heatmap.getVariablesFcCustom();
              _.o.close();
            })();
            (function (url) {
              window.__mieruca_heatmap = new MierucaHM();
              var _ = window.__mieruca_heatmap.getVariablesFcCustom();
              _.t.local_url = url;
              _.i.sendPageView();
            })(url);
          }
        };
        var jobs = {
          canReopen: false,
          urlWithoutSearch: targetPath,
          init: function init(params) {
            if (params === void 0) {
              params = [];
            }
            try {
              var search = (function () {
                var _ = [];
                for (
                  var _iterator = _createForOfIteratorHelperLoose(params),
                    _step;
                  !(_step = _iterator()).done;

                ) {
                  var v = _step.value;
                  if (v) {
                    _.push(v);
                  }
                }
                if (_.length > 0) {
                  return "?" + _.join("&");
                }
                return "";
              })();
              main.open("" + jobs.urlWithoutSearch + search);
              jobs.canReopen = true;
            } catch (e) {
              console.warn(e);
            }
          },
          move: function move(params) {
            if (params === void 0) {
              params = [];
            }
            try {
              if (main !== undefined && jobs.canReopen === true) {
                var search = (function () {
                  var _ = [];
                  for (
                    var _iterator2 = _createForOfIteratorHelperLoose(params),
                      _step2;
                    !(_step2 = _iterator2()).done;

                  ) {
                    var v = _step2.value;
                    if (v) {
                      _.push(v);
                    }
                  }
                  if (_.length > 0) {
                    return "?" + _.join("&");
                  }
                  return "";
                })();
                main.reopen("" + jobs.urlWithoutSearch + search);
              }
            } catch (e) {
              console.warn(e);
            }
          }
        };
        window.__mierucaFcCustomCallBack(jobs);
      });
  }
  setTimeout(mieruca, 500);
  document.readyState != "complete"
    ? window.attachEvent
      ? window.attachEvent("onload", mieruca)
      : window.addEventListener("load", mieruca, false)
    : mieruca();
})();