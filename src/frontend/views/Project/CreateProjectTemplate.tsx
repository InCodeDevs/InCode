/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import MenuItemListScroll from "../../components/Menu/MenuItemListScroll";
import Title from "../../components/Title";
import MainMenuItem from "../../components/Menu/MainMenuItem";
import { ReactElement, useEffect, useState } from "react";
import FakeLoader from "../../util/FakeLoader";
import TemplateManager from "../../util/TemplateManager";
import { TemplateResponseConfig } from "../../types/TemplateResponse";
import MenuItem from "../../components/Menu/MenuItem";
import { faCode, faCubes } from "@fortawesome/free-solid-svg-icons";
import ProjectManager from "../../util/ProjectManager";
import PopupManager from "../../util/PopupManager";
import l18n from "../../util/l18n";
import { ProjectConfig } from "../../types/ProjectConfig";

interface Props {
  projectName: string;
}

export default function CreateProjectTemplate(props: Props) {
  const [templates, setTemplates] = React.useState<ReactElement[]>([]);

  FakeLoader.show();

  useEffect(() => {
    TemplateManager.getTemplates().then((templates) => {
      let templatesArr: ReactElement[] = [];
      templatesArr.push(<MainMenuItem />);
      templates.forEach((template) => {
        templatesArr.push(
          <MenuItem
            icon={template.type === "code" ? faCode : faCubes}
            title={template.name}
            onclick={() => {
              const projectConfig: ProjectConfig = {
                name: props.projectName,
                type: template.type === "code" ? "code" : "blockly",
                code: template.code,
              };
              ProjectManager.createProject(
                projectConfig,
                (success: boolean) => {
                  if (!success) {
                    PopupManager.showPopup(
                      "Alert",
                      "error.project.exists",
                      l18n.translate("error.project.exists.description"),
                      () => {},
                      true
                    );
                  } else {
                    PopupManager.showPopup(
                      "Alert",
                      "menu.create-project.success",
                      l18n.translate("menu.create-project.success.description"),
                      () => {
                        ProjectManager.openProject(projectConfig);
                      },
                      true
                    );
                  }
                }
              );
            }}
            nol18n={true}
          />
        );
      });
      setTemplates(templatesArr);
      FakeLoader.hide();
    });
  });

  return (
    <>
      <Title title={"menu.select-project-template.title"} size={1} centered />
      <MenuItemListScroll>{templates}</MenuItemListScroll>
    </>
  );
}