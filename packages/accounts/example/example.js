/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const { accountServer } = require("../src");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.end("Hello World");
});

app.listen(3000, "0.0.0.0");

accountServer({
  app: app,
});
