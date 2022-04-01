/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const { login } = require("@incodelang/accounts/types/lib/module/users");
const { SessionManager } = require("../../module/session");
const fs = require("fs");
const path = require("path");
/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
  app.post("/api/v1/live/session/create", (req, res) => {
    if (
      !req.body ||
      !req.body.username ||
      !req.body.password ||
      !req.body.publicData
    ) {
      res.status(400).send({
        error: "Missing required fields",
      });
      return;
    }

    if (login(req.body.username, req.body.password)) {
      if (
        JSON.parse(
          fs
            .readFileSync(path.join(process.env.ACC_PRIV_PATH, "data.json"))
            .toString()
        )[req.body.publicData].access.includes(req.body.username)
      ) {
      } else {
        res.status(403).send({
          error: "You do not have access to this data",
        });
      }
    } else {
      res.status(401).send({
        error: "Invalid credentials",
      });
    }
  });
};
