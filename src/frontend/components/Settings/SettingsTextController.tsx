/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { SettingsTextController } from "../../types/SettingsController";
import Title from "../Title";
import String from "../../util/String";

export default function SettingsTextController(props: SettingsTextController) {
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
      <input type="text" className={"settings-controller-text-input"} />
    </div>
  );
}
