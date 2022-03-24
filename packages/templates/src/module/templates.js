/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require("fs");
const path = require("path");
const express = require("express");
const serverIndex = require("serve-index");
const url = require("url");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = function (
  options = {
    app: null,
  }
) {
  options.app.use(cors());
  options.app.use(bodyParser());

  if (!fs.existsSync(process.env.TEM_PUB_PATH)) {
    fs.mkdirSync(process.env.TEM_PUB_PATH);
  }

  if (!fs.existsSync(path.join(process.env.TEM_PUB_PATH, "templates.json"))) {
    fs.writeFileSync(
      path.join(process.env.TEM_PUB_PATH, "templates.json"),
      "{}"
    );
  }

  if (!fs.existsSync(path.join(process.env.TEM_PUB_PATH, "templates"))) {
    fs.mkdirSync(path.join(process.env.TEM_PUB_PATH, "templates"));
  }

  options.app.use(
    "/api/v1/template/data",
    express.static(process.env.TEM_PUB_PATH)
  );

  options.app.use(
    "/api/v1/template/data",
    serverIndex(process.env.TEM_PUB_PATH, {
      icons: true,
    })
  );

  options.app.get("/api/v1/template", (req, res) => {
    res.end('{"error": true, "message": "Invalid API Endpoint."}');
  });

  options.app.get("/api/v1/template/upload", (req, res) => {
    let o = url.parse(req.url, true).query;
    let type = o.type;
    let name = o.name;
    let code = o.code;
    if (
      fs.existsSync(
        path.join(process.env.TEM_PUB_PATH, "templates/", name + ".ic")
      )
    ) {
      res.status(501);
      res.send("Already Exists");
    } else {
      console.log(code);
      fs.writeFileSync(
        path.join(process.env.TEM_PUB_PATH, "templates/", name + ".ic"),
        code
      );
      let j = JSON.parse(
        fs
          .readFileSync(path.join(process.env.TEM_PUB_PATH, "templates.json"))
          .toString()
      );
      j[name] = {
        verified: false,
        directURL: "/api/v1/template/data/templates/" + name + ".ic",
        uploaded: new Date(),
        type: type,
      };
      fs.writeFileSync(
        path.join(process.env.TEM_PUB_PATH, "templates.json"),
        JSON.stringify(j)
      );
      res.status(200);
      res.send("Successful");
    }
  });
};
