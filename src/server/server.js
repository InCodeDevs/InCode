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
const config = require("./module/config");

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
require("./api/error/404")(app);
require("./api/error/500")(app);

const { accountServer } = require("@incodelang/accounts");
const { urlServer } = require("@incodelang/urlshorter");

accountServer({ app: app, disable: {} });
urlServer({ app: app, prefix: "project" });

app.listen(3000, "0.0.0.0");
