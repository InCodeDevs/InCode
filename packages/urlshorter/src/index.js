/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const os = require('os')
const path = require("path");
const fs = require("fs");

process.env.URL_PUB_PATH = path.join(os.homedir(), ".incode", "urls");

if(!fs.existsSync(process.env.URL_PUB_PATH)){
    fs.mkdirSync(process.env.URL_PUB_PATH);
}

const urlServer = require('./module/urlshorter');
const sampleApp = require('./module/sampleApp');

module.exports = {
    urlServer,
    sampleApp
}