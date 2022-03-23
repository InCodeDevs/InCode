/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");

module.exports = function (options = {
    app: null,
    prefix: "url"
}) {

    if (!fs.existsSync(process.env.URL_PUB_PATH)) {
        fs.mkdirSync(process.env.URL_PUB_PATH);
    }

    if (!fs.existsSync(path.join(process.env.URL_PUB_PATH, 'urls.json'))) {
        fs.writeFileSync(path.join(process.env.URL_PUB_PATH, 'urls.json'), "{}")
    }

    options.app.use(cors());
    options.app.use(bodyParser());

    options.app.post("/api/v1/url/create", (req, res) => {

        let target = req.body.target;

        let config = JSON.parse(fs.readFileSync(path.join(process.env.URL_PUB_PATH, "urls.json")).toString());

        let id = "";

        Object.keys(config).forEach(u => {
            if (config[u] === target) {
                id = u;
            }
        })

        if (id.length === 0) {

            while (true) {
                id = randomString(10);

                if (!config[id]) {
                    break;
                }
            }

        }

        config[id] = target;

        fs.writeFileSync(path.join(process.env.URL_PUB_PATH, "urls.json"), JSON.stringify(config));

        res.end(JSON.stringify({
            error: false,
            message: "created link",
            id: id,
            url: "/" + options.prefix + "/" + id
        }))
    })

    options.app.get("/" + options.prefix + "/:id", (req, res) => {
        let config = JSON.parse(fs.readFileSync(path.join(process.env.URL_PUB_PATH, "urls.json")).toString());

        if (config[req.params.id]) {
            res.status(301);
            res.set("Location", config[req.params.id])
            res.end("Redirecting to " + config[req.params.id] + "...");
        } else {
            res.end("Not found: /" + options.prefix + "/" + req.params.id);
        }
    })
}

function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
