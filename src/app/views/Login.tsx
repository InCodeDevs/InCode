/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import Container from "../components/Container";
import Title from "../components/Title";
import MenuItemList from "../components/Menu/MenuItemList";
import MenuItem from "../components/Menu/MenuItem";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import MainMenuItem from "../components/Menu/MainMenuItem";
import UIManager from "../util/UIManager";
import AccountLogin from "./Account/AccountLogin";
import AccountRegister from "./Account/AccountRegister";

export default function Login() {
  return (
    <Container centered={true}>
      <Title size={1} title={"menu.login.title"} centered={true} />
      <MenuItemList>
        <MenuItem
          // @ts-ignore
          icon={faUser}
          onclick={() => {
            UIManager.showComponent(<AccountLogin />);
          }}
          title={"menu.login.login"}
        />
        <MenuItem
          // @ts-ignore
          icon={faUserPlus}
          onclick={() => {
            UIManager.showComponent(<AccountRegister />);
          }}
          title={"menu.login.register"}
        />
        <MainMenuItem />
      </MenuItemList>
    </Container>
  );
}

Login.displayName = "Login";
