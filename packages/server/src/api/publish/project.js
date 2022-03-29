/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const uuid = require("uuid");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { homedir } = require("os");

/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
  app.post("/api/v1/publish/project", (req, res) => {
    if (!req.body || !req.body.code) {
      res.status(400).json({
        error: true,
        message: "Missing code parameter",
      });
      return;
    }

    const id = uuid.v4();
    const code = req.body.code;
    const hash = crypto.createHash("md5").update(code).digest("hex");

    if (!fs.existsSync(path.join(homedir(), ".incode", "usercontent", hash))) {
      fs.writeFileSync(
        path.join(homedir(), ".incode", "usercontent", hash),
        code
      );
    }

    res.json({
      error: false,
      hash,
      url: "/usercontent/" + hash,
    });
  });
};
