/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

const fs = require("fs");
const path = require("path");
const crypto = require('crypto');
const checkfile = require('./checkfile');

checkfile(path.join(process.env.ACC_PRIV_PATH, "users.json"), "{}")

let users = {}

const reload = () => {
    users = JSON.parse(fs.readFileSync(path.join(process.env.ACC_PRIV_PATH, "users.json")).toString())
}

const save = () => {
    fs.writeFileSync(path.join(process.env.ACC_PRIV_PATH, "users.json"), JSON.stringify(users))
}

reload();

checkfile(path.join(process.env.ACC_PRIV_PATH, "tokens.json"), "{}")

let tokens = {}

const reloadTokens = () => {
    tokens = JSON.parse(fs.readFileSync(path.join(process.env.ACC_PRIV_PATH, "tokens.json")).toString())
}

const saveTokens = () => {
    fs.writeFileSync(path.join(process.env.ACC_PRIV_PATH, "tokens.json"), JSON.stringify(tokens))
}

reloadTokens();

function existsUser(username) {
    return Object.keys(users).includes(username);
}

function createUser(username, password) {
    password = crypto.createHash("sha256").update(password).digest("base64")
    if (!existsUser(username)) {
        if (password.length >= 8) {
            users[username] = {password: password}
            save();
            return {
                error: false,
                message: "Created"
            }
        } else {
            return {
                error: true,
                message: "The length of the password needs to be at least 8 characters"
            }
        }
    } else {
        return {
            error: true,
            message: "The username is already taken"
        }
    }
}

function deleteUser(username, password) {
    password = crypto.createHash("sha256").update(password).digest("base64")
    if (existsUser(username)) {
        if (users[username].password === password) {
            delete users[username];
            save();
            return {
                error: false,
                message: "Deleted."
            }
        } else {
            return {
                error: true,
                message: "The password does not match."
            }
        }
    } else {
        return {
            error: true,
            message: "The user does not exists!"
        }
    }
}

function login(username, password) {
    if (!existsUser(username)) {
        return {
            error: true,
            message: "The user does not exists!"
        }
    } else {
        let origPassword = password;
        password = crypto.createHash("sha256").update(password).digest("base64")
        if (users[username].password === password) {
            return {
                error: false,
                message: "The password matches."
            }
        } else {
            if (!isTokenValid(username, origPassword).error) {
                return {
                    error: false,
                    message: "The token is valid"
                }
            } else {
                return {
                    error: true,
                    message: "The password does not match."
                }
            }
        }
    }
}

function updateUsername(old, username, password) {
    if (!login(old, password).error) {
        users[username] = users[old];
        delete users[old];
        save();
        return {
            error: false,
            message: "Updated."
        }
    } else {
        return {
            error: true,
            message: "The password does not match."
        }
    }
}

function updatePassword(username, old, password) {
    password = crypto.createHash("sha256").update(password).digest("base64")
    if (!login(username, old).error) {
        users[username].password = password;
        save();
        return {
            error: false,
            message: "Updated."
        }
    } else {
        return {
            error: true,
            message: "The password does not match."
        }
    }
}

function storeData(username, password, dataName, data) {
    if (!login(username, password).error) {
        if (!users[username].data) {
            users[username].data = {};
        }

        let msg = ""

        if (data === null) {
            delete users[username].data[dataName]
            msg = "Deleted."
        } else {
            users[username].data[dataName] = data;
            msg = "Saved."
        }

        save();

        return {
            error: false,
            message: msg
        }
    } else {
        return {
            error: true,
            message: "The password does not match."
        }
    }
}

function getData(username, password, dataName) {
    if (!login(username, password).error) {
        if (users[username].data && users[username].data[dataName]) {
            return {
                error: false,
                message: users[username].data[dataName],
            }
        } else {
            return {
                error: true,
                message: "The data was not found."
            }
        }
    } else {
        return {
            error: true,
            message: "The password does not match."
        }
    }
}

function getAllData(username, password) {
    if (!login(username, password).error) {
        return {
            error: false,
            message: users[username].data || {}
        }
    } else {
        return {
            error: true,
            message: "The password does not match."
        }
    }
}


function createToken(username, password) {
    if (login(username, password)) {
        let t = generateToken(32);
        while(tokens[t]) {
            t = generateToken(32);
        }
        tokens[t] = username;
        saveTokens();
        return {
            error: false,
            message: t
        };
    } else {
        return login(username, password);
    }
}

function isTokenValid(username, token) {
    if(tokens[token] === username){
        return {
            error: false,
            message: "Valid."
        }
    }else {
        return {
            error: true,
            message: "Not valid."
        }
    }
}

function generateToken(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


module.exports = {
    existsUser,
    createUser,
    deleteUser,
    login,
    updateUsername,
    updatePassword,
    storeData,
    getData,
    getAllData,
    createToken,
    isTokenValid,
    reload,
    save
}