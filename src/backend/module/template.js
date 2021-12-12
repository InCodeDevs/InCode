/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

if (!fs.existsSync(path.join(os.homedir(), ".incode-templ"))) {
  fs.mkdirSync(path.join(os.homedir(), ".incode-templ"));
}

if (
  !fs.existsSync(path.join(os.homedir(), ".incode-templ", "templates.json"))
) {
  fs.writeFileSync(
    path.join(os.homedir(), ".incode-templ", "templates.json"),
    "{}"
  );
}

let config = {};

function save() {
  fs.writeFileSync(
    path.join(os.homedir(), ".incode-templ", "templates.json"),
    JSON.stringify(config)
  );
}

function reload() {
  config = JSON.parse(
    fs
      .readFileSync(path.join(os.homedir(), ".incode-templ", "templates.json"))
      .toString()
  );
}

function createTemplate(username, name, code, type) {
  let id = 0;
  let f = false;
  Object.keys(config).forEach((key) => {
    let template = config[key];
    if (
      template.author === username &&
      template.name === name &&
      template.type === type
    ) {
      template.code = code;
      id = key;
      f = true;
    }
  });
  if (!f) {
    id = Object.keys(config).length;
    config[id] = {
      author: username,
      name: name,
      code: code,
      type: type,
    };
  }
  save();
  return {
    error: false,
    id,
  };
}

function deleteTemplate(username, name) {
  Object.keys(config).forEach((key) => {
    let template = config[key];
    if (template.author === username && template.name === name) {
      delete config[key];
    }
  });
  save();
  return {
    error: false,
    message: "Deleted",
  };
}

function getAllTemplates() {
  return {
    error: false,
    templates: config,
  };
}

function getTemplate(id) {
  if (config[id]) {
    return {
      error: false,
      template: config[id],
    };
  } else {
    return {
      error: true,
      message: "Template not found.",
    };
  }
}

module.exports = {
  createTemplate,
  deleteTemplate,
  getTemplate,
  getAllTemplates,
};
