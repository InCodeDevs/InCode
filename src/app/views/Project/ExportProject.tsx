/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { ProjectConfig } from "../../types/ProjectConfig";
import MenuItemList from "../../components/Menu/MenuItemList";
import MenuItem from "../../components/Menu/MenuItem";
import {
  faBackward,
  faCode,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/Title";
import Container from "../../components/Container";
import ProjectManager from "../../util/ProjectManager";

interface Props {
  projectConfig: ProjectConfig;
}

export default function ExportProject(props: Props) {
  return (
    <>
      <Container centered>
        <Title title={"menu.project.export.title"} size={1} centered />
        <MenuItemList>
          <MenuItem
            icon={faCode}
            onclick={() => {
              ProjectManager.export(props.projectConfig).then(() => {
                ProjectManager.openProject(props.projectConfig);
              });
            }}
            title={"menu.project.export.code"}
          />
          <MenuItem
            icon={faDesktop}
            onclick={() => {}}
            title={"menu.project.export.desktop"}
          />
          <MenuItem
            icon={faBackward}
            onclick={() => {
              ProjectManager.openProject(props.projectConfig);
            }}
            title={"menu.share-project.back"}
          />
        </MenuItemList>
      </Container>
    </>
  );
}

ExportProject.displayName = "ExportProject";
