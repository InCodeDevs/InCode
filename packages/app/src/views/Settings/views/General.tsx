/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import SettingsView from "../../../components/Settings/SettingsView";
import SettingsControls from "../../../components/Settings/SettingsControls";
import SettingsBooleanController from "../../../components/Settings/SettingsBooleanController";
import { faPushed } from "@fortawesome/free-brands-svg-icons";
import PushNotificationManager from "../../../util/PushNotificationManager";
import i18n from "../../../util/i18n";
import { faWifi } from "@fortawesome/free-solid-svg-icons";

export default function General() {
  return (
    <>
      <SettingsView title={"menu.settings.menu.item.general"}>
      <SettingsControls>
          <SettingsBooleanController
            setting={"offlineMode"}
            description={i18n.translate(
              "menu.settings.menu.item.general.offline-mode.description"
            )}
            icon={faWifi}
            title={"menu.settings.menu.item.general.offline-mode"}
          />
        </SettingsControls>
      </SettingsView>
    </>
  );
}

General.displayName = "Settings.General";
