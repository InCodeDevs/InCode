/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import {User} from "./User";

export class UserUtil {

    public static async loginAndSave(username: string, password: string): Promise<number> {
        const success = await User.login(username, password);
        if(success) {
            localStorage.setItem("accounts.actualAccount", JSON.stringify({
                username: username,
                password: password
            }))
        }
        return 0;
    }

    public static getSavedUser(): object {
        return JSON.parse(localStorage.getItem("accounts.actualAccount") as string);
    }
}