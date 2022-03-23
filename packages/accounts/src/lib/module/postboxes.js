/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const checkfile = require("./checkfile");
const path = require("path");
const fs = require("fs");
const {login} = require('./users')

checkfile(path.join(process.env.ACC_PRIV_PATH, "postboxes.json"), "{}")

let data = {}

const reload = () => {
    data = JSON.parse(fs.readFileSync(path.join(process.env.ACC_PRIV_PATH, "postboxes.json")).toString())
}

const save = () => {
    fs.writeFileSync(path.join(process.env.ACC_PRIV_PATH, "postboxes.json"), JSON.stringify(data))
}

reload();

function createBox(username, password, name) {
    const loginRequest = login(username, password);

    if (!loginRequest.error) {
        if (data[username + "_" + name]) {
            return {
                error: true,
                message: "The postbox already exists!"
            }
        } else {
            data[username + "_" + name] = {
                owner: username,
                data: []
            }

            save();

            return {
                error: false,
                message: "The postbox was created!"
            }
        }
    } else {
        return loginRequest;
    }
}

function deleteBox(username, password, name) {
    const loginRequest = login(username, password);

    if (!loginRequest.error) {
        if (data[username + "_" + name]) {
            delete data[username + "_" + name];

            save();

            return {
                error: false,
                message: "The postbox was deleted!"
            }
        } else {
            return {
                error: true,
                message: "The postbox does not exists!"
            }
        }
    } else {
        return loginRequest;
    }
}

function addToBox(username, password, name, owner, entry) {
    const loginRequest = login(username, password);

    if (!loginRequest.error) {
        if (data[owner + "_" + name]) {
            data[owner + "_" + name].data.push({
                author: username,
                at: new Date().toTimeString(),
                entry
            })
            save();
            return {
                error: false,
                message: "Added data!"
            }
        } else {
            return {
                error: true,
                message: "The postbox does not exists!"
            }
        }
    } else {
        return loginRequest;
    }
}

function removeFromBox(username, password, name, timestamp) {
    const loginRequest = login(username, password);

    if (!loginRequest.error) {
        if (data[username + "_" + name]) {

            for (let i = 0; i < data[username + "_" + name].data.length; i++) {
                if (timestamp === data[username + "_" + name].data[i].at) {
                    data[username + "_" + name].data.splice(i, 1);
                    break;
                }
            }

            save();
            return {
                error: false,
                message: "Removed data!"
            }
        } else {
            return {
                error: true,
                message: "The postbox does not exists!"
            }
        }
    } else {
        return loginRequest;
    }
}

function readBox(username, password, name) {
    const loginRequest = login(username, password);

    if (!loginRequest.error) {
        if (data[username + "_" + name]) {
            return {
                error: false,
                message: data[username + "_" + name].data
            }
        } else {
            return {
                error: true,
                message: "Access denied."
            }
        }
    } else {
        return loginRequest;
    }
}

function clearBox(username, password, name) {
    const loginRequest = login(username, password);

    if (!loginRequest.error) {
        if (data[username + "_" + name]) {
            data[username + "_" + name].data = []
            return {
                error: false,
                message: "Cleared box."
            }
        } else {
            return {
                error: true,
                message: "Access denied."
            }
        }
    } else {
        return loginRequest;
    }
}

function existsBox(owner, name) {
    if (data[owner + "_" + name]) {
        return {
            error: false,
            message: "The postbox exists"
        }
    } else {
        return {
            error: false,
            message: "The postbox does not exists"
        }
    }
}

module.exports = {createBox, deleteBox, addToBox, removeFromBox, readBox, clearBox, existsBox, reload, save}