/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import MenuItemList from "../../components/Menu/MenuItemList";
import MenuItem from "../../components/Menu/MenuItem";
import { faBackward, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import UIManager from "../../util/UIManager";
import UserManager from "../../util/UserManager";
import PopupManager from "../../util/PopupManager";
import i18n from "../../util/i18n";

export default function SystemAdmin() {
  return (
    <Container centered>
      <Title size={1} title={"menu.admin.system"} centered />
      <MenuItemList>
        <MenuItem
          icon={faPowerOff}
          onclick={() => {
            fetch("/api/v1/admin/shutdown", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: "admin",
                password: UserManager.getToken(),
              }),
            }).then(() => {
              PopupManager.showPopup(
                "Alert",
                "menu.admin.system.shutdown.success",
                i18n.translate("menu.admin.system.shutdown.success.description")
              );
            });
          }}
          title={"menu.admin.system.shutdown"}
        />
        <MenuItem
          icon={faBackward}
          onclick={() => {
            UIManager.silentRedirect("/admin");
          }}
          title={"menu.share-project.back"}
        />
      </MenuItemList>
    </Container>
  );
}
