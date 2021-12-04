/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import MenuItemList from "../../components/Menu/MenuItemList";
import MainMenuItem from "../../components/Menu/MainMenuItem";
import MenuItem from "../../components/Menu/MenuItem";
import {
  faPencilAlt,
  faSignOutAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import UserManager from "../../util/UserManager";
import UIManager from "../../util/UIManager";
import MainMenu from "../MainMenu";
import l18n from "../../util/l18n";
import PopupManager from "../../util/PopupManager";

export default function AccountManage() {
  return (
    <Container centered>
      <Title
        size={1}
        title={
          l18n.translate("menu.manage-account.title-template") +
          UserManager.getUsername() +
          "!"
        }
        centered
        nol18n
      />
      <MenuItemList>
        <MenuItem
          icon={faSignOutAlt}
          onclick={() => {
            UserManager.logout();
            UIManager.showComponent(<MainMenu />, "root");
          }}
          title={"menu.manage-account.logout"}
        />
        <MenuItem
          icon={faTrashAlt}
          onclick={() => {
            PopupManager.showPopup(
              "Question",
              "menu.manage-account.delete-account",
              l18n.translate(
                "menu.manage-account.delete-account.enter-password"
              ),
              (password) => {
                UserManager.deleteAccount(password as string).then((x) => {
                  if (x) {
                    PopupManager.showPopup(
                      "Alert",
                      "menu.manage-account.delete-account.success",
                      l18n.translate(
                        "menu.manage-account.delete-account.success.description"
                      ),
                      () => {
                        UIManager.showComponent(<MainMenu />, "root");
                      },
                      true
                    );
                  } else {
                    PopupManager.showPopup(
                      "Alert",
                      "menu.manage-account.delete-account.wrong-password",
                      l18n.translate(
                        "menu.manage-account.delete-account.wrong-password.description"
                      ),
                      () => {},
                      true
                    );
                  }
                });
              },
              true
            );
          }}
          title={"menu.manage-account.delete-account"}
        />
        <MenuItem
          icon={faPencilAlt}
          onclick={() => {}}
          title={"menu.manage-account.change-name"}
        />
        <MenuItem
          icon={faPencilAlt}
          onclick={() => {}}
          title={"menu.manage-account.change-password"}
        />
        <MainMenuItem />
      </MenuItemList>
    </Container>
  );
}
