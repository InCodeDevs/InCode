/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input, { InputProps } from "../Input";

interface Props {
  children?: string | React.ReactElement | React.ReactElement[];
  icon: IconDefinition;
  input: InputProps;
}

export default function MenuItemInput(props: Props) {
  return (
    <div className={"menu-item bare-menu-item"}>
      <FontAwesomeIcon icon={props.icon} color={"#FAFAFA"} />
      <Input
        type={props.input.type}
        id={props.input.id}
        placeholder={props.input.placeholder || ""}
      />
    </div>
  );
}
