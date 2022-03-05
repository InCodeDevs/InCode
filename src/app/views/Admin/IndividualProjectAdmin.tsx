/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import MenuItemList from "../../components/Menu/MenuItemList";
import Title from "../../components/Title";
import i18n from "../../util/i18n";
import BackMenuItem from "../../components/Menu/BackMenuItem";
import MenuItem from "../../components/Menu/MenuItem";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import UserManager from "../../util/UserManager";
import UIManager from "../../util/UIManager";
import ProjectViewerAdmin from "./ProjectViewerAdmin";

export default function IndividualProjectAdmin() {
  // @ts-ignore
  const { user, project } = useParams();

  return (
    <Container centered>
      <Title
        size={1}
        title={
          i18n.translate(
            "menu.admin.user.individual.projects.individual.title.start"
          ) +
          " " +
          project +
          " " +
          i18n.translate(
            "menu.admin.user.individual.projects.individual.title.end"
          )
        }
        nol18n
        centered
      />
      <MenuItemList>
        <MenuItem
          icon={faEye}
          onclick={() => {
            fetch(
              "/api/v1/admin/user/" + user + "/data/" + "projects." + project,
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
            ).then((res) => {
              res.json().then((data) => {
                const projectData = JSON.parse(data.message);
                UIManager.showComponent(
                  <ProjectViewerAdmin
                    type={projectData.type}
                    code={projectData.code}
                    returnUrl={"/admin/users/" + user + "/projects"}
                  />
                );
              });
            });
          }}
          title={"menu.admin.user.individual.projects.individual.view"}
        />
        <BackMenuItem url={"/admin/users/" + user + "/projects"} />
      </MenuItemList>
    </Container>
  );
}
