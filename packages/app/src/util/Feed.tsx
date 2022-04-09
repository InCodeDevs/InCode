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
import FeedHandler from "./FeedHandler";
import { JSONObject } from "../types/JSONObject";

export default class Feed {
  public static runTask() {
    setInterval(() => {
      this.download();
    }, 10000);
  }

  public static download() {
    this.downloadAdmin();
    // this.downloadInvites();
    this.downloadProjectFeed();
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
        UserManager.removeInvite(invite.timestamp).then(() => {});
      });
    }
  }

  public static async downloadProjectFeed() {
    if (UserManager.isLoggedIn()) {
      const feed = await new WebClient("").readPostBox(
        UserManager.getUsername(),
        UserManager.getToken(),
        "project.feed"
      );

      for (const obj of feed) {
        const action = JSON.parse(obj.entry).protocol_action;

        await new WebClient("").removeFromPostBox(
          UserManager.getUsername(),
          UserManager.getToken(),
          "project.feed",
          obj.at
        );

        switch (action) {
          case 0x00:
            FeedHandler.handleNewInvite(obj);
            break;
          case 0x01:
            FeedHandler.handleAcceptInvite(
              obj.author,
              JSON.parse(obj.entry).project_name
            );
            break;
          case 0x02:
            FeedHandler.handleDeclineInvite(
              obj.author,
              JSON.parse(obj.entry).project_name,
              JSON.parse(obj.entry).public_data
            );
            break;
          case 0x03:
            FeedHandler.handleLeaveProject(
              obj.author,
              JSON.parse(obj.entry).project_name,
              JSON.parse(obj.entry).public_data
            );
            break;
          case 0x04:
            FeedHandler.handleKicked(
              obj.author,
              JSON.parse(obj.entry).project_name
            );
            break;
          case 0x05:
            break;
          case 0x06:
            break;
          default:
            await new WebClient("").removeFromPostBox(
              UserManager.getUsername(),
              UserManager.getToken(),
              "project.feed",
              feed.at
            );
            break;
        }
      }
    }
  }
}
