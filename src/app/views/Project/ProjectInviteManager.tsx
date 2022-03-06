/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { ProjectConfig } from "../../types/ProjectConfig";
import Container from "../../components/Container";
import Title from "../../components/Title";
import MenuItemInput from "../../components/Menu/MenuItemInput";
import { faShare, faUser } from "@fortawesome/free-solid-svg-icons";
import MainMenuItem from "../../components/Menu/MainMenuItem";
import MenuItem from "../../components/Menu/MenuItem";
import MenuItemList from "../../components/Menu/MenuItemList";
import i18n from "../../util/i18n";
import UserManager from "../../util/UserManager";
import PopupManager from "../../util/PopupManager";
import ProjectManager from "../../util/ProjectManager";
import { WebClient } from "@incodelang/accounts-client";
import UIManager from "../../util/UIManager";
import ShareProject from "./ShareProject";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";
import BackMenuItem from "../../components/Menu/BackMenuItem";

interface Props {
  projectConfig: ProjectConfig;
}

export default function ProjectInviteManager(props: Props) {
  return (
    <>
      <Container centered>
        <Title
          size={1}
          title={"menu.share-project.share-with-others"}
          centered
        />
        <MenuItemList>
          <MenuItemInput
            icon={faUser}
            input={{
              type: "text",
              id: "share-with-others-name",
              placeholder: i18n.translate(
                "menu.share-project.share-with-others.input-name"
              ),
            }}
          />
          <MenuItem
            icon={faShare}
            onclick={() => {
              const username = (
                document.getElementById(
                  "share-with-others-name"
                ) as HTMLInputElement
              ).value;
              UserManager.accountExists(username).then((exists) => {
                if (exists) {
                  let pConfig = props.projectConfig;
                  pConfig.publicData =
                    UserManager.getUsername() + ":" + pConfig.name;
                  ProjectManager.inviteUser(username, pConfig).then(
                    (success) => {
                      if (success) {
                        const client = new WebClient("");
                        client
                          .storeData(
                            UserManager.getUsername(),
                            UserManager.getToken(),
                            JSON.stringify(pConfig),
                            pConfig.publicData
                          )
                          .then((x) => {
                            client
                              .allowDataAccess(
                                UserManager.getUsername(),
                                UserManager.getToken(),
                                pConfig.publicData,
                                username
                              )
                              .then(async () => {
                                await fetch("/api/v1/push/send", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    username: username,
                                    message:
                                      "Einladung von " +
                                      UserManager.getUsername() +
                                      " zum Projekt " +
                                      pConfig.name,
                                  }),
                                });
                                await ProjectManager.saveProject(pConfig, true);
                                PopupManagerReloaded.alert({
                                  title: i18n.translate(
                                    "menu.share-project.share-with-others.invited.success"
                                  ),
                                  description: i18n.translate(
                                    "menu.share-project.share-with-others.invited.success-description"
                                  ),
                                  didClose: () => {
                                    UIManager.showComponent(
                                      <ShareProject projectConfig={pConfig} />
                                    );
                                  },
                                });
                              });
                          });
                      } else {
                        PopupManagerReloaded.alert({
                          title: i18n.translate("error"),
                          description: i18n.translate(
                            "error.user.invites.disabled"
                          ),
                        });
                      }
                    }
                  );
                } else {
                  PopupManagerReloaded.alert({
                    title: i18n.translate("error"),
                    description: i18n.translate("error.user.not-exist"),
                  });
                }
              });
            }}
            title={"menu.share-project.share-with-others.invite"}
          />
          <BackMenuItem
            component={<ShareProject projectConfig={props.projectConfig} />}
          />
        </MenuItemList>
      </Container>
    </>
  );
}

ProjectInviteManager.displayName = "ProjectInviteManager";
