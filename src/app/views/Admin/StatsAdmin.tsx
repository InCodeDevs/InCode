/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { useMemo } from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import MenuItemList from "../../components/Menu/MenuItemList";
import MenuItem from "../../components/Menu/MenuItem";
import {
  faBackward,
  faCode,
  faCubes,
  faFolderTree,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import UIManager from "../../util/UIManager";
import UserManager from "../../util/UserManager";
import i18n from "../../util/i18n";

export default function StatsAdmin() {
  const [totalUsers, setTotalUsers] = React.useState(0);
  const [totalProjects, setTotalProjects] = React.useState(0);
  const [totalCodeProjects, setTotalCodeProjects] = React.useState(0);
  const [totalBlockProjects, setTotalBlockProjects] = React.useState(0);

  useMemo(() => {
    fetch("/api/v1/admin/users/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin",
        password: UserManager.getToken(),
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((totalUserData) => {
          setTotalUsers(totalUserData.message.length);

          let projects: string[] = [];
          let iteration = 0;

          totalUserData.message.forEach(async (user: string) => {
            const res0 = await fetch("/api/v1/admin/user/" + user + "/data", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: "admin",
                password: UserManager.getToken(),
              }),
            });
            if (res0.status === 200) {
              const j0 = await res0.json();
              if (j0.message) {
                Object.keys(j0.message).forEach((project) => {
                  if (project.startsWith("projects.")) {
                    projects.push(JSON.parse(j0.message[project]).type);
                  }
                });
              }
            }
            iteration++;
            if (iteration === totalUserData.message.length) {
              setTotalProjects(projects.length);
              setTotalCodeProjects(
                projects.filter((project) => project === "code").length
              );
              setTotalBlockProjects(
                projects.filter((project) => project === "blockly").length
              );
            }
          });
        });
      }
    });
  }, []);

  return (
    <Container centered>
      <Title size={1} title={"menu.admin.stats"} centered />
      <MenuItemList>
        <MenuItem
          icon={faUsers}
          onclick={() => {}}
          title={i18n.translate("menu.admin.stats.users") + ": " + totalUsers}
          nol18n
          disabled
        />
        <MenuItem
          icon={faFolderTree}
          onclick={() => {}}
          title={
            i18n.translate("menu.admin.stats.projects") + ": " + totalProjects
          }
          nol18n
          disabled
        />
        <MenuItem
          icon={faCode}
          onclick={() => {}}
          title={
            i18n.translate("menu.admin.stats.projects.code") +
            ": " +
            totalCodeProjects
          }
          nol18n
          disabled
        />
        <MenuItem
          icon={faCubes}
          onclick={() => {}}
          title={
            i18n.translate("menu.admin.stats.projects.block") +
            ": " +
            totalBlockProjects
          }
          nol18n
          disabled
        />
        <MenuItem
          icon={faBackward}
          onclick={() => {
            UIManager.silentRedirect("/admin");
          }}
          title={"menu.share-project.back"}
        />
      </MenuItemList>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <a
          href={"https://analytics.craftions.net/analyze?host=incodelang.de"}
          target={"_blank"}
          style={{ color: "aqua" }}
        >
          Web Statistics
        </a>
      </div>
    </Container>
  );
}
