/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import NavigationBar from "../../components/NavigationBar";
import { faCode, faCog, faHome } from "@fortawesome/free-solid-svg-icons";
import UIManager from "../../util/UIManager";
import MainMenu from "../MainMenu";
import { useEffect } from "react";
import General from "./views/General";

export default function Settings() {
  useEffect(() => {
    UIManager.showComponent(<General />, "settings-current-view");
  }, []);
  return (
    <>
      <NavigationBar
        title={"menu.settings.menu.title"}
        items={[
          {
            title: "menu.settings.menu.item.general",
            onclick: () => {},
            icon: faCog,
          },
          {
            title: "menu.settings.menu.item.code-editor",
            onclick: () => {},
            icon: faCode,
          },
          {
            title: "menu.main",
            onclick: () => {
              UIManager.showComponent(<MainMenu />);
            },
            icon: faHome,
          },
        ]}
      />
      <div id={"settings-current-view"} />
    </>
  );
}
