/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import MenuItem from "./MenuItem";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import UIManager from "../../util/UIManager";
import MainMenu from "../../views/MainMenu";

interface Props {
  component?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | JSX.Element;
  url?: string;
}

export default function BackMenuItem(props: Props) {
  return (
    <MenuItem
      // @ts-ignore
      icon={faBackward}
      title={"menu.back"}
      onclick={() => {
        if (props.component && !props.url) {
          UIManager.showComponent(props.component, "root");
        } else if (props.url && !props.component) {
          UIManager.silentRedirect(props.url);
        } else if (props.component && props.url) {
          UIManager.showComponentWithURL(props.component, props.url, "root");
        } else {
          UIManager.showComponent(<MainMenu />, "root");
        }
      }}
    />
  );
}
