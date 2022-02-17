/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../components/Container";
import Title from "../components/Title";
import MenuItem from "../components/Menu/MenuItem";
import {
  faBook,
  faCogs,
  faFolderOpen,
  faPlay,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import MenuItemList from "../components/Menu/MenuItemList";
import UserIndicator from "../components/UserIndicator";
import UserManager from "../util/UserManager";
import PopupManager from "../util/PopupManager";
import i18n from "../util/i18n";
import UIManager from "../util/UIManager";
import Playground from "./Playground";
import CreateProject from "./Project/CreateProject";
import OpenProject from "./Project/OpenProject";
import Settings from "./Settings/Settings";
import Docs from "./Docs/Docs";
import SelectAppMenuItem from "../components/Menu/SelectAppMenuItem";

export default function MainMenu() {
  return (
    <>
      <Container centered={true}>
        <Title size={1} centered title={"name"} />
        <MenuItemList>
          <MenuItem
            // @ts-ignore
            icon={faPlus}
            onclick={() => {
              if (UserManager.isLoggedIn()) {
                UIManager.showComponent(<CreateProject />);
              } else {
                PopupManager.showPopup(
                  "Alert",
                  "error.not.logged-in",
                  i18n.translate("error.please-login"),
                  () => {},
                  true
                );
              }
            }}
            title={"menu.main.create.project"}
          />
          <MenuItem
            // @ts-ignore
            icon={faFolderOpen}
            onclick={() => {
              if (UserManager.isLoggedIn()) {
                UIManager.showComponent(<OpenProject />);
              } else {
                PopupManager.showPopup(
                  "Alert",
                  "error.not.logged-in",
                  i18n.translate("error.please-login"),
                  () => {},
                  true
                );
              }
            }}
            title={"menu.main.open.project"}
          />
          <MenuItem
            // @ts-ignore
            icon={faCogs}
            onclick={() => {
              UIManager.showComponent(<Settings />, "root");
            }}
            title={"menu.main.open.settings"}
          />
          {navigator.userAgent.includes("Electron") === true ? (
            <></>
          ) : (
            <SelectAppMenuItem />
          )}
        </MenuItemList>
      </Container>
      <UserIndicator />
    </>
  );
}

MainMenu.displayName = "MainMenu";
