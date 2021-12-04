/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import PopupManager from "./PopupManager";
import l18n from "./l18n";

export default class ProjectManager {
  public static checkProjectName(value: string): boolean {
    if (value.length < 4) {
      PopupManager.showPopup(
        "Alert",
        "error",
        l18n.translate("error.project.name.too.short"),
        () => {},
        true
      );
    }
    return value.length >= 4;
  }
}
