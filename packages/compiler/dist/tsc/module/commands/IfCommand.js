"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
const AliasManager_1 = require("../AliasManager");
const InCodeCommand_1 = require("./InCodeCommand");
const CommandExecutor_1 = require("./CommandExecutor");
class IfCommand extends InCodeCommand_1.InCodeCommand {
    execute(args) {
        // [4] x gleich 2 ist
        // [5] x is equal to 2
        // [4] x gedrückt wird <command>
        // [4] x is pressed <command>
        // [6] die Taste x gedrückt wird <command>
        // [6] the key x is pressed <command>
        if (args.length < 4) {
            return "// This line contained an if command, but it was missing arguments.";
        }
        else {
            if (AliasManager_1.AliasManager.getOperatorAliases(args[1]).length > 0 ||
                AliasManager_1.AliasManager.getOperatorAliases(args[2]).length > 0) {
                // normal if --- then
                let operator;
                let operatorPosition;
                let first;
                let second;
                if (AliasManager_1.AliasManager.getOperatorAliases(args[1]).length > 0) {
                    operator = AliasManager_1.AliasManager.getOperatorAliases(args[1])[0];
                    operatorPosition = 1;
                }
                else {
                    operator = AliasManager_1.AliasManager.getOperatorAliases(args[2])[0];
                    operatorPosition = 2;
                }
                if (operatorPosition === 1) {
                    first = args[0];
                    second = args[2].replace(/\u0000/g, " ");
                }
                else {
                    first = args[0];
                    second = args[1].replace(/\u0000/g, " ");
                }
                return `if (${first} ${operator} ${second})`;
            }
            else if (AliasManager_1.AliasManager.getEventAliases(args[1]).length > 0 ||
                AliasManager_1.AliasManager.getEventAliases(args[2]).length > 0) {
                // event listener
                let first = args[0];
                let event;
                let eventPosition;
                let command;
                command = args.slice(3).join(" ");
                if (AliasManager_1.AliasManager.getEventAliases(args[1]).length > 0) {
                    event = AliasManager_1.AliasManager.getEventAliases(args[1])[0];
                    eventPosition = 1;
                }
                else {
                    event = AliasManager_1.AliasManager.getEventAliases(args[2])[0];
                    eventPosition = 2;
                }
                return `${first}.addEventListener("${event}", () => {
  ${CommandExecutor_1.CommandExecutor.executeCommand(command)}
});`;
            }
            else if (AliasManager_1.AliasManager.getTypeAliases(args[1]).length > 0 &&
                AliasManager_1.AliasManager.getTypeAliases(args[1])[0] === "key") {
                const command = args.slice(5).join(" ");
                return `document.addEventListener("keydown", (e) => {
  if (e.key === "${args[2]}") {
    ${CommandExecutor_1.CommandExecutor.executeCommand(command)}
  }
});`;
            }
        }
        return "";
    }
}
exports.IfCommand = IfCommand;
//# sourceMappingURL=IfCommand.js.map