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

export default function UserAdmin() {
  return (
    <Container centered>
      <Title size={1} title={"menu.admin.user"} centered />
      <MenuItemList>
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
