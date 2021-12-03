/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";

interface Props {
  children: React.ReactElement | string;
  size: 1 | 2 | 3 | 4 | 5 | 6;
  centered?: boolean;
}

export default function Title(props: Props) {
  return (
    <h1
      className={
        "title title-" +
        props.size +
        " " +
        (props.centered ? "text-centered" : "")
      }
    >
      {props.children}
    </h1>
  );
}
