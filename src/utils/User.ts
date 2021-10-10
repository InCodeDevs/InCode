/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

export class User {

    private static readonly fetchConfig = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: "{}"
    }

    public static async login(username: string, password: string) {
        const config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password
        })

        const r = await fetch("/api/v1/user/users/login", config as RequestInit)
        const j = await r.json();

        return !j.error
    }

    public static async create(username: string, password: string) {
        const config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password
        })

        const r = await fetch("/api/v1/user/users/create", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async delete(username: string, password: string) {
        const config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password
        })

        const r = await fetch("/api/v1/user/users/delete", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async updateUsername(username: string, password: string, newUsername: string) {
        const config = this.fetchConfig;
        config.body = JSON.stringify({
            old: username,
            username: newUsername,
            password: password
        })

        const r = await fetch("/api/v1/user/users/update/username", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async updatePassword(username: string, password: string, newPassword: string) {
        const config = this.fetchConfig;
        config.body = JSON.stringify({
            old: password,
            username: username,
            password: newPassword
        })

        const r = await fetch("/api/v1/user/users/update/password", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async storeData_u(username: string, password: string, data: object, dataName: string) {
        const config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            data: data,
            dataName: dataName
        })

        const r = await fetch("/api/v1/user/users/data/store", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async deleteData_u(username: string, password: string, dataName: string) {
        const config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            dataName: dataName
        })

        const r = await fetch("/api/v1/user/users/data/delete", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async getData_u(username: string, password: string, dataName: string) {
        try {
            const config = this.fetchConfig;

            config.body = JSON.stringify({
                username: username,
                password: password,
                dataName: dataName
            })

            const r = await fetch("/api/v1/user/users/data", config as RequestInit)
            const j = await r.json();

            return j.message;
        } catch {
            return {};
        }
    }

    public static async getAllData_u(username: string, password: string) {
        const config = this.fetchConfig;

        config.body = JSON.stringify({
            username: username,
            password: password
        })

        const r = await fetch("/api/v1/user/users/data/all", config as RequestInit)
        const j = await r.json();

        return j.message;
    }

    public static async existsUser(username: string) {
        const config = this.fetchConfig;

        config.body = JSON.stringify({
            username: username
        })

        const r = await fetch("/api/v1/user/users/exists", config as RequestInit)
        const j = await r.json();

        return j.message;
    }

    public static async storeData(username: string, password: string, data: object, dataName: string) {
        const config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            value: data,
            key: dataName
        })

        const r = await fetch("/api/v1/user/data/set", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async deleteData(username: string, password: string, dataName: string) {
        const config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            key: dataName
        })

        const r = await fetch("/api/v1/user/data/delete", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async getData(username: string, password: string, dataName: string, hash = false) {
        const config = this.fetchConfig;

        config.body = JSON.stringify({
            username: username,
            password: password,
            key: dataName,
            hash: hash
        })

        const r = await fetch("/api/v1/user/data/get", config as RequestInit)
        const j = await r.json();

        if (hash) {
            return j;
        } else {
            return j.message;
        }
    }

    public static async allowDataAccess(username: string, password: string, dataName: string, newUser: string) {
        const config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            key: dataName,
            newUser: newUser
        })

        const r = await fetch("/api/v1/user/data/allow", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async disallowDataAccess(username: string, password: string, dataName: string, newUser: string) {
        const config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            key: dataName,
            newUser: newUser
        })

        const r = await fetch("/api/v1/user/data/allow", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }
}