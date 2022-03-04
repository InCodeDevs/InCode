/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import KeyManager from "./KeyManager";
import UIManager from "./UIManager";
import MainMenu from "../views/MainMenu";
import Docs from "../views/Docs/Docs";
import Playground from "../views/Playground";
import * as React from "react";
import LandingPage from "../views/LandingPage";
import Admin from "../views/Admin/Admin";
import AdminRoute from "../views/Admin/AdminRoute";

export default class RouteManager {
  public static async manage() {
    let lastPathname: string;
    setInterval(() => {
      if (lastPathname !== location.pathname) {
        lastPathname = location.pathname;
        document.body.classList.remove("admin");

        if (location.pathname.startsWith("/editor")) {
          this.show();
          new KeyManager();
          UIManager.showComponent(<MainMenu />);
        } else if (location.pathname.startsWith("/docs")) {
          this.show();
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
          this.show();
          UIManager.showComponent(<Playground />);
        } else if (location.pathname.startsWith("/admin")) {
          this.show();
          UIManager.showComponent(<AdminRoute />);
        } else if (location.pathname === "/") {
          this.hide();
          UIManager.showComponent(<LandingPage />);
        }
      }
    }, 250);
  }

  private static hide() {
    (document.querySelector("#stars") as HTMLDivElement).style.display = "none";
    (document.querySelector("#stars2") as HTMLDivElement).style.display =
      "none";
    (document.querySelector("#stars3") as HTMLDivElement).style.display =
      "none";
    (
      document.querySelector(".copyright-notice") as HTMLDivElement
    ).style.display = "none";
  }

  private static show() {
    (document.querySelector("#stars") as HTMLDivElement).style.display =
      "block";
    (document.querySelector("#stars2") as HTMLDivElement).style.display =
      "block";
    (document.querySelector("#stars3") as HTMLDivElement).style.display =
      "block";
    (
      document.querySelector(".copyright-notice") as HTMLDivElement
    ).style.display = "block";
  }
}
