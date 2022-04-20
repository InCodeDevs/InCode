/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import PopupManagerReloaded from "../../../util/PopupManagerReloaded";
import i18n from "../../../util/i18n";
import UserManager from "../../../util/UserManager";
import { v4 } from "uuid";
import ProjectManager from "../../../util/ProjectManager";
import { WebClient } from "@incodelang/accounts-client";
import UIManager from "../../../util/UIManager";
import ShareProject from "./ShareProject";
import { ProjectConfig } from "../../../types/ProjectConfig";
import Container from "../../../components/Container";
import MenuItemList from "../../../components/Menu/MenuItemList";
import MenuItem from "../../../components/Menu/MenuItem";
import { faPlus, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { useLayoutEffect } from "react";
import Title from "../../../components/Title";
import BackMenuItem from "../../../components/Menu/BackMenuItem";
import ManageUsers from "./ManageUsers";

export default function ManageShare(props: { projectConfig: ProjectConfig }) {
  const isShared =
    props.projectConfig.publicData && props.projectConfig.publicData !== "";

  const [content, setContent] = React.useState<JSX.Element>(<></>);

  useLayoutEffect(() => {
    if (isShared) {
      setContent(
        <MenuItemList>
          <MenuItem
            icon={faUsersCog}
            title={"menu.share-project.manage.users"}
            onclick={() => {
              UIManager.showComponent(
                <ManageUsers projectConfig={props.projectConfig} />
              );
            }}
          />
          <BackMenuItem
            component={<ShareProject projectConfig={props.projectConfig} />}
          />
        </MenuItemList>
      );
    } else {
      setContent(
        <MenuItemList>
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
                      ProjectManager.inviteUser(
                        username,
                        props.projectConfig
                      ).then((success) => {
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
                                  PopupManagerReloaded.toast("menu.share-project.share-with-others.invited.success.description", "success")
                                  UIManager.unmountAt("root");
                                  UIManager.showComponent(
                                    <ManageShare
                                      projectConfig={props.projectConfig}
                                    />
                                  );
                                });
                            });
                        } else {
                          PopupManagerReloaded.toast("error.user.invites.disabled", "error")
                        }
                      });
                    } else {
                      PopupManagerReloaded.toast("error.user.not-exists", "error")
                    }
                  });
                },
              });
            }}
            title={"menu.share-project.share-with-others"}
          />
          <BackMenuItem
            component={<ShareProject projectConfig={props.projectConfig} />}
          />
        </MenuItemList>
      );
    }
  }, []);

  return (
    <>
      <Container centered>
        <Title title={"menu.share-project.manage"} centered size={1} />
        {content}
      </Container>
    </>
  );
}

ManageShare.displayName = "ManageShare";
