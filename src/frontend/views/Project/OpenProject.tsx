/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { ReactElement } from "react";
import Container from "../../components/Container";
import MenuItemList from "../../components/Menu/MenuItemList";
import ProjectManager from "../../util/ProjectManager";
import MenuItem from "../../components/Menu/MenuItem";
import { faCode, faCubes } from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/Title";
import MainMenuItem from "../../components/Menu/MainMenuItem";

export default function OpenProject() {
  const [container, setContainer] = React.useState<ReactElement | null>(null);

  ProjectManager.getProjects().then((projects) => {
    let menuItems: ReactElement[] = [];
    projects.map((project) => {
      menuItems.push(
        <MenuItem
          icon={project.type === "code" ? faCode : faCubes}
          title={project.name}
          nol18n={true}
          onclick={() => {
            ProjectManager.openProject(project);
          }}
        />
      );
    });

    menuItems.push(<MainMenuItem />);

    setContainer(
      <Container centered>
        <Title size={1} title={"menu.open-project.title"} centered />
        <div className={"project-list-scroll"}>
          <MenuItemList>{menuItems}</MenuItemList>
        </div>
      </Container>
    );
  });

  return <>{container}</>;
}
