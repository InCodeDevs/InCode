/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
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
        let config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/users/login", config as RequestInit)
        const j = await r.json();

        return !j.error
    }

    public static async create(username: string, password: string) {
        let config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/users/create", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async delete(username: string, password: string) {
        let config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/users/delete", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async updateUsername(username: string, password: string, newUsername: string) {
        let config = this.fetchConfig;
        config.body = JSON.stringify({
            old: username,
            username: newUsername,
            password: password
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/users/update/username", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async updatePassword(username: string, password: string, newPassword: string) {
        let config = this.fetchConfig;
        config.body = JSON.stringify({
            old: password,
            username: username,
            password: newPassword
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/users/update/password", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async storeData_u(username: string, password: string, data: object, dataName: string) {
        let config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            data: data,
            dataName: dataName
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/users/data/store", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async deleteData_u(username: string, password: string, dataName: string) {
        let config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            dataName: dataName
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/users/data/delete", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async getData_u(username: string, password: string, dataName: string) {
        let config = this.fetchConfig;
        
        config.body = JSON.stringify({
            username: username,
            password: password,
            dataName: dataName
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/users/data", config as RequestInit)
        const j = await r.json();

        return j.message;
    }

    public static async getAllData_u(username: string, password: string) {
        let config = this.fetchConfig;
        
        config.body = JSON.stringify({
            username: username,
            password: password
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/users/data/all", config as RequestInit)
        const j = await r.json();

        return j.message;
    }

    public static async existsUser(username: string) {
        let config = this.fetchConfig;
        
        config.body = JSON.stringify({
            username: username
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/users/exists", config as RequestInit)
        const j = await r.json();

        return j.message;
    }

    public static async storeData(username: string, password: string, data: object, dataName: string) {
        let config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            value: data,
            key: dataName
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/data/set", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async deleteData(username: string, password: string, dataName: string) {
        let config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            key: dataName
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/data/delete", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async getData(username: string, password: string, dataName: string, hash: boolean = false) {
        let config = this.fetchConfig;
        
        config.body = JSON.stringify({
            username: username,
            password: password,
            key: dataName,
            hash: hash
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/data/get", config as RequestInit)
        const j = await r.json();

        if (hash) {
            return j;
        } else {
            return j.message;
        }
    }

    public static async allowDataAccess(username: string, password: string, dataName: string, newUser: string) {
        let config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            key: dataName,
            newUser: newUser
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/data/allow", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }

    public static async disallowDataAccess(username: string, password: string, dataName: string, newUser: string) {
        let config = this.fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            key: dataName,
            newUser: newUser
        })

        const r = await fetch("https://apis.craftions.net/incode/accounts/data/allow", config as RequestInit)
        const j = await r.json();

        return !j.error;
    }
}