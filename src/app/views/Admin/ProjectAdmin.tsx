/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import Title from "../../components/Title";
import i18n from "../../util/i18n";
import MenuItemListScroll from "../../components/Menu/MenuItemListScroll";
import { useEffect } from "react";
import UserManager from "../../util/UserManager";
import MenuItem from "../../components/Menu/MenuItem";
import { faCode, faCubes } from "@fortawesome/free-solid-svg-icons";
import BackMenuItem from "../../components/Menu/BackMenuItem";
import UIManager from "../../util/UIManager";

export default function ProjectAdmin() {
  // @ts-ignore
  const { user } = useParams();

  const [elements, setElements] = React.useState<JSX.Element[]>([]);

  useEffect(() => {
    fetch("/api/v1/admin/user/" + user + "/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin",
        password: UserManager.getToken(),
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          let e: JSX.Element[] = [
            <BackMenuItem url={"/admin/users/" + user} />,
          ];

          Object.keys(data.message).forEach((key) => {
            if (key.startsWith("projects.")) {
              const m = JSON.parse(data.message[key]);

              e.push(
                <MenuItem
                  icon={m.type === "code" ? faCode : faCubes}
                  onclick={() => {
                    UIManager.silentRedirect(
                      "/admin/users/" +
                        user +
                        "/" +
                        "projects/" +
                        key.split("projects.")[1]
                    );
                  }}
                  title={key.split("projects.")[1]}
                  nol18n
                />
              );
            }
          });

          setElements(e);
        });
      }
    });
  }, []);

  return (
    <Container centered>
      <Title
        size={1}
        title={
          i18n.translate("menu.admin.user.individual.projects.title.start") +
          " " +
          user +
          " " +
          i18n.translate("menu.admin.user.individual.projects.title.end")
        }
        nol18n
        centered
      />
      <MenuItemListScroll>{elements}</MenuItemListScroll>
    </Container>
  );
}
