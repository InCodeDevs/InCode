"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const AliasManager_1 = require("../AliasManager");
const InCodeCommand_1 = require("./InCodeCommand");
const Error_1 = require("../Error");
class CreateCommand extends InCodeCommand_1.InCodeCommand {
    execute(args) {
        if (args.length < 1) {
            return Error_1.Error.ERROR_MISSING_PARAMETER;
        }
        if (args.length === 1) {
            return `// Diese Zeile erstellt die Variable ${args[0]}\nlet ${args[0]};`;
        }
        else {
            if (AliasManager_1.AliasManager.getTypeAliases(args[2]).length > 0) {
                if (AliasManager_1.AliasManager.getTypeAliases(args[2])[0] === "function") {
                    return `// Diese Zeile erstellt die Funktion ${args[0]}\nwindow.incode.${args[0]} = () =>`;
                }
                return `// Diese Zeile erstellt die Variable ${args[0]} mit dem Typen ${args[2]}\nlet ${args[0]} = document.createElement('${AliasManager_1.AliasManager.getTypeAliases(args[2])[0]}');`;
            }
            else {
                return `// Diese Zeile erstellt die Variable ${args[0]} mit dem Typen div, da der eigentliche Typ nicht gefunden wurde\nlet ${args[0]} = document.createElement("div"); // "${args[2]}" -> Not Found`;
            }
        }
    }
}
exports.CreateCommand = CreateCommand;
//# sourceMappingURL=CreateCommand.js.map