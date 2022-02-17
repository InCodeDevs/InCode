/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import MenuItem from "./MenuItem";
import { faHome, faObjectGroup } from "@fortawesome/free-solid-svg-icons";
import UIManager from "../../util/UIManager";
import MainMenu from "../../views/MainMenu";

export default function SelectAppMenuItem() {
  return (
    <MenuItem
      // @ts-ignore
      icon={faObjectGroup}
      title={"menu.back.select-app"}
      onclick={() => {
        UIManager.silentRedirect("/");
      }}
      id={"back-to-homepage"}
    />
  );
}
