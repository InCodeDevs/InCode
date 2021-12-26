/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import KeyManager from "./KeyManager";
import UIManager from "./UIManager";
import MainMenu from "../views/MainMenu";
import Docs from "../views/Docs/Docs";
import Playground from "../views/Playground";
import SelectApp from "../views/SelectApp";
import * as React from "react";

export default class RouteManager {
  public static async manage() {
    let lastPathname: string;
    setInterval(() => {
      if (lastPathname !== location.pathname) {
        lastPathname = location.pathname;

        if (location.pathname.startsWith("/editor")) {
          new KeyManager();
          UIManager.showComponent(<MainMenu />);
        } else if (location.pathname.startsWith("/docs")) {
          if (location.pathname === "/docs" || location.pathname === "/docs/") {
            if (navigator.language.includes("de")) {
              location.pathname = "/docs/de/intro";
            } else {
              location.pathname = "/docs/en/intro";
            }
          } else {
            UIManager.showComponent(<Docs />);
          }
        } else if (location.pathname.startsWith("/playground")) {
          UIManager.showComponent(<Playground />);
        } else if (location.pathname === "/") {
          UIManager.showComponent(<SelectApp />);
        }
      }
    }, 250);
  }
}
