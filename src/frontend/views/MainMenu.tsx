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
import l18n from "../util/l18n";
import UIManager from "../util/UIManager";
import Playground from "./Playground";
import CreateProject from "./Project/CreateProject";

export default function MainMenu() {
  return (
    <>
      <Container centered={true}>
        <Title size={1} centered title={"name"} />
        <MenuItemList>
          <MenuItem
            icon={faPlus}
            onclick={() => {
              if (UserManager.isLoggedIn()) {
                UIManager.showComponent(<CreateProject />);
              } else {
                PopupManager.showPopup(
                  "Alert",
                  "error.not.logged-in",
                  l18n.translate("error.please-login"),
                  () => {},
                  true
                );
              }
            }}
            title={"menu.main.create.project"}
          />
          <MenuItem
            icon={faFolderOpen}
            onclick={() => {}}
            title={"menu.main.open.project"}
          />
          <MenuItem
            icon={faCogs}
            onclick={() => {}}
            title={"menu.main.open.settings"}
          />
          <MenuItem
            icon={faPlay}
            onclick={() => {
              UIManager.showComponent(<Playground />, "root");
            }}
            title={"menu.main.open.playground"}
          />
          <MenuItem
            icon={faBook}
            onclick={() => {
              window.open("https://docs.incodelang.de/", "_blank");
            }}
            title={"menu.main.open.documentation"}
          />
        </MenuItemList>
      </Container>
      <UserIndicator />
    </>
  );
}
