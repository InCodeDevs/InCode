/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const express = require('express');
const app = express();

module.exports = function(port = 3000, host = "0.0.0.0") {
    app.listen(port, host)
    return app;
}