/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import UIManager from "./util/UIManager";
import MainMenu from "./views/MainMenu";
import PopupManager from "./util/PopupManager";

window.onload = () => {
  (
    document.querySelector(".copyright-notice") as HTMLDivElement
  ).addEventListener("click", () => {});

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      PopupManager.disposeAll();
    }
  });

  UIManager.showComponent(<MainMenu />);
};
