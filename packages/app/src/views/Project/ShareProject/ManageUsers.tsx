/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { ProjectConfig } from "../../../types/ProjectConfig";
import Container from "../../../components/Container";
import MenuItemList from "../../../components/Menu/MenuItemList";
import MenuItemListScroll from "../../../components/Menu/MenuItemListScroll";
import BackMenuItem from "../../../components/Menu/BackMenuItem";
import ManageShare from "./ManageShare";
import { ReactElement, useLayoutEffect } from "react";
import { WebClient } from "@incodelang/accounts-client";
import UserManager from "../../../util/UserManager";
import MenuItem from "../../../components/Menu/MenuItem";
import MenuItemControls from "../../../components/Menu/MenuItemControls";
import { faPlus, faTrashAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import i18n from "../../../util/i18n";
import Title from "../../../components/Title";
import PopupManagerReloaded from "../../../util/PopupManagerReloaded";
import UIManager from "../../../util/UIManager";
import ProjectManager from "../../../util/ProjectManager";

export default function ManageUsers(props: { projectConfig: ProjectConfig }) {
  const [content, setContent] = React.useState<ReactElement[]>();

  useLayoutEffect(() => {
    let e: ReactElement[] = [
      <BackMenuItem
        component={<ManageShare projectConfig={props.projectConfig} />}
      />,
      <MenuItem
        icon={faPlus}
        onclick={() => {
          PopupManagerReloaded.ask({
            title: i18n.translate(
              "menu.share-project.share-with-others.invite"
            ),
            description: i18n.translate(
              "menu.share-project.share-with-others.input-name"
            ),
            onSubmit: (username) => {
              UserManager.accountExists(username).then(async (exists) => {
                if (exists) {
                  const id = await ProjectManager.shareProject(
                    props.projectConfig
                  );
                  ProjectManager.inviteUser(username, props.projectConfig).then(
                    (success) => {
                      if (success) {
                        const client = new WebClient("");
                        client
                          .storeData(
                            UserManager.getUsername(),
                            UserManager.getToken(),
                            JSON.stringify(props.projectConfig),
                            id
                          )
                          .then((x) => {
                            client
                              .allowDataAccess(
                                UserManager.getUsername(),
                                UserManager.getToken(),
                                id,
                                username
                              )
                              .then(async () => {
                                PopupManagerReloaded.alert({
                                  title: i18n.translate(
                                    "menu.share-project.share-with-others.invited.success"
                                  ),
                                  description: i18n.translate(
                                    "menu.share-project.share-with-others.invited.success.description"
                                  ),
                                  didClose: () => {
                                    UIManager.unmountAt("root");
                                    UIManager.showComponent(
                                      <ManageShare
                                        projectConfig={props.projectConfig}
                                      />
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
      />,
    ];

    new WebClient("")
      .getAllowedUsers(
        UserManager.getUsername(),
        UserManager.getToken(),
        props.projectConfig.publicData
      )
      .then((users: string[]) => {
        users.forEach((user) => {
          let disabled = UserManager.getUsername() === user;

          const removeUser = () => {
            PopupManagerReloaded.confirm({
              title: i18n.translate("menu.share-project.manage.users.remove"),
              description: i18n.translate(
                "menu.share-project.manage.users.remove.description"
              ),
              onAgree: () => {
                if (!disabled) {
                  new WebClient("")
                    .disallowDataAccess(
                      UserManager.getUsername(),
                      UserManager.getToken(),
                      props.projectConfig.publicData,
                      user
                    )
                    .then(() => {
                      new WebClient("").addToPostBox(
                        UserManager.getUsername(),
                        UserManager.getToken(),
                        "project.feed",
                        user,
                        JSON.stringify({
                          protocol_action: 0x04,
                          project_name: props.projectConfig.name,
                        })
                      );
                      UIManager.unmountAt("root");
                      UIManager.showComponent(
                        <ManageUsers projectConfig={props.projectConfig} />
                      );
                    });
                }
              },
            });
          };

          e.push(
            <MenuItemControls
              icon={faUser}
              onclick={removeUser}
              title={user}
              nol18n
              disabled={disabled}
              {...(disabled
                ? { widgets: [] }
                : {
                    widgets: [
                      {
                        icon: faTrashAlt,
                        color: "#FF0000",
                        onclick: removeUser,
                        name: "menu.share-project.manage.users.delete",
                      },
                    ],
                  })}
            />
          );
        });
        setContent(e);
      });
  }, []);

  return (
    <>
      <Container centered>
        <Title
          size={1}
          title={"menu.share-project.manage.users.title"}
          centered
        />
        <MenuItemListScroll>{content}</MenuItemListScroll>
      </Container>
    </>
  );
}

ManageUsers.displayName = "ManageUsers";
