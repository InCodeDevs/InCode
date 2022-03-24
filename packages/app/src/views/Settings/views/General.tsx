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

export default function General() {
  return (
    <>
      <SettingsView title={"menu.settings.menu.item.general"}>
        <SettingsControls>
          <div
            onClick={() => {
              PushNotificationManager.subscribe();
            }}
          >
            <SettingsBooleanController
              setting={"pushNotifications"}
              description={"null"}
              // @ts-ignore
              icon={faPushed}
              title={""}
            />
          </div>
        </SettingsControls>
      </SettingsView>
    </>
  );
}

General.displayName = "Settings.General";
