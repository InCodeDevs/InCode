/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import UserManager from "./UserManager";
import { WebClient } from "@incodelang/accounts-client";
import PopupManagerReloaded from "./PopupManagerReloaded";
import i18n from "./i18n";
import Blockly from "blockly";
import allUsedVarModels = Blockly.Variables.allUsedVarModels;

export default class AdminMessage {
  public static download() {
    if (UserManager.isLoggedIn()) {
      new WebClient("")
        .readPostBox(
          UserManager.getUsername(),
          UserManager.getToken(),
          "admin.messages"
        )
        .then((data) => {
          if (data.length > 0) {
            data.forEach(
              (message: { author: string; at: string; entry: string }) => {
                if (message.author === "admin") {
                  PopupManagerReloaded.alert({
                    title: i18n.translate("menu.admin.message.title"),
                    description: message.entry,
                    willClose: async () => {
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
}
