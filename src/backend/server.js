/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const serveIndex = require("serve-index");
const { accountServer } = require("@incodelang/accounts");
const { urlServer } = require("@incodelang/urlshorter");
const { templateServer } = require("@incodelang/templates");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "..", "..", "dist")));
app.use(cors());
app.use(bodyParser());

accountServer({ app: app, disable: {} });
urlServer({ app: app, prefix: "app" });
templateServer({ app: app });

app.use((req, res, next) => {
  res.status(404);

  res.end(
    generateErrorTemplate(
      404,
      "Not Found",
      "Could not find <code>" + req.path + "</code>"
    )
  );
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500);
  res.end(
    generateErrorTemplate(
      500,
      "Internal Server Error",
      "An error occurred processing <code>" + req.path + "</code>"
    )
  );
});

app.listen(3000, "0.0.0.0");

function generateErrorTemplate(code, name, message) {
  let errorTemplate = fs
    .readFileSync(path.join(__dirname, "template", "error.html"))
    .toString();

  errorTemplate = errorTemplate.replace(/{err\.code}/g, code);
  errorTemplate = errorTemplate.replace(/{err\.name}/g, name);
  errorTemplate = errorTemplate.replace(/{err\.message}/g, message);

  return errorTemplate;
}
