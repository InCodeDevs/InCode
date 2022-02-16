/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import BrowserStorage from "./BrowserStorage";
import { WebClient } from "@incodelang/accounts-client";
import { Invite } from "../types/Invite";
import { JSONObject } from "../types/JSONObject";
import UIManager from "./UIManager";
import * as React from "react";

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
      "invites",
      at
    );
  }
}
