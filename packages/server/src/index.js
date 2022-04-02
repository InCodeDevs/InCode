/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

console.log(
  "\n" +
    "\n" +
    ".___       _________            .___      \n" +
    "|   | ____ \\_   ___ \\  ____   __| _/____  \n" +
    "|   |/    \\/    \\  \\/ /  _ \\ / __ |/ __ \\ \n" +
    "|   |   |  \\     \\___(  <_> ) /_/ \\  ___/ \n" +
    "|___|___|  /\\______  /\\____/\\____ |\\___  >\n" +
    "         \\/        \\/            \\/    \\/ \n" +
    "\nby Ben Siebert\n\n"
);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const chalk = require("chalk");
const os = require("os");
const app = express();
const server = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(server);

require("./module/config");
require("./module/logger")(app);

app.use(express.static(path.join(__dirname, "..", "..", "..", "dist", "app")));
app.use(cors());
app.use(bodyParser.json());

require("./loader")(app);

require("./module/socket/connection")(io);

const {
  existsUser,
  createUser,
} = require("@incodelang/accounts/src/lib/module/users");
const { v4 } = require("uuid");

require("kill-port")(3000, "tcp").then(() => {
  server.listen(3000, "0.0.0.0");
});

if (!existsUser("admin")) {
  const password = v4();
  createUser("admin", password);
  console.log(
    chalk.red(`A new user 'admin' was created with the password '${password}'.`)
  );
}
