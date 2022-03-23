/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Text from "../Text";
import { MenuItemWidget } from "../../types/MenuItemWidget";
import i18n from "../../util/i18n";

interface Props {
  children?: string | React.ReactElement | React.ReactElement[];
  icon: IconDefinition;
  onclick: () => void;
  title: string;
  nol18n?: boolean;
  widgets: MenuItemWidget[];
}

export default function MenuItemControls(props: Props) {
  let iconClicked = false;
  return (
    <div
      className={"menu-item controls-menu-item"}
      onClick={() => {
        if (!iconClicked) {
          props.onclick();
        }
        iconClicked = false;
      }}
    >
      <FontAwesomeIcon icon={props.icon} color={"#FAFAFA"} />
      <Text nol18n={props.nol18n}>{props.title}</Text>
      <div
        className={"menu-item-widgets"}
        onClick={() => {
          iconClicked = true;
        }}
      >
        {props.widgets.map((widget) => {
          return (
            <div
              className={"menu-item-widget"}
              style={{ color: widget.color }}
              onClick={widget.onclick}
              title={i18n.translate(widget.name)}
            >
              <FontAwesomeIcon icon={widget.icon} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
