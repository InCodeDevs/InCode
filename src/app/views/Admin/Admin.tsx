/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import UserManager from "../../util/UserManager";
import Container from "../../components/Container";
import MenuItemList from "../../components/Menu/MenuItemList";
import MenuItem from "../../components/Menu/MenuItem";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/Title";
import SelectAppMenuItem from "../../components/Menu/SelectAppMenuItem";
import UIManager from "../../util/UIManager";

export default function Admin() {
  return (
    <Container centered>
      <Title size={1} title={"menu.admin"} centered />
      <MenuItemList>
        <MenuItem
          icon={faGears}
          onclick={() => {
            UIManager.silentRedirect("/admin/system");
          }}
          title={"menu.admin.system"}
        />
        <SelectAppMenuItem />
      </MenuItemList>
    </Container>
  );
}
