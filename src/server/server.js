/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { accountServer } = require("@incodelang/accounts");
const { users } = require("@incodelang/accounts");
const { urlServer } = require("@incodelang/urlshorter");
const {
  Compiler,
  AbstractSyntaxTreeGenerator,
} = require("@incodelang/compiler");

const template = require("./module/template");
const push = require("./module/pushNotifications");

const app = express();

app.get(["/editor*", "/docs*", "/playground*"], (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"));
});

require("./module/logger")(app);

app.use(express.static(path.join(__dirname, "..", "..", "dist")));
app.use(cors());
app.use(bodyParser());

accountServer({ app: app, disable: {} });
urlServer({ app: app, prefix: "project" });

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

app.post("/api/v1/push/subscription", (req, res) => {
  if (!req.body.username || !req.body.token || !req.body.subscription) {
    res.status(400);
    res.end(
      JSON.stringify({
        error: true,
        message: "Invalid Request body.",
      })
    );
    return;
  }
  res.status(200);
  res.end(
    JSON.stringify(
      push.setSubscription(
        req.body.username,
        req.body.token,
        req.body.subscription
      )
    )
  );
});

app.post("/api/v1/push/send", (req, res) => {
  if (!req.body.username || !req.body.message) {
    res.status(400);
    res.end(
      JSON.stringify({
        error: true,
        message: "Invalid Request body.",
      })
    );
    return;
  }
  res.status(200);
  // JSON.stringify(push.sendNotification(req.body.username, req.body.message))
  res.end(
    JSON.stringify({
      error: false,
      message: "This feature is currently unavailable.",
    })
  );
});

app.post("/api/v1/compiler/compiled", (req, res) => {
  const body = req.body;
  if (body.code) {
    res.status(200);
    res.end(Compiler.compile(body.code));
  } else {
    res.status(400);
    res.end(
      JSON.stringify({
        error: true,
        message: "Invalid Request Body",
      })
    );
  }
});

app.post("/api/v1/compiler/compiled/ast", (req, res) => {
  const body = req.body;
  if (body.ast) {
    res.status(200);
    res.end(AbstractSyntaxTreeGenerator.generate(body.ast));
  } else {
    res.status(400);
    res.end(
      JSON.stringify({
        error: true,
        message: "Invalid Request Body",
      })
    );
  }
});

app.post("/api/v1/compiler/generated/ast", (req, res) => {
  const body = req.body;
  if (body.code) {
    res.status(200);
    res.end(JSON.stringify(AbstractSyntaxTreeGenerator.generate(body.code)));
  } else {
    res.status(400);
    res.end(
      JSON.stringify({
        error: true,
        message: "Invalid Request Body",
      })
    );
  }
});

app.get("/api/v1/compiler/view", (req, res) => {
  if (req.query.code) {
    res.status(200);
    res.end(
      "<body></body><script>" +
        Compiler.compile(decodeURIComponent(req.query.code)) +
        "</script>"
    );
  } else {
    res.status(400);
    res.end(
      JSON.stringify({
        error: true,
        message: "Invalid Request Body",
      })
    );
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
  if (req.path.startsWith("/compiler")) {
    res.status(500);
    res.end(
      generateErrorTemplate(
        500,
        "Internal Server Error",
        "Internal Server Error"
      )
    );
  }
  console.log(err);
  res.status(500);
  res.end(
    generateErrorTemplate(
      500,
      "Programmierfehler",
      "Dein Programm enthält einen Fehler. Bitte überprüfe deine Eingabe."
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
