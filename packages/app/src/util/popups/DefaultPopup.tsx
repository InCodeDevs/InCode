/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import PopupManagerReloaded from "../PopupManagerReloaded";
import i18n from "../i18n";
import UIManager from "../UIManager";
import Login from "../../views/Login";
import * as React from "react";
import { IAlertPopup } from "../../types/IAlertPopup";

export default class DefaultPopup {
  public static PLEASE_LOG_IN: IAlertPopup = {
    title: i18n.translate("error.not.logged-in"),
    description: i18n.translate("error.please-login"),
    buttons: [
      {
        text: i18n.translate("menu.login.title"),
        onClick: () => {
          PopupManagerReloaded.disposeCurrentPopup();
          UIManager.showComponent(<Login />);
        },
      },
    ],
  };
  public static AVAILABLE_SOON: IAlertPopup = {
    title: i18n.translate("menu.available-soon"),
    description: i18n.translate("menu.available-soon.description")
  };
}
