export class BrowserUtils {
  static isInBrowser(): boolean {
    return typeof window !== "undefined";
  }

  static isServer(): boolean {
    return typeof window === "undefined";
  }

  static getUA() {
    if (BrowserUtils.isInBrowser()) {
      return window.navigator.userAgent.toLowerCase();
    }
    return "";
  }

  static isMobile(): boolean {
    return /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(
      navigator.appVersion
    );
  }

  static isOpera(): boolean {
    return navigator.userAgent.indexOf("Opera") !== -1;
  }

  static isIE(): boolean {
    const UA = BrowserUtils.getUA();
    return UA !== "" && UA.indexOf("msie") > 0;
  }

  static isIE9(): boolean {
    const UA = BrowserUtils.getUA();
    return UA !== "" && UA.indexOf("msie 9.0") > 0;
  }

  static isEdge(): boolean {
    const UA = BrowserUtils.getUA();
    return UA !== "" && UA.indexOf("edge/") > 0;
  }

  static isChrome(): boolean {
    const UA = BrowserUtils.getUA();
    return UA !== "" && /chrome\/\d+/.test(UA) && !BrowserUtils.isEdge();
  }

  static isPhantomJS(): boolean {
    const UA = BrowserUtils.getUA();
    return UA !== "" && /phantomjs/.test(UA);
  }

  static isFirefox(): boolean {
    const UA = BrowserUtils.getUA();
    return UA !== "" && /firefox/.test(UA);
  }
}
