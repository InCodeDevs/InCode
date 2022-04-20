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
  faKey,
  faSignInAlt,
  faUnlockAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import i18n from "../../util/i18n";
import MenuItem from "../../components/Menu/MenuItem";
import { WebClient } from "@incodelang/accounts-client";
import PopupManager from "../../util/PopupManager";
import UIManager from "../../util/UIManager";
import MainMenu from "../MainMenu";
import UserManager from "../../util/UserManager";
import String from "../../util/String";
import Login from "../Login";
import BackMenuItem from "../../components/Menu/BackMenuItem";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";
import PassGenMenuItem from "../../components/Menu/PassGenMenuItem";

const client = new WebClient("");

export default function AccountRegister() {
  return (
    <Container centered>
      <Title size={1} title={"menu.login.register"} centered />
      <MenuItemList>
        <BackMenuItem component={<Login />} />
        <MenuItemInput
          // @ts-ignore
          icon={faUser}
          input={{
            type: "text",
            id: "register-username",
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
            id: "register-password",
            placeholder: i18n.translate(
              "menu.login.login.placeholder.password"
            ),
          }}
        />

        <MenuItemInput
          // @ts-ignore
          icon={faUnlockAlt}
          input={{
            type: "password",
            id: "register-password-confirm",
            placeholder: i18n.translate(
              "menu.login.login.placeholder.password-confirm"
            ),
          }}
        />
        <PassGenMenuItem
          input={["register-password", "register-password-confirm"]}
        />
        <MenuItem
          // @ts-ignore
          icon={faSignInAlt}
          onclick={async () => {
            const username = (
              document.getElementById("register-username") as HTMLInputElement
            ).value;
            const password = (
              document.getElementById("register-password") as HTMLInputElement
            ).value;
            const passwordConfirm = (
              document.getElementById(
                "register-password-confirm"
              ) as HTMLInputElement
            ).value;

            if (username.length >= 4) {
              if (password === passwordConfirm) {
                if (UserManager.isPasswordSafe(password)) {
                  client.existsUser(username).then((r) => {
                    if (r) {
                      PopupManagerReloaded.toast("error.username.exists", "error");
                    } else {
                      UIManager.unmountAt("root");
                      client.create(username, password).then((x) => {
                        client.createToken(username, password).then((token) => {
                          UserManager.login(username, token);
                          UIManager.showComponent(<MainMenu />);
                        });
                      });
                    }
                  });
                } else {
                  PopupManagerReloaded.toast("error.password.too.weak", "error");
                }
              } else {
                PopupManagerReloaded.toast("error.password.not.match", "error");
              }
            } else {
              PopupManagerReloaded.toast("error.username.too.short", "error");
            }
          }}
          title={"menu.login.register"}
        />
      </MenuItemList>
    </Container>
  );
}

AccountRegister.displayName = "AccountRegister";
