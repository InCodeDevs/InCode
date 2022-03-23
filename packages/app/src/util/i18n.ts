/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as de_de from "../translations/de-de.json";
import { JSONObject } from "../types/JSONObject";
import BrowserStorage from "./BrowserStorage";

export default class i18n {
  public static translate(code: string): string {
    try {
      if (!JSON.parse(BrowserStorage.get("settings")).language) {
        if (navigator.language.includes("de") && (de_de as JSONObject)[code]) {
          return (de_de as JSONObject)[code] as string;
        }
      } else {
        const lang = JSON.parse(BrowserStorage.get("settings")).language;
        if (lang === "de" && (de_de as JSONObject)[code]) {
          return (de_de as JSONObject)[code] as string;
        }
      }
    } catch {
      if ((de_de as JSONObject)[code]) {
        return (de_de as JSONObject)[code] as string;
      }
    }
    return "Message not found";
  }
}
