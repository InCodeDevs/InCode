/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import BrowserStorage from "./BrowserStorage";
import { WebClient } from "@incodelang/accounts-client";
import { Invite } from "../types/Invite";
import { JSONObject } from "../types/JSONObject";
import * as React from "react";
import String from "./String";
import { ProjectConfig } from "../types/ProjectConfig";
import ProjectManager from "./ProjectManager";
import PopupManagerReloaded from "./PopupManagerReloaded";
import i18n from "./i18n";
import SocketConnection from "./SocketConnection";

const client = new WebClient("");

export default class UserManager {
  public static isLoggedIn(): boolean {
    return (
      BrowserStorage.get("accessToken") != "" &&
      BrowserStorage.get("accessName") != ""
    );
  }

  public static login(username: string, token: string) {
    BrowserStorage.store("accessName", username);
    BrowserStorage.store("accessToken", token);
    SocketConnection.connect();
    new WebClient("").createPostBox(
      UserManager.getUsername(),
      UserManager.getToken(),
      "project.feed"
    );
  }

  public static logout() {
    BrowserStorage.delete("accessName");
    BrowserStorage.delete("accessToken");
  }

  public static getUsername(): string {
    return BrowserStorage.get("accessName");
  }

  public static getToken(): string {
    return BrowserStorage.get("accessToken");
  }

  public static async deleteAccount(password: string): Promise<boolean> {
    const success = await client.delete(this.getUsername(), password);
    if (success) {
      this.logout();
      return true;
    } else {
      return false;
    }
  }

  public static async updatePassword(
    password: string,
    newPassword: string
  ): Promise<boolean> {
    return await client.updatePassword(
      this.getUsername(),
      password,
      newPassword
    );
  }

  public static async updateUsername(newUsername: string): Promise<boolean> {
    const oldUsername = this.getUsername();
    BrowserStorage.store("accessName", newUsername);
    return await client.updateUsername(
      oldUsername,
      this.getToken(),
      newUsername
    );
  }

  public static async accountExists(username: string): Promise<boolean> {
    return await client.existsUser(username);
  }

  public static generateSafePassword(): string {
    let generated = "";

    while (!UserManager.isPasswordSafe(generated)) {
      generated = String.random(
        16,
        "@#$%!&?+-:,.;=Â§1234567890abcdefghijklmnopqrstuvwxyz" +
          "abcdefghijklmnopqrstuvwxyz".toUpperCase() +
          "{}[]()/|><*~"
      );
    }
    return generated;
  }

  public static isPasswordSafe(password: string) {
    return password.match(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})/g
    );
  }

  public static async allowsInvites(): Promise<boolean> {
    return await client.existsPostBox(this.getUsername(), "invites");
  }

  public static async getInvites(): Promise<Invite[]> {
    const x = await client.readPostBox(
      this.getUsername(),
      this.getToken(),
      "invites"
    );
    const invites: Invite[] = [];
    x.forEach((obj: JSONObject) => {
      const invite = JSON.parse(obj.entry);
      let inviteObject: Invite = {
        from: invite.from,
        project_name: invite.project_name,
        project_type: invite.project_type,
        public_data: invite.public_data,
        timestamp: obj.at,
      };
      invites.push(inviteObject);
    });
    return invites;
  }

  public static async allowInvites() {
    await client.createPostBox(this.getUsername(), this.getToken(), "invites");
  }

  public static async disallowInvites() {
    await client.deletePostBox(this.getUsername(), this.getToken(), "invites");
  }

  public static async removeInvite(at: string) {
    await client.removeFromPostBox(
      UserManager.getUsername(),
      UserManager.getToken(),
      "project.feed",
      at
    );
  }

  public static async acceptInvite(
    invite: Invite,
    config?: { openProject?: boolean; displayMessage?: boolean }
  ) {
    UserManager.removeInvite(invite.timestamp).then(async () => {
      const projectConfig: ProjectConfig = {
        type: invite.project_type,
        name: invite.project_name,
        code: JSON.parse(
          (
            await (
              await fetch("/api/v1/user/data/get", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: UserManager.getUsername(),
                  password: UserManager.getToken(),
                  key: invite.public_data,
                  hash: false,
                }),
              })
            ).json()
          ).message
        ).code,
        publicData: invite.public_data,
      };

      await ProjectManager.addToProjectList(invite.project_name);
      await new WebClient("").storeData_u(
        UserManager.getUsername(),
        UserManager.getToken(),
        JSON.stringify({
          type: "code",
          name: invite.project_name,
          code: "",
          publicData: invite.public_data,
        }),
        "projects." + invite.project_name
      );
      if (config && config.displayMessage) {
        PopupManagerReloaded.alert({
          title: i18n.translate("menu.feed.invite.accepted.title"),
          description: i18n.translate("menu.feed.invite.accepted.description"),
        });
      }
      if (config && config.openProject) {
        await ProjectManager.openProject(projectConfig);
      }
    });
  }
}
