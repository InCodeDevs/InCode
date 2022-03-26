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

  if (canUsePath(path0)) {
    fs.readdirSync(path0).forEach((x) => {
      if (fs.lstatSync(path.join(path0, x)).isFile()) {
        if (canUsePath(x)) {
          paths.push(path.join(path0, x));
        }
      } else {
        getFilePaths(path.join(path0, x)).forEach((y) => {
          if (canUsePath(y)) {
            paths.push(y);
          }
        });
      }
    });
  }
  return paths;
}

function canUsePath(path0) {
  return (
    !path0.includes("monaco-editor") &&
    !path0.includes("node_modules") &&
    !path0.includes(".lock") &&
    !path0.includes(".log") &&
    !path0.includes("-lock.json") &&
    !path0.includes("LICENSE") &&
    !path0.includes("dist") &&
    !path0.includes(".docusaurus") &&
    !path0.includes("build") &&
    !path0.includes(".ico") &&
    !path0.includes(".png") &&
    !path0.includes(".jpg") &&
    !path0.includes(".gif") &&
    !path0.includes(".svg")
  );
}

module.exports = { getLines, getFileCount, getChars, getWords };
