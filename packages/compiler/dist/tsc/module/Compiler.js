"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const AbstractSyntaxTreeGenerator_1 = require("./AbstractSyntaxTreeGenerator");
const CommandExecutor_1 = require("./commands/CommandExecutor");
const js_beautify_1 = require("js-beautify");
const PreCompiler_1 = require("../util/PreCompiler");
class Compiler {
    static compile(source) {
        if (typeof source === "string") {
            source = PreCompiler_1.PreCompiler.preCompile(source);
        }
        let ast = [];
        if (typeof source === "string") {
            ast = AbstractSyntaxTreeGenerator_1.AbstractSyntaxTreeGenerator.generate(source);
        }
        let code = `/**
 * @generator InCode
 * @version 2.x
 */\nwindow.incode = {};\n(async () => {\n\n`;
        ast.forEach((node) => {
            code += "\n" + CommandExecutor_1.CommandExecutor.executeCommand(node) + "\n";
        });
        code += "\n})();";
        code = code.replace(/\n\n/g, "");
        return (0, js_beautify_1.js_beautify)(code, {
            indent_char: " ",
            indent_size: 2,
        });
    }
}
exports.Compiler = Compiler;
//# sourceMappingURL=Compiler.js.map