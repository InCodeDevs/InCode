/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

//
// ATTENTION: This file is not actually used anymore.
// It is kept for reference and only used in the desktop version.
//

import * as React from "react";
import Container from "../components/Container";
import MenuItemList from "../components/Menu/MenuItemList";
import MenuItem from "../components/Menu/MenuItem";
import { faFile, faPlay, faTools } from "@fortawesome/free-solid-svg-icons";
import Title from "../components/Title";
import UIManager from "../util/UIManager";

export default function SelectApp() {
  return (
    <>
      <Container centered>
        <Title size={1} title={"name"} centered />
        <MenuItemList>
          <MenuItem
            icon={faTools}
            onclick={() => {
              UIManager.silentRedirect("/editor?electron=true");
            }}
            title={"menu.select-app.editor"}
          />
          <MenuItem
            icon={faPlay}
            onclick={() => {
              UIManager.silentRedirect("/playground?electron=true");
            }}
            title={"menu.select-app.playground"}
          />
          <MenuItem
            icon={faFile}
            onclick={() => {
              UIManager.silentRedirect("/docs?electron=true");
            }}
            title={"menu.select-app.docs"}
          />
        </MenuItemList>
      </Container>
    </>
  );
}

SelectApp.displayName = "SelectApp";
