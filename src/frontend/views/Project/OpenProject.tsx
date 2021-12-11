/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { ReactElement, useEffect } from "react";
import Container from "../../components/Container";
import MenuItemList from "../../components/Menu/MenuItemList";
import ProjectManager from "../../util/ProjectManager";
import {
  faCode,
  faCubes,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/Title";
import MainMenuItem from "../../components/Menu/MainMenuItem";
import MenuItemControls from "../../components/Menu/MenuItemControls";
import PopupManager from "../../util/PopupManager";
import UIManager from "../../util/UIManager";
import l18n from "../../util/l18n";

export default function OpenProject() {
  const [container, setContainer] = React.useState<ReactElement | null>(null);

  useEffect(() => {
    ProjectManager.getProjects().then((projects) => {
      let menuItems: ReactElement[] = [];
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
                icon: faTrash,
                color: "red",
                onclick: () => {
                  PopupManager.showPopup(
                    "Confirm",
                    "menu.open-project.delete.title",
                    l18n.translate("menu.open-project.delete.description"),
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
                icon: faPen,
                color: "lime",
                onclick: () => {
                  alert("hLÖloe world");
                },
                name: "menu.open-project.rename",
              },
            ]}
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
  }, []);

  return <>{container}</>;
}
