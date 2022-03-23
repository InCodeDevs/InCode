/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const crypto = require('crypto')
const express = require('express')
const users = require('./module/users')
const data = require('./module/data')
const postboxes = require('./module/postboxes');

const bodyParser = require("body-parser");
const cors = require('cors')

module.exports = function (options = {
    app: null,
    disable: {}
}) {

    options.app.use(cors());
    options.app.use(bodyParser());

    options.app.get("/api/v1/user*", (req, res) => {
        res.end("{\"error\": true, \"message\": \"Method not allowed.\"}")
    })

    options.app.patch("/api/v1/user*", (req, res) => {
        res.end("{\"error\": true, \"message\": \"Method not allowed.\"}")
    })

    options.app.put("/api/v1/user*", (req, res) => {
        res.end("{\"error\": true, \"message\": \"Method not allowed.\"}")
    })

    options.app.delete("/api/v1/user*", (req, res) => {
        res.end("{\"error\": true, \"message\": \"Method not allowed.\"}")
    })

    options.app.post("/api/v1/user", (req, res) => {
        res.end("{\"error\": true, \"message\": \"Invalid API Endpoint.\"}")
    })

    if (!options.disable.createUser) {
        options.app.post("/api/v1/user/users/create", (req, res) => {
            if (req.body.username && req.body.password) {
                res.end(JSON.stringify(
                    users.createUser(req.body.username, req.body.password)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.deleteUser) {
        options.app.post("/api/v1/user/users/delete", (req, res) => {
            if (req.body.username && req.body.password) {
                res.end(JSON.stringify(
                    users.deleteUser(req.body.username, req.body.password)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.login) {
        options.app.post("/api/v1/user/users/login", (req, res) => {
            if (req.body.username && req.body.password) {
                res.end(JSON.stringify(
                    users.login(req.body.username, req.body.password)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.updateUsername) {
        options.app.post("/api/v1/user/users/update/username", (req, res) => {
            if (req.body.username && req.body.password && req.body.old) {
                res.end(JSON.stringify(
                    users.updateUsername(req.body.old, req.body.username, req.body.password)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.updatePassword) {
        options.app.post("/api/v1/user/users/update/password", (req, res) => {
            if (req.body.username && req.body.password && req.body.old) {
                res.end(JSON.stringify(
                    users.updatePassword(req.body.username, req.body.old, req.body.password)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.storeData) {
        options.app.post('/api/v1/user/users/data/store', (req, res) => {
            if (req.body.username && req.body.password && req.body.data && req.body.dataName) {
                res.end(JSON.stringify(
                    users.storeData(req.body.username, req.body.password, req.body.dataName, req.body.data)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.deleteUserData) {
        options.app.post('/api/v1/user/users/data/delete', (req, res) => {
            if (req.body.username && req.body.password && req.body.dataName) {
                res.end(JSON.stringify(
                    users.storeData(req.body.username, req.body.password, req.body.dataName, null)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }


    if (!options.disable.getData) {
        options.app.post('/api/v1/user/users/data', (req, res) => {
            if (req.body.username && req.body.password && req.body.dataName) {
                res.end(JSON.stringify(
                    users.getData(req.body.username, req.body.password, req.body.dataName)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.createPostbox) {
        options.app.post("/api/v1/user/postboxes/create", (req, res) => {
            if (req.body.username && req.body.password && req.body.name) {
                res.end(JSON.stringify(
                    postboxes.createBox(req.body.username, req.body.password, req.body.name)
                ));
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        });
    }

    if (!options.disable.deletePostbox) {
        options.app.post("/api/v1/user/postboxes/delete", (req, res) => {
            if (req.body.username && req.body.password && req.body.name) {
                res.end(JSON.stringify(
                    postboxes.deleteBox(req.body.username, req.body.password, req.body.name)
                ));
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.addPostbox) {
        options.app.post("/api/v1/user/postboxes/add", (req, res) => {
            if (req.body.username && req.body.password && req.body.name && req.body.owner && req.body.entry) {
                res.end(JSON.stringify(
                    postboxes.addToBox(req.body.username, req.body.password, req.body.name, req.body.owner, req.body.entry)
                ));
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.removePostbox) {
        options.app.post("/api/v1/user/postboxes/remove", (req, res) => {
            if (req.body.username && req.body.password && req.body.name && req.body.at) {
                res.end(JSON.stringify(
                    postboxes.removeFromBox(req.body.username, req.body.password, req.body.name, req.body.at)
                ));
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.clearPostbox) {
        options.app.post("/api/v1/user/postboxes/clear", (req, res) => {
            if (req.body.username && req.body.password && req.body.name) {
                res.end(JSON.stringify(
                    postboxes.clearBox(req.body.username, req.body.password, req.body.name)
                ));
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.readPostbox) {
        options.app.post("/api/v1/user/postboxes/read", (req, res) => {
            if (req.body.username && req.body.password && req.body.name) {
                res.end(JSON.stringify(
                    postboxes.readBox(req.body.username, req.body.password, req.body.name)
                ));
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.existsPostbox) {
        options.app.post("/api/v1/user/postboxes/exists", (req, res) => {
            if (req.body.owner && req.body.name) {
                res.end(JSON.stringify(
                    postboxes.existsBox(req.body.owner, req.body.name)
                ));
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.getAllData) {
        options.app.post('/api/v1/user/users/data/all', (req, res) => {
            if (req.body.username && req.body.password) {
                res.end(JSON.stringify(
                    users.getAllData(req.body.username, req.body.password)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.existsUser) {
        options.app.post("/api/v1/user/users/exists", (req, res) => {
            if (req.body.username) {
                res.end("{\"error\": false, \"message\": " + users.existsUser(req.body.username) + "}")
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.setUserData) {
        options.app.post("/api/v1/user/data/set", (req, res) => {
            if (req.body.username && req.body.password && req.body.key && req.body.value) {
                res.end(JSON.stringify(
                    data.setData(req.body.username, req.body.password, req.body.key, req.body.value)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.deleteData) {
        options.app.post("/api/v1/user/data/delete", (req, res) => {
            if (req.body.username && req.body.password && req.body.key) {
                res.end(JSON.stringify(
                    data.setData(req.body.username, req.body.password, req.body.key, null)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }


    if (!options.disable.allowDataAccess) {
        options.app.post("/api/v1/user/data/allow", (req, res) => {
            if (req.body.username && req.body.password && req.body.key && req.body.newUser) {
                res.end(JSON.stringify(
                    data.allow(req.body.username, req.body.password, req.body.key, req.body.newUser)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.disallowDataAccess) {
        options.app.post("/api/v1/user/data/disallow", (req, res) => {
            if (req.body.username && req.body.password && req.body.key && req.body.newUser) {
                res.end(JSON.stringify(
                    data.disallow(req.body.username, req.body.password, req.body.key, req.body.newUser)
                ))
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if (!options.disable.getUserData) {
        options.app.post("/api/v1/user/data/get", (req, res) => {
            if (req.body.username && req.body.password && req.body.key) {
                if (req.body.hash) {
                    res.end(
                        crypto.createHash('sha256').update(JSON.stringify(data.getData(req.body.username, req.body.password, req.body.key))).digest("base64")
                    )
                } else {
                    res.end(JSON.stringify(
                        data.getData(req.body.username, req.body.password, req.body.key)
                    ))
                }
            } else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }

    if(!options.disable.createToken) {
        options.app.post("/api/v1/user/tokens/create", (req, res) => {
            if (req.body.username && req.body.password) {
                res.end(JSON.stringify(
                    users.createToken(req.body.username, req.body.password)
                ))
            }else {
                res.end("{\"error\": true, \"message\": \"Invalid Request body.\"}")
            }
        })
    }
}