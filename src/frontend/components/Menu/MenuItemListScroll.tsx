/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React, { ReactElement } from "react";

interface Props {
  children?: ReactElement[] | ReactElement;
}

export default function MenuItemList(props: Props) {
  return (
    <div className="menu-item-list-scroll">
      <div className={"menu-item-list"}>{props.children}</div>
    </div>
  );
}
