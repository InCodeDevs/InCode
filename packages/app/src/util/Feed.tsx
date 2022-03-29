/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import UserManager from "./UserManager";
import { Networking } from "./Networking";
import { WebClient } from "@incodelang/accounts-client";
import PopupManagerReloaded from "./PopupManagerReloaded";
import i18n from "./i18n";
import { Invite } from "../types/Invite";
import { sha256 } from "js-sha256";
import React from "react";

export default class Feed {
  public static runTask() {
    setInterval(() => {
      this.download();
    }, 10000);
  }

  public static download() {
    this.downloadAdmin();
    this.downloadInvites();
  }

  public static downloadAdmin() {
    if (UserManager.isLoggedIn() && Networking.isOnline()) {
      new WebClient("")
        .readPostBox(
          UserManager.getUsername(),
          UserManager.getToken(),
          "admin.messages"
        )
        .then((data) => {
          if (data.length > 0 && data.error !== true) {
            data.forEach(
              (message: { author: string; at: string; entry: string }) => {
                if (message.author === "admin") {
                  PopupManagerReloaded.alert({
                    title: i18n.translate("menu.admin.message.title"),
                    description: message.entry,
                    willLoad: async () => {
                      await new WebClient("").removeFromPostBox(
                        UserManager.getUsername(),
                        UserManager.getToken(),
                        "admin.messages",
                        message.at
                      );
                    },
                  });
                }
              }
            );
          }
        });
    }
  }

  public static async downloadInvites() {
    if (await UserManager.allowsInvites()) {
      const invites: Invite[] = await UserManager.getInvites();
      invites.forEach((invite) => {
        UserManager.removeInvite(invite.timestamp).then(() => {
          PopupManagerReloaded.alert({
            title: i18n.translate("menu.feed.invite.title"),
            description: (
              <>
                {i18n.translate("menu.feed.invite.description")}
                <br />
                <br />
                {i18n.translate("menu.feed.invite.name")}&nbsp;:&nbsp;
                {invite.from}
                <br />
                {i18n.translate("menu.feed.invite.project")}&nbsp;:&nbsp;
                {invite.project_name}
                <br />
                {i18n.translate("menu.feed.invite.project_type")}&nbsp;:&nbsp;
                {invite.project_type} <br />
                <br />
              </>
            ),
            buttons: [
              {
                text: i18n.translate("menu.feed.invite.decline"),
                variant: "red",
                onClick: async () => {
                  PopupManagerReloaded.disposeCurrentPopup();
                  PopupManagerReloaded.alert({
                    title: i18n.translate("menu.feed.invite.declined.title"),
                    description: i18n.translate(
                      "menu.feed.invite.declined.description"
                    ),
                  });
                },
              },
              {
                text: i18n.translate("menu.feed.invite.accept"),
                variant: "green",
                onClick: () => {
                  PopupManagerReloaded.disposeCurrentPopup();
                  UserManager.acceptInvite(invite, {
                    openProject: false,
                    displayMessage: true,
                  });
                },
              },
            ],
            noCloseButton: true,
          });
        });
      });
    }
  }
}
