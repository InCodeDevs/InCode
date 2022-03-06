/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { IPopup } from "../types/IPopup";
import UIManager from "./UIManager";
import ReloadedPopup from "../components/ReloadedPopup/ReloadedPopup";
import React from "react";
import { IConfirmPopup } from "../types/IConfirmPopup";

export default class PopupManagerReloaded {
  public static next_popups: IPopup[] = [];
  public static current_popup: IPopup | null = null;

  public static alert(options: IPopup) {
    PopupManagerReloaded.showPopup(options);
  }

  public static confirm(options: IConfirmPopup) {
    PopupManagerReloaded.showPopup({
      title: options.title,
      description: options.description,
      buttons: [
        {
          text: "Nein",
          variant: "red",
          onClick: () => {
            if (options.onDisagree) {
              PopupManagerReloaded.disposeCurrentPopup();
              options.onDisagree();
            }
          },
        },
        {
          text: "Ja",
          variant: "green",
          onClick: () => {
            if (options.onAgree) {
              PopupManagerReloaded.disposeCurrentPopup();
              options.onAgree();
            }
          },
        },
      ],
      didLoad: options.didLoad,
      didClose: options.didClose,
      willLoad: options.willLoad,
      willClose: options.willClose,
    });
  }

  public static showPopup(popup: IPopup) {
    if (PopupManagerReloaded.current_popup) {
      PopupManagerReloaded.next_popups.push(popup);
      return;
    } else {
      PopupManagerReloaded.current_popup = popup;
    }
    if (popup.willLoad) {
      popup.willLoad();
    }
    (document.getElementById("popupWrapper2") as HTMLDivElement).classList.add(
      "active"
    );
    UIManager.showComponent(<ReloadedPopup {...popup} />, "popup2");
    if (popup.didLoad) {
      popup.didLoad();
    }
  }

  public static disposeCurrentPopup() {
    if (PopupManagerReloaded.current_popup) {
      if (PopupManagerReloaded.current_popup.willClose) {
        PopupManagerReloaded.current_popup.willClose();
      }
      (
        document.getElementById("popupWrapper2") as HTMLDivElement
      ).classList.remove("active");
      UIManager.unmountAt("popup2");
      if (PopupManagerReloaded.current_popup.didClose) {
        PopupManagerReloaded.current_popup.didClose();
      }
      PopupManagerReloaded.current_popup = null;
    }

    if (PopupManagerReloaded.next_popups.length > 0) {
      PopupManagerReloaded.showPopup(PopupManagerReloaded.next_popups[0]);
      PopupManagerReloaded.next_popups =
        PopupManagerReloaded.next_popups.slice(1);
    }
  }
}
