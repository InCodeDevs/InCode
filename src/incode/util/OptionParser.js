"use strict";
/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionParser = void 0;
class OptionParser {
    argv;
    optionStart = "--";
    constructor(argv) {
        this.argv = argv;
    }
    setOptionStart(value) {
        this.optionStart = value;
    }
    hasOption(name) {
        return this.argv.includes(this.optionStart + name.toLowerCase());
    }
}
exports.OptionParser = OptionParser;
//# sourceMappingURL=OptionParser.js.map