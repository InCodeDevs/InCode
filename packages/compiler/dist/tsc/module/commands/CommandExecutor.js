"use strict";
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecutor = void 0;
const AliasManager_1 = require("../AliasManager");
const JSCommand_1 = require("./JSCommand");
const CreateCommand_1 = require("./CreateCommand");
const CallCommand_1 = require("./CallCommand");
const AddCommand_1 = require("./AddCommand");
const RepeatCommand_1 = require("./RepeatCommand");
const PrintCommand_1 = require("./PrintCommand");
const AskCommand_1 = require("./AskCommand");
const AbstractSyntaxTreeGenerator_1 = require("../AbstractSyntaxTreeGenerator");
const IfCommand_1 = require("./IfCommand");
const ElseCommand_1 = require("./ElseCommand");
const WaitCommand_1 = require("./WaitCommand");
const SetCommand_1 = require("./SetCommand");
const CommentCommand_1 = require("./CommentCommand");
const RemoveCommand_1 = require("./RemoveCommand");
class CommandExecutor {
    static COMMANDS = {
        "@": new JSCommand_1.JSCommand(),
        "//": new CommentCommand_1.CommentCommand(),
        create: new CreateCommand_1.CreateCommand(),
        call: new CallCommand_1.CallCommand(),
        add: new AddCommand_1.AddCommand(),
        remove: new RemoveCommand_1.RemoveCommand(),
        repeat: new RepeatCommand_1.RepeatCommand(),
        print: new PrintCommand_1.PrintCommand(),
        ask: new AskCommand_1.AskCommand(),
        if: new IfCommand_1.IfCommand(),
        else: new ElseCommand_1.ElseCommand(),
        wait: new WaitCommand_1.WaitCommand(),
        set: new SetCommand_1.SetCommand(),
    };
    static executeCommand(abstractSyntaxTree) {
        let ast;
        if (typeof abstractSyntaxTree === "string") {
            ast = AbstractSyntaxTreeGenerator_1.AbstractSyntaxTreeGenerator.generate(abstractSyntaxTree)[0];
        }
        else {
            ast = abstractSyntaxTree;
        }
        let code = "\n";
        if (AliasManager_1.AliasManager.getCommandAliases(ast.command.toLowerCase()).length > 0) {
            if (this.COMMANDS[AliasManager_1.AliasManager.getCommandAliases(ast.command.toLowerCase())[0]]) {
                code = this.COMMANDS[AliasManager_1.AliasManager.getCommandAliases(ast.command.toLowerCase())[0]].execute(ast.args);
            }
        }
        else {
            if (ast.command !== "") {
                code += `// "${ast.command} ${ast.args.join(" ")}" -> Der Befehl ${ast.command} konnte nicht gefunden werden.`;
            }
        }
        if (ast.children.length > 0) {
            code += " {\n";
            ast.children.forEach((child) => {
                for (let i = 0; i < child.intents; i++) {
                    code += "  ";
                }
                code += CommandExecutor.executeCommand(child);
            });
            code += "}\n";
        }
        code += "\n";
        return code;
    }
}
exports.CommandExecutor = CommandExecutor;
//# sourceMappingURL=CommandExecutor.js.map