/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Title from "./Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Text from "./Text";

interface Entry {
  title: string;
  onclick: () => void;
  icon: IconDefinition;
}

interface Props {
  title: string;
  items: Entry[];
}

export default function NavigationBar(props: Props) {
  return (
    <div className={"nav-bar-container"}>
      <div className={"nav-bar"}>
        <Title size={1} title={props.title} />
        <div className={"nav-bar-entries"}>
          {props.items.map((item) => {
            return (
              <div className={"nav-bar-entry"} onClick={item.onclick}>
                <div className={"nbe-icon"}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <Text>{item.title}</Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
