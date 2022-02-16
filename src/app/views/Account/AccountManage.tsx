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
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import UserManager from "../../util/UserManager";
import UIManager from "../../util/UIManager";
import MainMenu from "../MainMenu";
import i18n from "../../util/i18n";
import PopupManager from "../../util/PopupManager";
import FakeLoader from "../../util/FakeLoader";
import InviteManager from "./InviteManager";

export default function AccountManage() {
  return (
    <Container centered>
      <Title
        size={1}
        title={
          i18n.translate("menu.manage-account.title-template") +
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
              i18n.translate(
                "menu.manage-account.delete-account.enter-password"
              ),
              (password) => {
                UserManager.deleteAccount(password as string).then((x) => {
                  if (x) {
                    PopupManager.showPopup(
                      "Alert",
                      "menu.manage-account.delete-account.success",
                      i18n.translate(
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
                      i18n.translate(
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
          onclick={() => {
            PopupManager.showPopup(
              "Question",
              "menu.manage-account.change-username",
              i18n.translate(
                "menu.manage-account.change-username.enter-username"
              ),
              async (username) => {
                FakeLoader.show();

                if (await UserManager.accountExists(username as string)) {
                  PopupManager.showPopup(
                    "Alert",
                    "error",
                    i18n.translate("error.username.exists"),
                    () => {},
                    true
                  );
                } else {
                  await UserManager.updateUsername(username as string);
                  PopupManager.showPopup(
                    "Alert",
                    "menu.manage-account.change-username.success",
                    i18n.translate(
                      "menu.manage-account.change-username.success.description"
                    ),
                    () => {
                      UIManager.unmountAt("root");
                      UIManager.showComponent(<AccountManage />, "root");
                    },
                    true
                  );
                }

                FakeLoader.hide();
              },
              true
            );
          }}
          title={"menu.manage-account.change-username"}
        />
        <MenuItem
          icon={faPencilAlt}
          onclick={() => {
            PopupManager.showPopup(
              "Question",
              "menu.manage-account.change-password",
              i18n.translate(
                "menu.manage-account.change-password.enter-current-password"
              ),
              (password) => {
                PopupManager.showPopup(
                  "Question",
                  "menu.manage-account.change-password",
                  i18n.translate(
                    "menu.manage-account.change-password.enter-new-password"
                  ),
                  async (newPassword) => {
                    if (UserManager.isPasswordSafe(newPassword as string)) {
                      if (
                        await UserManager.updatePassword(
                          password as string,
                          newPassword as string
                        )
                      ) {
                        PopupManager.showPopup(
                          "Alert",
                          "menu.manage-account.change-password.success",
                          i18n.translate(
                            "menu.manage-account.change-password.success.description"
                          ),
                          () => {},
                          true
                        );
                      } else {
                        PopupManager.showPopup(
                          "Alert",
                          "error",
                          i18n.translate("error.password.wrong"),
                          () => {},
                          true
                        );
                      }
                    } else {
                      PopupManager.showPopup(
                        "Alert",
                        "error",
                        i18n.translate("error.password.too.weak"),
                        () => {},
                        true
                      );
                    }
                  },
                  true
                );
              },
              true
            );
          }}
          title={"menu.manage-account.change-password"}
        />
        <MenuItem
          icon={faUsersCog}
          onclick={() => {
            UIManager.showComponent(<InviteManager />);
          }}
          title={"menu.manage-account.manage-invites"}
        />
        <MainMenuItem />
      </MenuItemList>
    </Container>
  );
}

AccountManage.displayName = "AccountManage";
