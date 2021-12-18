/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import StarAnimation from "./StarAnimation";

export default class UIManager {
  public static showComponent(
    component: React.ReactElement,
    containerID: string = "root"
  ) {
    // @ts-ignore
    window.editor = undefined;

    ReactDOM.unmountComponentAtNode(
      document.querySelector("#" + containerID) as HTMLElement
    );
    ReactDOM.render(component, document.querySelector("#" + containerID));
    if (containerID === "root") {
      StarAnimation.update(component);
    }
  }

  public static unmountAt(containerID: string) {
    ReactDOM.unmountComponentAtNode(
      document.querySelector("#" + containerID) as HTMLElement
    );
  }
}
