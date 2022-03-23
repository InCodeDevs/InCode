/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const chalk = require('chalk');

const __oldConsoleLog = console.log;

console.log = function(msg, level) {
    switch (level) {
        case 0:
            info(msg);
            break;
        case 1:
            warn(msg);
            break;
        case 2:
            error(msg);
            break;
        default:
            info(msg);
            break;
    }
}

function error(message) {
    __oldConsoleLog(chalk.bgRed.black(" ERROR ") + "\t" + chalk.gray(message));
}

function info(message) {
    __oldConsoleLog(chalk.bgGray.black(" INFO ") + "\t" + chalk.gray(message));
}

function warn(message) {
    __oldConsoleLog(chalk.bgYellow.black(" WARN ") + "\t" + chalk.gray(message));
}

function __print(message) {
    __oldConsoleLog(message)
}

module.exports = {error, info, warn, __print}