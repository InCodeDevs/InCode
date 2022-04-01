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
require("./module/config");

const app = express();

app.get(
  [
    "/editor*",
    "/docs*",
    "/playground*",
    "/admin*",
    "/electron-select-app",
    "/choose-platform",
  ],
  (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "..", "..", "dist", "app", "index.html")
    );
  }
);

app.get(["*bundle.js.gz", "*bundle.js"], (req, res) => {
  res
    .header("Content-Encoding", "gzip")
    .sendFile(
      path.join(__dirname, "..", "..", "..", "dist", "app", "bundle.js.gz")
    );
});

app.get("/usercontent*", (req, res) => {
  res.set("Content-Type", "text/html");
  res.sendFile(
    path.join(
      os.homedir(),
      ".incode",
      "usercontent",
      req.path.replace(/^\/usercontent/, "")
    )
  );
});

require("./module/logger")(app);

app.use(express.static(path.join(__dirname, "..", "..", "..", "dist", "app")));
app.use(cors());
app.use(bodyParser());

require("./api/compiler")(app);
require("./api/generator/desktop")(app);
require("./api/publish/project")(app);
require("./api/templates")(app);
require("./api/job")(app);
require("./api/admin")(app);
require("./api/admin/users")(app);
require("./api/admin/data")(app);
require("./api/admin/postbox")(app);
require("./api/analytics")(app);
require("./api/live/session")(app);

const { accountServer } = require("@incodelang/accounts");
const { urlServer } = require("@incodelang/urlshorter");
const {
  existsUser,
  createUser,
} = require("@incodelang/accounts/src/lib/module/users");
const chalk = require("chalk");
const os = require("os");

accountServer({
  app: app,
  disable: {
    updateUsername: true,
  },
});
urlServer({ app: app, prefix: "project" });

require("./api/error/404")(app);
require("./api/error/500")(app);

require("kill-port")(3000, "tcp").then(() => {
  app.listen(3000, "0.0.0.0");
});

if (!existsUser("admin")) {
  createUser("admin", "admin");
  console.log(
    chalk.red(
      "A new user 'admin' was created with the password 'admin'. Please change it immediately!"
    )
  );
}
