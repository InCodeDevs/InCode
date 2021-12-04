/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import MonacoEditor from "../components/Editor/MonacoEditor";
import PlaygroundPreview from "../components/Editor/PlaygroundPreview";
import MenuBar from "../components/MenuBar/MenuBar";
import l18n from "../util/l18n";
import UIManager from "../util/UIManager";
import MainMenu from "./MainMenu";

export default function Playground() {
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
      <MonacoEditor mode={"playground"} />
      <PlaygroundPreview />
    </>
  );
}
