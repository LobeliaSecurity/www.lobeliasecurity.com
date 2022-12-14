// QueryWalker Â© Eve.Familia, inc. / LobeliaTechnologiesâ„˘
// www.evefamilia.org

class QueryWalker {
  constructor(oDict, rootElement) {
    this.oDict = oDict;
    this.rootElement = rootElement;
  }

  async do(selectorTarget) {
    if (!selectorTarget) {
      selectorTarget = this.rootElement;
    }
    for (let selector in this.oDict) {
      let elements = selectorTarget.querySelectorAll(selector);
      for (let e of elements) {
        try {
          this.oDict[selector](e);
        } catch (ex) {
          console.warn("QueryWalker |", ex);
        }
      }
    }
  }
}
