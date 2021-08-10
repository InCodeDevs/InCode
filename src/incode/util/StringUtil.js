"use strict";
/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtil = void 0;
class StringUtil {
    static getTextBetweenChars(text, chars) {
        return text.substring(text.lastIndexOf(chars) + 1, text.lastIndexOf(chars));
    }
}
exports.StringUtil = StringUtil;
//# sourceMappingURL=StringUtil.js.map
