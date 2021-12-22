/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const serveIndex = require("serve-index");
const { accountServer, data, postboxes } = require("@incodelang/accounts");
const { users } = require("@incodelang/accounts");
const { urlServer } = require("@incodelang/urlshorter");
const template = require("./module/template");
const fs = require("fs");
const path = require("path");

const app = express();

app.get(["/app*", "/docs*"], (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"));
});

app.use(express.static(path.join(__dirname, "..", "..", "dist")));
app.use(cors());
app.use(bodyParser());

accountServer({ app: app, disable: {} });
urlServer({ app: app, prefix: "app" });

app.post("/api/v1/templates", (req, res) => {
  if (
    req.body.username !== undefined &&
    req.body.token !== undefined &&
    req.body.name !== undefined &&
    req.body.code !== undefined &&
    req.body.type !== undefined &&
    req.body.description !== undefined
  ) {
    const { username, token, name, code, type, description } = req.body;
    if (users.login(username, token).error === false) {
      res.status(200);
      res.end(
        JSON.stringify(
          template.createTemplate(username, name, code, type, description)
        )
      );
    } else {
      res.status(401);
      res.end(JSON.stringify(users.login(username, token)));
    }
    return;
  } else {
    res.status(400);
    res.end(
      JSON.stringify({
        error: true,
        message: "Invalid Request body.",
      })
    );
  }
});

app.get("/api/v1/templates", (req, res) => {
  if (req.body.id) {
    res.status(200);
    res.end(JSON.stringify(template.getTemplate(req.body.id)));
  } else {
    res.status(400);
    res.end(
      JSON.stringify({
        error: true,
        message: "Invalid Request body.",
      })
    );
  }
});

app.get("/api/v1/templates/all", (req, res) => {
  res.status(200);
  res.end(JSON.stringify(template.getAllTemplates()));
});

app.delete("/api/v1/templates", (req, res) => {
  if (!req.body.username || !req.body.token || !req.body.name) {
    res.status(400);
    res.end(
      JSON.stringify({
        error: true,
        message: "Invalid Request body.",
      })
    );
    return;
  }
  const { username, token, name } = req.body;
  if (users.login(username, token).error === false) {
    res.status(200);
    res.end(JSON.stringify(template.deleteTemplate(username, name)));
  } else {
    res.status(401);
    res.end(JSON.stringify(users.login(username, token)));
  }
});

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
