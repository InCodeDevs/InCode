/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const chalk = require("chalk");
const fs = require("fs");
const os = require("os");
const path = require("path");

let log = "";

function save() {
  console.log("Saving log...");
  fs.writeFileSync(
    path.join(
      os.homedir(),
      ".incode",
      "logs",
      "incode-" +
        new Date().getDate() +
        "." +
        new Date().getMonth() +
        "." +
        new Date().getFullYear() +
        "_" +
        new Date().getHours() +
        "." +
        new Date().getMinutes() +
        "." +
        new Date().getSeconds() +
        "." +
        new Date().getMilliseconds() +
        ".txt"
    ),
    log
  );
}

function add(line) {
  log += line + "\n";
}

module.exports = (app) => {
  const __old = console.log;

  console.log = function (args) {
    add(args);
    __old(args);
  };

  app.use((req, res, next) => {
    if (req.path !== "/api/v1/user/postboxes/read") {
      const methods = {
        GET: chalk.green,
        POST: chalk.blue,
        DELETE: chalk.red,
      };
      const method = methods[req.method];

      add("[" + req.method + "] " + req.socket.remoteAddress + "\t" + req.path);

      __old(
        "[" +
          method(req.method) +
          "]\t" +
          chalk.yellow(req.socket.remoteAddress) +
          "\t" +
          req.path
      );
    }
    next();
  });

  process.on("SIGINT", exitHandler);
  process.on("SIGUSR1", exitHandler);
  process.on("SIGUSR2", exitHandler);
};

function exitHandler() {
  save();
  process.exit();
}
