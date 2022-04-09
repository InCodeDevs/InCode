/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React, { useState } from "react";
import MonacoEditor from "../components/Editor/MonacoEditor";
import PlaygroundPreview from "../components/Editor/PlaygroundPreview";
import MenuBar from "../components/MenuBar/MenuBar";
import i18n from "../util/i18n";
import UIManager from "../util/UIManager";
import BlocklyEditor from "../components/Editor/BlocklyEditor";
import SplitPane from "react-split-pane";
import Blockly from "blockly";
import { Registry } from "../util/Registry";

export default function Playground() {
  const [editor, setEditor] = useState("monaco");

  return (
    <>
      <MenuBar
        menuItems={[
          {
            label: i18n.translate("menu.back.select-app"),
            onClick: () => {
              if (
                new URLSearchParams(window.location.search).get("electron") !==
                null
              ) {
                UIManager.silentRedirect("/electron-select-app");
              } else {
                UIManager.silentRedirect("/");
              }
            },
          },
          {
            label: i18n.translate("menu.playground.switch-playground"),
            onClick: () => {
              if (editor === "monaco") {
                setEditor("blockly");
              } else {
                setEditor("monaco");
              }
            },
          },
        ]}
      />
      <SplitPane
        split={"vertical"}
        defaultSize={"50%"}
        className={"incode-split-pane"}
        onChange={() => {
          // @ts-ignore
          if (!window.editor) {
            Blockly.svgResize(Registry.getRegister(0x064));
          }
        }}
      >
        {editor === "monaco" ? (
          <MonacoEditor
            mode={"playground"}
            code={'Gib "Hallo Welt" in der Dialogbox aus'}
            public={undefined}
          />
        ) : (
          <BlocklyEditor
            initialXml={
              '<xml><block type="start" id="|(^9%DCME)E4UEoWv~G]" x="134" y="70"></block></xml>'
            }
          />
        )}

        <PlaygroundPreview />
      </SplitPane>
    </>
  );
}

Playground.displayName = "Playground";
