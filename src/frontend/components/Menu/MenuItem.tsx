/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../Title";
import Text from "../Text";

interface Props {
  children?: string | React.ReactElement | React.ReactElement[];
  icon: IconDefinition;
  onclick: () => void;
  title: string;
}

export default function MenuItem(props: Props) {
  return (
    <div className={"menu-item"} onClick={props.onclick}>
      <FontAwesomeIcon icon={props.icon} color={"#FAFAFA"} />
      <Text>{props.title}</Text>
    </div>
  );
}
