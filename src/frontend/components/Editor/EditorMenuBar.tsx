/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import React from "react";
import i18n from "../../util/i18n";
import UIManager from "../../util/UIManager";
import MainMenu from "../../views/MainMenu";
import MenuBar from "../MenuBar/MenuBar";
import { ProjectConfig } from "../../types/ProjectConfig";
import ProjectManager from "../../util/ProjectManager";
import PopupManager from "../../util/PopupManager";
import ShareProject from "../../views/Project/ShareProject";
import Workspace from "../../util/Workspace";

interface Props {
  projectConfig: ProjectConfig;
}

export default function EditorMenuBar(props: Props) {
  return (
    <>
      <MenuBar
        menuItems={[
          {
            label: i18n.translate("menu.main"),
            onClick: () => {
              props.projectConfig.code = Workspace.getCode();
              ProjectManager.saveProject(props.projectConfig).then(() => {
                UIManager.showComponent(<MainMenu />, "root");
              });
            },
          },
          {
            label: i18n.translate("menu.project.save"),
            onClick: () => {
              // @ts-ignore
              props.projectConfig.code = Workspace.getCode();
              ProjectManager.saveProject(props.projectConfig).then(() => {
                PopupManager.showPopup(
                  "Alert",
                  "menu.project.saved",
                  i18n.translate("menu.project.saved.description"),
                  () => {},
                  true
                );
              });
            },
          },
          {
            label: i18n.translate("menu.project.export"),
            onClick: () => {
              ProjectManager.export(props.projectConfig);
            },
          },
        ]}
      />
    </>
  );
}
