/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { ReactElement, useEffect } from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import MenuItem from "../../components/Menu/MenuItem";
import { faBackward, faUser } from "@fortawesome/free-solid-svg-icons";
import UIManager from "../../util/UIManager";
import UserManager from "../../util/UserManager";
import MenuItemListScroll from "../../components/Menu/MenuItemListScroll";

export default function UserAdmin() {
  const [items, setItems] = React.useState<ReactElement[]>([]);

  useEffect(() => {
    fetch("/api/v1/admin/users/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: UserManager.getUsername(),
        password: UserManager.getToken(),
      }),
    }).then((response) => {
      response.json().then((data) => {
        let i: ReactElement[] = [
          <MenuItem
            icon={faBackward}
            onclick={() => {
              UIManager.silentRedirect("/admin");
            }}
            title={"menu.share-project.back"}
          />,
        ];
        data.message.forEach((user: string) => {
          i.push(
            <MenuItem
              icon={faUser}
              onclick={() => {
                UIManager.silentRedirect("/admin/users/" + user);
              }}
              title={user}
              nol18n
            />
          );
        });
        setItems(i);
      });
    });
  }, []);

  return (
    <Container centered>
      <Title size={1} title={"menu.admin.user"} centered />
      <MenuItemListScroll>{items}</MenuItemListScroll>
    </Container>
  );
}
