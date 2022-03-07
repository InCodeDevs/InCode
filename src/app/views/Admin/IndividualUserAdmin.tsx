/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../../components/Container";
import MenuItemList from "../../components/Menu/MenuItemList";
import MenuItem from "../../components/Menu/MenuItem";
import {
  faArrowRotateLeft,
  faBackward,
  faFolderTree,
  faGears,
  faPencilAlt,
  faSquarePlus,
  faTrashAlt,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/Title";
import SelectAppMenuItem from "../../components/Menu/SelectAppMenuItem";
import UIManager from "../../util/UIManager";
import { useParams } from "react-router-dom";
import i18n from "../../util/i18n";
import PopupManager from "../../util/PopupManager";
import UserManager from "../../util/UserManager";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";
import AdminMessage from "../../util/AdminMessage";

export default function IndividualUserAdmin() {
  // @ts-ignore
  const { user } = useParams();

  return (
    <Container centered>
      <Title
        size={1}
        title={
          i18n.translate("menu.admin.user.individual.start") +
          " " +
          user +
          " " +
          i18n.translate("menu.admin.user.individual.end")
        }
        nol18n
        centered
      />
      <MenuItemList>
        <MenuItem
          icon={faSquarePlus}
          onclick={() => {
            PopupManagerReloaded.ask({
              title: i18n.translate("menu.admin.publishMessage"),
              description: i18n.translate(
                "menu.admin.publishMessage.description"
              ),
              onSubmit: (message) => {
                AdminMessage.sendToUser(message, user);
              },
            });
          }}
          title={"menu.admin.publishMessage"}
        />
        <MenuItem
          icon={faTrashAlt}
          onclick={() => {
            PopupManagerReloaded.confirm({
              title: i18n.translate("menu.continue"),
              description: i18n.translate(
                "menu.admin.user.individual.delete.confirm"
              ),
              onAgree: () => {
                fetch("/api/v1/admin/user/" + user + "/delete", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: "admin",
                    password: UserManager.getToken(),
                  }),
                }).then(() => {
                  UIManager.silentRedirect("/admin/users");
                });
              },
            });
          }}
          title={"menu.admin.user.individual.delete"}
        />
        <MenuItem
          icon={faPencilAlt}
          onclick={() => {
            PopupManagerReloaded.ask({
              title: i18n.translate("menu.admin.user.individual.rename"),
              description: i18n.translate(
                "menu.admin.user.individual.rename.confirm"
              ),
              onSubmit: (answer) => {
                if (answer) {
                  fetch(
                    "/api/v1/admin/user/" + user + "/rename" + "/" + answer,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: "admin",
                        password: UserManager.getToken(),
                      }),
                    }
                  ).then(() => {
                    UIManager.silentRedirect("/admin/users/" + answer);
                  });
                }
              },
            });
          }}
          title={"menu.admin.user.individual.rename"}
        />

        <MenuItem
          icon={faPencilAlt}
          onclick={() => {
            PopupManagerReloaded.ask({
              title: i18n.translate(
                "menu.admin.user.individual.changePassword"
              ),
              description: i18n.translate(
                "menu.admin.user.individual.changePassword.confirm"
              ),
              onSubmit: (answer) => {
                if (answer) {
                  fetch("/api/v1/admin/user/" + user + "/password", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      username: "admin",
                      password: UserManager.getToken(),
                      newPassword: answer,
                    }),
                  }).then(() => {
                    PopupManagerReloaded.alert({
                      title: i18n.translate(
                        "menu.admin.user.individual.changePassword.success"
                      ),
                      description: i18n.translate(
                        "menu.admin.user.individual.changePassword.success.description"
                      ),
                    });
                  });
                }
              },
            });
          }}
          title={"menu.admin.user.individual.changePassword"}
        />
        <MenuItem
          icon={faArrowRotateLeft}
          onclick={() => {
            fetch("/api/v1/admin/user/" + user + "/rate/reset", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: "admin",
                password: UserManager.getToken(),
              }),
            }).then(() => {
              PopupManagerReloaded.alert({
                title: i18n.translate(
                  "menu.admin.user.individual.reset-rate.success"
                ),
                description: i18n.translate(
                  "menu.admin.user.individual.reset-rate.success.description"
                ),
              });
            });
          }}
          title={"menu.admin.user.individual.reset-rate"}
        />
        <MenuItem
          icon={faFolderTree}
          onclick={() => {
            UIManager.silentRedirect("/admin/users/" + user + "/projects");
          }}
          title={"menu.admin.user.individual.projects"}
        />
        <MenuItem
          icon={faBackward}
          onclick={() => {
            UIManager.silentRedirect("/admin/users");
          }}
          title={"menu.share-project.back"}
        />
      </MenuItemList>
    </Container>
  );
}
