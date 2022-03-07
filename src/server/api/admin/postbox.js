/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */
const {
  getFullPostboxConfig,
  getFullUserConfig,
  overwritePostboxConfig,
} = require("../../module/account_patcher");
const { reload } = require("@incodelang/accounts/src/lib/module/postboxes");

/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
  app.post("/api/v1/admin/postboxes/create/:user/:name", (req, res) => {
    if (require("../../module/checkAdmin")(req)) {
      const u = getFullPostboxConfig();
      const userConf = getFullUserConfig();
      if (userConf[req.params.user]) {
        if (u[req.params.name]) {
          res.status(400).json({
            error: true,
            message: "Postbox already exists",
          });
          return;
        } else {
          u[req.params.user + "_" + req.params.name] = {
            owner: req.params.user,
            data: [],
          };
          overwritePostboxConfig(u);
          reload();
          res.status(200).json({
            error: false,
            message: "Postbox created",
          });
        }
      } else {
        res.status(404).json({
          error: true,
          message: "User not found",
        });
      }
    } else {
      res.status(403).json({
        error: true,
        message: "Forbidden",
      });
    }
  });
};
