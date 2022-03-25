"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const InCodeCommand_1 = require("./InCodeCommand");
const Error_1 = require("../Error");
class WaitCommand extends InCodeCommand_1.InCodeCommand {
    execute(args) {
        if (args.length < 1) {
            return Error_1.Error.ERROR_MISSING_PARAMETER;
        }
        else {
            if (!parseFloat(args[0])) {
                return Error_1.Error.ERROR_NOT_A_NUMBER;
            }
            else {
                return `// Diese Zeile wartet ${args[0]}000 Millisekunden\nawait new Promise(done => setTimeout(() => done(), ${args[0]}000))`;
            }
        }
    }
}
exports.WaitCommand = WaitCommand;
//# sourceMappingURL=WaitCommand.js.map