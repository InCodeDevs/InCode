/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const path = require("path");
const fs = require("fs");

const version = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../../../package.json")).toString()
).version;

module.exports = { version };
