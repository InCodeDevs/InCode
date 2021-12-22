/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useEffect } from "react";
import { SettingsBooleanController } from "../../types/SettingsController";
import Settings from "../../util/Settings";
import Title from "../Title";
import String from "../../util/String";
import i18n from "../../util/i18n";

export default function SettingsBooleanController(
  props: SettingsBooleanController
) {
  const id = String.random(10);

  // Dev Note #1 (17.12.2021):

  //
  // Idk why i switched 1 and 0. Anyway 0 is now true and 1 is false.
  // Maybe I will change this in the future. Till then, please don't change anything corresponding to this component.
  // Otherwise, you will break the whole thing.
  //

  useEffect(() => {
    (document.getElementById(id) as HTMLSelectElement).selectedIndex =
      Settings.getSetting(props.setting) === true ? 0 : 1;
  }, []);
  return (
    <div className="settings-controller settings-text-controller">
      <div className="settings-controller-icon-wrapper">
        <FontAwesomeIcon
          icon={props.icon}
          className={"settings-controller-icon"}
        />
      </div>
      <div className="settings-controller-title-wrapper">
        <Title
          size={3}
          title={props.title}
          className={"settings-controller-title"}
        />
        <span className={"settings-controller-description"}>
          {props.description}
        </span>
      </div>
      <select
        className={"settings-controller-text-input"}
        id={id}
        onChange={(e) => {
          if (e.target.selectedIndex === 0) {
            Settings.setSetting(props.setting, true);
          } else {
            Settings.setSetting(props.setting, false);
          }
        }}
      >
        <option value="true">{i18n.translate("yes")}</option>
        <option value="false">{i18n.translate("no")}</option>
      </select>
    </div>
  );
}
