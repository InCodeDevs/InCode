/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import UserManager from "./UserManager";
import { WebClient } from "@incodelang/accounts-client";
import PopupManagerReloaded from "./PopupManagerReloaded";
import i18n from "./i18n";
import Blockly from "blockly";
import { Networking } from "./Networking";

export default class AdminMessage {
  public static sendToUser(message: string, username: string) {
    if (username !== "admin") {
      fetch("/api/v1/user/postboxes/exists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: username,
          name: "admin.messages",
        }),
      }).then((res) => {
        res.json().then(async (data0) => {
          if (data0.message.includes("not")) {
            await fetch(
              "/api/v1/admin/postboxes/create/" + username + "/admin.messages",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: "admin",
                  password: UserManager.getToken(),
                }),
              }
            );
          }
          fetch("/api/v1/user/postboxes/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: "admin",
              password: UserManager.getToken(),
              name: "admin.messages",
              owner: username,
              entry: message,
            }),
          });
        });
      });
    }
  }

  public static sendToAllUsers(message: string) {
    fetch("/api/v1/admin/users/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: UserManager.getUsername(),
        password: UserManager.getToken(),
      }),
    }).then((response) => {
      response.json().then((data) => {
        data.message.forEach((user: string) => {
          this.sendToUser(message, user);
        });
      });
    });
  }
}
