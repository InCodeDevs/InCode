/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const { users } = require("@incodelang/accounts");
const { generateApp } = require("../../module/generator.desktop");

/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
  app.post("/api/v1/generator/desktop", (req, res) => {
    if (
      req.body &&
      req.body.username &&
      req.body.password &&
      req.body.code &&
      req.body.projectName
    ) {
      if (users.login(req.body.username, req.body.password)) {
        const response = generateApp(req.body.username, req.body.code);
        res.status(response.code);
        res.end(JSON.stringify(response));
      } else {
        res.status(403);
        res.end(
          JSON.stringify({
            error: true,
            message: "Invalid username or password",
          })
        );
      }
    } else {
      res.status(400);
      res.end(
        JSON.stringify({
          error: true,
          message: "Missing username, password, code or projectName",
        })
      );
    }
  });
};
