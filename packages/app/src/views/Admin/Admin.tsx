/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../../components/Container";
import MenuItemList from "../../components/Menu/MenuItemList";
import MenuItem from "../../components/Menu/MenuItem";
import {
  faChartLine,
  faGears,
  faSquarePlus,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/Title";
import SelectAppMenuItem from "../../components/Menu/SelectAppMenuItem";
import UIManager from "../../util/UIManager";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";
import i18n from "../../util/i18n";
import UserManager from "../../util/UserManager";
import AdminMessage from "../../util/AdminMessage";

export default function Admin() {
  return (
    <Container centered>
      <Title size={1} title={"menu.admin"} centered />
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
                AdminMessage.sendToAllUsers(message);
              },
            });
          }}
          title={"menu.admin.publishMessage"}
        />
        <MenuItem
          icon={faUsersGear}
          onclick={() => {
            UIManager.silentRedirect("/admin/users");
          }}
          title={"menu.admin.user"}
        />
        <MenuItem
          icon={faGears}
          onclick={() => {
            UIManager.silentRedirect("/admin/system");
          }}
          title={"menu.admin.system"}
        />
        <MenuItem
          icon={faChartLine}
          onclick={() => {
            UIManager.silentRedirect("/admin/stats");
          }}
          title={"menu.admin.stats"}
        />
        <SelectAppMenuItem />
      </MenuItemList>
    </Container>
  );
}
