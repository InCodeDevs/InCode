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
import { WebClient } from "@incodelang/accounts-client";
import PopupManager from "../../util/PopupManager";
import UIManager from "../../util/UIManager";
import MainMenu from "../MainMenu";
import BrowserStorage from "../../util/BrowserStorage";
import UserManager from "../../util/UserManager";

const client = new WebClient("");

export default function AccountLogin() {
  return (
    <Container centered>
      <Title size={1} title={"menu.login.register"} centered />
      <MenuItemList>
        <MenuItemInput
          icon={faUser}
          input={{
            type: "text",
            id: "register-username",
            placeholder: l18n.translate(
              "menu.login.login.placeholder.username"
            ),
          }}
        />
        <MenuItemInput
          icon={faUnlockAlt}
          input={{
            type: "password",
            id: "register-password",
            placeholder: l18n.translate(
              "menu.login.login.placeholder.password"
            ),
          }}
        />

        <MenuItemInput
          icon={faUnlockAlt}
          input={{
            type: "password",
            id: "register-password-confirm",
            placeholder: l18n.translate(
              "menu.login.login.placeholder.password-confirm"
            ),
          }}
        />
        <MenuItem
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
                if (
                  password.match(
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})/g
                  )
                ) {
                  client.existsUser(username).then((r) => {
                    if (r) {
                      PopupManager.showPopup(
                        "Alert",
                        "error",
                        l18n.translate("error.username.exists"),
                        () => {},
                        true
                      );
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
                  PopupManager.showPopup(
                    "Alert",
                    "error",
                    l18n.translate("error.password.too.weak"),
                    () => {},
                    true
                  );
                }
              } else {
                PopupManager.showPopup(
                  "Alert",
                  "error",
                  l18n.translate("error.password.not.match"),
                  () => {},
                  true
                );
              }
            } else {
              PopupManager.showPopup(
                "Alert",
                "error",
                l18n.translate("error.username.too.short"),
                () => {},
                true
              );
            }
          }}
          title={"menu.login.register"}
        />
        <MainMenuItem />
      </MenuItemList>
    </Container>
  );
}
