/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import StarAnimation from "./StarAnimation";
import { Toaster } from "react-hot-toast";

export default class UIManager {
  public static showComponent(
    component: React.ReactElement,
    containerID: string = "root"
  ) {
    ReactDOM.unmountComponentAtNode(
      document.querySelector("#" + containerID) as HTMLElement
    );
    ReactDOM.render(<><Toaster />{component}</>, document.querySelector("#" + containerID));
    if (containerID === "root") {
      StarAnimation.update(component);
    }
  }

  public static showComponentWithURL(
    component: React.ReactElement,
    url: string,
    containerID: string = "root"
  ) {
    UIManager.showComponent(component, containerID);
    window.history.pushState({}, "", url);
  }

  public static silentRedirect(url: string) {
    window.history.pushState({}, "", url);
  }

  public static unmountAt(containerID: string) {
    ReactDOM.unmountComponentAtNode(
      document.querySelector("#" + containerID) as HTMLElement
    );
  }
}
