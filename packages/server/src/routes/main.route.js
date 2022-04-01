/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const path = require("path");

module.exports = (app) => {
  app.get(
    [
      "/editor*",
      "/docs*",
      "/playground*",
      "/admin*",
      "/electron-select-app",
      "/choose-platform",
    ],
    (req, res) => {
      res.sendFile(
        path.join(
          __dirname,
          "..",
          "..",
          "..",
          "..",
          "dist",
          "app",
          "index.html"
        )
      );
    }
  );
};
