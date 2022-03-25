"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const InCodeCommand_1 = require("./InCodeCommand");
const Error_1 = require("../Error");
class CallCommand extends InCodeCommand_1.InCodeCommand {
    execute(args) {
        if (args.length < 1) {
            return Error_1.Error.ERROR_MISSING_PARAMETER;
        }
        else {
            return `// Diese Zeile ruft die Funktion ${args[0]} auf\nwindow.incode.${args[0]}();`;
        }
    }
}
exports.CallCommand = CallCommand;
//# sourceMappingURL=CallCommand.js.map