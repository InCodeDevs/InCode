/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import BrowserStorage from "./BrowserStorage";
import { WebClient } from "@incodelang/accounts-client";

const client = new WebClient("");

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

  public static async deleteAccount(password: string): Promise<boolean> {
    const success = await client.delete(this.getUsername(), password);
    if (success) {
      this.logout();
      return true;
    } else {
      return false;
    }
  }
}
