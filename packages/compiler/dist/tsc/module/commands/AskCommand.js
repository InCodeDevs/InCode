"use strict";
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskCommand = void 0;
const InCodeCommand_1 = require("./InCodeCommand");
const Error_1 = require("../Error");
class AskCommand extends InCodeCommand_1.InCodeCommand {
    execute(args) {
        if (args.length === 0) {
            return Error_1.Error.ERROR_MISSING_PARAMETER;
        }
        else {
            args[0] = args[0].replace(/\u0000/g, " ");
            if (args.length === 1) {
                return `// Diese Zeile fragt den Benutzer "${args[0]}"\nprompt(${args[0]});`;
            }
            else {
                return `// Diese Zeile fragt den Benutzer "${args[0]}" und speichert die Antwort in ${args[args.length - 1]}\nlet ${args[args.length - 1]} = prompt(${args[0]});`;
            }
        }
    }
}
exports.AskCommand = AskCommand;
//# sourceMappingURL=AskCommand.js.map