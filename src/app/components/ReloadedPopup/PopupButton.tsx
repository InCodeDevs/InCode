/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { IPopupButton } from "../../types/IPopupButton";

export default function PopupButton(props: IPopupButton) {
  console.log(props);
  return (
    <button
      className={
        "popup-reloaded-button popup-reloaded-button-" +
        (props.variant || "standard")
      }
      onClick={props.onClick}
      style={{ flex: "100%" }}
    >
      {props.text}
    </button>
  );
}
