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
import MainMenuItem from "../../components/Menu/MainMenuItem";
import MenuItem from "../../components/Menu/MenuItem";
import { WebClient } from "@incodelang/accounts-client";
import PopupManager from "../../util/PopupManager";
import UIManager from "../../util/UIManager";
import MainMenu from "../MainMenu";
import BrowserStorage from "../../util/BrowserStorage";
import UserManager from "../../util/UserManager";
import String from "../../util/String";
import Login from "../Login";
import BackMenuItem from "../../components/Menu/BackMenuItem";

const client = new WebClient("");

export default function AccountRegister() {
  return (
    <Container centered>
      <Title size={1} title={"menu.login.register"} centered />
      <MenuItemList>
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
        <MenuItem
          // @ts-ignore
          icon={faKey}
          onclick={() => {
            const generated = String.random(
              16,
              "@#$%!&?+-:,.;=Â§1234567890abcdefghijklmnopqrstuvwxyz" +
                "abcdefghijklmnopqrstuvwxyz".toUpperCase() +
                "{}[]()/|><*~"
            );
            (
              document.getElementById("register-password") as HTMLInputElement
            ).type = "text";
            (
              document.getElementById(
                "register-password-confirm"
              ) as HTMLInputElement
            ).type = "text";

            (
              document.getElementById("register-password") as HTMLInputElement
            ).value = generated;
            (
              document.getElementById(
                "register-password-confirm"
              ) as HTMLInputElement
            ).value = generated;
          }}
          title={"menu.login.generate"}
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
                      PopupManager.showPopup(
                        "Alert",
                        "error",
                        i18n.translate("error.username.exists"),
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
                    i18n.translate("error.password.too.weak"),
                    () => {},
                    true
                  );
                }
              } else {
                PopupManager.showPopup(
                  "Alert",
                  "error",
                  i18n.translate("error.password.not.match"),
                  () => {},
                  true
                );
              }
            } else {
              PopupManager.showPopup(
                "Alert",
                "error",
                i18n.translate("error.username.too.short"),
                () => {},
                true
              );
            }
          }}
          title={"menu.login.register"}
        />
        <BackMenuItem component={<Login />} />
      </MenuItemList>
    </Container>
  );
}

AccountRegister.displayName = "AccountRegister";
