/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React from "react";
import l18n from "../util/l18n";

interface Props {
  size: 1 | 2 | 3 | 4 | 5 | 6;
  centered?: boolean;
  title: string;
  className?: string;
  nol18n?: boolean;
}

export default function Title(props: Props) {
  return (
    <h1
      className={
        "title title-" +
        props.size +
        " " +
        (props.centered ? "text-centered" : "") +
        " " +
        props.className
      }
    >
      {props.nol18n ? props.title : l18n.translate(props.title)}
    </h1>
  );
}
