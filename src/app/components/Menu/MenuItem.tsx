/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Text from "../Text";

interface Props {
  children?: string | React.ReactElement | React.ReactElement[];
  icon: IconDefinition;
  onclick: () => void;
  title: string;
  nol18n?: boolean;
  id?: string;
  disabled?: boolean;
}

export default function MenuItem(props: Props) {
  return (
    <div
      className={
        "menu-item " + (props.disabled === true ? "menu-item-disabled" : "")
      }
      onClick={props.onclick}
      id={props.id}
    >
      <FontAwesomeIcon icon={props.icon} color={"#FAFAFA"} />
      <Text nol18n={props.nol18n}>{props.title}</Text>
    </div>
  );
}
