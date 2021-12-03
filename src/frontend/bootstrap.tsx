/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import UIManager from "./util/UIManager";
import MainMenu from "./views/MainMenu";
import KeyManager from "./util/KeyManager";
import InteractionManager from "./util/InteractionManager";

window.onload = () => {
  new KeyManager();
  new InteractionManager();

  UIManager.showComponent(<MainMenu />);
};
