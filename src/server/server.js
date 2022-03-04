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
    "\nby Ben Siebert and Lukas Birke\n\n"
);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const os = require("os");
require("./module/config");

const app = express();

app.get(["/editor*", "/docs*", "/playground*"], (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"));
});

require("./module/logger")(app);

app.use(express.static(path.join(__dirname, "..", "..", "dist")));
app.use(cors());
app.use(bodyParser());

require("./api/compiler")(app);
require("./api/generator/desktop")(app);
require("./api/push")(app);
require("./api/templates")(app);
require("./api/job")(app);
require("./api/admin")(app);
require("./api/admin/users")(app);
require("./api/admin/data")(app);

const { accountServer } = require("@incodelang/accounts");
const { urlServer } = require("@incodelang/urlshorter");
const {
  existsUser,
  createUser,
} = require("@incodelang/accounts/src/lib/module/users");
const chalk = require("chalk");

accountServer({ app: app, disable: {} });
urlServer({ app: app, prefix: "project" });

require("./api/error/404")(app);
require("./api/error/500")(app);

app.listen(3000, "0.0.0.0");

if (!existsUser("admin")) {
  createUser("admin", "admin");
  console.log(
    chalk.red(
      "A new user 'admin' was created with the password 'admin'. Please change it immediately!"
    )
  );
}
