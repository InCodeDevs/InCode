"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElseCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const InCodeCommand_1 = require("./InCodeCommand");
const CommandExecutor_1 = require("./CommandExecutor");
class ElseCommand extends InCodeCommand_1.InCodeCommand {
    execute(args) {
        if (args.length > 0) {
            return `else ${CommandExecutor_1.CommandExecutor.executeCommand(args.join(" "))}`;
        }
        else {
            return "else";
        }
    }
}
exports.ElseCommand = ElseCommand;
//# sourceMappingURL=ElseCommand.js.map