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

const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {})

app.use(express.static(path.join(__dirname, "../dist")));

app.use(cors())
app.use(bodyParser())

module.exports = {app, io, httpServer}

accountServer({
    app
})

templateServer({
    app
})

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