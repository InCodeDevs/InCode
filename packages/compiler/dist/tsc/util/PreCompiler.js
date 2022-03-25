"use strict";
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreCompiler = void 0;
class PreCompiler {
    static preCompile(source) {
        source = source.replace(/ {2}/g, "");
        source = source.replace(/\r/g, "");
        return source;
    }
}
exports.PreCompiler = PreCompiler;
//# sourceMappingURL=PreCompiler.js.map