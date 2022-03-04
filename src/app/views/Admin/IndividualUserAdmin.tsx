/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../../components/Container";
import MenuItemList from "../../components/Menu/MenuItemList";
import MenuItem from "../../components/Menu/MenuItem";
import {
  faBackward,
  faGears,
  faPencilAlt,
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
          icon={faTrashAlt}
          onclick={() => {
            PopupManager.showPopup(
              "Confirm",
              "menu.continue",
              i18n.translate("menu.admin.user.individual.delete.confirm"),
              () => {
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
              }
            );
          }}
          title={"menu.admin.user.individual.delete"}
        />
        <MenuItem
          icon={faPencilAlt}
          onclick={() => {
            PopupManager.showPopup(
              "Question",
              "menu.admin.user.individual.rename",
              i18n.translate("menu.admin.user.individual.rename.confirm"),
              (answer) => {
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
              }
            );
          }}
          title={"menu.admin.user.individual.rename"}
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
