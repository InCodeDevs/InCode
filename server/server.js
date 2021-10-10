/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

const express = require('express');
const {Server} = require('socket.io');
const {createServer} = require('http');
const path = require("path");
const kill = require('kill-port');
const {accountServer} = require('@incodelang/accounts')
const {templateServer} = require('@incodelang/templates')
const {urlServer} = require("@incodelang/urlshorter");

const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {})

app.use(express.static(path.join(__dirname, "../dist")));

app.use(cors())
app.use(bodyParser())

accountServer({
    app
})

templateServer({
    app
})

urlServer({
    app,
    "prefix": "app",
})

app.use((req, res, next) => {
    res.status(404)

    if (req.accepts('html')) {
        res.end(fs.readFileSync(path.join("public", "404.html")))
        return;
    }

    if (req.accepts('json')) {
        res.json({ error: 'Not found', code: 404 });
        return;
    }
    res.type('txt').send('Not found');
})

module.exports = {app, io, httpServer}


const port = 3000;

process.on('uncaughtException', (e) => {
    kill(port, "tcp").then(connect).catch(() => {
        process.exit(0)
    })
})

connect();

function connect() {
    httpServer.listen(3000);
}