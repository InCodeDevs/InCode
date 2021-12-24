/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import React from "react";
import i18n from "../../util/i18n";
import UIManager from "../../util/UIManager";
import MainMenu from "../../views/MainMenu";
import MenuBar from "../MenuBar/MenuBar";
import SelectApp from "../../views/SelectApp";

export default function PlaygroundMenuBar() {
  return (
    <>
      <MenuBar
        menuItems={[
          {
            label: i18n.translate("menu.main"),
            onClick: () => {
              UIManager.showComponentWithURL(<SelectApp />, "/");
            },
          },
        ]}
      />
    </>
  );
}
