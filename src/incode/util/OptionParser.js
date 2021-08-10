"use strict";
/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
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
