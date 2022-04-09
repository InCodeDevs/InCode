/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import PopupManagerReloaded from "./PopupManagerReloaded";
import i18n from "./i18n";
import UserManager from "./UserManager";
import React from "react";
import { PostboxEntry } from "../types/PostboxEntry";
import { Invite } from "../types/Invite";
import { WebClient } from "@incodelang/accounts-client";

export default class FeedHandler {
  public static handleNewInvite(postboxEntry: PostboxEntry) {
    const e = JSON.parse(postboxEntry.entry as string);

    const invite: Invite = {
      from: postboxEntry.author,
      project_name: e.project_name,
      project_type: e.project_type,
      public_data: e.public_data,
      timestamp: postboxEntry.at,
    };

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
            await new WebClient("").addToPostBox(
              UserManager.getUsername(),
              UserManager.getToken(),
              "project.feed",
              postboxEntry.author as string,
              JSON.stringify({
                protocol_action: 0x02,
                project_name: invite.project_name,
                public_data: invite.public_data,
              })
            );

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
          onClick: async () => {
            await new WebClient("").addToPostBox(
              UserManager.getUsername(),
              UserManager.getToken(),
              "project.feed",
              postboxEntry.author as string,
              JSON.stringify({
                protocol_action: 0x01,
                project_name: invite.project_name,
              })
            );

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
  }

  public static handleAcceptInvite(username: string, projectName: string) {
    PopupManagerReloaded.alert({
      title: i18n.translate("menu.share-project.manage.users.accepted"),
      description: (
        <>
          Name:&nbsp;{username} <br />
          {i18n.translate("menu.feed.invite.project")}:&nbsp;{projectName}
        </>
      ),
    });
  }

  public static handleDeclineInvite(
    username: string,
    projectName: string,
    publicData: string
  ) {
    new WebClient("")
      .disallowDataAccess(
        UserManager.getUsername(),
        UserManager.getToken(),
        publicData,
        username
      )
      .then(() => {
        PopupManagerReloaded.alert({
          title: i18n.translate("menu.share-project.manage.users.declined"),
          description: (
            <>
              Name:&nbsp;{username} <br />
              {i18n.translate("menu.feed.invite.project")}:&nbsp;{projectName}
            </>
          ),
        });
      });
  }

  public static handleLeaveProject(
    username: string,
    projectName: string,
    publicData: string
  ) {
    new WebClient("").disallowDataAccess(
      UserManager.getUsername(),
      UserManager.getToken(),
      publicData,
      username
    );
    PopupManagerReloaded.alert({
      title: i18n.translate("menu.share-project.manage.users.left"),
      description: (
        <>
          Name:&nbsp;{username} <br />
          {i18n.translate("menu.feed.invite.project")}:&nbsp;{projectName}
        </>
      ),
    });
  }
}
