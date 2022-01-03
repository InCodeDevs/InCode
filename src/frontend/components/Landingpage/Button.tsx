/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";

interface Props {
  title: string;
  color: string;
  onClick: () => void;
}

export default function Button(props: Props) {
  return (
    <button
      className={"lp-button lp-button-" + props.color}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}
