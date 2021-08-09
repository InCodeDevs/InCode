"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
const WebCompiler_1 = require("./WebCompiler");
class Compiler {
    static extractCodeBlocks(code) {
        // prepare the code
        // trim the code
        code = code.trim();
        // remove comments
        // parse the code
        // split by line breaks
        let expressions = code.split("\n");
        // create an empty array for all code blocks
        let codeBlocks = [];
        // create an empty array for ignored lines
        let ignoredLines = [];
        let rootCodeBlocks = [];
        // loop through all expressions
        for (let i = 0; i < Object.keys(expressions).length; i++) {
            // get the current expression
            let expression = expressions[i];
            if (!WebCompiler_1.WebCompiler.trimStatement(expression).startsWith("//") && !WebCompiler_1.WebCompiler.trimStatement(expression).trim().startsWith("@")) {
                // check if the expression is not \r
                if (expression != "\r" && !ignoredLines.includes(i)) {
                    // get the position of this expression
                    let rootCodeBlockPosition = this.getCodeBlockPosition(expression);
                    if (rootCodeBlockPosition === 0) {
                        rootCodeBlocks.push({
                            x: expression,
                            i: i
                        });
                        const processNextExpressions = () => {
                            let ex = [];
                            for (let j = i + 1; j < expressions.length; j++) {
                                let x = expressions[j];
                                if (this.getCodeBlockPosition(x) <= rootCodeBlockPosition) {
                                    break;
                                }
                                else {
                                    ex.push({
                                        statement: x,
                                        line: j,
                                        blockPosition: this.getCodeBlockPosition(x),
                                        innerStatements: []
                                    });
                                }
                            }
                            return ex;
                        };
                        let codeBlock = {
                            statement: expression,
                            line: i,
                            blockPosition: rootCodeBlockPosition,
                            innerStatements: []
                        };
                        let _codeBlock = codeBlock;
                        processNextExpressions().forEach(x => {
                            if (x.blockPosition > _codeBlock.blockPosition) {
                                if (_codeBlock.innerStatements.length != 0) {
                                    if (_codeBlock.innerStatements[_codeBlock.innerStatements.length - 1].blockPosition < x.blockPosition) {
                                        if (_codeBlock.innerStatements[_codeBlock.innerStatements.length - 1].blockPosition + 1 === x.blockPosition) {
                                            _codeBlock.innerStatements[_codeBlock.innerStatements.length - 1].innerStatements.push(x);
                                        }
                                        else {
                                            let _codeBlockBackUp = _codeBlock;
                                            for (let j = _codeBlock.innerStatements[_codeBlock.innerStatements.length - 1].blockPosition; j < x.blockPosition; j++) {
                                                _codeBlock = _codeBlock.innerStatements[_codeBlock.innerStatements.length - 1];
                                            }
                                            _codeBlock.innerStatements.push(x);
                                            _codeBlock = Object.assign({}, _codeBlock, _codeBlockBackUp);
                                        }
                                    }
                                    else {
                                        _codeBlock.innerStatements.push(x);
                                    }
                                }
                                else {
                                    _codeBlock.innerStatements.push(x);
                                }
                            }
                            codeBlock = _codeBlock;
                            _codeBlock = codeBlock;
                        });
                        codeBlocks.push(codeBlock);
                    }
                }
            }
            else {
                if (!WebCompiler_1.WebCompiler.trimStatement(expression).startsWith("@")) {
                    codeBlocks.push({
                        statement: expression,
                        line: i,
                        blockPosition: this.getCodeBlockPosition(expression),
                        innerStatements: []
                    });
                }
            }
        }
        return codeBlocks;
    }
    static getCodeBlockPosition(expression) {
        const re = /\t/g;
        return ((expression || '').match(re) || []).length;
    }
}
exports.Compiler = Compiler;
//# sourceMappingURL=Compiler.js.map
