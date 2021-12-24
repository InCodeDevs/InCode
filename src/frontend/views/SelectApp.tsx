/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../components/Container";
import MenuItemList from "../components/Menu/MenuItemList";
import MenuItem from "../components/Menu/MenuItem";
import { faFile, faPlay, faTools } from "@fortawesome/free-solid-svg-icons";
import Title from "../components/Title";
import UIManager from "../util/UIManager";
import Docs from "./Docs/Docs";
import Playground from "./Playground";
import MainMenu from "./MainMenu";

export default function SelectApp() {
  return (
    <>
      <Container centered>
        <Title size={1} title={"name"} centered />
        <MenuItemList>
          <MenuItem
            icon={faTools}
            onclick={() => {
              UIManager.showComponentWithURL(<MainMenu />, "/editor");
            }}
            title={"menu.select-app.editor"}
          />
          <MenuItem
            icon={faPlay}
            onclick={() => {
              UIManager.showComponentWithURL(<Playground />, "/playground");
            }}
            title={"menu.select-app.playground"}
          />
          <MenuItem
            icon={faFile}
            onclick={() => {
              UIManager.showComponentWithURL(<Docs />, "/docs");
            }}
            title={"menu.select-app.docs"}
          />
        </MenuItemList>
      </Container>
    </>
  );
}
