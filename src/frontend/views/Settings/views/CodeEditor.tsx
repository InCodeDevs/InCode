/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import SettingsView from "../../../components/Settings/SettingsView";
import SettingsControls from "../../../components/Settings/SettingsControls";
import { faHashtag, faTextHeight } from "@fortawesome/free-solid-svg-icons";
import SettingsNumberController from "../../../components/Settings/SettingsNumberController";
import l18n from "../../../util/l18n";
import SettingsBooleanController from "../../../components/Settings/SettingsBooleanController";

export default function CodeEditor() {
  return (
    <>
      <SettingsView title={"menu.settings.menu.item.code-editor"}>
        <SettingsControls>
          <SettingsNumberController
            setting={"codeEditor.fontSize"}
            description={l18n.translate(
              "menu.settings.menu.item.code-editor.font-size.description"
            )}
            title={"menu.settings.menu.item.code-editor.font-size"}
            icon={faTextHeight}
            min={1}
            max={40}
          />
          <SettingsBooleanController
            setting={"codeEditor.lineNumbers"}
            description={l18n.translate(
              "menu.settings.menu.item.code-editor.line-numbers.description"
            )}
            icon={faHashtag}
            title={"menu.settings.menu.item.code-editor.line-numbers"}
          />
        </SettingsControls>
      </SettingsView>
    </>
  );
}
