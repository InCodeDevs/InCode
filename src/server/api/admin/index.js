/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
  app.post("/api/v1/admin/shutdown", (req, res) => {
    if (require("../../module/checkAdmin")(req)) {
      res.status(200);
      res.json({
        error: false,
        message: "Shutting down...",
      });
      process.exit(-1);
    } else {
      res.status(403);
      res.json({
        error: true,
        message: "Forbidden",
      });
    }
  });
};
