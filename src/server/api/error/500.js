/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const { generateErrorTemplate } = require("../../module/error");

/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
  app.use(function (err, req, res, next) {
    if (req.path.startsWith("/compiler")) {
      res.status(500);
      res.end(
        generateErrorTemplate(
          500,
          "Internal Server Error",
          "Internal Server Error"
        )
      );
    }
    console.log(err);
    res.status(500);
    res.end(
      generateErrorTemplate(
        500,
        "Programmierfehler",
        "Dein Programm enthält einen Fehler. Bitte überprüfe deine Eingabe."
      )
    );
  });
};
