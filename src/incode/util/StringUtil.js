"use strict";
/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
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