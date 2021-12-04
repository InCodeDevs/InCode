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
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import UserManager from "../../util/UserManager";
import UIManager from "../../util/UIManager";
import MainMenu from "../MainMenu";
import l18n from "../../util/l18n";

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
        <MainMenuItem />
      </MenuItemList>
    </Container>
  );
}
