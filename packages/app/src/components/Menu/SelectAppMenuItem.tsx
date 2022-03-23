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
      icon={faObjectGroup}
      title={"menu.back.select-app"}
      onclick={() => {
        if (
          new URLSearchParams(window.location.search).get("electron") !== null
        ) {
          UIManager.silentRedirect("/electron-select-app");
        } else {
          UIManager.silentRedirect("/");
        }
      }}
      id={"back-to-homepage"}
    />
  );
}
