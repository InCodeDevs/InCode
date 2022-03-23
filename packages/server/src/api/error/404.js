/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const { generateErrorTemplate } = require("../../module/error");

/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404);
    res.end(
      generateErrorTemplate(
        404,
        "Not Found",
        "Could not find <code>" + req.path + "</code>"
      )
    );
  });
};
