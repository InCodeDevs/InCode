/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const { users } = require("@incodelang/accounts");
const template = require("../../module/template");
const push = require("../../module/pushNotifications");

/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
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
};
