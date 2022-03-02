/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");

function generateErrorTemplate(code, name, message) {
  let errorTemplate = fs
    .readFileSync(path.join(__dirname, "..", "template", "error.html"))
    .toString();

  errorTemplate = errorTemplate.replace(/{err\.code}/g, code);
  errorTemplate = errorTemplate.replace(/{err\.name}/g, name);
  errorTemplate = errorTemplate.replace(/{err\.message}/g, message);

  return errorTemplate;
}

module.exports = { generateErrorTemplate };
