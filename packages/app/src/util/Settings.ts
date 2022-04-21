/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import BrowserStorage from "./BrowserStorage";
import { JSONObject } from "../types/JSONObject";

export default class Settings {
  public static readonly defaults = {
    "codeEditor.fontSize": 21,
    "codeEditor.theme": "incode-dark",
    "codeEditor.lineNumbers": true,
    language: "de",
    pushNotifications: false,
    autoSave: true,
    enableLiveReload: true,
    offlineMode: false,
  };

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
    BrowserStorage.store("settings", JSON.stringify(Settings.defaults));
  }

  public static getCodeEditorSettings(): JSONObject {
    return JSON.parse(BrowserStorage.get("settings") || "{}").codeEditor;
  }

  public static isValid() {
    if (!BrowserStorage.get("settings")) {
      return false;
    }
    let settings = JSON.parse(BrowserStorage.get("settings") || "{}");
    for (let key in Settings.defaults) {
      if (!settings[key]) {
        return false;
      }
    }
    return true;
  }
}
