/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import SettingsView from "../../../components/Settings/SettingsView";
import SettingsControls from "../../../components/Settings/SettingsControls";
import {
  faHashtag,
  faHourglassStart,
  faRotate,
  faTextHeight,
} from "@fortawesome/free-solid-svg-icons";
import SettingsNumberController from "../../../components/Settings/SettingsNumberController";
import i18n from "../../../util/i18n";
import SettingsBooleanController from "../../../components/Settings/SettingsBooleanController";

export default function CodeEditor() {
  return (
    <>
      <SettingsView title={"menu.settings.menu.item.code-editor"}>
        <SettingsControls>
          <SettingsNumberController
            setting={"codeEditor.fontSize"}
            description={i18n.translate(
              "menu.settings.menu.item.code-editor.font-size.description"
            )}
            title={"menu.settings.menu.item.code-editor.font-size"}
            icon={faTextHeight}
            min={1}
            max={40}
          />
          <SettingsBooleanController
            setting={"codeEditor.lineNumbers"}
            description={i18n.translate(
              "menu.settings.menu.item.code-editor.line-numbers.description"
            )}
            icon={faHashtag}
            title={"menu.settings.menu.item.code-editor.line-numbers"}
          />
          <SettingsBooleanController
            setting={"autoSave"}
            description={i18n.translate(
              "menu.settings.menu.item.code-editor.auto-save.description"
            )}
            icon={faHourglassStart}
            title={"menu.settings.menu.item.code-editor.auto-save"}
          />
          <SettingsBooleanController
            setting={"enableLiveReload"}
            description={i18n.translate(
              "menu.settings.menu.item.code-editor.enable-live-preview.description"
            )}
            icon={faRotate}
            title={"menu.settings.menu.item.code-editor.enable-live-preview"}
          />
        </SettingsControls>
      </SettingsView>
    </>
  );
}

CodeEditor.displayName = "Settings.CodeEditor";
