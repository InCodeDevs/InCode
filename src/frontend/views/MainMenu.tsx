/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import l18n from "../util/l18n";
import Container from "../components/Container";
import Title from "../components/Title";
import MenuItem from "../components/Menu/MenuItem";
import {
  faBook,
  faCogs,
  faFolderOpen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import MenuItemList from "../components/Menu/MenuItemList";
import UIManager from "../util/UIManager";
import Popup from "../components/Popup";
import PopupManager from "../util/PopupManager";

export default function MainMenu() {
  // @ts-ignore
  return (
    <>
      <Container centered={true}>
        <Title size={1} centered title={"name"} />
        <MenuItemList>
          <MenuItem
            icon={faPlus}
            onclick={() => {
              PopupManager.showPopup(
                "Alert",
                "Test Alert",
                "Test Description",
                () => {
                  console.log("Test");
                }
              );
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
            icon={faBook}
            onclick={() => {}}
            title={"menu.main.open.documentation"}
          />
        </MenuItemList>
      </Container>
    </>
  );
}
