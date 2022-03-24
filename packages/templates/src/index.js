/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const os = require('os')
const path = require("path");

process.env.TEM_PUB_PATH = path.join(os.homedir(), "./.incode-teplates");

const templateServer = require('./module/templates')
const sampleApp = require('./module/sampleApp')

module.exports = {
    templateServer,
    sampleApp
}