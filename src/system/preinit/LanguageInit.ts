/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import {InCodeInit} from "./InCodeInit";
import {Language} from "../../utils/international/Language";

export class LanguageInit extends InCodeInit {

    init(): void {
        Language.fetchCurrentLanguage()
    }
}