"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const AliasManager_1 = require("../AliasManager");
const InCodeCommand_1 = require("./InCodeCommand");
const Error_1 = require("../Error");
class RemoveCommand extends InCodeCommand_1.InCodeCommand {
    execute(args) {
        if (args.length < 3) {
            return Error_1.Error.ERROR_MISSING_PARAMETER;
        }
        else {
            const element = args[0];
            let parent = args[args.length - 1];
            if (AliasManager_1.AliasManager.getTypeAliases(parent).length > 0) {
                parent = AliasManager_1.AliasManager.getTypeAliases(parent)[0];
            }
            return `// Diese Zeile entfernt das Element ${element} von dem Element ${parent}\n${parent}.removeChild(${element});`;
        }
    }
}
exports.RemoveCommand = RemoveCommand;
//# sourceMappingURL=RemoveCommand.js.map