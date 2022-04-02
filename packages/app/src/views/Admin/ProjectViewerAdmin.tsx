/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import MonacoEditor from "../../components/Editor/MonacoEditor";
import BlocklyEditor from "../../components/Editor/BlocklyEditor";
import PlaygroundPreview from "../../components/Editor/PlaygroundPreview";
import MenuBar from "../../components/MenuBar/MenuBar";
import i18n from "../../util/i18n";
import UIManager from "../../util/UIManager";
import { v4 as uuidv4 } from "uuid";

interface Props {
  type: "code" | "blockly";
  code: string;
  returnUrl: string;
}

export default function ProjectViewerAdmin(props: Props) {
  return (
    <>
      <MenuBar
        menuItems={[
          {
            label: i18n.translate("menu.back"),
            onClick: () => {
              UIManager.silentRedirect("/" + uuidv4());
              UIManager.silentRedirect(props.returnUrl);
            },
          },
        ]}
      />
      {props.type === "code" ? (
        <MonacoEditor
          code={props.code}
          mode={"playground"}
          public={undefined}
          readonly
        />
      ) : (
        <BlocklyEditor initialXml={props.code} />
      )}
      <PlaygroundPreview />
    </>
  );
}
