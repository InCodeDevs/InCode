/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

const fs = require("fs");
const path = require("path");
const crypto = require('crypto');
const checkfile = require('./checkfile');
const {login} = require("./users");

checkfile(path.join(process.env.ACC_PRIV_PATH, "data.json"), "{}")

let data = {}

const reload = () => {
    data = JSON.parse(fs.readFileSync(path.join(process.env.ACC_PRIV_PATH, "data.json")).toString())
}

const save = () => {
    fs.writeFileSync(path.join(process.env.ACC_PRIV_PATH, "data.json"), JSON.stringify(data))
}

reload();

function setData(username, password, key, value) {
    if (!login(username, password).error) {
        if (data[key]) {
            if (data[key].access.includes(username)) {
                let msg = ""
                if (value === null) {
                    delete data[key];
                    msg = "Deleted."
                } else {
                    data[key].data = value;
                    msg = "Set."
                }
                save();
                return {
                    error: false,
                    message: msg
                }
            } else {
                return {
                    error: true,
                    message: "Access Denied."
                }
            }
        } else {
            data[key] = {
                access: [username],
                data: value
            }
            save();
            return {
                error: false,
                message: "Set."
            }
        }
    } else {
        return {
            error: true,
            message: "Login Failed."
        }
    }
}

function getData(username, password, key) {
    if (!login(username, password).error) {
        if (data[key]) {
            if (data[key].access.includes(username)) {
                return {
                    error: false,
                    message: data[key].data
                }
            } else {
                return {
                    error: true,
                    message: "Access Denied."
                }
            }
        }
    } else {
        return {
            error: true,
            message: "Login Failed."
        }
    }
}

function allow(username, password, key, newUser) {
    if (!login(username, password).error) {
        if (data[key]) {
            if (data[key].access.includes(username)) {
                data[key].access.push(newUser);
                save();

                return {
                    error: false,
                    message: "Added."
                }
            } else {
                return {
                    error: true,
                    message: "Access Denied."
                }
            }
        }
    } else {
        return {
            error: true,
            message: "Login Failed."
        }
    }
}

function disallow(username, password, key, newUser) {
    if (!login(username, password).error) {
        if (data[key]) {
            if (data[key].access.includes(username)) {
                data[key].access.splice(data[key].access.indexOf(newUser), 1);
                save();

                return {
                    error: false,
                    message: "Removed."
                }
            } else {
                return {
                    error: true,
                    message: "Access Denied."
                }
            }
        }
    } else {
        return {
            error: true,
            message: "Login Failed."
        }
    }
}

module.exports = {setData, getData, allow, disallow}