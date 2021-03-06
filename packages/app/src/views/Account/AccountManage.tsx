/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React, { useEffect } from "react";
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
import { v4 } from "uuid";
import InviteManager from "./InviteManager";
import Text from "../../components/Text";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";
import DefaultPopup from "../../util/popups/DefaultPopup";
import PopupButton from "../../components/ReloadedPopup/PopupButton";

export default function AccountManage() {
  const [desktopExports, setDesktopExports] = React.useState("Loading...");
  const [resetsAt, setResetsAt] = React.useState("Loading...");

  useEffect(() => {
    fetch("/api/v1/generator/rate/" + UserManager.getUsername(), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setDesktopExports(data.remaining);
        setResetsAt(new Date(data.reset).toLocaleString());
      });
  }, []);

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
      <p style={{ textAlign: "center" }}>
        <Text nol18n>
          {i18n.translate("menu.manage-account.generator.exports-left") +
            " " +
            desktopExports}
        </Text>
        <br />
        <Text nol18n>
          {i18n.translate("menu.manage-account.generator.reset-at") +
            " " +
            resetsAt}
        </Text>
      </p>
      <MenuItemList>
        <MenuItem
          // @ts-ignore
          icon={faSignOutAlt}
          onclick={() => {
            UserManager.logout();
            UIManager.showComponent(<MainMenu />, "root");
          }}
          title={"menu.manage-account.logout"}
        />
        <MenuItem
          // @ts-ignore
          icon={faTrashAlt}
          onclick={() => {
            PopupManagerReloaded.ask({
              title: i18n.translate("menu.manage-account.delete-account"),
              description: i18n.translate(
                "menu.manage-account.delete-account.enter-password"
              ),
              onSubmit: (password) => {
                UserManager.deleteAccount(password as string).then((x) => {
                  if (x) {
                    PopupManagerReloaded.alert({
                      title: i18n.translate(
                        "menu.manage-account.delete-account.success"
                      ),
                      description: i18n.translate(
                        "menu.manage-account.delete-account.success.description"
                      ),
                      didClose: () => {
                        UIManager.showComponent(<MainMenu />, "root");
                      },
                    });
                  } else {
                    PopupManagerReloaded.toast(
                      "menu.manage-account.delete-account.wrong-password.description",
                      "error"
                    );
                  }
                });
              },
            });
          }}
          title={"menu.manage-account.delete-account"}
        />
        <MenuItem
          // @ts-ignore
          icon={faPencilAlt}
          onclick={() => {
            PopupManagerReloaded.toast(
              "menu.available-soon.description",
              "error"
            );

            return;
            /*
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
             */
          }}
          title={"menu.manage-account.change-username"}
        />
        <MenuItem
          // @ts-ignore
          icon={faPencilAlt}
          onclick={() => {
            PopupManagerReloaded.ask({
              title: i18n.translate("menu.manage-account.change-password"),
              description: i18n.translate(
                "menu.manage-account.change-password.enter-current-password"
              ),
              password: true,
              onSubmit: (password) => {
                const id = v4();
                PopupManagerReloaded.ask(
                  {
                    title: i18n.translate(
                      "menu.manage-account.change-password"
                    ),
                    description: (
                      <>
                        <br />
                        <br />
                        {i18n.translate(
                          "menu.manage-account.change-password.enter-new-password"
                        )}
                        <br />
                        <br />
                        <div style={{ display: "flex", width: "100%" }}>
                          <PopupButton
                            text={i18n.translate("menu.login.generate")}
                            onClick={() => {
                              (
                                document.getElementById(id) as HTMLInputElement
                              ).value = UserManager.generateSafePassword();
                              (
                                document.getElementById(id) as HTMLInputElement
                              ).type = "text";
                            }}
                            variant={"standard"}
                          />
                        </div>
                      </>
                    ),
                    password: true,
                    onSubmit: async (newPassword) => {
                      if (UserManager.isPasswordSafe(newPassword as string)) {
                        if (
                          await UserManager.updatePassword(
                            password as string,
                            newPassword as string
                          )
                        ) {
                          PopupManagerReloaded.toast(
                            "menu.manage-account.change-password.success.description",
                            "error"
                          );
                        } else {
                          PopupManagerReloaded.toast(
                            "error.password.not.match",
                            "error"
                          );
                        }
                      } else {
                        PopupManagerReloaded.toast(
                          "error.password.too.weak",
                          "error"
                        );
                      }
                    },
                  },
                  id,
                  true
                );
              },
            });
          }}
          title={"menu.manage-account.change-password"}
        />
        <MenuItem
          // @ts-ignore
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
