"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGenerator = void 0;
class CodeGenerator {
    static generate(ast) {
        let code = "";
        ast.forEach((node) => {
            code += this.generateNode(node);
        });
        return code;
    }
    static generateNode(node) {
        let code = node.command + " " + node.args.join(" ").replace("\0", " ");
        for (let i = 0; i < node.intents; i++) {
            code = "\t" + code;
        }
        let addedLine = false;
        if (node.children.length > 0) {
            code += "\n";
            code += node.children.map((child) => this.generateNode(child)).join("");
            addedLine = true;
        }
        if (!addedLine) {
            code += "\n";
        }
        return code;
    }
}
exports.CodeGenerator = CodeGenerator;
//# sourceMappingURL=CodeGenerator.js.map