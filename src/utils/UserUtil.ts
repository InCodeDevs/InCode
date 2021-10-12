/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import { WebClient } from "@incodelang/accounts-client";

const User: WebClient = new WebClient("");

export class UserUtil {
  public static async loginAndSave(
    username: string,
    password: string
  ): Promise<boolean> {
    const success = await User.login(username, password);
    if (success) {
      sessionStorage.setItem(
        "accounts.actualAccount",
        JSON.stringify({
          username: username,
          password: password,
        })
      );
    }
    return success;
  }

  public static getSavedUser(): IUser {
    const user = JSON.parse(
      sessionStorage.getItem("accounts.actualAccount") as string
    );
    return {
      username: user.username,
      password: user.password,
    };
  }
}

export interface IUser {
  username: string;
  password: string;
}
