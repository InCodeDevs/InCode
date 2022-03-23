/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

class WebClient {

    #root;
    #fetchConfig = {
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

    constructor(rootUrl) {
        this.#root = rootUrl;
    }

    async login(username, password) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password
        })

        const r = await fetch(this.#root + "/api/v1/user/users/login", config)
        try {
            const j = await r.json();
            return !j.error
        } catch {
            return false;
        }
    }

    async create(username, password) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password
        })

        const r = await fetch(this.#root + "/api/v1/user/users/create", config)
        try {
            const j = await r.json();
            return !j.error;
        } catch {
            return false;
        }
    }

    async delete(username, password) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password
        })

        const r = await fetch(this.#root + "/api/v1/user/users/delete", config)
        try {
            const j = await r.json();
            return !j.error;
        } catch {
            return false;
        }
    }

    async updateUsername(username, password, newUsername) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            old: username,
            username: newUsername,
            password: password
        })

        const r = await fetch(this.#root + "/api/v1/user/users/update/username", config)
        try {
            const j = await r.json();
            return !j.error;
        } catch {
            return false;
        }
    }

    async updatePassword(username, password, newPassword) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            old: password,
            username: username,
            password: newPassword
        })

        const r = await fetch(this.#root + "/api/v1/user/users/update/password", config)
        try {
            const j = await r.json();
            return !j.error;
        } catch {
            return false;
        }
    }

    async storeData_u(username, password, data, dataName) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            data: data,
            dataName: dataName
        })

        const r = await fetch(this.#root + "/api/v1/user/users/data/store", config)
        try {
            const j = await r.json();
            return !j.error;
        } catch {
            return false;
        }
    }

    async deleteData_u(username, password, dataName) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            dataName: dataName
        })

        const r = await fetch(this.#root + "/api/v1/user/users/data/delete", config)
        try {
            const j = await r.json();
            return !j.error;
        } catch {
            return false;
        }
    }

    async getData_u(username, password, dataName) {
        try {
            const config = this.#fetchConfig;

            config.body = JSON.stringify({
                username: username,
                password: password,
                dataName: dataName
            })

            const r = await fetch(this.#root + "/api/v1/user/users/data", config)
            try {
                const j = await r.json();
                return j.message;
            } catch {
                return false;
            }
        } catch {
            return {};
        }
    }

    async getAllData_u(username, password) {
        const config = this.#fetchConfig;

        config.body = JSON.stringify({
            username: username,
            password: password
        })

        const r = await fetch(this.#root + "/api/v1/user/users/data/all", config)
        try {
            const j = await r.json();
            return j.message;
        } catch {
            return false;
        }
    }

    async existsUser(username) {
        const config = this.#fetchConfig;

        config.body = JSON.stringify({
            username: username
        })

        const r = await fetch(this.#root + "/api/v1/user/users/exists", config)
        try {
            const j = await r.json();
            return j.message;
        } catch {
            return false;
        }
    }

    async storeData(username, password, data, dataName) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            value: data,
            key: dataName
        })

        const r = await fetch(this.#root + "/api/v1/user/data/set", config)
        try {
            const j = await r.json();
            return !j.error;
        } catch {
            return false;
        }
    }

    async deleteData(username, password, dataName) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            key: dataName
        })

        const r = await fetch(this.#root + "/api/v1/user/data/delete", config)
        try {
            const j = await r.json();
            return !j.error;
        } catch {
            return false;
        }
    }

    async getData(username, password, dataName, hash = false) {
        const config = this.#fetchConfig;

        config.body = JSON.stringify({
            username: username,
            password: password,
            key: dataName,
            hash: hash
        })

        const r = await fetch(this.#root + "/api/v1/user/data/get", config)
        try {
            const j = await r.json();
            if (hash) {
                return j;
            } else {
                return j.message;
            }
        } catch {
            return false;
        }
    }

    async allowDataAccess(username, password, dataName, newUser) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            key: dataName,
            newUser: newUser
        })

        const r = await fetch(this.#root + "/api/v1/user/data/allow", config)
        try {
            const j = await r.json();
            return !j.error;
        } catch {
            return false;
        }
    }

    async disallowDataAccess(username, password, dataName, newUser) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            key: dataName,
            newUser: newUser
        })

        const r = await fetch(this.#root + "/api/v1/user/data/allow", config)
        try {
            const j = await r.json();
            return !j.error;
        } catch {
            return false;
        }
    }

    async createPostBox(username, password, name) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            name: name
        })

        const r = await fetch(this.#root + "/api/v1/user/postboxes/create", config)
        try {
            const j = await r.json();
            return !j.error;
        } catch {
            return false;
        }
    }

    async deletePostBox(username, password, name) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username: username,
            password: password,
            name: name
        })

        const r = await fetch(this.#root + "/api/v1/user/postboxes/delete", config)
        try {
            const j = await r.json();

            return !j.error;
        } catch {
            return false;
        }
    }

    async addToPostBox(username, password, name, owner, entry) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username,
            password,
            name,
            owner,
            entry
        })

        const r = await fetch(this.#root + "/api/v1/user/postboxes/add", config)
        try {
            const j = await r.json();
            return !j.error;
        } catch {
            return false;
        }
    }

    async removeFromPostBox(username, password, name, at) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username,
            password,
            name,
            at
        })

        const r = await fetch(this.#root + "/api/v1/user/postboxes/remove", config)
        try {
            const j = await r.json();

            return !j.error;
        } catch {
            return false;
        }
    }

    async clearPostBox(username, password, name) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username,
            password,
            name
        })

        const r = await fetch(this.#root + "/api/v1/user/postboxes/clear", config)
        try {
            const j = await r.json();

            return !j.error;
        } catch {
            return false;
        }
    }

    async readPostBox(username, password, name) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username,
            password,
            name
        })

        const r = await fetch(this.#root + "/api/v1/user/postboxes/read", config)
        try {
            const j = await r.json();
            return j.message;
        } catch {
            return false;
        }
    }

    async existsPostBox(owner, name) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            owner,
            name
        })

        const r = await fetch(this.#root + "/api/v1/user/postboxes/exists", config);
        try {
            const j = await r.json();
            return !j.message.includes("not");
        } catch {
            return false;
        }
    }

    async createToken(username, password) {
        const config = this.#fetchConfig;
        config.body = JSON.stringify({
            username,
            password
        })

        const r = await fetch(this.#root + "/api/v1/user/tokens/create", config)
        try {
            const j = await r.json();
            return j.message;
        } catch {
            return false;
        }
    }
}

module.exports = {
    WebClient
}