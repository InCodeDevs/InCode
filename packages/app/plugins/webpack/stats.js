/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");

const paths = getFilePaths(
  path.join(__dirname, "..", "..", "..", "..", "packages")
);

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

function getWords() {
  let words = 0;
  paths.forEach((p) => {
    words += fs.readFileSync(p).toString().split(" ").length;
  });
  return words;
}

function getFileCount() {
  return paths.length;
}

function getFilePaths(path0) {
  let paths = [];

  fs.readdirSync(path0).forEach((x) => {
    if (fs.lstatSync(path.join(path0, x)).isFile()) {
      if (
        !x.includes("monaco-editor") &&
        !x.includes("node_modules") &&
        !x.includes(".lock") &&
        !x.includes(".log")
      ) {
        paths.push(path.join(path0, x));
      }
    } else {
      getFilePaths(path.join(path0, x)).forEach((y) => {
        if (
          !y.includes("monaco-editor") &&
          !y.includes("node_modules") &&
          !x.includes(".lock") &&
          !y.includes(".log")
        ) {
          paths.push(y);
        }
      });
    }
  });
  return paths;
}

module.exports = { getLines, getFileCount, getChars, getWords };
