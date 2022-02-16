/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import {
  SettingsNumberController,
  SettingsTextController,
} from "../../types/SettingsController";
import Settings from "../../util/Settings";
import Title from "../Title";
import String from "../../util/String";
import { useEffect } from "react";

export default function SettingsNumberController(
  props: SettingsNumberController
) {
  const id = String.random(10);

  useEffect(() => {
    (document.getElementById(id) as HTMLInputElement).value =
      Settings.getSetting(props.setting);
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
      <input
        type="number"
        min={props.min}
        max={props.max}
        id={id}
        className={"settings-controller-text-input"}
        onChange={(e) => {
          if (
            parseInt(e.target.value) > props.min &&
            parseInt(e.target.value) < props.max
          ) {
            Settings.setSetting(props.setting, e.target.value);
            e.preventDefault();
          }
        }}
      />
    </div>
  );
}
