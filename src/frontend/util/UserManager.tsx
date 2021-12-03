/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export default class UserManager {
  public static isLoggedIn(): boolean {
    return localStorage.getItem("user") != null;
  }
}
