/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../../components/Container";
import MenuItemList from "../../components/Menu/MenuItemList";
import MenuItem from "../../components/Menu/MenuItem";
import {
  faChartLine,
  faGears,
  faSquarePlus,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/Title";
import SelectAppMenuItem from "../../components/Menu/SelectAppMenuItem";
import UIManager from "../../util/UIManager";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";
import i18n from "../../util/i18n";
import UserManager from "../../util/UserManager";

export default function Admin() {
  return (
    <Container centered>
      <Title size={1} title={"menu.admin"} centered />
      <MenuItemList>
        <MenuItem
          icon={faSquarePlus}
          onclick={() => {
            PopupManagerReloaded.ask({
              title: i18n.translate("menu.admin.publishMessage"),
              description: i18n.translate(
                "menu.admin.publishMessage.description"
              ),
              onSubmit: (message) => {
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
                    data.message.forEach((user: string) => {
                      if (user !== "admin") {
                        fetch("/api/v1/user/postboxes/exists", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            owner: user,
                            name: "admin.messages",
                          }),
                        }).then((res) => {
                          res.json().then(async (data0) => {
                            if (data0.message.includes("not")) {
                              await fetch(
                                "/api/v1/admin/postboxes/create/" +
                                  user +
                                  "/admin.messages",
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    username: "admin",
                                    password: UserManager.getToken(),
                                  }),
                                }
                              );
                            }
                            fetch("/api/v1/user/postboxes/add", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                username: "admin",
                                password: UserManager.getToken(),
                                name: "admin.messages",
                                owner: user,
                                entry: message,
                              }),
                            });
                          });
                        });
                      }
                    });
                  });
                });
              },
            });
          }}
          title={"menu.admin.publishMessage"}
        />
        <MenuItem
          icon={faUsersGear}
          onclick={() => {
            UIManager.silentRedirect("/admin/users");
          }}
          title={"menu.admin.user"}
        />
        <MenuItem
          icon={faGears}
          onclick={() => {
            UIManager.silentRedirect("/admin/system");
          }}
          title={"menu.admin.system"}
        />
        <MenuItem
          icon={faChartLine}
          onclick={() => {
            UIManager.silentRedirect("/admin/stats");
          }}
          title={"menu.admin.stats"}
        />
        <SelectAppMenuItem />
      </MenuItemList>
    </Container>
  );
}
