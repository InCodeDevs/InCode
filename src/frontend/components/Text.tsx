/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React, { ReactElement } from "react";
import i18n from "../util/i18n";

interface Props {
  children: string | ReactElement | ReactElement[];
  nol18n?: boolean;
}

export default function Text(props: Props) {
  let content = "";
  if (props.nol18n) {
    return <span className={"text"}>{props.children}</span>;
  } else {
    return (
      <span className={"text"}>{i18n.translate(props.children as string)}</span>
    );
  }
}
