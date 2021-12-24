/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { useEffect } from "react";
import UserManager from "../../util/UserManager";
import { Invite } from "../../types/Invite";
import Container from "../../components/Container";
import MenuItemListScroll from "../../components/Menu/MenuItemListScroll";
import MenuItem from "../../components/Menu/MenuItem";
import {
  faCheck,
  faCode,
  faCubes,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import MainMenuItem from "../../components/Menu/MainMenuItem";
import Title from "../../components/Title";
import MenuItemControls from "../../components/Menu/MenuItemControls";
import UIManager from "../../util/UIManager";
import { ProjectConfig } from "../../types/ProjectConfig";
import { WebClient } from "@incodelang/accounts-client";
import ProjectManager from "../../util/ProjectManager";

export default function InviteManager() {
  const [invitesActive, setInvitesActive] = React.useState(false);
  const [invites, setInvites] = React.useState<Invite[]>([]);

  useEffect(() => {
    UserManager.allowsInvites().then((success) => {
      setInvitesActive(success);
      if (success) {
        UserManager.getInvites().then((invites) => {
          setInvites(invites);
        });
      }
    });
  }, []);

  return (
    <>
      <Container centered>
        <Title size={1} title={"menu.manage-account.manage-invites"} centered />
        <MenuItemListScroll>
          {invitesActive ? (
            <>
              <MenuItem
                icon={faTimes}
                onclick={() => {
                  UserManager.disallowInvites().then(() => {
                    setInvites([]);
                    setInvitesActive(false);
                  });
                }}
                title={"menu.manage-account.manage-invites.deactivate"}
              />
              <MainMenuItem />
              {invites.map((invite) => {
                return (
                  <MenuItemControls
                    icon={invite.project_type === "code" ? faCode : faCubes}
                    onclick={() => {}}
                    widgets={[
                      {
                        icon: faCheck,
                        onclick: () => {
                          UserManager.removeInvite(invite.timestamp).then(
                            async () => {
                              const projectConfig: ProjectConfig = {
                                type: invite.project_type,
                                name: invite.project_name,
                                code: JSON.parse(
                                  await new WebClient("").getData(
                                    UserManager.getUsername(),
                                    UserManager.getToken(),
                                    invite.public_data
                                  )
                                ).code,
                                publicData: invite.public_data,
                              };
                              await ProjectManager.saveProject(projectConfig);
                              ProjectManager.openProject(projectConfig);
                            }
                          );
                        },
                        name: "",
                        color: "lime",
                      },
                      {
                        icon: faTrash,
                        color: "red",
                        name: "",
                        onclick: () => {
                          UserManager.removeInvite(invite.timestamp).then(
                            () => {
                              UIManager.unmountAt("root");
                              UIManager.showComponent(<InviteManager />);
                            }
                          );
                        },
                      },
                    ]}
                    title={invite.from + ":" + invite.project_name}
                    nol18n={true}
                  />
                );
              })}
            </>
          ) : (
            <>
              <MenuItem
                icon={faCheck}
                onclick={() => {
                  UserManager.allowInvites().then(() => {
                    UserManager.getInvites().then((invites) => {
                      setInvites(invites);
                    });
                    setInvitesActive(true);
                  });
                }}
                title={"menu.manage-account.manage-invites.activate"}
              />
              <MainMenuItem />
            </>
          )}
        </MenuItemListScroll>
      </Container>
    </>
  );
}
