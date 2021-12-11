/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import React from "react";
import l18n from "../../util/l18n";
import UIManager from "../../util/UIManager";
import MainMenu from "../../views/MainMenu";
import MenuBar from "../MenuBar/MenuBar";

export default function PlaygroundMenuBar() {
  return (
    <>
      <MenuBar
        menuItems={[
          {
            label: l18n.translate("menu.main"),
            onClick: () => {
              UIManager.showComponent(<MainMenu />, "root");
            },
          },
        ]}
      />
    </>
  );
}
