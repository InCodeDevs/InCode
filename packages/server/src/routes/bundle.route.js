/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const path = require("path");

module.exports = (app) => {
  app.get(["*bundle.js.gz", "*bundle.js"], (req, res) => {
    res
      .header("Content-Encoding", "gzip")
      .sendFile(
        path.join(
          __dirname,
          "..",
          "..",
          "..",
          "..",
          "dist",
          "app",
          "bundle.js.gz"
        )
      );
  });
};
