/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const path = require("path");
const os = require("os");

module.exports = (app) => {
  app.get("/usercontent*", (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(
      path.join(
        os.homedir(),
        ".incode",
        "usercontent",
        req.path.replace(/^\/usercontent/, "")
      )
    );
  });
};
