/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import Container from "../../components/Container";
import Title from "../../components/Title";
import MenuItemList from "../../components/Menu/MenuItemList";
import {
  faBookOpen,
  faCode,
  faCubes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import MenuItemInput from "../../components/Menu/MenuItemInput";
import i18n from "../../util/i18n";
import MainMenuItem from "../../components/Menu/MainMenuItem";
import MenuItem from "../../components/Menu/MenuItem";
import PopupManager from "../../util/PopupManager";
import ProjectManager from "../../util/ProjectManager";
import { ProjectConfig } from "../../types/ProjectConfig";
import UIManager from "../../util/UIManager";
import CreateProjectTemplate from "./CreateProjectTemplate";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";

export default function CreateProject() {
  return (
    <>
      <Container centered>
        <Title size={1} title={"menu.create-project.title"} centered />
        <MenuItemList>
          <MenuItemInput
            icon={faPlus}
            input={{
              type: "text",
              id: "project-name",
              placeholder: i18n.translate(
                "menu.create-project.name.placeholder"
              ),
            }}
          />
          <MenuItem
            icon={faCode}
            onclick={() => {
              if (
                ProjectManager.checkProjectName(
                  (document.getElementById("project-name") as HTMLInputElement)
                    .value
                )
              ) {
                const projectConfig: ProjectConfig = {
                  name: (
                    document.getElementById("project-name") as HTMLInputElement
                  ).value,
                  code: 'Gib "Hallo Welt" in der Konsole aus',
                  type: "code",
                };
                ProjectManager.createProject(
                  projectConfig,
                  (success: boolean) => {
                    if (!success) {
                      PopupManagerReloaded.toast(
                        "error.project.exists.description",
                        "error"
                      );
                    } else {
                      PopupManagerReloaded.toast(
                        "menu.create-project.success.description",
                        "success"
                      );
                      ProjectManager.openProject(projectConfig);
                    }
                  }
                );
              }
            }}
            title={"menu.create-project.code"}
          />
          <MenuItem
            icon={faCubes}
            onclick={() => {
              if (
                ProjectManager.checkProjectName(
                  (document.getElementById("project-name") as HTMLInputElement)
                    .value
                )
              ) {
                const projectConfig: ProjectConfig = {
                  name: (
                    document.getElementById("project-name") as HTMLInputElement
                  ).value,
                  code: '<xml><block type="start" id="|(^9%DCME)E4UEoWv~G]" x="134" y="70"></block></xml>',
                  type: "blockly",
                };
                ProjectManager.createProject(
                  projectConfig,
                  (success: boolean) => {
                    if (!success) {
                      PopupManagerReloaded.toast(
                        "error.project.exists.description",
                        "error"
                      );
                    } else {
                      PopupManagerReloaded.toast(
                        "error.project.success.description",
                        "success"
                      );
                      ProjectManager.openProject(projectConfig);
                    }
                  }
                );
              }
            }}
            title={"menu.create-project.blocks"}
          />
          <MenuItem
            icon={faBookOpen}
            onclick={() => {
              if (
                ProjectManager.checkProjectName(
                  (document.getElementById("project-name") as HTMLInputElement)
                    .value
                )
              ) {
                UIManager.showComponent(
                  <CreateProjectTemplate
                    projectName={
                      (
                        document.getElementById(
                          "project-name"
                        ) as HTMLInputElement
                      ).value
                    }
                  />
                );
              }
            }}
            title={"menu.create-project.template"}
          />
          <MainMenuItem />
        </MenuItemList>
      </Container>
    </>
  );
}

CreateProject.displayName = "CreateProject";
