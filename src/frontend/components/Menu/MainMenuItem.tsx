/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import MenuItem from "./MenuItem";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import UIManager from "../../util/UIManager";
import MainMenu from "../../views/MainMenu";

export default function MainMenuItem() {
  return (
    <MenuItem
      icon={faHome}
      title={"menu.back.main"}
      onclick={() => {
        UIManager.showComponent(<MainMenu />, "root");
      }}
    />
  );
}
