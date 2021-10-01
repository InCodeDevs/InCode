/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import {InCodeInit} from "./InCodeInit";
import {Language} from "../../utils/international/Language";

export class LanguageInit extends InCodeInit {

    init(): void {
        Language.fetchCurrentLanguage()
    }
}