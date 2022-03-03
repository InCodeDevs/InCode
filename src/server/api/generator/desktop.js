/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const { users } = require("@incodelang/accounts");
const {
  generateApp,
  getUserRateLimit,
} = require("../../module/generator.desktop");

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
      if (users.login(req.body.username, req.body.password).error === false) {
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
  app.get("/api/v1/generator/rate/:username", (req, res) => {
    const { username } = req.params;
    res.status(200);
    res.json(getUserRateLimit(username));
  });
};
