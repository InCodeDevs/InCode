/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");

function getFullUserConfig() {
  return JSON.parse(
    fs
      .readFileSync(path.join(process.env.ACC_PRIV_PATH, "users.json"))
      .toString()
  );
}

function getFullDataConfig() {
  return JSON.parse(
    fs
      .readFileSync(path.join(process.env.ACC_PRIV_PATH, "data.json"))
      .toString()
  );
}

function overwriteUserConfig(config) {
  fs.writeFileSync(
    path.join(process.env.ACC_PRIV_PATH, "users.json"),
    JSON.stringify(config, null, 2)
  );
}

function overwriteDataConfig(config) {
  fs.writeFileSync(
    path.join(process.env.ACC_PRIV_PATH, "data.json"),
    JSON.stringify(config, null, 2)
  );
}

module.exports = {
  getFullUserConfig,
  getFullDataConfig,
  overwriteUserConfig,
  overwriteDataConfig,
};
