/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

//
// ATTENTION: This file is not actually used anymore.
// It has been replaced by the LandingPage.tsx file.
//

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
            // @ts-ignore
            icon={faTools}
            onclick={() => {
              UIManager.showComponentWithURL(<MainMenu />, "/editor");
            }}
            title={"menu.select-app.editor"}
          />
          <MenuItem
            // @ts-ignore
            icon={faPlay}
            onclick={() => {
              UIManager.showComponentWithURL(<Playground />, "/playground");
            }}
            title={"menu.select-app.playground"}
          />
          <MenuItem
            // @ts-ignore
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

SelectApp.displayName = "SelectApp";