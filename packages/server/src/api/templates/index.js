/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const { users } = require("@incodelang/accounts");
const template = require("../../module/template");

/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
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
};
