/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

const express = require('express');
const {Server} = require('socket.io');
const {createServer} = require('http')
const path = require("path");

const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {})

app.use(express.static(path.join(__dirname, "../dist")));

app.use(cors())
app.use(bodyParser())

httpServer.listen(3000);

module.exports = {app, io, httpServer}

require('./api/v1/user')