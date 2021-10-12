/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import { ThemeLoader } from "./ThemeLoader";
import { ConfigInit } from "./ConfigInit";
import { BrowserInit } from "./BrowserInit";
import { UIManager } from "../../utils/UIManager";
import { LanguageInit } from "./LanguageInit";

export class PreInit {
  constructor() {
    // Check Browser
    new BrowserInit().init();

    // Check Config in Local Storage
    new ConfigInit().init();

    // Load Language
    new LanguageInit().init();

    // Import themes
    new ThemeLoader().init();

    document.addEventListener("DOMContentLoaded", UIManager.onLoad);
  }
}
