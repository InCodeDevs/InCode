/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

const http = require("http");
const https = require("https");

/**
 * @param {import("express")} app - The express App
 */
module.exports = (app) => {
  app.get("/api/v1/content_from_url", (req, res) => {
    const url = req.query.url;

    try {
      if (url.startsWith("http:")) {
        http.get(url, (response) => {
          try {
            let chunks_of_data = [];

            response.on("data", (fragments) => {
              chunks_of_data.push(fragments);
            });

            response.on("end", () => {
              let response_body = Buffer.concat(chunks_of_data);

              res.end(response_body.toString());
            });

            response.on("error", (error) => {
              res.end({
                error: true,
                message: error,
              });
            });
          } catch {}
        });
      } else {
        https.get(url, (response) => {
          try {
            let chunks_of_data = [];

            response.on("data", (fragments) => {
              chunks_of_data.push(fragments);
            });

            response.on("end", () => {
              let response_body = Buffer.concat(chunks_of_data);

              res.end(response_body.toString());
            });

            response.on("error", (error) => {
              res.end({
                error: true,
                message: error,
              });
            });
          } catch {}
        });
      }
    } catch {}
  });
};
