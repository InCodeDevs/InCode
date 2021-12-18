/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

let o = window.onerror;

window.onerror = function () {
  window.location.assign("incompatible.html");
};

let isOpera =
  (!!window.opr && !!opr.addons) ||
  !!window.opera ||
  navigator.userAgent.indexOf(" OPR/") >= 0;
let isFirefox = typeof InstallTrigger !== "undefined";
let isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
  })(
    !window["safari"] ||
      (typeof safari !== "undefined" && window["safari"].pushNotification)
  );
let isIE = /*@cc_on!@*/ !!document.documentMode;
let isEdge = !isIE && !!window.StyleMedia;
let isChrome =
  !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
let isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;
let isBlink = (isChrome || isOpera) && !!window.CSS;
if (isIE) {
  window.location.assign("incompatible.html");
}
window.onerror = o;
