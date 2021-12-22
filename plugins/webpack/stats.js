/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");

const paths = getFilePaths(path.join(__dirname, "..", "..", "src"));

function getLines() {
  let lines = 0;
  paths.forEach((p) => {
    lines += fs.readFileSync(p).toString().split("\n").length;
  });
  return lines;
}

function getChars() {
  let chars = 0;
  paths.forEach((p) => {
    chars += fs.readFileSync(p).toString().length;
  });
  return chars;
}

function getFileCount() {
  return paths.length;
}

function getFilePaths(path0) {
  let paths = [];

  fs.readdirSync(path0).forEach((x) => {
    if (fs.lstatSync(path.join(path0, x)).isFile()) {
      paths.push(path.join(path0, x));
    } else {
      getFilePaths(path.join(path0, x)).forEach((y) => {
        paths.push(y);
      });
    }
  });
  return paths;
}

module.exports = { getLines, getFileCount, getChars };
