"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSyntaxTreeGenerator = void 0;
const PreCompiler_1 = require("../util/PreCompiler");
class AbstractSyntaxTreeGenerator {
    static generate(source) {
        source = PreCompiler_1.PreCompiler.preCompile(source);
        const lines = source.split("\n");
        if (lines.length === 0) {
            return [];
        }
        const words = this.splitWords(source);
        let result;
        let temp = [];
        words.forEach((wordList) => {
            if (wordList.length === 0) {
                return;
            }
            const ast = {
                intents: 0,
                command: "",
                args: [],
                children: [],
            };
            const firstWord = wordList[0];
            ast.intents = firstWord.split("\t").length - 1;
            ast.command = firstWord.replace(/\t/g, "");
            ast.args = wordList.slice(1);
            temp.push(ast);
        });
        temp.forEach((ast) => {
            if (ast.intents === 0) {
                temp.push(ast);
                return;
            }
            if (temp[temp.length - 1].intents === ast.intents - 1) {
                temp[temp.length - 1].children.push(ast);
                return;
            }
            else {
                let x = temp[temp.length - 1].children[temp[temp.length - 1].children.length - 1];
                let y = x;
                while (x !== null &&
                    x.intents !== ast.intents - 1 &&
                    x.intents !== ast.intents) {
                    x = y.children[y.children.length - 1];
                    y = x;
                }
                if (x.intents === ast.intents - 1) {
                    x.children.push(ast);
                }
                else {
                    y.children.push(ast);
                }
            }
        });
        temp = temp.filter((t) => t.intents === 0);
        temp = Array.from(new Set(temp.map((a) => a))).map((a0) => {
            return temp.find((a) => a === a0);
        });
        result = temp;
        return result;
    }
    static splitWords(source) {
        const matrix = [];
        const lines = source.split("\n");
        lines.forEach((line) => {
            if (line.match(/(["'])(?:(?=(\\?))\2.)*?\1/g)) {
                const quotes = line.match(/(["'])(?:(?=(\\?))\2.)*?\1/g);
                quotes.forEach((quote) => {
                    line = line.replace(quote, quote.split(" ").join("\0"));
                });
            }
            matrix.push(line.split(" "));
        });
        return matrix;
    }
}
exports.AbstractSyntaxTreeGenerator = AbstractSyntaxTreeGenerator;
//# sourceMappingURL=AbstractSyntaxTreeGenerator.js.map