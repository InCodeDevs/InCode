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
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import MenuItemList from "../components/Menu/MenuItemList";
import PopupManager from "../util/PopupManager";

export default function MainMenu() {
  return (
    <>
      <Container centered={true}>
        <Title size={1} centered title={"name"} />
        <MenuItemList>
          <MenuItem
            icon={faPlus}
            onclick={() => {
              PopupManager.showPopup(
                "Question",
                "Test Alert",
                "Test Alert LOL 123",
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
            onclick={() => {
              window.open("https://docs.incodelang.de/", "_blank");
            }}
            title={"menu.main.open.documentation"}
          />
        </MenuItemList>
      </Container>
    </>
  );
}
