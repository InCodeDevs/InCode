/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import BrowserStorage from "./BrowserStorage";

export default class UserManager {
  public static isLoggedIn(): boolean {
    return (
      BrowserStorage.get("accessToken") != "" &&
      BrowserStorage.get("accessName") != ""
    );
  }

  public static login(username: string, token: string) {
    BrowserStorage.store("accessName", username);
    BrowserStorage.store("accessToken", token);
  }

  public static logout() {
    BrowserStorage.delete("accessName");
    BrowserStorage.delete("accessToken");
  }

  public static getUsername(): string {
    return BrowserStorage.get("accessName");
  }

  public static getToken(): string {
    return BrowserStorage.get("accessToken");
  }
}