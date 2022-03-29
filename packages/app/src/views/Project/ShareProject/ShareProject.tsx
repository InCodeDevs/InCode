/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../../../components/Container";
import Title from "../../../components/Title";
import { ProjectConfig } from "../../../types/ProjectConfig";
import MenuItemList from "../../../components/Menu/MenuItemList";
import MenuItem from "../../../components/Menu/MenuItem";
import {
  faBackward,
  faPuzzlePiece,
  faScroll,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import UIManager from "../../../util/UIManager";
import OpenProject from "../OpenProject";
import TemplateManager from "../../../util/TemplateManager";
import i18n from "../../../util/i18n";
import PopupManagerReloaded from "../../../util/PopupManagerReloaded";
import UserManager from "../../../util/UserManager";
import ProjectManager from "../../../util/ProjectManager";
import { WebClient } from "@incodelang/accounts-client";

interface Props {
  projectConfig: ProjectConfig;
}

export default function ShareProject(props: Props) {
  return (
    <Container centered>
      <Title title={"menu.share-project.title"} size={1} centered />
      <MenuItemList>
        <MenuItem
          // @ts-ignore
          icon={faUser}
          onclick={() => {
            PopupManagerReloaded.ask({
              title: i18n.translate(
                "menu.share-project.share-with-others.invite"
              ),
              description: i18n.translate(
                "menu.share-project.share-with-others.input-name"
              ),
              onSubmit: (username) => {
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
                                  await ProjectManager.saveProject(
                                    pConfig,
                                    true
                                  );
                                  PopupManagerReloaded.alert({
                                    title: i18n.translate(
                                      "menu.share-project.share-with-others.invited.success"
                                    ),
                                    description: i18n.translate(
                                      "menu.share-project.share-with-others.invited.success.description"
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
                      description: i18n.translate("error.user.not-exists"),
                    });
                  }
                });
              },
            });
          }}
          title={"menu.share-project.share-with-others"}
        />
        <MenuItem
          // @ts-ignore
          icon={faScroll}
          onclick={() => {
            TemplateManager.shareTemplate(props.projectConfig).then((obj) => {
              if (obj.error) {
                PopupManagerReloaded.alert({
                  title: i18n.translate(
                    "menu.share-project.failed.template.title"
                  ),
                  description: i18n.translate(
                    "menu.share-project.failed.template.description"
                  ),
                });
              } else {
                PopupManagerReloaded.alert({
                  title: i18n.translate(
                    "menu.share-project.success.template.title"
                  ),
                  description: i18n.translate(
                    "menu.share-project.success.template.description"
                  ),
                });
              }
            });
          }}
          title={"menu.share-project.share-template"}
        />
        <MenuItem
          // @ts-ignore
          icon={faPuzzlePiece}
          onclick={() => {
            const code = props.projectConfig.code;
            fetch("/api/v1/url/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                target:
                  "/api/v1/compiler/view?code=" + encodeURIComponent(code),
              }),
            })
              .then((r) => r.json())
              .then((t) => {
                const url = t.url;
                PopupManagerReloaded.alert({
                  title: i18n.translate(
                    "menu.share-project.success.project.title"
                  ),
                  description: (
                    <>
                      <h3 style={{ textAlign: "center" }}>
                        {i18n.translate(
                          "menu.share-project.success.project.description"
                        )}
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {location.protocol + "//" + location.host + url}
                        </a>
                      </h3>
                    </>
                  ),
                });
              });
          }}
          title={"menu.share-project.share-project"}
        />
        <MenuItem
          // @ts-ignore
          icon={faBackward}
          onclick={() => {
            UIManager.showComponent(<OpenProject />);
          }}
          title={"menu.share-project.back"}
        />
      </MenuItemList>
    </Container>
  );
}

ShareProject.displayName = "ShareProject";
