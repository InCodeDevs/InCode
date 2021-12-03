/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const serveIndex = require('serve-index');

const app = express();

app.get("*", (req, res) => {
  res.end("Hello World!")
})

app.listen(3000, "0.0.0.0");