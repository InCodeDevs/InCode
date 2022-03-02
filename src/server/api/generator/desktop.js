/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const { users } = require("@incodelang/accounts");

/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
  app.post("/api/v1/generator/desktop", (req, res) => {
    if (req.body && req.body.username && req.body.password && req.body.code) {
      if (users.login(req.body.username, req.body.password)) {
      } else {
        res.status(401);
        res.end(
          JSON.stringify(users.login(req.body.username, req.body.password))
        );
      }
    }
  });
};
