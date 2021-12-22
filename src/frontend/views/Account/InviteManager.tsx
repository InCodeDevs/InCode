/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { useEffect } from "react";
import UserManager from "../../util/UserManager";
import { Invite } from "../../types/Invite";
import Container from "../../components/Container";
import MenuItemList from "../../components/Menu/MenuItemListScroll";
import MenuItem from "../../components/Menu/MenuItem";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import MainMenuItem from "../../components/Menu/MainMenuItem";
import Title from "../../components/Title";

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
        <span>{invites.toString()}</span>
        <MenuItemList>
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
        </MenuItemList>
      </Container>
    </>
  );
}
