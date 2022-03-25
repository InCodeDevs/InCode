"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const InCodeCommand_1 = require("./InCodeCommand");
class JSCommand extends InCodeCommand_1.InCodeCommand {
    static COMMAND_NAME = "@";
    execute(args) {
        let c = args.join(" ");
        c = c.replace(/\u0000/g, " ");
        return c;
    }
}
exports.JSCommand = JSCommand;
//# sourceMappingURL=JSCommand.js.map