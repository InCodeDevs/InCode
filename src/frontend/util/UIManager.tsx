/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component, ReactElement } from "react";

export default class UIManager {
  public static showComponent(
    component: React.ReactElement,
    containerID: string = "root"
  ) {
    ReactDOM.unmountComponentAtNode(
      document.querySelector(containerID) as HTMLElement
    );
    ReactDOM.render(component, document.querySelector(containerID));
  }
}
