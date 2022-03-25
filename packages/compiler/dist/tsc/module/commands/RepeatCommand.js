"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const AliasManager_1 = require("../AliasManager");
const InCodeCommand_1 = require("./InCodeCommand");
const Error_1 = require("../Error");
class RepeatCommand extends InCodeCommand_1.InCodeCommand {
    execute(args) {
        if (args.length < 2) {
            return Error_1.Error.ERROR_MISSING_PARAMETER;
        }
        else {
            if (args.length === 2) {
                return `// Diese Zeile wiederholt die darunter stehenden Instruktionen ${args[0]} mal\nfor (let i = 0; i < ${args[0]}; i++)`;
            }
            else if (args.length === 6) {
                if (AliasManager_1.AliasManager.getOperatorAliases(args[2]).length > 0) {
                    return `// Diese Zeile wiederholt die darunter stehenden Instruktionen solange die Variable ${args[1]} ${args[2]} der Variable ${args[4]} ist\nwhile(${args[1]} ${AliasManager_1.AliasManager.getOperatorAliases(args[2])[0]} ${args[4]})`;
                }
                else {
                    return Error_1.Error.ERROR_UNKNOWN_OPERATOR;
                }
            }
            else {
                return Error_1.Error.ERROR_MISSING_PARAMETER;
            }
        }
    }
}
exports.RepeatCommand = RepeatCommand;
//# sourceMappingURL=RepeatCommand.js.map