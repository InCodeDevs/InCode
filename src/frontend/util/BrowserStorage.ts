/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

let storage = localStorage; // may be changed to `sessionStorage` in the future.

export default class BrowserStorage {
  public static store(key: string, value: string) {
    storage.setItem(key, value);
  }

  public static delete(key: string) {
    storage.removeItem(key);
  }

  public static getStorage(): typeof storage {
    return storage;
  }

  public static get(key: string): string {
    return storage.getItem(key) || "";
  }
}
