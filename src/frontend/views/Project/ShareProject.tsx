/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import { ProjectConfig } from "../../types/ProjectConfig";
import MenuItemList from "../../components/Menu/MenuItemList";
import MenuItem from "../../components/Menu/MenuItem";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import ProjectManager from "../../util/ProjectManager";
import MainMenuItem from "../../components/Menu/MainMenuItem";

interface Props {
  projectConfig: ProjectConfig;
}

export default function ShareProject(props: Props) {
  return (
    <Container centered>
      <Title title={"menu.share-project.title"} size={1} centered />
      <MenuItemList>
        <MenuItem
          icon={faTimesCircle}
          onclick={() => {
            ProjectManager.openProject(props.projectConfig);
          }}
          title={"menu.share-project.back"}
        />
        <MainMenuItem />
      </MenuItemList>
    </Container>
  );
}
