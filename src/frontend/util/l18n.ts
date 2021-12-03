/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as de_de from "../../translations/de-de.json";
import { JSONObject } from "../modules/JSONObject";

export default class l18n {
  public static translate(code: string): string {
    if (navigator.language.includes("de")) {
      return (de_de as JSONObject)[code] as string;
    }
    return code;
  }
}
