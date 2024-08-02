export default class FetchHandle {
  constructor(el) {
    this.el = el;
  }
  static async fetchUrl(url) {
    let fetchUrl = await fetch(url);
    let jsonResponse = await fetchUrl.json();
    let jsonEntries = await Object.entries(jsonResponse);
    return jsonEntries;
  }
}
