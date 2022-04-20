/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { IPopup } from "../types/IPopup";
import UIManager from "./UIManager";
import ReloadedPopup from "../components/ReloadedPopup/ReloadedPopup";
import React from "react";
import { IConfirmPopup } from "../types/IConfirmPopup";
import { IAlertPopup } from "../types/IAlertPopup";
import { IQuestionPopup } from "../types/IQuestionPopup";
import { v4 } from "uuid";
import i18n from "./i18n";
import { toast } from "react-hot-toast";

export default class PopupManagerReloaded {
  public static next_popups: IPopup[] = [];
  public static current_popup: IPopup | null = null;

  public static alert(options: IAlertPopup) {
    PopupManagerReloaded.showPopup({
      buttons: [
        {
          text: "OK",
          onClick: () => {
            PopupManagerReloaded.disposeCurrentPopup();
          },
        },
      ],
      ...options,
    });
  }

  public static confirm(options: IConfirmPopup) {
    PopupManagerReloaded.showPopup({
      title: options.title,
      description: options.description,
      buttons: [
        {
          text: i18n.translate("no"),
          variant: "red",
          onClick: () => {
            if (options.onDisagree) {
              options.onDisagree();
            }
            PopupManagerReloaded.disposeCurrentPopup();
          },
        },
        {
          text: i18n.translate("yes"),
          variant: "green",
          onClick: () => {
            if (options.onAgree) {
              options.onAgree();
            }
            PopupManagerReloaded.disposeCurrentPopup();
          },
        },
      ],
      didLoad: options.didLoad,
      didClose: options.didClose,
      willLoad: options.willLoad,
      willClose: options.willClose,
    });
  }

  public static ask(
    popup: IQuestionPopup,
    id?: string,
    descriptionAfterWrapper?: boolean
  ) {
    if (!id) {
      id = v4();
    }
    if (!descriptionAfterWrapper) {
      descriptionAfterWrapper = false;
    }

    let wrapper = (
      <div className="popup-reloaded-input-wrapper">
        <input
          className={"popup-reloaded-input"}
          id={id}
          placeholder={popup.placeholder}
          type={popup.password ? "password" : "text"}
        />
      </div>
    );

    PopupManagerReloaded.showPopup({
      title: popup.title,
      description: (
        <>
          {descriptionAfterWrapper === true ? wrapper : popup.description}
          {descriptionAfterWrapper === true ? popup.description : wrapper}
        </>
      ),
      buttons: [
        {
          text: i18n.translate("menu.cancel"),
          variant: "red",
          onClick: () => {
            if (popup.onCancel) {
              popup.onCancel();
            }
            PopupManagerReloaded.disposeCurrentPopup();
          },
        },
        {
          text: "OK",
          variant: "green",
          onClick: () => {
            if (popup.onSubmit) {
              popup.onSubmit(
                (document.getElementById(id as string) as HTMLInputElement)
                  .value
              );
              PopupManagerReloaded.disposeCurrentPopup();
            }
          },
        },
      ],
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

  public static toast(messageCode: string, method: "success" | "error" | "") {
    let m: any = toast;

    if (method === "error") {
      m = toast.error;
    } else if (method === "success") {
      m = toast.success;
    }

    m(i18n.translate(messageCode), {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  }
}
