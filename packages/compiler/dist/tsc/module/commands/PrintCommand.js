"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const AliasManager_1 = require("../AliasManager");
const InCodeCommand_1 = require("./InCodeCommand");
const Error_1 = require("../Error");
class PrintCommand extends InCodeCommand_1.InCodeCommand {
    execute(args) {
        if (args.length < 4) {
            return Error_1.Error.ERROR_MISSING_PARAMETER;
        }
        else {
            if (AliasManager_1.AliasManager.getTypeAliases(args[3]).length > 0) {
                return `// Diese Zeile gibt den angegebenen Text in der ${args[3]} aus\n${AliasManager_1.AliasManager.getTypeAliases(args[3])[0]}(${args[0].replace(/\u0000/g, " ")});`;
            }
            else {
                return Error_1.Error.ERROR_UNKNOWN_TYPE;
            }
        }
    }
}
exports.PrintCommand = PrintCommand;
//# sourceMappingURL=PrintCommand.js.map