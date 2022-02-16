import PopupManager from "./PopupManager";
import CommandPaletteManager from "./CommandPaletteManager";

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export default class KeyManager {
  constructor() {
    document.addEventListener("keydown", (e) => {
      let preventDefault = false;
      if (e.keyCode === 27) {
        PopupManager.disposeAll();
        CommandPaletteManager.dispose();
        preventDefault = true;
      } else if (e.keyCode === 112) {
        CommandPaletteManager.show();
        preventDefault = true;
      }
      if (preventDefault) {
        e.preventDefault();
      }
    });
  }
}
