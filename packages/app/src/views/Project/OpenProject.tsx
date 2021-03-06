/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import Container from "../../components/Container";
import ProjectManager from "../../util/ProjectManager";
import {
  faClone,
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
import ShareProject from "./ShareProject/ShareProject";
import PopupManagerReloaded from "../../util/PopupManagerReloaded";
import { ProjectConfig } from "../../types/ProjectConfig";
import ImportProjectMenuItem from "../../components/Menu/ImportProjectMenuItem";
import Text from "../../components/Text";
import DefaultPopup from "../../util/popups/DefaultPopup";
import BrowserStorage from "../../util/BrowserStorage";
import { toast } from "react-hot-toast";
import Settings from "../../util/Settings";

export default function OpenProject() {
  const [container, setContainer] = useState<ReactElement | null>(null);
  let noProjects = false;

  useEffect(() => {
    ProjectManager.getProjects().then((projects) => {
      let menuItems: ReactElement[] = [];
      menuItems.push(<MainMenuItem />);

      if (Settings.isOffline()) {
        PopupManagerReloaded.toast("menu.open-project.cache-loaded", "success");
      } else {
        let cache: ProjectConfig[] = JSON.parse(
          BrowserStorage.get("cache.projects") || "[]"
        );

        cache.forEach((c) => {
          if (!projects.find((p) => p.name === c.name)) {
            projects.push(c);
          } else {
            if (
              new Date(c.updatedAt) >
              new Date(
                (
                  projects.find((p) => p.name === c.name) as ProjectConfig
                ).updatedAt
              )
            ) {
              (
                projects.find((p) => p.name === c.name) as ProjectConfig
              ).updatedAt = c.updatedAt;
              (projects.find((p) => p.name === c.name) as ProjectConfig).code =
                c.code;
              ProjectManager.saveProject(
                projects.find((p) => p.name === c.name) as ProjectConfig
              );
            }
          }
        });

        BrowserStorage.store("cache.projects", JSON.stringify(projects));
      }

      projects.map((project) => {
        menuItems.push(
          <MenuItemControls
            icon={project.type === "code" ? faCode : faCubes}
            title={
              project.name +
              " (" +
              new Date(project.updatedAt).toLocaleString() +
              ")"
            }
            nol18n={true}
            onclick={async () => {
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
                icon: faClone,
                name: "menu.open-project.duplicate",
                color: "#36c1ed",
                onclick: async () => {
                  let name = project.name + " - Copy";
                  const projectList = await ProjectManager.getProjectList();
                  while (projectList.includes(name)) {
                    name += " - Copy";
                  }

                  const projectConfig: ProjectConfig = {
                    name,
                    type: project.type,
                    code: project.code,
                    updatedAt: project.updatedAt,
                  };

                  await ProjectManager.createProject(
                    projectConfig,
                    (success) => {
                      UIManager.unmountAt("root");
                      UIManager.showComponent(<OpenProject />);
                      PopupManagerReloaded.toast(
                        "menu.open-project.duplicated.description",
                        "success"
                      );
                    }
                  );
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
            <p style={{ textAlign: "center" }}>
              <Text nol18n>
                {i18n.translate("menu.open-project.no-projects")}
              </Text>
            </p>
          </div>
          <MenuItemListScroll>{menuItems}</MenuItemListScroll>
        </Container>
      );
    });
  }, []);

  return <>{container}</>;
}

OpenProject.displayName = "OpenProject";
