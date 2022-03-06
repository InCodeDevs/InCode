/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { ReactElement } from "react";
import i18n from "../../util/i18n";
import { IPopup } from "../../types/IPopup";
import PopupButton from "./PopupButton";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";

export default function ReloadedPopup(props: IPopup) {
  return (
    <div className={"popup-reloaded"}>
      <div className="popup-reloaded-content">
        <div className={"popup-reloaded-title"}>
          <h1>{props.title}</h1>
          <button
            className={"popup-reloaded-button close-button"}
            onClick={() => {
              PopupManagerReloaded.disposeCurrentPopup();
            }}
          >
            {i18n.translate("menu.close")}
          </button>
        </div>
        <div className={"popup-reloaded-description"}>{props.description}</div>
        <div className={"popup-reloaded-buttons"}>
          {props.buttons.map((button) => {
            return <PopupButton {...button} />;
          })}
        </div>
      </div>
    </div>
  );
}
