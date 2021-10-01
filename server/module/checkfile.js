/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

const fs = require("fs");
const path = require("path");

module.exports = (p0, v0) => {
    if(!fs.existsSync(p0)) {
        if(!fs.existsSync(path.dirname(p0))) {
            fs.mkdirSync(path.dirname(p0))
        }
        fs.writeFileSync(p0, v0);
    }
}