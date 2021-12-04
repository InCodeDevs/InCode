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
}
