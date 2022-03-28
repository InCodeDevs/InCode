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
  faSave,
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
import PopupManagerReloaded from "../../util/PopupManagerReloaded";
import { ProjectConfig } from "../../types/ProjectConfig";
import ImportProjectMenuItem from "../../components/Menu/ImportProjectMenuItem";

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
                  PopupManagerReloaded.confirm({
                    title: i18n.translate("menu.open-project.delete.title"),
                    description: i18n.translate(
                      "menu.open-project.delete.description"
                    ),
                    onAgree: () => {
                      ProjectManager.deleteProject(project).then(() => {
                        UIManager.showComponent(<OpenProject />);
                      });
                    },
                  });
                },
                name: "menu.open-project.delete",
              },
              {
                // @ts-ignore
                icon: faPen,
                color: "lime",
                onclick: () => {
                  PopupManagerReloaded.ask({
                    title: i18n.translate("menu.open-project.rename.title"),
                    description: i18n.translate(
                      "menu.open-project.rename.description"
                    ),
                    onSubmit: (value) => {
                      ProjectManager.renameProject(
                        project,
                        value as string
                      ).then(() => {
                        UIManager.showComponent(<OpenProject />);
                      });
                    },
                  });
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
                icon: faDownload,
                color: "#00FF00",
                name: "menu.open-project.download",
                onclick: () => {
                  ProjectManager.downloadProject(project);
                },
              },
              {
                icon: faSave,
                color: "#00FFBB",
                name: "menu.open-project.make-offline",
                onclick: () => {
                  let config = [];
                  if (localStorage.getItem("offline.projects")) {
                    config = JSON.parse(
                      localStorage.getItem("offline.projects") as string
                    );
                  }
                  let f = false;
                  config.forEach((conf: ProjectConfig) => {
                    if (conf.name === project.name) {
                      alert("Found");
                      f = true;
                    }
                  });
                  if (!f) {
                    PopupManagerReloaded.alert({
                      title: i18n.translate(
                        "menu.open-project.make-offline.title"
                      ),
                      description: i18n.translate(
                        "menu.open-project.make-offline.description"
                      ),
                    });
                    config.push(project);
                    localStorage.setItem(
                      "offline.projects",
                      JSON.stringify(config)
                    );
                  }
                },
              },
            ]}
          />
        );
      });
      if (menuItems.length === 1) {
        menuItems.push(
          <MenuItem
            icon={faPlus}
            onclick={() => {
              UIManager.showComponent(<CreateProject />);
            }}
            title={"menu.main.create.project"}
          />
        );
        menuItems.push(<ImportProjectMenuItem />);
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
