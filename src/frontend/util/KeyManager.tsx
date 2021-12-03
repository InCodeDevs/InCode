import PopupManager from "./PopupManager";

/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export default class KeyManager {
  constructor() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        PopupManager.disposeAll();
      } else if (e.keyCode === 112) {
        alert("Command Palate");
      }
    });
  }
}
