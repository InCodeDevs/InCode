/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";

interface Props {
  children: React.ReactElement | React.ReactElement[];
  centered?: boolean;
  centeredRelative?: boolean;
}

export default function Container(props: Props) {
  return (
    <div
      className={
        "container " +
        (props.centered || props.centeredRelative ? "is-centered" : "")
      }
      style={props.centeredRelative ? { position: "relative" } : {}}
    >
      {props.children}
    </div>
  );
}
