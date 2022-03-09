/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const { analyze } = require("../../module/analytics");
/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
  app.post("/api/v1/analytics", (req, res) => {
    const timestamp = new Date().getTime();
    const properties = ["username", "userAgent", "url", "language", "referrer"];

    for (const property of properties) {
      if (!req.body[property]) {
        res.status(400).json({
          error: true,
          message: `Property ${property} is missing`,
        });
        return;
      }
    }

    const { username, userAgent, url, language, referrer } = req.body;
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    analyze({
      username,
      ip,
      userAgent,
      url,
      language,
      referrer,
      timestamp,
    });
    res.status(200).json({
      error: false,
      message: "Analytics successfully sent",
    });
  });
};
