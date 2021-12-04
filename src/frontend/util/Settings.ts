/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import BrowserStorage from "./BrowserStorage";
import { JSONObject } from "../types/JSONObject";

export default class Settings {
  public static getSetting(key: string): any {
    return JSON.parse(BrowserStorage.get("settings") || "{}")[key] || "";
  }

  public static setSetting(key: string, value: any) {
    let settings = JSON.parse(BrowserStorage.get("settings") || "{}");
    settings[key] = value;
    BrowserStorage.store("settings", JSON.stringify(settings));
  }

  public static reset() {
    BrowserStorage.delete("settings");
    const settings: JSONObject = {};
    settings["codeEditor.fontSize"] = 21;
    settings["codeEditor.theme"] = "incode-dark";
    settings["codeEditor.lineNumbers"] = true;
    BrowserStorage.store("settings", JSON.stringify(settings));
  }

  public static getCodeEditorSettings(): JSONObject {
    return JSON.parse(BrowserStorage.get("settings") || "{}").codeEditor;
  }

  public static isValid() {
    return BrowserStorage.get("settings") !== "";
  }
}
