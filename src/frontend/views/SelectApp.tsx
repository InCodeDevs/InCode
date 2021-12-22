/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../components/Container";
import MenuItemList from "../components/Menu/MenuItemList";
import MenuItem from "../components/Menu/MenuItem";
import { faFile, faTools } from "@fortawesome/free-solid-svg-icons";
import Title from "../components/Title";

export default function SelectApp() {
  return (
    <>
      <Container centered>
        <Title size={1} title={"name"} centered />
        <MenuItemList>
          <MenuItem
            icon={faTools}
            onclick={() => {
              window.location.assign("/app");
            }}
            title={"menu.select-app.editor"}
          />
          <MenuItem
            icon={faFile}
            onclick={() => {
              window.location.assign("/docs");
            }}
            title={"menu.select-app.docs"}
          />
        </MenuItemList>
      </Container>
    </>
  );
}
