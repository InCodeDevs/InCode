/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import Container from "../../components/Container";
import ProjectManager from "../../util/ProjectManager";
import {
  faCode,
  faCubes,
  faDownload,
  faPen,
  faPlus,
  faShareSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/Title";
import MainMenuItem from "../../components/Menu/MainMenuItem";
import MenuItemControls from "../../components/Menu/MenuItemControls";
import PopupManager from "../../util/PopupManager";
import UIManager from "../../util/UIManager";
import i18n from "../../util/i18n";
import MenuItem from "../../components/Menu/MenuItem";
import CreateProject from "./CreateProject";
import MenuItemListScroll from "../../components/Menu/MenuItemListScroll";
import ShareProject from "./ShareProject";

export default function OpenProject() {
  const [container, setContainer] = useState<ReactElement | null>(null);
  let noProjects = false;

  useEffect(() => {
    ProjectManager.getProjects().then((projects) => {
      let menuItems: ReactElement[] = [];
      menuItems.push(<MainMenuItem />);
      projects.map((project) => {
        menuItems.push(
          <MenuItemControls
            // @ts-ignore
            icon={project.type === "code" ? faCode : faCubes}
            title={project.name}
            nol18n={true}
            onclick={() => {
              ProjectManager.openProject(project);
            }}
            widgets={[
              {
                // @ts-ignore
                icon: faTrash,
                color: "red",
                onclick: () => {
                  PopupManager.showPopup(
                    "Confirm",
                    "menu.open-project.delete.title",
                    i18n.translate("menu.open-project.delete.description"),
                    () => {
                      ProjectManager.deleteProject(project).then(() => {
                        UIManager.showComponent(<OpenProject />);
                      });
                    },
                    true
                  );
                },
                name: "menu.open-project.delete",
              },
              {
                // @ts-ignore
                icon: faPen,
                color: "lime",
                onclick: () => {
                  PopupManager.showPopup(
                    "Question",
                    "menu.open-project.rename.title",
                    i18n.translate("menu.open-project.rename.description"),
                    (value) => {
                      ProjectManager.renameProject(
                        project,
                        value as string
                      ).then(() => {
                        UIManager.showComponent(<OpenProject />);
                      });
                    },
                    true
                  );
                },
                name: "menu.open-project.rename",
              },
              {
                // @ts-ignore
                icon: faShareSquare,
                color: "#3390ff",
                name: "menu.open-project.share",
                onclick: () => {
                  UIManager.showComponent(
                    <ShareProject projectConfig={project} />
                  );
                },
              },
              {
                // @ts-ignore
                icon: faDownload,
                color: "#00FF00",
                name: "menu.open-project.download",
                onclick: () => {
                  ProjectManager.downloadProject(project);
                },
              },
            ]}
          />
        );
      });
      if (menuItems.length === 1) {
        menuItems.push(
          <MenuItem
            // @ts-ignore
            icon={faPlus}
            onclick={() => {
              UIManager.showComponent(<CreateProject />);
            }}
            title={"menu.main.create.project"}
          />
        );
        noProjects = true;
      }

      setContainer(
        <Container centered>
          <Title size={1} title={"menu.open-project.title"} centered />
          <div style={{ display: noProjects ? "block" : "none" }}>
            <Title size={3} title={"menu.open-project.no-projects"} centered />
          </div>
          <MenuItemListScroll>{menuItems}</MenuItemListScroll>
        </Container>
      );
    });
  }, []);

  return <>{container}</>;
}

OpenProject.displayName = "OpenProject";