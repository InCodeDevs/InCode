/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { JSONObject } from "../types/JSONObject";
import UIManager from "./UIManager";
import Popup from "../components/Popup";
import React, { ReactElement } from "react";

export default class PopupManager {
  public static showPopup(
    type: "Alert" | "Question" | "Confirm",
    title: string,
    description: string | ReactElement | ReactElement[],
    callback?: (result?: JSONObject) => void
  ) {
    (document.querySelector("#popupWrapper") as HTMLElement).classList.add(
      "active"
    );
    UIManager.showComponent(
      <Popup
        type={type}
        title={title}
        description={description}
        callback={callback}
      />,
      "popup"
    );
  }

  public static disposeAll() {
    (document.querySelector("#popupWrapper") as HTMLElement).classList.remove(
      "active"
    );
    UIManager.unmountAt("popup");
  }
}
