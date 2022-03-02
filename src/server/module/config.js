/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const chalk = require("chalk");

const subDirectories = ["logs", "templates", "push", "generator"];

if (!fs.existsSync(path.join(os.homedir(), ".incode"))) {
  console.log(
    chalk.red(
      `The config directory root ${path.join(
        os.homedir(),
        ".incode"
      )} does not exist. It will be created now...`
    )
  );
  fs.mkdirSync(path.join(os.homedir(), ".incode"));
}

subDirectories.forEach((subDirectory) => {
  if (!fs.existsSync(path.join(os.homedir(), ".incode", subDirectory))) {
    console.log(
      chalk.red(
        `The config directory ${path.join(
          os.homedir(),
          ".incode",
          subDirectory
        )} does not exist. It will be created now...`
      )
    );
    fs.mkdirSync(path.join(os.homedir(), ".incode", subDirectory));
  }
});
