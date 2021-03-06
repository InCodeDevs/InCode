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
import i18n from "../../util/i18n";
import MenuItem from "../../components/Menu/MenuItem";
import { WebClient } from "@incodelang/accounts-client";
import PopupManager from "../../util/PopupManager";
import UIManager from "../../util/UIManager";
import UserManager from "../../util/UserManager";
import MainMenu from "../MainMenu";
import BackMenuItem from "../../components/Menu/BackMenuItem";
import Login from "../Login";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";

const client = new WebClient("");

export default function AccountLogin() {
  return (
    <Container centered>
      <Title size={1} title={"menu.login.login"} centered />
      <MenuItemList>
        <BackMenuItem component={<Login />} />
        <MenuItemInput
          // @ts-ignore
          icon={faUser}
          input={{
            type: "text",
            id: "login-username",
            placeholder: i18n.translate(
              "menu.login.login.placeholder.username"
            ),
          }}
        />
        <MenuItemInput
          // @ts-ignore
          icon={faUnlockAlt}
          input={{
            type: "password",
            id: "login-password",
            placeholder: i18n.translate(
              "menu.login.login.placeholder.password"
            ),
          }}
        />
        <MenuItem
          // @ts-ignore
          icon={faSignInAlt}
          onclick={async () => {
            const username = (
              document.getElementById("login-username") as HTMLInputElement
            ).value;
            const password = (
              document.getElementById("login-password") as HTMLInputElement
            ).value;

            client.login(username, password).then((r) => {
              if (r) {
                UIManager.unmountAt("root");
                client.createToken(username, password).then((token) => {
                  UserManager.login(username, token);
                  UIManager.showComponent(<MainMenu />);
                });
              } else {
                PopupManagerReloaded.toast("error.login.credentials", "error");
              }
            });
          }}
          title={"menu.login.login"}
        />
      </MenuItemList>
    </Container>
  );
}

AccountLogin.displayName = "AccountLogin";
