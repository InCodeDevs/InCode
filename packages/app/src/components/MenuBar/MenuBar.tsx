/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import React, { ReactElement } from "react";

interface Props {
  menuItems: MenuItem[];
}

interface MenuItem {
  label: string;
  onClick: () => void;
}

export default function MenuBar(props: Props) {
  return (
    <div className={"menubar"}>
      <div className="menubar-buttons">
        {props.menuItems.map((item, index) => {
          return (
            <div
              key={index}
              className={"menubar-button"}
              onClick={item.onClick}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
