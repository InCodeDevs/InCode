/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import MenuItemList from "../../components/Menu/MenuItemList";
import MenuItemInput from "../../components/Menu/MenuItemInput";
import {
  faSignInAlt,
  faUnlockAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import l18n from "../../util/l18n";
import MainMenuItem from "../../components/Menu/MainMenuItem";
import MenuItem from "../../components/Menu/MenuItem";

export default function AccountLogin() {
  return (
    <Container centered>
      <Title size={1} title={"menu.login.login"} centered />
      <MenuItemList>
        <MenuItemInput
          icon={faUser}
          input={{
            type: "text",
            id: "login-username",
            placeholder: l18n.translate(
              "menu.login.login.placeholder.username"
            ),
          }}
        />
        <MenuItemInput
          icon={faUnlockAlt}
          input={{
            type: "password",
            id: "login-password",
            placeholder: l18n.translate(
              "menu.login.login.placeholder.password"
            ),
          }}
        />
        <MenuItem
          icon={faSignInAlt}
          onclick={() => {}}
          title={"menu.login.login"}
        />
        <MainMenuItem />
      </MenuItemList>
    </Container>
  );
}
