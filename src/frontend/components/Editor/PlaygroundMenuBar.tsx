/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import React from "react";
import i18n from "../../util/i18n";
import UIManager from "../../util/UIManager";
import MenuBar from "../MenuBar/MenuBar";

export default function PlaygroundMenuBar() {
  return (
    <>
      <MenuBar
        menuItems={[
          {
            label: i18n.translate("menu.back.select-app"),
            onClick: () => {
              UIManager.silentRedirect("/");
            },
          },
        ]}
      />
    </>
  );
}
